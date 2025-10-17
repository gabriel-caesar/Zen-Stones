'use server';

import postgres from 'postgres';
import { ProductWithImages, FrequencyArray, productType, Product } from './types';

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
        products.featured_section,
        products.is_collection,
        array_agg(product_images.url) AS urls
      FROM products
      LEFT JOIN product_images ON products.id = product_images.product_id
      WHERE
        products.name ILIKE ${`%${query}%`} OR
        products.category ILIKE ${`%${query}%`} OR
        products.product_type ILIKE ${`%${query}%`} OR
        ${query} ILIKE ANY (products.material) OR
        ${query} ILIKE ANY (products.indicated_for) OR
        ${query} ILIKE ANY (products.properties) OR
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
        products.is_collection,
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

// fetch types for the catalog filter
export async function fetchTypes(categoryName: string) {
  try {
    const types = await sql<FrequencyArray[]>`
      SELECT product_type AS name, COUNT(product_type) FROM products
      ${categoryName ? sql`WHERE category ILIKE ${categoryName}` : sql``}
      GROUP BY product_type --plan
    `;

    return types;
  } catch (error) {
    throw new Error(`Couldn't fetch types. ${error}`);
  }
}

// fetch properties for the catalog filter
export async function fetchProperties(categoryName: string) {
  try {
     // grabbing all distincts property occurrences on products
    const properties = await sql<{prop: string}[]>`
     SELECT DISTINCT unnest(properties) AS prop 
     FROM products
     ${categoryName ? sql`WHERE category ILIKE ${categoryName}` : sql``}
     GROUP BY properties
    `

    // it querys the occurrences of every property of every element
    // and returns an {name: string; count: number} array
    const frequency = await Promise.all(properties.map(async (m) => {
      const x = await sql<FrequencyArray[]>`
        SELECT 
          ${m.prop} AS name,
          COUNT(*) AS count
        FROM products
        WHERE ${m.prop} = ANY(properties);
      `
      return x[0];
    }))

    return frequency;
  } catch (error) {
    throw new Error(`Couldn't fetch properties. ${error}`);
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
  properties?: string | string[];
  max?: string;
  min?: string;
  indication?: string | string[];
  page: number;
  limit: number;
}) {
  const { category, type, material, properties, max, min, indication, page, limit } = filters;
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
      ${category ? sql`AND ARRAY[products.category] && ${capitalizeInitial(category as string[])}` : sql``}
      ${type ? sql`AND ARRAY[products.product_type] && ${capitalizeInitial(type as string[])}` : sql``}
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
      ${
        properties
          ? sql`AND products.properties && ${capitalizeInitial(
              properties as string[]
            )}`
          : sql``
      }
    GROUP BY products.id
    ORDER BY products.name
    LIMIT ${limit} OFFSET ${offset}; --plano
  `;

  return products;
}

// gets all collection products to be rendered in the front-end
export async function fetchCollectionProducts() {
  try {

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
        products.featured_section,
        products.is_collection,
        array_agg(product_images.url) AS urls
      FROM products
      LEFT JOIN product_images ON products.id = product_images.product_id
      WHERE products.is_collection = TRUE
      GROUP BY products.id;
    `

    return products

  } catch (error) {
    throw new Error(`Couldn't fetch collection product. ${error}`)
  }
}