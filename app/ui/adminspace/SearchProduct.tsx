import { PackageSearch } from 'lucide-react';
import SearchBarAdmin from './SearchBarAdmin';

export default function SearchProduct() {
  return (
    <form action="" className='rounded-lg shadow-xl p-2 bg-neutral-200 md:w-1/2 lg:w-2/5 w-11/12 my-10 relative'>
      <div className='flex flex-col mb-5'>
        <h1 className='flex font-bold mb-8 lg:text-lg'>
          <PackageSearch className='mr-2' />
          Search to edit or delete product
        </h1>
        <SearchBarAdmin />
      </div>
    </form>
  )
}