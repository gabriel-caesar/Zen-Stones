'use server'

import { fetchFilteredProducts } from './lib/data';
import { FeaturedSection } from './ui/home/FeaturedSection';
import { GemstoneGallery } from './ui/home/GemstoneGallery';
import { gemstones } from './data/dummy-gemstones';
import MainQueryProduct from './ui/navbar/MainQueryProduct';
import Hero from './ui/home/Hero';

export default async function Home(props: {
  searchParams: Promise<{
    mainquery?: string,
    page?: number,
  }>
}) {

  const searchParams = await props.searchParams;
  const mainquery = searchParams?.mainquery || '';
  const currentPage = Number(searchParams?.page) || 1;

  const products = await fetchFilteredProducts(mainquery, currentPage);

  // Get featured gemstones (legendary and very rare)
  const featuredGemstones = gemstones.filter(gem => 
    gem.rarity === 'Legendary' || gem.rarity === 'Very Rare'
  );

  return (
    <div className='relative'>
      <MainQueryProduct products={products} />
      <Hero />
      <FeaturedSection featuredGemstones={featuredGemstones} />
      <GemstoneGallery gemstones={gemstones} />
    </div>
  )
}