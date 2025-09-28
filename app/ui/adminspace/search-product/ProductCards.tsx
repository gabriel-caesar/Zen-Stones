'use client'

import { ProductWithImages } from '@/app/types/types';

export default function ProductCards({
  products,
}: {
  products: ProductWithImages[];
}) {
  

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'Very Rare':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Rare':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Uncommon':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  return (
    <div className='rounded-lg' id='product-card-wrapper'>
      {products.map((product) => {
        return (
          <div 
            key={product.id}
            className='rounded-2xl bg-white border-1 border-neutral-400 shadow-md lg:w-full relative overflow-hidden mb-3'
          >

            {/* Product image */}
            <img 
              src={product.urls[0]}
              alt='product-image' 
              aria-label='product-image' 
              className='object-cover w-full h-50'
            />  

            {/* Rarity badge */}
            <div className='absolute top-3 left-3'>
              <div
                className={`${getRarityColor(
                  product.rarity
                )} text-white text-[12px] font-bold border-0 rounded-md px-2`}
              >
                {product.rarity}
              </div>
            </div>

            {/* Price tag */}
            <div className='absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded'>
              <span className='text-sm'>${product.price}</span>
            </div>

            <div
              id='card-features-wrapper'
              className='p-2'
            >
              {/* Product name */}
              <div className='flex items-center justify-between w-full mb-5 pr-2'>
                <h1 className='text-2xl ' aria-label='product-name'>{product.name}</h1>
                <p className='text-sm text-neutral-500'>{product.category}</p>
              </div>

              {/* Product description */}
              <p 
                className='text-neutral-500 text-sm max-h-20 overflow-y-auto mb-5'
                aria-label={`${product.name}-description`}
              >
                {product.description}
              </p>

              {/* Product properties */}
              <div
                className='flex mb-3 gap-1 px-1 flex-wrap'
                id='properties-wrapper'
              >
                {product.properties.map((prop, index) => {
                  return (
                    <div
                      key={index}
                      className='text-xs rounded-lg bg-neutral-200 py-1 px-2 font-bold text-black'
                      aria-label={`${prop}-tag`}
                    >
                      {prop}
                    </div>
                  )
                })}
              </div>

              {/* Product sub-category (type) and weight wrapper */}
              <div
                className='flex items-center justify-between px-2 text-sm text-gray-500'
                id='subcategory-weight-wrapper'
              >
                <p>
                  Type: {product.subcategory}
                </p>
                <p>
                  {product.weight} g
                </p>
              </div>
            </div>

            <div
              className='flex flex-col my-3 px-2'
              id='buttons-wrapper'
            >
              <button
                className='rounded-lg bg-black text-white py-1'
              >
                Edit
              </button>

              <button
                className='rounded-lg bg-red-600 text-white py-1 mt-2'
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
