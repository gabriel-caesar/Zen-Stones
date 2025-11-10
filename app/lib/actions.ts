'use server';

import { fileCopy, Product, productType, ProductWithImages, User } from './types';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { inquirySchema, loginSchema, productSchema, productTypeSchema } from './schemas';
import { createSession, deleteSession } from './session';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import postgres from 'postgres';
import z from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// checking if the AWS keys are existent
if (!process.env.AWS_S3_REGION || 
    !process.env.AWS_S3_ACCESS_KEY_ID || 
    !process.env.AWS_S3_SECRET_ACCESS_KEY) {
  throw new Error("Missing AWS S3 environment variables");
}

// instantiating S3 Client
const s3ClientInstance = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  }
});


// gets base url dynamically
export async function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser runtime → relative works
    return '';
  }

  // Some runtimes give Promise<ReadonlyHeaders>
  const h = await headers();
  const host = h.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  return `${protocol}://${host}`;
}

export async function createProduct(prevState: any, formData: FormData) {
  // validating the add product form
  const validatedFields = productSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    productPhoto: formData.getAll('productPhoto'),
    properties: formData.getAll('properties'),
    materials: formData.getAll('materials'),
    indications: formData.getAll('indications'),
  });

  // if the parsing wasn't successful, return the errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    name,
    category,
    productType,
    price,
    properties,
    materials,
    rarity,
    size,
    weight,
    indications,
    description,
    meaning,
    featured_material,
  } = validatedFields.data;

  // calls the AWS S3 API that stores the image object 
  // in the cloud and return the url to be stored in the DB
  const images = await callS3API('productPhoto', formData);

  // inserting new product into database
  const productId = await sql<Product[]>`
    INSERT INTO products (
      name,
      category, 
      product_type, 
      price, 
      properties, 
      material, 
      rarity, 
      weight, 
      size
    )
    VALUES (
      ${name}, 
      ${category}, 
      ${productType}, 
      ${price}, 
      ${properties}, 
      ${materials}, 
      ${rarity}, 
      ${weight}, 
      ${size}
    )
    RETURNING *;
  `;

  // splitting into two queries since Postgres misinterpret over 9
  await sql`
    UPDATE products
    SET
      description = ${description},
      meaning = ${meaning},
      indicated_for = ${indications},
      featured_material = ${featured_material}
    WHERE id = ${productId[0].id};
  `;

  // inserting images inside the product images table
  for (let i = 0; i < images.length; i++) {
    await sql`
      INSERT INTO product_images (product_id, url, position, key)
      VALUES (${productId[0].id}, ${images[i].url}, ${i}, ${`${images[i].folder}/${images[i].name}`});
    `;
  }

  // refresh the page and send a product added flag to show user feedback
  redirect('/admin-space/manage-products?product_added=true');
}

export async function createType(prevState: any, formData: FormData) {
  // validating user input
  const validatedFields = productTypeSchema.safeParse({
    // This ensures `featuredPhoto` is an array, as required by the Zod schema
    ...Object.fromEntries(formData.entries()),
    featuredPhoto: formData.getAll('featuredPhoto'),
  });

  // if the parsing wasn't successful, return the errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // destructuring the form field values from the validated data
  const { category, productType } = validatedFields.data;

  // getting the type featured image data
  const images = await callS3API('featuredPhoto', formData);

  // adding the new productType to the db
  await sql`
    INSERT INTO types (product_type, parent_category, featured_image, image_key)
    VALUES (${productType}, ${category}, ${images[0].url}, ${`${images[0].folder}/${images[0].name}`});
  `;

  // refresh the page and send a product added flag to show user feedback
  redirect('/admin-space/manage-types?productType_added=true');
}

export async function deleteType(prevState: any, formData: FormData) {

  const validatedFields = z.object({
    type: z.string()
    .refine((type) => type !== 'Choose one option...', {
      message: 'You have to choose one option',
    }),
  }).safeParse({ type: formData.get('productType') });

  // if the parsing wasn't successful, return the errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // destructuring the type from the data
  const { type } = validatedFields.data;

  // deleting type
  try {

    // getting the type id
    const typeId = await sql`
      SELECT id FROM "types" 
      WHERE product_type = ${type}
    `

    // deleting feature photos
    await deleteFilesFromS3(typeId[0].id, true);

    // deleting product type from db
    await sql`
      DELETE FROM "types"
      WHERE product_type = ${type};
    `

  } catch (error) {
    throw new Error(`Couldn't delete type. ${error}`)
  }

  // refresh the page and send a type deleted flag to show user feedback
  redirect('/admin-space/manage-types?productType_deleted=true');
}

export async function login(prevState: any, formData: FormData) {
  // parsing email and password form data agains loginSchema
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  // if the parsing wasn't successful, return the errors
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // destructuring the email from the validated user
  const { email, password } = result.data;

  // getting the user from db
  const dbUser = await getUserFromDb(email, password);

  // if it wasn't able to get the user from db, credentials were invalid
  if (!dbUser) {
    return {
      errors: {
        password: ['Invalid credentials'],
      },
    };
  }

  // getting a session token for the user
  await createSession(dbUser.id, dbUser.admin);

  // redirect user to main page
  redirect('/');
}

export async function editProduct(prevState: any, formData: FormData) {

  // validating the edit product form
  const validatedFields = productSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    productPhoto: formData.getAll('productPhoto'),
    properties: formData.getAll('properties'),
    materials: formData.getAll('materials'),
    indications: formData.getAll('indications'),
  });

  // if the parsing wasn't successful, return the errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    name,
    category,
    productType,
    price,
    properties,
    materials,
    rarity,
    size,
    weight,
    indications,
    description,
    meaning,
    featured_material,
  } = validatedFields.data;

  // calls the AWS S3 API that stores the image object 
  // in the cloud and return the url to be stored in the DB
  const images = await callS3API('productPhoto', formData);
  
  // validating the id
  const validate = z
    .object({ id: z.string({ message: 'Product ID is missing' }) })
    .safeParse({ id: formData.get('id') });

  // if the parsing wasn't successful, return the errors
  if (!validate.success) {
    console.log(validate.error)
    return {
      errors: validate.error.flatten().fieldErrors,
    };
  }

  // getting the product id through the hidden form data
  const { id } = validate.data;

  try {

     // updating all the properties of the product
    updatedProductRow(
      id,
      name,
      category,
      price,
      properties,
      description,
      rarity,
      weight,
      materials,
      meaning,
      indications,
      size,
      productType,
      featured_material
    )

  } catch (error) {
    throw new Error(`Couldn't finaliz editProduct. ${error}`)
  }
 
  // if user uploaded any new image
  if (images.length > 0) {
    // inserting images inside the product images table
    for (let i = 0; i < images.length; i++) {
      await sql`
        INSERT INTO product_images (product_id, url, position, key)
        VALUES (${id}, ${images[i].url}, ${i}, ${`${images[i].folder}/${images[i].name}`});
      `;
    }
  }

  // refresh the page and send a product edited flag to show user feedback
  redirect('/admin-space/manage-products?product_edited=true');
}

export async function sendInquiry(prevState: any, formData: FormData) {

  // awaiting the promise returned from the function
  const baseUrl = await getBaseUrl();

  // if product_id is empty, we delete it instead of keeping it as an empty string
  const rawData = Object.fromEntries(formData.entries());
  if (rawData.product_id === '') delete rawData.product_id;

  const validatedFields = inquirySchema.safeParse(rawData);

  // if the parsing wasn't successful, return the errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // destructuring the form data from the validated data
  const { name, title, inquiry, email, product_id } = validatedFields.data;

  try {

    // calls the api which feeds the email
    await fetch(`${baseUrl}/api/inquiry`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        title: title,
        inquiry: inquiry,
        email: email,
        product_id: product_id,
      })
    })

  } catch (error) {
    throw new Error(`Couldn't send inquiry. ${error}`)
  }

  // redirect the user to the same address but with a feedback params
  redirect('/inquiry?inquiry=true');
}

async function updatedProductRow(
  id: string,
  name: string,
  category: string,
  price: string,
  properties: string[],
  description: string,
  rarity: string,
  weight: string,
  material: string[],
  meaning: string,
  indicated_for: string[],
  size: string,
  product_type: string,
  featured_material: string
) {

  try {

     await sql`
      UPDATE products
      SET 
        name = ${name},
        category = ${category},
        price = ${price},
        properties = ${properties},
        description = ${description},
        rarity = ${rarity},
        weight = ${weight},
        material = ${material},
        meaning = ${meaning},
        indicated_for = ${indicated_for},
        size = ${size},
        product_type = ${product_type},
        featured_material = ${featured_material}
      WHERE id = ${id};
    `;

  } catch (error) {
    throw new Error(`Couldn't update the product. ${error}`)
  }
}

export async function deleteProduct(id: string) {
  // delete the product row
  try {

    // awaiting the function that deletes all images from the product in S3
    // this needs to happen first so the query doesn't
    // delete the images before we look for the image keys
    await deleteFilesFromS3(id, false);

    // delete query
    const result = await sql`
      DELETE FROM products
      WHERE products.id = ${id}
    `

    // checking if the delete was through
    if (result.count === 0) {
      throw new Error("No product found with that ID");
    }

  } catch (error) {
    throw new Error(`Couldn't delete your product. ${error}`)
  }
}

async function getUserFromDb(
  email: string,
  password: string
): Promise<User | undefined> {
  try {
    // querying the database for the user
    const user = await sql<User[]>`
      SELECT * FROM users WHERE email = ${email} AND password = ${password};
    `;

    return user[0];
  } catch (error) {
    throw new Error(`Couldn't fetch user from db. ${error}`);
  }
}

// getting the product type that user created
export async function getTypes() {
  const types = await sql<productType[]>`
    SELECT * FROM types -- refreshed plano
  `;
  return types;
}

// deletes the cookie session and redirects user
export async function logout() {
  await deleteSession();
  redirect('/');
}

// this function will upload product images to AWS S3 bucket
export async function uploadFileToS3(
  file: Buffer<ArrayBuffer>,
  fileName: string,
  folder: string,
  s3ClientInstance: S3Client
) {
  try {
    const fileBuffer = file;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${folder}/${fileName}`,
      Body: fileBuffer,
      ContentType: 'image/jpg',
    };

    // saving the file into the S3 bucket
    const command = new PutObjectCommand(params);
    await s3ClientInstance.send(command);
    return fileName;
  } catch (error) {
    throw new Error(`S3 upload failed at uploadFileToS3. ${error}`);
  }
}

async function deleteFilesFromS3(id: string, isType: boolean) {
  try {

    // deletion for products
    if (!isType) {
      // getting all image S3 keys
      const images = await sql<{ key: string }[]>`
        SELECT key FROM product_images WHERE product_id = ${id}
      `;
      const keys = images.map(img => img.key);
  
      for (const key of keys) {
        await s3ClientInstance.send(new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: key
        }));
      } 
    } else { // deletion for types
      // getting all image S3 keys
      const typeKey = await sql<{ image_key: string }[]>`
        SELECT image_key FROM types WHERE id = ${id}
      `;
      const key = typeKey[0].image_key;

      await s3ClientInstance.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key
      }));
    }

  } catch (error) {
    throw new Error(`Couldn't delete images in S3. ${error}`)
  }
}

export async function deleteSingleImageFile(productId: string | undefined, url: string) {
  try {

    if (productId) {
      // get the S3 key
      const query = await sql<{ key: string }[]>`
        SELECT key FROM product_images WHERE product_id = ${productId} AND url = ${url};
      `;
      if (!query[0]) return; // no image found

      // store the key in a plain variable
      const key = query[0].key;

      // call the function to delete the image in the S3
      await s3ClientInstance.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key
      }));

      // delete the image in the db
      await sql`
        DELETE FROM product_images 
        WHERE product_id = ${productId} AND
        url = ${url} AND
        key = ${key};
      `;
    } else { // error occurred with product id
      return
    }

    

  } catch (error) {
    throw new Error(`Couldn't delete image in S3. ${error}`);
  }
}

async function callS3API(endpoint: string, formData: FormData) {
  // awaiting the promise returned from the function
  const baseUrl = await getBaseUrl();

  const testFormData = formData.getAll(endpoint);

  // if no image was uploaded (for the edit form case)
  if (testFormData.length <= 0) {
    return []
  }

  // uploading images to S3 AWS
  // when fetching from the deployed website, we don't need to specify the base URL, that's why is empty
  const res = await fetch(`${baseUrl}/api/s3-upload/${endpoint}`, {
    method: 'POST',
    body: formData,
  });

  // jsoning the data
  const data = await res.json();

  // if the data wasn't successfuly uploaded
  if (!data.success) {
    throw new Error('Images were not uploaded to S3');
  }

  // copy of all images uploaded in objects
  const images: fileCopy[] = data.files;

  return images;
}

// featurize a product
export async function featurizeProduct(id: string) {
  try {
    const result = await sql`
      UPDATE products
      SET featured_section = TRUE
      WHERE id = ${id}
      RETURNING id
    `

    // if result is returning something, it means it went through
    return result.length > 0
  } catch (error) {
    throw new Error(`Couldn't featurize this product. ${error}`)
  }
}

// unfeature a product
export async function unfeatureProduct(id: string) {
  try {
    const result = await sql`
      UPDATE products
      SET featured_section = FALSE
      WHERE id = ${id}
      RETURNING id
    `

    // if result is returning something, it means it went through
    return result.length > 0
  } catch (error) {
    throw new Error(`Couldn't unfeature this product. ${error}`)
  }
}

// adds a product to the main page collections
export async function addProductToCollections(product: ProductWithImages) {
  try { 

    await sql`
      UPDATE products
      SET is_collection = TRUE
      WHERE id = ${product.id}
    `

  } catch (error) {
    throw new Error(`Couldn't add product to collections. ${error}`)
  }
}

// removes a product from the main page collections
export async function removeProductFromCollections(product: ProductWithImages) {
  try { 

    await sql`
      UPDATE products
      SET is_collection = FALSE
      WHERE id = ${product.id}
    `

  } catch (error) {
    throw new Error(`Couldn't remove product from collections. ${error}`)
  }
}