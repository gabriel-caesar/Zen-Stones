'use client'

import SearchBarAdmin from './SearchBarAdmin';
import EditOrDeleteProductCard from './EditOrDeleteProductCard';
import { ProductWithImages } from '@/app/lib/types';
import { PackageSearch } from 'lucide-react';

export default function SearchProduct({
  products
}: {
  products:ProductWithImages[]
}) {

  return (
    <div className='rounded-lg shadow-xl p-2 bg-neutral-200 md:w-1/2 lg:w-1/3 w-11/12 mt-10 relative'>
      <div className='flex flex-col mb-5'>
        <h1 className='flex font-bold mb-8 lg:text-lg'>
          <PackageSearch className='mr-2' />
          Search to edit or delete product
        </h1>
        <SearchBarAdmin />
      </div>
      
      <div 
        className='flex flex-col items-center justify-start gap-2 max-h-230 pr-2 overflow-y-auto'
        id='product-cards-container'
      >
        <EditOrDeleteProductCard products={products} />
      </div>
    </div>
  );
}
