'use server';

import {
  fetchFeaturedProducts,
  fetchFeaturedType,
  fetchSearchedProducts,
  fetchTypes,
} from '@/app/lib/data';
import FeedbackDialog from '@/app/ui/adminspace/FeedbackDialog';
import FeaturedProducts from '@/app/ui/manage-main-page/FeaturedProducts';
import FeaturedSearch from '@/app/ui/manage-main-page/FeaturedSearch';
import FeaturedType from '@/app/ui/manage-main-page/FeaturedType';
import MainQueryProduct from '@/app/ui/navbar/MainQueryProduct';

export default async function ManageMainPage(props: {
  searchParams: Promise<{
    query?: string;
    page?: string;
    feature?: string;
    unfeature?: string;
    type_featured?: string;
    mainquery?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const mainquery = searchParams?.mainquery || '';
  const feature = searchParams?.feature;
  const unfeature = searchParams?.unfeature;
  const type_featured = searchParams?.type_featured;

  const products = await fetchSearchedProducts(query, currentPage);
  const featuredProducts = await fetchFeaturedProducts();
  const types = await fetchFeaturedType();

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
              : ''
          }
          params={
            feature
              ? feature
              : unfeature
              ? unfeature
              : type_featured && type_featured
          }
        />

        <div
          id='wrapper-search'
          className='flex items-center justify-center w-full'
        >
          <FeaturedSearch products={products} featuredProducts={featuredProducts} />
        </div>

        <div
          id='wrapper-products-types'
          className='flex items-center justify-center flex-col w-full'
        >
          <FeaturedProducts featuredProducts={featuredProducts} />
          <FeaturedType types={types} />
        </div>
      </div>
    </>
  );
}
