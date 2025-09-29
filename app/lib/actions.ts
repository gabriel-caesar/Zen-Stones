'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createSession, deleteSession } from './session';
import { loginSchema, productSchema, subCategorySchema } from './schemas';
import { Product, SubCategory, User } from '../types/types';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { headers } from 'next/headers';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// gets base url dynamically
export async function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Browser runtime → relative works
    return "";
  }

  // Some runtimes give Promise<ReadonlyHeaders>
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  return `${protocol}://${host}`;
}


export async function createProduct(prevState: any, formData: FormData) {
  // validating the add product form
  const validatedFields = productSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    productPhoto: formData.getAll('productPhoto'),
    properties: formData.getAll('properties'),
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
    subcategory,
    price,
    properties,
    rarity,
    weight,
    description,
  } = validatedFields.data;

  // awaiting the promise returned from the function
  const baseUrl = await getBaseUrl();

  // uploading images to S3 AWS
  // when fetching from the deployed website, we don't need to specify the base URL, that's why is empty
  const res = await fetch(`${baseUrl}/api/s3-upload/productPhoto`, {
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
  const images = data.files;

  // inserting new product into database
  const productId = await sql<Product[]>`
    INSERT INTO products (name, category, subcategory, price, properties, rarity, weight, description)
    VALUES (${name}, ${category}, ${subcategory}, ${price}, ${properties}, ${rarity}, ${weight}, ${description})
    RETURNING *;
  `;

  // inserting images inside the product images table
  for (let i = 0; i < images.length; i++) {
    await sql`
      INSERT INTO product_images (product_id, url, position)
      VALUES (${productId[0].id}, ${images[i].url}, ${i});
    `;
  }

  // refresh the page and send a product added flag to show user feedback
  redirect('/admin-space/manage-products?product_added=true');
}

export async function createSubCategory(prevState: any, formData: FormData) {
  // validating user input
  const validatedFields = subCategorySchema.safeParse({
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
  const { category, subcategory } = validatedFields.data;

  // awaiting the promise returned from the function
  const baseUrl = await getBaseUrl();

  // uploading images to S3 AWS with the dynamic segment being the photo files
  const res = await fetch(`${baseUrl}/api/s3-upload/featuredPhoto`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  // if the data wasn't successfuly uploaded
  if (!data.success) {
    throw new Error('Images were not uploaded to S3');
  }

  // copy of the only image uploaded in S3 for this subcategory
  const images = data.files;

  // adding the new subcategory to the db
  await sql`
    INSERT INTO subcategories (subcategory, parent_category, featured_image)
    VALUES (${subcategory}, ${category}, ${images[0].url});
  `

  // refresh the page and send a product added flag to show user feedback
  redirect('/admin-space/manage-subcategories?subcategory_added=true');
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

// getting the subcategories that user created
export async function getSubcategories() {

  const subcategories = await sql<SubCategory[]>`
    SELECT * FROM subcategories -- refreshed plan
  `
  return subcategories;
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
    throw new Error(`S3 upload failed at uploadFileToS3. ${error}`)
  }
}

// unique id generator
export async function uniqueId() {
  let id = [];
  let counter = 0;
  for (let i = 0; i < 20; i++) {
    if (counter % 2 === 0) {
      id.push(Math.floor(Math.random() * 10)); // generating numbers from 0 to 9
      counter++;
    } else {
      id.push(String.fromCharCode(Math.floor(Math.random() * 26) + 97)); // generating letters from a to z
      counter++;
    }
  }
  return id.join(''); // turning the array into string
}
