import { Crown, Sparkles, Shield, Award } from 'lucide-react';
import { ImageSkeleton } from '../skeletons/ImageSkeleton';
import { Gemstone } from '@/app/types/gemstone';
import FeaturedCard from './FeaturedCard';

interface FeaturedSectionProps {
  featuredGemstones: Gemstone[];
}

export function FeaturedSection({ featuredGemstones }: FeaturedSectionProps) {
  const features = [
    {
      icon: Crown,
      title: 'Premium Quality',
      description:
        'Each gemstone is carefully selected and certified by expert gemologists',
    },
    {
      icon: Shield,
      title: 'Authenticity Guaranteed',
      description:
        'All our gemstones come with certificates of authenticity and detailed reports',
    },
    {
      icon: Sparkles,
      title: 'Exceptional Beauty',
      description:
        'Discover rare and unique gemstones with extraordinary color and clarity',
    },
    {
      icon: Award,
      title: 'Expert Curation',
      description:
        'Our collection is curated by gemstone experts with decades of experience',
    },
  ];

  return (
    <section 
      className='py-16 bg-muted/30'
      id='featured-section-container'
      aria-label='featured-section-container'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='text-center border-0 shadow-xl bg-background/50 backdrop-blur pb-6'
            >
              <div className='pt-6 flex flex-col items-center justify-center'>
                <span className='mb-6'>
                  <feature.icon size={50} />
                </span>
                <h3 className='mb-2'>{feature.title}</h3>
                <p className='text-sm text-neutral-500'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Gemstones */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl mb-4'>Featured Rarities</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Discover our most exceptional and sought-after gemstones, each
            representing the pinnacle of natural beauty and rarity.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <FeaturedCard featuredGemstones={featuredGemstones} />
        </div>

        {/* CTA */}
        <div className='text-center mt-12'>
          <button className='px-8 py-2 border-1 border-neutral-400 rounded-lg font-bold hover:cursor-pointer hover:bg-black hover:text-white transition-all'>
            Explore Full Collection
          </button>
        </div>
      </div>
    </section>
  );
}
