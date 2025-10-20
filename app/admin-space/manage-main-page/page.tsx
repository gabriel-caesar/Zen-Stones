import {
  fetchCollectionProducts,
  fetchFeaturedProducts,
  fetchSearchedProducts,
} from '@/app/lib/data';
import FeedbackDialog from '@/app/ui/adminspace/FeedbackDialog';
import FeaturedProducts from '@/app/ui/manage-main-page/FeaturedProducts';
import FeaturedSearch from '@/app/ui/manage-main-page/FeaturedSearch';
import FeaturedCollection from '@/app/ui/manage-main-page/FeaturedCollection';
import MainQueryProduct from '@/app/ui/navbar/MainQueryProduct';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Main Page',
};

export default async function ManageMainPage(props: {
  searchParams: Promise<{
    query?: string;
    page?: string;
    feature?: string;
    unfeature?: string;
    type_featured?: string;
    mainquery?: string;
    added_collection?: string;
    removed_collection?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const mainquery = searchParams?.mainquery || '';
  const feature = searchParams?.feature;
  const unfeature = searchParams?.unfeature;
  const type_featured = searchParams?.type_featured;
  const added_collection = searchParams?.added_collection;
  const removed_collection = searchParams?.removed_collection;

  // fetching all required products for the children components
  const products = await fetchSearchedProducts(query, currentPage);
  const featuredProducts = await fetchFeaturedProducts();
  const collectionProducts = await fetchCollectionProducts();

  // making the search bar work
  const mainQueryProducts = await fetchSearchedProducts(mainquery, currentPage);

  return (
    <>
      <MainQueryProduct products={mainQueryProducts} query={mainquery} />
      <div
        id='manage-main-page-wrapper'
        className='
        lg:flex-row lg:items-start
        w-full flex flex-col items-center justify-center py-10 
      '
      >
        <FeedbackDialog
          text={
            feature
              ? 'Product is featured succesfully'
              : unfeature
              ? 'Unfeatured product succesfully'
              : type_featured
              ? 'Type featured succesfully'
              : added_collection 
              ? 'Added product to collection succesfully'
              : removed_collection
              ? 'Removed product from collection succesfully'
              : ''
          }
          params={
            feature
              ? feature
              : unfeature
              ? unfeature
              : type_featured 
              ? type_featured
              : added_collection
              ? added_collection
              : removed_collection && removed_collection
          }
        />

        <div
          id='wrapper-search'
          className='flex items-center justify-center w-full'
        >
          <FeaturedSearch products={products} featuredProducts={featuredProducts} query={query} />
        </div>

        <div
          id='wrapper-products-types'
          className='flex items-center justify-center flex-col w-full'
        >
          <FeaturedProducts featuredProducts={featuredProducts} />
          <FeaturedCollection collectionProducts={collectionProducts} />
        </div>
      </div>
    </>
  );
}
