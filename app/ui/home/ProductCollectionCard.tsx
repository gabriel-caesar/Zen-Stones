import { ProductWithImages } from '@/app/lib/types';
import { getRarityColor } from '@/app/lib/utils';
import { Mail, Star } from 'lucide-react';
import Carousel from '../Carousel';
import Link from 'next/link';

export function ProductCollectionCard({
  collectionProducts,
}: {
  collectionProducts: ProductWithImages;
}) {
  return (
    <div
      className='
        group overflow-hidden rounded-lg border-1 border-neutral-300 hover:shadow-lg 
        transition-all duration-300 bg-yellow-100
      '
      id='collectionProducts-card-container'
      aria-label='collectionProducts-card-container'
    >
      <div className='relative overflow-hidden'>
        <div
          id='product-image-wrapper'
          aria-label='product-image-wrapper'
          className='w-full relative h-64 object-cover duration-300'
        >
          <Carousel
            product={collectionProducts}
            height='h-[250px]'
          />
        </div>

        {/* Overlay with quick action to inquiry for the product */}
        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center overflow-hidden pb-4'>
          <Link
            className='bg-white/90 rounded-md py-1 px-2 hover:cursor-pointer
            hover:bg-black hover:text-white flex items-center justify-center transition-all'
            id='inquiry-product-button'
            aria-label='inquiry-product-button'
            href={'/inquiry'}
          >
            Inquiry <Mail size={20} strokeWidth={1.5} className='ml-2' />
          </Link>
        </div>

        {/* Rarity badge */}
        <div className='absolute top-3 left-3'>
          <div
            className={`${getRarityColor(
              collectionProducts.rarity
            )} text-white text-[12px] font-bold border-0 rounded-md px-2`}
          >
            {collectionProducts.featured_material}
          </div>
        </div>

        {/* Price tag */}
        <div className='absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded'>
          <span className='text-sm'>
            ${collectionProducts.price.toLocaleString()}
          </span>
        </div>
      </div>

      <div
        className='my-3 px-2'
        id='card-name-origin-container'
        aria-label='card-name-origin-container'
      >
        <div className='flex items-start justify-between'>
          <div id='product-name-and-category-container'>
            <h1 className='text-lg'>{collectionProducts.name}</h1>
            <p className='text-sm text-neutral-600'>
              {collectionProducts.category} • {collectionProducts.product_type}
            </p>
          </div>

          <div className='flex items-center gap-1' id='star-container'>
            <Star
              className='h-4 w-4 fill-yellow-400 text-yellow-400'
              id='star-icon'
            />
            <p className='text-sm'>
              Featured
            </p>
          </div>
        </div>
      </div>

      <div
        id='card-specifications-container'
        aria-label='card-specifications-container'
        className='px-2 w-full'
      >
        <p
          className='text-sm text-neutral-600 mb-3 line-clamp-2'
          id='description-text-element'
          aria-label='product-description-text'
        >
          {collectionProducts.description}
        </p>

        <div className='flex flex-wrap gap-1' id='properties-container'>
          {collectionProducts.properties.slice(0, 2).map((property, index) => (
            <div
              id={`${property.toLowerCase()}-text`}
              aria-label={`${property.toLowerCase()}-text`}
              key={index}
              className='text-xs rounded-lg bg-white font-bold border-1 text-neutral-600 border-neutral-300 py-1 px-2'
            >
              {property}
            </div>
          ))}
        </div>

        <div
          className='flex items-center justify-between text-sm text-neutral-600 my-3'
          id='product-weight'
          aria-label='product-weight'
        >
          <span>Weight: {collectionProducts.weight}</span>
          <span>Size: {collectionProducts.size}</span>
        </div>
      </div>

      <div id="button-container" className='w-full justify-center items-center flex px-2'>
        <Link
          id='see-product-details-button'
          aria-label='see-product-details-button'
          className='w-full flex justify-center items-center text-center rounded-lg bg-black text-white py-2 hover:cursor-pointer hover:bg-black/60 transition-all my-4'
          href={`/product/${collectionProducts.id}`}
        >
          View details
        </Link>
      </div>

    </div>
  );
}
