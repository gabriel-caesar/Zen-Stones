import { Heart, ShoppingCart, Star } from 'lucide-react';
import { ImageSkeleton } from '../skeletons/ImageSkeleton';
import { Gemstone } from '@/app/types/gemstone';

interface GemstoneCardProps {
  gemstone: Gemstone;
  onAddToCart?: (gemstone: Gemstone) => void;
  onToggleFavorite?: (gemstone: Gemstone) => void;
}

export function GemstoneCard({
  gemstone,
  onAddToCart,
  onToggleFavorite,
}: GemstoneCardProps) {
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
    <div
      className='group overflow-hidden rounded-lg border-1 border-neutral-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
      id='gemstone-card-container'
      aria-label='gemstone-card-container'
    >
      <div className='relative overflow-hidden'>
        <div
          id='product-image-wrapper'
          aria-label='product-image-wrapper'
          className='w-full relative h-64 object-cover group-hover:scale-105 transition-transform duration-300'
        >
          <ImageSkeleton
            src={gemstone.imageUrl}
            alt={gemstone.name}
            className='object-cover'
          />
        </div>

        {/* Overlay with quick actions */}
        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <div className='flex gap-2'>
            <button
              className='bg-white/90 rounded-md p-2 hover:cursor-pointer hover:bg-black hover:text-white transition-all'
              onClick={() => onToggleFavorite?.(gemstone)}
            >
              <Heart size={20} />
            </button>
            <button
              className='bg-white/90 rounded-md p-2 hover:cursor-pointer hover:bg-black hover:text-white transition-all'
              onClick={() => onAddToCart?.(gemstone)}
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>

        {/* Rarity badge */}
        <div className='absolute top-3 left-3'>
          <div
            className={`${getRarityColor(
              gemstone.rarity
            )} text-white text-[12px] font-bold border-0 rounded-md px-2`}
          >
            {gemstone.rarity}
          </div>
        </div>

        {/* Price tag */}
        <div className='absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded'>
          <span className='text-sm'>${gemstone.price.toLocaleString()}</span>
        </div>
      </div>

      <div
        className='pb-3 px-6 my-10'
        id='card-name-origin-container'
        aria-label='card-name-origin-container'
      >
        <div className='flex items-start justify-between'>
          <div>
            <h1 className='text-lg'>{gemstone.name}</h1>
            <p className='text-sm text-neutral-500'>
              {gemstone.color} • {gemstone.origin}
            </p>
          </div>
          <div className='flex items-center gap-1'>
            <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
            <span className='text-sm'>{gemstone.hardness}</span>
          </div>
        </div>
      </div>

      <div 
        id='card-description-container'
        aria-label='card-description-container'
        className='px-6 mb-6'
      >
        <p className='text-sm text-neutral-500 mb-3 line-clamp-2'>
          {gemstone.description}
        </p>

        <div className='flex flex-wrap gap-1'>
          {gemstone.properties.slice(0, 2).map((property, index) => (
            <div key={index} className='text-xs rounded-lg bg-neutral-200 py-1 px-2'>
              {property}
            </div>
          ))}
        </div>

        <div className='flex items-center justify-between text-sm text-neutral-500 mt-3 mb-6'>
          <span>Type: {gemstone.type}</span>
          {gemstone.carat && <span>{gemstone.carat} ct</span>}
        </div>
        <button
          className='w-full rounded-lg bg-black text-white py-2 hover:cursor-pointer hover:bg-black/60 transition-all'
          onClick={() => onAddToCart?.(gemstone)}
        >
          Add to Collection
        </button>
      </div>

    </div>
  );
}
