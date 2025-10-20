import FeedbackDialog from '@/app/ui/adminspace/FeedbackDialog';
import ManageTypeForm from '@/app/ui/adminspace/ManageTypeForm';
import MainQueryProduct from '@/app/ui/navbar/MainQueryProduct';
import { fetchSearchedProducts } from '@/app/lib/data';
import { getTypes } from '@/app/lib/actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Types',
};

export default async function ManageTypes(props: {
  searchParams?: Promise<{
    productType_added?: string;
    productType_deleted?: string;
    mainquery?: string;
    page?: number;
  }>;
}) {

  // awaiting the params to get the URL key/value pairs
  const searchParams = await props.searchParams;

  // getting the productTypes
  const productTypes = await getTypes();

  const mainquery = searchParams?.mainquery || '';
  const currentPage = Number(searchParams?.page) || 1;
  const typeAdded = searchParams?.productType_added;
  const typeDeleted = searchParams?.productType_deleted;

  const products = await fetchSearchedProducts(mainquery, currentPage);

  return (
    <>
      <MainQueryProduct products={products} query={mainquery} />
      <div className='flex justify-center items-center relative'>
        <FeedbackDialog
          text={typeAdded ? 'Added product type successfully' : 'Deleted product type successfully'}
          params={typeAdded ? typeAdded : typeDeleted && typeDeleted}
        />
        <ManageTypeForm productTypes={productTypes} />
      </div>
    </>
  )
}