import { getSubcategories } from '@/app/lib/actions';
import { fetchFilteredProducts } from '@/app/lib/data';
import FeedbackDialog from '@/app/ui/adminspace/FeedbackDialog';
import ManageSubCategoryForm from '@/app/ui/adminspace/ManageSubCategoryForm';
import MainQueryProduct from '@/app/ui/navbar/MainQueryProduct';

export default async function ManageSubCategories(props: {
  searchParams?: Promise<{
    subcategory_added?: string;
    mainquery?: string;
    page?: number;
  }>;
}) {

  // awaiting the params to get the URL key/value pairs
  const searchParams = await props.searchParams;

  // getting the subcategories
  const subcategories = await getSubcategories();

  const mainquery = searchParams?.mainquery || '';
  const currentPage = Number(searchParams?.page) || 1;

  const products = await fetchFilteredProducts(mainquery, currentPage);

  return (
    <>
      <MainQueryProduct products={products} />
      <div className='flex justify-center items-center relative'>
        <FeedbackDialog
          text='Added sub-category successfully'
          params={searchParams?.subcategory_added}
        />
        <ManageSubCategoryForm subcategories={subcategories} />
      </div>
    </>
  )
}