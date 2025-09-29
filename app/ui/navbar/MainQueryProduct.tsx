'use client';

import { ProductWithImages } from '@/app/types/types';
import { useWrapperContext } from '../LayoutWrapper';
import ProductCard from '../ProductCard';

export default function MainQueryProduct({
  products,
}: {
  products: ProductWithImages[];
}) {

  const { searchFocus } = useWrapperContext();

  return (
    <div
      className={`
        ${searchFocus ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        rounded-b-lg p-2 bg-neutral-300 z-6 max-h-3/4 fixed transition-all duration-500
        flex flex-wrap items-center justify-center w-full gap-8 overflow-auto
      `}
      id='main-query-product-container'
    >
      {products && products.length > 0 ? (
        products.map(product => {
          return (
            <div
              key={product.id}
              className='rounded-2xl bg-white border-1 border-neutral-400 shadow-md w-full md:w-1/3 relative overflow-hidden mb-3'
            >

            {/* Product item card */}
            <ProductCard product={product} />

            {/* Button wrapper to delete or edit product */}
            <div
              className='flex flex-col my-3 px-2'
              id='buttons-wrapper'
            >
              <button
                className='rounded-lg bg-black text-white py-1 hover:cursor-pointer hover:bg-black/60 transition-all'
              >
                View details
              </button>
            </div>
            </div>
          )
        })
      ) : (
        <p className='text-2xl font-light w-full text-center'>
          Search our catalog
        </p>
      )}
    </div>
  );
}