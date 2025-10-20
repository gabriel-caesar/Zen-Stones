import SearchProduct from '@/app/ui/adminspace/search-product/SearchProduct';
import FeedbackDialog from '@/app/ui/adminspace/FeedbackDialog';
import AddProductForm from '@/app/ui/adminspace/AddProductForm';
import MainQueryProduct from '@/app/ui/navbar/MainQueryProduct';
import { fetchSearchedProducts } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Products',
};

export default async function ManageProducts(props: {
  searchParams?: Promise<{
    deletion: string;
    product_added?: string;
    product_edited?: string;
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
  
  const productAdded = searchParams?.product_added;
  const productEdited = searchParams?.product_edited;
  const productDeletion = searchParams?.deletion;

  const products = await fetchSearchedProducts(query, currentPage);
  const mainQueryProducts = await fetchSearchedProducts(mainquery, currentPage);

  return (
    <>
      <MainQueryProduct products={mainQueryProducts} query={mainquery} />
      <div className='flex flex-col justify-center items-center lg:flex-row lg:items-start lg:mb-10 relative'>
        <FeedbackDialog
          text={ 
            productAdded 
              ? 'Added product successfully' 
              : productEdited
                ? 'Edited product successfully'
                : 'Deleted product successfully'
          }
          params={productAdded ? productAdded : productEdited ? productEdited : productDeletion}
        />
        <SearchProduct products={products} />
        <AddProductForm />
      </div>
    </>
  );
}
