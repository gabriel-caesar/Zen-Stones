'use client';

import { ProductWithImages } from '@/app/lib/types';
import { useWrapperContext } from '../LayoutWrapper';
import ProductCard from '../ProductCard';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function MainQueryProduct({
  products,
  query,
}: {
  products: ProductWithImages[];
  query: string;
}) {
  const { setSearchFocus, searchFocus, setOpenSearchForm } =
    useWrapperContext();

  return (
    <div
      className={`
        ${searchFocus ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        rounded-b-lg p-2 bg-neutral-300 z-6 max-h-3/4 fixed transition-all duration-500
        w-full overflow-auto
      `}
      id='main-query-product-container'
    >
      <div 
        className={`
          flex flex-col items-center justify-center mb-12
          ${products && products.length > 0 || query !== '' ? 'flex' : 'hidden'}  
        `}
        id='query-title-container'
        aria-label='query-title-container'
      >
        <h1 className='font-bold text-xl text-center min-[2000px]:text-3xl'>
          Results for:
        </h1>

        <p className='text-neutral-600 flex items-center justify-center text-center min-[2000px]:text-2xl'>
          <Search strokeWidth={1.5}  size={16} className='mr-2 min-[2000px]:scale-150 min-[2000px]:mr-4'/>
          {query}
        </p>
      </div>

      <div 
        className={`
          ${products.length <= 0 ? (
            'flex items-center justify-center'
          ) : (
            'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-8'
          )}
          w-full overflow-auto
        `}
      >
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <div
                key={product.id}
                className='rounded-2xl bg-white border-1 border-neutral-400 shadow-md w-full pb-3 relative overflow-hidden'
              >
                
                {/* Product item card */}
                <div className='md:flex md:flex-col '>
                  <ProductCard product={product} isQuery={true} />
                </div>

                {/* Button wrapper */}
                <div className='flex flex-col px-2' id='buttons-wrapper'>
                  <Link
                    href={`/product/${product.id}`}
                    className='flex justify-center items-center rounded-lg bg-black text-white py-1 hover:cursor-pointer hover:brightness-60 active:brightness-50 transition-all'
                    onClick={() => {
                      setOpenSearchForm(false);
                      setSearchFocus(false);
                    }}
                  >
                    View details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-2xl font-light w-full text-center'>
            Search our catalog
          </p>
        )}
      </div>
      
    </div>
  );
}
