'use server';

import postgres from 'postgres';
import { ProductWithImages, FrequencyArray, productType } from '../types/types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 10; // for pagination
export async function fetchSearchedProducts(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    if (query === '') return [];

    const products = await sql<ProductWithImages[]>`
      SELECT DISTINCT ON (products.id)
        products.id,
        products.name,
        products.category,
        products.product_type,
        products.price,
        products.properties,
        products.description,
        products.rarity,
        products.weight,
        products.size,
        products.indicated_for,
        products.meaning,
        products.material,
        products.featured_material,
        array_agg(product_images.url) AS urls
      FROM products
      LEFT JOIN product_images ON products.id = product_images.product_id
      WHERE
        products.name ILIKE ${`%${query}%`} OR
        products.category ILIKE ${`%${query}%`} OR
        products.product_type ILIKE ${`%${query}%`} OR
        ${`%${query}%`} ILIKE ANY (products.material) OR
        products.rarity ILIKE ${`%${query}%`}
      GROUP BY products.id
      ORDER BY products.id, products.category
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}; -- refreshed plan
    `;

    return products;
  } catch (error) {
    throw new Error(`Couldn't fetch products from database. ${error}`);
  }
}

export async function fetchSingleItem(productId: string) {
  try {
    const product = await sql<ProductWithImages[]>`
      SELECT 
        products.id,
        products.name,
        products.category,
        products.product_type,
        products.price,
        products.properties,
        products.description,
        products.rarity,
        products.weight,
        products.size,
        products.indicated_for,
        products.meaning,
        products.material,
        products.featured_material,
        array_agg(product_images.url) AS urls
      FROM products
      LEFT JOIN product_images ON products.id = product_images.product_id
      WHERE products.id = ${productId}
      GROUP BY products.id; --a
    `;

    return product[0];
  } catch (error) {
    throw new Error(`Couldn't fetch this product from database. ${error}`);
  }
}

// fetch featured products that render in the main page
export async function fetchFeaturedProducts() {
  try {

    const featured = await sql<ProductWithImages[]>`
      SELECT 
        products.id,
        products.name,
        products.category,
        products.product_type,
        products.price,
        products.properties,
        products.description,
        products.rarity,
        products.weight,
        products.size,
        products.indicated_for,
        products.meaning,
        products.material,
        products.featured_material,
        products.featured_section,
        array_agg(product_images.url) AS urls
      FROM products
      LEFT JOIN product_images ON products.id = product_images.product_id
      WHERE featured_section = TRUE
      GROUP BY products.id; --a
    `

    return featured;

  } catch (error) {
    throw new Error(`Couldn't fetch featured products. ${error}`)
  }
}

// export async function fetchByCategory(categoryName: Category, currentPage: number) {

//   // Page 1: (1 - 1) * 2 = 0 → skip 0 rows → rows 0–1
//   // Page 2: (2 - 1) * 2 = 2 → skip 2 rows → rows 2–3
//   // Page 3: (3 - 1) * 2 = 4 → skip 4 rows → rows 4–5
//   // Page 4: (4 - 1) * 2 = 6 → skip 6 rows → rows 6–7
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {

//     // get all products of a category with their images aggregated, then group by every product column
//     const product = await sql<ProductWithImages[]>`
//       SELECT
//         products.id,
//         products.name,
//         products.category,
//         products.product_type,
//         products.price,
//         products.properties,
//         products.description,
//         products.rarity,
//         products.weight,
//         products.size,
//         products.indicated_for,
//         products.meaning,
//         products.material,
//         products.featured_material,
//         array_agg(product_images.url) AS urls
//       FROM products
//       JOIN product_images ON products.id = product_images.product_id
//       WHERE products.category ILIKE ${categoryName}
//       GROUP BY
//         products.id,
//         products.name,
//         products.category,
//         products.product_type,
//         products.price,
//         products.properties,
//         products.description,
//         products.rarity,
//         products.weight,
//         products.size,
//         products.indicated_for,
//         products.meaning,
//         products.material,
//         products.featured_material
//         LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
//     `

//     return product;

//   } catch (error) {
//     throw new Error(`Couldn't fetch this category from database. ${error}`)
//   }
// }

// fetch types for the catalog filter
export async function fetchTypes(categoryName: string) {
  try {
    const types = await sql<FrequencyArray[]>`
      SELECT product_type AS name, COUNT(product_type) FROM products
      ${categoryName ? sql`WHERE category ILIKE ${categoryName}` : sql``}
      GROUP BY product_type
    `;

    return types;
  } catch (error) {
    throw new Error(`Couldn't fetch types. ${error}`);
  }
}

// fetches the featured type
export async function fetchFeaturedType() {
  try {
    const featured = await sql<productType[]>`
      SELECT * FROM types
    `;

    return featured
  } catch (error) {
    throw new Error(`Couldn't fetch featured type. ${error}`);
  }
}

// fetches an array of frequency objects based on product materials
export async function fetchMaterials(categoryName: string) {
  try {

    // grabbing all distincts material occurrences on products
    const materials = await sql<{material: string}[]>`
     SELECT DISTINCT unnest(material) AS material 
     FROM products
     ${categoryName ? sql`WHERE category ILIKE ${categoryName}` : sql``}
     GROUP BY material
    `

    // it querys the occurrences of every material of every element
    // and returns an {name: string; count: number} array
    const frequency = await Promise.all(materials.map(async (m) => {
      const x = await sql<FrequencyArray[]>`
        SELECT 
          ${m.material} AS name,
          COUNT(*) AS count
        FROM products
        WHERE ${m.material} = ANY(material);
      `
      return x[0];
    }))

    return frequency;

  } catch (error) {
    throw new Error(`Couldn't fetch materials. ${error}`)
  }
}

// fetches an array of frequency objects based on product indications
export async function fetchIndications(categoryName: string) {
  try {

    // grabbing all distincts indication occurrences on products
    const indications = await sql<{indication: string}[]>`
      SELECT DISTINCT unnest(indicated_for) AS indication 
      FROM products
      ${categoryName ? sql`WHERE category ILIKE ${categoryName}` : sql``}
      GROUP BY indicated_for
    `

    // it querys the occurrences of every indication of every element
    // and returns an {name: string; count: number} array
    const frequency = await Promise.all(indications.map(async (i) => {
      const x = await sql<FrequencyArray[]>`
        SELECT 
          ${i.indication} AS name,
          COUNT(*) AS count
        FROM products
        WHERE ${i.indication} = ANY(indicated_for);
      `
      return x[0];
    }))

    return frequency;

  } catch (error) {
    throw new Error(`Couldn't fetch indications. ${error}`)
  }
}

// fetches the most expensive product price or the most cheap
export async function fetchPrice(categoryName: string, choice: 'max' | 'min') {
  try {
    const query = await sql`
      SELECT price FROM products
      ${categoryName ? sql`WHERE category ILIKE ${categoryName}` : sql``}
      ORDER BY price ${choice === 'max' ? sql`DESC` : sql`ASC`}
      LIMIT 1
    `

    return Number(query[0].price);
  } catch (error) {
    throw new Error(`Couldn't fetch product prices. ${error}`)
  }
}

// fetches the total count of products under the category(ies) specified
// used for pagination
export async function fetchProductCount(categoryName: string | undefined) {
  try {
    // returns the count for the amount of products under that category
    const data = await sql`SELECT COUNT(*) as count
      FROM products
      ${categoryName ? sql`WHERE products.category ILIKE ${categoryName}` : sql``}
    `;

    return data[0].count;
  } catch (error) {
    throw new Error(`Couldn't fetch total pages for this category. ${error}`);
  }
}

// fetches dynamically against filter values
export async function fetchFilteredProducts(filters: {
  category?: string | string[];
  type?: string | string[];
  material?: string | string[];
  max?: string;
  min?: string;
  indication?: string | string[];
  page: number;
  limit: number;
}) {
  const { category, type, material, max, min, indication, page, limit } = filters;
  const offset = (page - 1) * limit;

  // capitalizes the initial of every element inside of a given array (even for strings with spaces)
  const capitalizeInitial = (arr?: string[]): string[] => 
  (arr ?? []).map(str =>
    str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );

  const products = await sql<ProductWithImages[]>`
    SELECT
      products.id,
      products.name,
      products.category,
      products.product_type,
      products.price,
      products.properties,
      products.description,
      products.rarity,
      products.weight,
      products.size,
      products.indicated_for,
      products.meaning,
      products.material,
      products.featured_material,
      array_agg(product_images.url) AS urls
    FROM products
    JOIN product_images ON products.id = product_images.product_id
    WHERE 1=1
      ${category ? sql`AND products.category ILIKE ${category}` : sql``}
      ${type ? sql`AND products.product_type ILIKE ${type}` : sql``}
      ${
        material
          ? sql`AND products.material && ${capitalizeInitial(
              material as string[]
            )}`
          : sql``
      }
      ${(max && min) ? sql`
            AND products.price BETWEEN ${min} AND ${max}
      ` : sql``}
      ${
        indication
          ? sql`AND products.indicated_for && ${capitalizeInitial(
              indication as string[]
            )}`
          : sql``
      }
    GROUP BY products.id
    ORDER BY products.name
    LIMIT ${limit} OFFSET ${offset};
  `;

  return products;
}

// Figure out how to make the product properties
// that come as params turn into arrays so they
// can be compared in this function and return
// the matching values from the database

// Sort is now in FilterAndSort() Component
// so you will have to make the sorting logic
// push params into the URL as well so the DB
// sorts it to you. However if you wanna get
// cheesy and choose the easiest path, you'll
// have to transfer the dropdown to CatalogWrapper()
// Component so you can sort it in the front-end
// and place it alongside the product count in the UI

// Lastly you need to figure out why Pagination broke
