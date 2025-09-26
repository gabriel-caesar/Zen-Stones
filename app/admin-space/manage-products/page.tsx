import AddProductForm from '@/app/ui/adminspace/AddProductForm';
import SearchProduct from '@/app/ui/adminspace/SearchProduct';

export default function ManageProducts() {
  return (
    <div className='flex flex-col justify-center items-center lg:flex-row lg:items-start lg:mb-10'>
      <AddProductForm />
      <SearchProduct />
    </div>
  )
}