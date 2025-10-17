'use client';

import { ProductWithImages } from '../lib/types';
import { getRarityColor } from '../lib/utils';
import Carousel from './Carousel';

export default function ProductCard({
  product,
  isQuery,
}: {
  product: ProductWithImages;
  isQuery?: boolean;
}) {
  return (
    <>
      {/* Carousel image slider */}
      <Carousel
        product={product}
        height={`h-[272px] ${isQuery && 'md:border-b-1'}`}
      />

      {/* Rarity badge */}
      <div className='absolute z-3 top-3 left-3'>
        <div
          className={`${getRarityColor(
            product.rarity
          )} text-white text-[12px] font-bold border-0 rounded-md px-2`}
        >
          {product.featured_material}
        </div>
      </div>

      {/* Price tag */}
      <div
        className='
          md:left-3 md:w-fit md:right-0 md:top-10
          absolute top-3 z-3 right-3 bg-black/70 text-white px-2 py-1 rounded
        '
      >
        <span className='text-sm'>${product.price}</span>
      </div>

      {/* Card features */}
      <div
        id='card-features-wrapper'
        className={`p-2 ${isQuery && 'md:border-b-1 md:border-l-1'}`}
      >
        {/* Product name */}
        <div className='flex flex-wrap items-center justify-between w-full mb-5 pr-2'>
          <h1 className='text-lg md:text-xl mr-2' aria-label='product-name'>
            {product.name}
          </h1>
          <p className='text-sm text-neutral-500'>{product.category}</p>
        </div>

        {/* Product description */}
        <p
          className={`${
            isQuery ? 'hidden' : 'block'
          } text-neutral-500 text-sm max-h-20 overflow-y-auto mb-5 break-all`}
          aria-label={`${product.name}-description`}
        >
          {product.description}
        </p>

        {/* Product properties */}
        {isQuery ? (
          <div id='properties-wrapper'>
            <h2 className='ml-1 text-sm text-neutral-500'>Properties</h2>
            <div className={`flex mb-3 gap-1 ${isQuery ? 'p-1 border-1 rounded-lg border-neutral-300' : 'px-1'}`} id='properties-wrapper'>
              {product.properties.slice(0, 2).map((prop, index) => {
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
              <div id='etc-container'>...</div>
            </div>
          </div>
        ) : (
          <div className='flex mb-3 gap-1 px-1' id='properties-wrapper'>
            {product.properties.slice(0, 2).map((prop, index) => {
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
        )}

        {/* Product indications */}
        {isQuery && (
          <div id='indications-wrapper'>
            <h2 className='ml-1 text-sm text-neutral-500'>Indications</h2>
            <div
              className='flex mb-3 gap-1 p-1 border-1 rounded-lg border-neutral-300'
              id='properties-wrapper'
            >
              {product.indicated_for.slice(0, 2).map((prop, index) => {
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
              <div id='etc-container'>...</div>
            </div>
          </div>
        )}

        {/* Product sub-category (type) and weight wrapper */}
        <div
          className={`${
            isQuery ? 'hidden' : 'flex'
          } items-center justify-between px-2 text-sm text-gray-500`}
          id='subcategory-weight-wrapper'
        >
          <p>Type: {product.product_type}</p>
          <p>{product.weight}</p>
        </div>
      </div>
    </>
  );
}
