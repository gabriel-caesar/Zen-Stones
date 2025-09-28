import { getSubcategories } from '@/app/lib/actions';
import FeedbackDialog from '@/app/ui/adminspace/FeedbackDialog';
import ManageSubCategoryForm from '@/app/ui/adminspace/ManageSubCategoryForm';

export default async function ManageSubCategories(props: {
  searchParams?: Promise<{
    subcategory_added?: string;
  }>;
}) {

  // awaiting the params to get the URL key/value pairs
  const searchParams = await props.searchParams;

  // getting the subcategories
  const subcategories = await getSubcategories();

  return (
    <div className='flex justify-center items-center relative'>
      <FeedbackDialog
        text='Added sub-category successfully'
        params={searchParams?.subcategory_added}
      />
      <ManageSubCategoryForm subcategories={subcategories} />
    </div>
  )
}