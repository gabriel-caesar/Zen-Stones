import { FeaturedSection } from './ui/home/FeaturedSection';
import { gemstones } from './data/dummy-gemstones';
import Hero from './ui/home/Hero';
import { GemstoneGallery } from './ui/home/GemstoneGallery';

export default function Home() {

  // Get featured gemstones (legendary and very rare)
  const featuredGemstones = gemstones.filter(gem => 
    gem.rarity === 'Legendary' || gem.rarity === 'Very Rare'
  );

  return (
    <>
      <Hero />
      <FeaturedSection featuredGemstones={featuredGemstones} />
      <GemstoneGallery gemstones={gemstones} />
    </>
  )
}