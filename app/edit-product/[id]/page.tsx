import { fetchSearchedProducts, fetchSingleItem } from '@/app/lib/data'
import { ProductWithImages } from '@/app/lib/types';
import { Metadata } from 'next';
import EditProductForm from '@/app/ui/adminspace/search-product/EditProductForm';
import MainQueryProduct from '@/app/ui/navbar/MainQueryProduct';

export const metadata: Metadata = {
  title: 'Edit Product',
};

export default async function EditProduct({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{
  mainquery?: string
  page?: string
}> }) {

  const { id } = await params;

  const product: ProductWithImages = await fetchSingleItem(id);

  // awaiting the params to get the URL key/value pairs
  const awaitedSearchParams = await searchParams;
  const mainquery = awaitedSearchParams?.mainquery || '';
  const currentPage = Number(awaitedSearchParams?.page) || 1;

  const mainQueryProducts = await fetchSearchedProducts(mainquery, currentPage);

  return (
    <div className='flex justify-center items-center'>
      <MainQueryProduct products={mainQueryProducts} query={mainquery} />
      <EditProductForm product={product} />
    </div>
  )
}