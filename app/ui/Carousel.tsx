'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductWithImages } from '../lib/types';
import { useState } from 'react';

export default function Carousel({
  product,
  width,
  height,
}: {
  product: ProductWithImages;
  width?: string;
  height?: string;
}) {
  // serve to identify the product image url
  const [currentIndex, setCurrentIndex] = useState(0);

  // carousel button controller to iterate in a circular way
  const prevImage = (product: ProductWithImages) => {
    setCurrentIndex(
      (prev) => (prev - 1 + product.urls.length) % product.urls.length
    );
  };

  const nextImage = (product: ProductWithImages) => {
    setCurrentIndex((prev) => (prev + 1) % product.urls.length);
  };

  return (
    <div id='carousel-wrapper' className='relative overflow-hidden'>
      <div
        className={`flex transition-transform duration-500 relative ${height} ${width}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {product.urls.map((url, i) => (
          <img
            key={i}
            src={url}
            className={`w-full flex-shrink-0 object-cover`}
          />
        ))}
      </div>

      <button
        id='swipe-left-button'
        aria-label='swipe-left-button'
        className='absolute z-2 top-0 rounded-tl-2xl flex items-center justify-center hover:backdrop-blur-3xl hover:cursor-pointer left-0 text-neutral-800 hover:border-r-1 border-neutral-400 h-full active:text-yellow-600 transition-all'
        onClick={() => prevImage(product)}
      >
        <ChevronLeft />
      </button>

      <button
        id='swipe-right-button'
        aria-label='swipe-right-button'
        className='absolute z-2 top-0 rounded-tr-2xl  flex items-center justify-center hover:backdrop-blur-3xl hover:cursor-pointer right-0 text-neutral-800 hover:border-l-1 border-neutral-400 h-full active:text-yellow-600 transition-all'
        onClick={() => nextImage(product)}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
