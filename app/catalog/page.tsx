import { fetchFilteredProducts, fetchProductCount, fetchSearchedProducts } from '@/app/lib/data';
import { ProductsContextWrapper } from '../ui/catalog/ProductsContext';
import CatalogWrapper from '@/app/ui/catalog/CatalogWrapper';
import MainQueryProduct from '@/app/ui/navbar/MainQueryProduct';
import Pagination from '@/app/ui/Pagination';
import { makeArray } from '../lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalog',
};

export default async function Catalog({
  searchParams,
}: {
  searchParams?: Promise<{
    mainquery?: string;
    page?: string;
    category?: string,
    type?: string,
    material?: string,
    indications?: string,
    properties?: string,
    max?: string,
    min?: string;
  }>;
}) {

  // pagination
  const ITEMS_PER_PAGE = 8;
  
  // for the product search
  const awaitedSearchParams = await searchParams;

  // params for the product search
  const mainquery = awaitedSearchParams?.mainquery || '';
  const currentPage = Number(awaitedSearchParams?.page) || 1;

  // params for the product filter
  const category = awaitedSearchParams?.category
  const type = awaitedSearchParams?.type;
  const material = awaitedSearchParams?.material;
  const max = awaitedSearchParams?.max;
  const min = awaitedSearchParams?.min;
  const indication = awaitedSearchParams?.indications;
  const properties = awaitedSearchParams?.properties;
  const page = Number(awaitedSearchParams?.page) || 1;

  const paramsArr = [
    category,
    type,
    material,
    properties,
    max,
    min,
    indication,
    properties
  ]

  // actual array of products to be showcased on catalog
  const filteredProducts = await fetchFilteredProducts({
    category: makeArray(category),
    type: makeArray(type),
    material: makeArray(material),
    properties: makeArray(properties),
    max: max,
    min: min,
    indication: makeArray(indication),
    page: page,
    limit: ITEMS_PER_PAGE,
  });

  // fetching the filtered product count for pagination and UI feedback
  const fetchedProductsCount = await fetchProductCount({
    category: makeArray(category),
    type: makeArray(type),
    material: makeArray(material),
    properties: makeArray(properties),
    max: max,
    min: min,
    indication: makeArray(indication)
  });

  // product count variable
  const productCount = fetchedProductsCount[0].count;

  // total pages based on how many items were fetched from the db
  const totalPages = Math.ceil(Number(productCount) / ITEMS_PER_PAGE);
  
  // db fetches based on the main searchbar
  const products = await fetchSearchedProducts(mainquery, currentPage);

  return (
    <ProductsContextWrapper value={{filteredProducts, paramsArr}}>
      <MainQueryProduct products={products} query={mainquery} />
      <CatalogWrapper productCount={productCount} />
      <div className='w-full flex justify-center items-center mb-5 mt-10'>
        <Pagination totalPages={totalPages} />
      </div>
    </ProductsContextWrapper>
  )  
}