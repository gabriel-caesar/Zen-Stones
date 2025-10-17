'use client';

import { ProductWithImages } from '@/app/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SetStateAction } from 'react';

// main difference between the regular carousel is that this
// component centralizes one state to control both carousel and gallery
export default function CarouselWithGallery({
  product,
  width,
  height,
  currentIndex,
  setCurrentIndex,
}: {
  product: ProductWithImages;
  width?: string;
  height?: string;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<SetStateAction<number>>
}) {

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
