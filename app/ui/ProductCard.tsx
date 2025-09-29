'use client';

import { useState } from 'react';
import { ProductWithImages } from '../types/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductCard({
  product,
}: {
  product: ProductWithImages;
}) {
  // serve to identify the product image url
  const [currentIndex, setCurrentIndex] = useState(0);

  // carousel button controller to iterate in a circular way
  const prevImage = (product: ProductWithImages) =>
    setCurrentIndex(
      (prev) => (prev - 1 + product.urls.length) % product.urls.length
    );
  const nextImage = (product: ProductWithImages) =>
    setCurrentIndex((prev) => (prev + 1) % product.urls.length);

  // get rarity color for the card rarity badge
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
    <>
      <div id='carousel-wrapper' className='relative overflow-hidden'>
        <button
          id='swipe-left-button'
          aria-label='swipe-left-button'
          className='absolute z-2 top-0 rounded-tl-2xl flex items-center justify-center hover:backdrop-blur-3xl hover:cursor-pointer left-0 text-neutral-800 hover:border-r-1 border-neutral-400 h-full transition-all'
          onClick={() => prevImage(product)}
        >
          <ChevronLeft />
        </button>

        <button
          id='swipe-right-button'
          aria-label='swipe-right-button'
          className='absolute z-2 top-0 rounded-tr-2xl  flex items-center justify-center hover:backdrop-blur-3xl hover:cursor-pointer right-0 text-neutral-800 hover:border-l-1 border-neutral-400 h-full transition-all'
          onClick={() => nextImage(product)}
        >
          <ChevronRight />
        </button>
        <div
          className='flex transition-transform duration-500 relative'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {product.urls.map((url, i) => (
            <img
              key={i}
              src={url}
              className='w-full flex-shrink-0 h-50 object-cover'
            />
          ))}
        </div>
      </div>

      {/* Rarity badge */}
      <div className='absolute z-3 top-3 left-3'>
        <div
          className={`${getRarityColor(
            product.rarity
          )} text-white text-[12px] font-bold border-0 rounded-md px-2`}
        >
          {product.rarity}
        </div>
      </div>

      {/* Price tag */}
      <div className='absolute top-3 z-3 right-3 bg-black/70 text-white px-2 py-1 rounded'>
        <span className='text-sm'>${product.price}</span>
      </div>

      <div id='card-features-wrapper' className='p-2'>
        {/* Product name */}
        <div className='flex items-center justify-between w-full mb-5 pr-2'>
          <h1 className='text-2xl ' aria-label='product-name'>
            {product.name}
          </h1>
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
        <div className='flex mb-3 gap-1 px-1 flex-wrap' id='properties-wrapper'>
          {product.properties.map((prop, index) => {
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

        {/* Product sub-category (type) and weight wrapper */}
        <div
          className='flex items-center justify-between px-2 text-sm text-gray-500'
          id='subcategory-weight-wrapper'
        >
          <p>Type: {product.subcategory}</p>
          <p>{product.weight} g</p>
        </div>
      </div>
    </>
  );
}
