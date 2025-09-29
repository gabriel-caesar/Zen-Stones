'use server'

import postgres from 'postgres';
import { ProductWithImages } from '../types/types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 6; // for pagination
export async function fetchFilteredProducts(query: string, currentPage: number) {

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
  try {

    if (query === '') return [];

    const products = await sql<ProductWithImages[]>`
      SELECT DISTINCT ON (products.id)
        products.id,
        products.name,
        products.category,
        products.subcategory,
        products.price,
        products.properties,
        products.description,
        products.rarity,
        products.weight,
        array_agg(product_images.url) AS urls
      FROM products
      LEFT JOIN product_images ON products.id = product_images.product_id
      WHERE
        products.name ILIKE ${`%${query}%`} OR
        products.category ILIKE ${`%${query}%`} OR
        products.subcategory ILIKE ${`%${query}%`} OR
        products.rarity ILIKE ${`%${query}%`}
      GROUP BY products.id
      ORDER BY products.id, products.category
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset};
    `

    return products; 

  } catch (error) {
    throw new Error(`Couldn't fetch products from database. ${error}`)
  }

}

