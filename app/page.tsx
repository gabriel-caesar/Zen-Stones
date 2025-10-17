'use server'

import { fetchCollectionProducts, fetchFeaturedProducts, fetchSearchedProducts } from './lib/data';
import { FeaturedSection } from './ui/home/FeaturedSection';
import { FeaturedGallery } from './ui/home/FeaturedGallery';
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

  const products = await fetchSearchedProducts(mainquery, currentPage);
  const collectionProducts = await fetchCollectionProducts();

  const featuredProducts = await fetchFeaturedProducts();

  return (
    <div className='relative'>
      <MainQueryProduct products={products} query={mainquery} />
      <Hero />
      <FeaturedSection featuredProducts={featuredProducts} />
      <FeaturedGallery collectionProducts={collectionProducts} />
    </div>
  )
}