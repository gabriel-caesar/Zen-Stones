'use client'

import { ProductWithImages } from '@/app/lib/types';
import { useState } from 'react';
import CarouselWithGallery from './CarouselWithGallery';

export default function ProductPageCarousel({ product } : { product:ProductWithImages }) {

  // syncs the carousel images with the gallery images
  const [imageIndex, setImageIndex] = useState<number>(0);

  return (
    <>
      <div className='md:rounded-2xl overflow-hidden md:shadow-md'>
        <CarouselWithGallery 
          product={product} 
          width='w-full'
          currentIndex={imageIndex}
          setCurrentIndex={setImageIndex}
        />
      </div> 

      <div
        id='product-images-gallery'
        className='
          md:justify-center md:opacity-100 md:pointer-events-auto md:static
          overflow-hidden w-full h-40 flex gap-2 py-2 opacity-0 pointer-events-none absolute
        '
      >
        {product.urls.map((url, i) => (
          <img
            key={i}
            src={url}
            className={`${imageIndex === i ? 'border-yellow-400' : 'border-transparent'} border-2 w-30 flex-shrink-0 object-cover rounded-2xl shadow-md transition-all hover:cursor-pointer hover:brightness-80 hover:border-yellow-800`}
            onClick={() => {setImageIndex(i)}}
          />
        ))}
      </div>
    </>
  )
}