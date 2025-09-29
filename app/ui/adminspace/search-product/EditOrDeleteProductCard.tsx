'use client'

import { ProductWithImages } from '@/app/types/types';
import ProductCard from '../../ProductCard';

export default function EditOrDeleteProductCard({
  products,
}: {
  products: ProductWithImages[];
}) {

  return (
    <div className='rounded-lg' id='product-card-wrapper'>
      {products.map((product) => {
        return (
          <div 
            key={product.id}
            className='rounded-2xl bg-white border-1 border-neutral-400 shadow-md lg:w-full relative overflow-hidden mb-3'
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
                Edit
              </button>

              <button
                className='rounded-lg bg-red-600 text-white py-1 mt-2 hover:cursor-pointer hover:bg-black/60 transition-all'
              >
                Delete
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
}
