import Link from 'next/link';
import Carousel from '../Carousel';
import { ImageSkeleton } from '../skeletons/ImageSkeleton';
import { ProductWithImages } from '@/app/lib/types';

export default function FeaturedCard({
  featuredProducts,
}: {
  featuredProducts: ProductWithImages[];
}) {
  return featuredProducts.map((product) => (
    <div
      key={product.id}
      className='
        overflow-hidden group hover:shadow-xl transition-all duration-300 
        rounded-2xl border-1 border-neutral-300 md:w-1/2 lg:w-3/4 shadow-md lg:h-160
      '
      id='featured-product-card'
      aria-label='featured-product-card'
    >
      <div className='flex flex-col'>
        <div className='relative md:w-full  overflow-hidden' id='featured-bubble-and-price-wrapper'>
          <Carousel product={product} height='lg:max-h-70' />
          <div className='absolute top-3 left-3'>
            <div className='bg-gradient-to-r px-2 text-sm rounded-md from-yellow-500 to-orange-500 text-white border-0'>
              Featured
            </div>
          </div>

           <div
            className='flex items-center justify-between absolute right-3 top-3'
            id='product-price-container'
          >
            <span
              className='text-md font-light bg-black/70 text-white rounded px-3 py-1'
              id='product-price'
              aria-label='product-price'
            >
              ${product.price.toLocaleString()}
            </span>
          </div>
        </div>

        <div className='lg:w-full p-6 flex flex-col justify-center'>
          <div className='mb-4'>
            <h3 className='text-2xl mb-2'>{product.name}</h3>
            <p className='mb-3 text-neutral-500'>
              {product.category} • {product.product_type}
            </p>
            <p className='text-sm mb-4 line-clamp-3'>{product.description}</p>
          </div>

          <div className='flex flex-wrap gap-2 mb-4'>
            {product.indicated_for.slice(0, 3).map((property, propIndex) => (
              <div
                key={propIndex}
                className='text-xs rounded-lg bg-neutral-200 py-1 px-2'
              >
                {property}
              </div>
            ))}
          </div>

          <div
            id='price-weight-container'
            className='flex items-center justify-between w-full mb-4'
          >
            <div className='text-xs py-1 px-2 border-1 border-neutral-400 rounded-lg'>
              Weight: {product.weight}
            </div>
            <div className='text-xs py-1 px-2 border-1 border-neutral-400 rounded-lg'>
              Size: {product.size}
            </div>
          </div>

          <Link
            className='w-full rounded-lg text-center bg-black text-white py-2 hover:cursor-pointer hover:bg-black/60 transition-all'
            id='view-details-button'
            aria-label='view-details-button'
            href={`/product/${product.id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  ));
}
