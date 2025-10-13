import { ArrowRight, Sparkles } from 'lucide-react';
import { ImageSkeleton } from '../skeletons/ImageSkeleton';
import Link from 'next/link';

export default function Hero() {
  // compacted image objects for the Hero's grid
  const featuredImages = [
    {
      url: '/azurite-ring-hero.jpg',
      className: 'hidden',
      col: 1,
      row: 1,
    },
    {
      url: '/buddha-statue-hero.jpg',
      col: 2,
      row: 1,
    },
    {
      url: '/jade-donut-necklace.jpg',
      col: 3,
      row: 1,
    },
    {
      url: '/flowers-stones-hero.jpg',
      col: 1,
      row: 2,
    },
    {
      url: '/chakra-candles-hero.jpg',
      className: 'hidden',
      col: 2,
      row: 2,
    },
    {
      url: '/sterling-purple-necklace.jpg',
      col: 3,
      row: 2,
    },
  ];

  return (
    <section className='relative min-h-[700px] flex items-center justify-center overflow-hidden'>
      {/* Background Image */}
      <div className='absolute grid grid-cols-2 md:grid-cols-3 auto-rows-fr gap-2 grid-flow-row-dense p-1 inset-0 z-0'>
        {featuredImages.map((img, index) => {
          return (
            <div
              key={index}
              className={`${img.className} md:block relative w-full h-full col-span-${img.col} row-span-${img.row}`}
            >
              <ImageSkeleton
                src={img.url}
                alt='Luxury gemstones'
                className='object-cover rounded-md'
              />
            </div>
          );
        })}
      </div>

      {/* Shade to reduce the featured images brightness */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className='relative z-1 text-center text-white px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6'>
            <Sparkles className='h-4 w-4' />
            <span className='text-sm'>Discover Rare & Precious Stones</span>
          </div>

          <h1 className='text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight'>
            Exquisite Products
            <span className='block text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text'>
              For All Energies
            </span>
          </h1>

          <p className='text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto'>
            Discover our curated collection of the world's finest jewelry, gemstones 
            and metaphysical accessories. Each product carefully selected for its
            exceptional beauty and energy.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link
              id='explore-button'
              aria-label='explore-button'
              className='flex items-center justify-center bg-white text-black hover:bg-neutral-400 hover:cursor-pointer rounded-md py-2 px-4 transition-all'
              href={'/catalog'}
            >
              Explore Collection
              <ArrowRight strokeWidth={2} size={16} className='ml-2 mt-1' />
            </Link>
            <Link
              className='border-white bg-black border-1 text-white hover:bg-neutral-400 hover:text-black hover:cursor-pointer py-2 px-4 transition-all rounded-md'
              id='learn-more-button'
              aria-label='learn-more-button'
              href={'/about'}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className='absolute top-20 left-10 animate-bounce'>
        <div className='w-3 h-3 bg-yellow-400 rounded-full opacity-70' />
      </div>
      <div className='absolute top-40 right-16 animate-bounce delay-150'>
        <div className='w-2 h-2 bg-pink-500 rounded-full opacity-60' />
      </div>
      <div className='absolute bottom-20 left-20 animate-bounce delay-300'>
        <div className='w-4 h-4 bg-purple-500 rounded-full opacity-50' />
      </div>
    </section>
  );
}
