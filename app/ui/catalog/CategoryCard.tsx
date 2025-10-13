'use client';

import { ProductWithImages } from '@/app/types/types';
import { getRarityColor } from '@/app/lib/utils';
import Carousel from '../Carousel';

export default function CategoryCard({
  product,
}: {
  product: ProductWithImages;
}) {

  return (
    <>
      {/* Carousel image slider */}
      <Carousel product={product} height='h-[156px] lg:h-[250px]' />

      {/* Featured material badge */}
      <div className='absolute z-3 top-3 left-3'>
        <div
          className={`${getRarityColor(
            product.rarity
          )} text-white text-[12px] font-bold border-0 rounded-md px-2`}
        >
          {product.featured_material}
        </div>
      </div>

      <div id='card-features-wrapper' className='p-2'>
        {/* Product name */}
        <div className='flex flex-col flex-wrap items-start justify-between w-full mb-5 pr-2'>
          <h1 className='text-lg md:text-2xl mr-2' aria-label='product-name'>
            {product.name}
          </h1>
          <p className='text-sm mb-2 text-neutral-500'>{product.category}</p>
          {/* Price tag */}
          <div className='bg-black/70 text-white px-2 py-1 rounded'>
            <span className='text-sm'>${product.price}</span>
          </div>
        </div>

        {/* Product Indications */}
        <p className='text-sm text-neutral-500 ml-1 md:hidden lg:block'>
            Indications
          </p>  
        <div 
          className='md:hidden lg:flex flex mb-3 gap-1 px-1 flex-wrap max-h-[72px] overflow-auto rounded-lg border-1 border-neutral-300 p-2' 
          id='properties-wrapper'
        >
          
          {product.indicated_for.map((prop, index) => {
            return (
              <div
                key={index}
                className='text-xs rounded-lg bg-neutral-200 py-1 px-2 font-bold text-black'
                aria-label={`${prop}-tag`}
              >
                {prop}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
