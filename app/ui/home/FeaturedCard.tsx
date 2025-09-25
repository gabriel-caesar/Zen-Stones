import { Gemstone } from '@/app/types/gemstone';
import { ImageSkeleton } from '../skeletons/ImageSkeleton';

export default function FeaturedCard({
  featuredGemstones,
}: {
  featuredGemstones: Gemstone[];
}) {
  return featuredGemstones.slice(0, 2).map((gemstone: Gemstone) => (
    <div
      key={gemstone.id}
      className='overflow-hidden group hover:shadow-xl transition-all duration-300 rounded-2xl border-1 border-neutral-300'
      id='featured-product-card'
      aria-label='featured-product-card'
    >
      <div className='flex flex-col lg:flex-row'>
        <div className='relative lg:w-1/2 h-64 lg:h-auto'>
          <ImageSkeleton
            src={gemstone.imageUrl}
            alt={gemstone.name}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute top-4 left-4'>
            <div className='bg-gradient-to-r px-4 rounded-md from-yellow-500 to-orange-500 text-white border-0'>
              Featured
            </div>
          </div>
        </div>

        <div className='lg:w-1/2 p-6 flex flex-col justify-center'>
          <div className='mb-4'>
            <h3 className='text-2xl mb-2'>{gemstone.name}</h3>
            <p className='mb-3 text-neutral-500'>
              {gemstone.origin} • {gemstone.carat} carat
            </p>
            <p className='text-sm mb-4 line-clamp-3'>{gemstone.description}</p>
          </div>

          <div className='flex flex-wrap gap-2 mb-4'>
            {gemstone.properties.slice(0, 3).map((property, propIndex) => (
              <div 
                key={propIndex}  
                className='text-xs rounded-lg bg-neutral-200 py-1 px-2'
              >
                {property}
              </div>
            ))}
          </div>

          <div className='flex items-center justify-between mb-4'>
            <span className='text-2xl'>${gemstone.price.toLocaleString()}</span>
            <div className='text-xs py-1 px-2 border-1 border-neutral-400 rounded-lg font-bold'>Hardness: {gemstone.hardness}</div>
          </div>

          <button 
            className='w-full rounded-lg bg-black text-white py-2 hover:cursor-pointer hover:bg-black/60 transition-all'
            id='view-details-button'
            aria-label='view-details-button'
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  ));
}
