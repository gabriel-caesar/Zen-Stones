import { fetchFilteredProducts } from '@/app/lib/data';
import AddProductForm from '@/app/ui/adminspace/AddProductForm';
import FeedbackDialog from '@/app/ui/adminspace/FeedbackDialog';
import SearchProduct from '@/app/ui/adminspace/search-product/SearchProduct';
import MainQueryProduct from '@/app/ui/navbar/MainQueryProduct';

export default async function ManageProducts(props: {
  searchParams?: Promise<{
    product_added?: string;
    mainquery?:string;
    query?: string;
    page?: string;
  }>;
}) {
  // awaiting the params to get the URL key/value pairs
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const mainquery = searchParams?.mainquery || '';
  const currentPage = Number(searchParams?.page) || 1;

  const products = await fetchFilteredProducts(query, currentPage);
  const mainQueryProducts = await fetchFilteredProducts(mainquery, currentPage);

  return (
    <>
      <MainQueryProduct products={mainQueryProducts} />
      <div className='flex flex-col justify-center items-center lg:flex-row lg:items-start lg:mb-10 relative'>
      <FeedbackDialog
        text='Added product successfully'
        params={searchParams?.product_added}
      />
      <SearchProduct products={products} />
      <AddProductForm />
    </div>
    </>
  );
}
