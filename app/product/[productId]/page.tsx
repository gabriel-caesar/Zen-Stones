import { fetchSearchedProducts, fetchSingleItem } from '@/app/lib/data';
import { ProductWithImages } from '@/app/lib/types';
import MainQueryProduct from '@/app/ui/navbar/MainQueryProduct';
import Accordion from '@/app/ui/product-page/Accordion';
import DescriptionToggler from '@/app/ui/product-page/DescriptionToggler';
import ProductPageCarousel from '@/app/ui/product-page/ProductPageCarousel';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Product',
};

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams?: Promise<{
    mainquery?: string;
    page?: number;
  }>;
}) {
  // getting the product from db using the id contained in the url
  const awaitedProductId = await params;
  const productId = awaitedProductId.productId;
  const product: ProductWithImages = await fetchSingleItem(productId);

  // for the product search
  const awaitedSearchParams = await searchParams;
  const mainquery = awaitedSearchParams?.mainquery || '';
  const page = awaitedSearchParams?.page || 1;

  // making the search bar work
  const products = await fetchSearchedProducts(mainquery, page);

  return (
    <>
      <MainQueryProduct products={products} query={mainquery} />
      <div
        className='flex items-center justify-center w-full md:justify-normal lg:px-30 lg:py-6'
        id='product-page-wrapper'
      >
        {/* Product item page */}
        <div
          key={product.id}
          className='w-full md:w-full relative md:p-2 md:flex'
        >

          {/* Carousel and product images section */}
          <section
            id='carousel-and-images-section'
            className='md:mr-10 md:w-1/2'
          >
            {/* This component maintains the carousel in sync with the image gallery */}
            <ProductPageCarousel product={product} />
          </section>

          <section id='card-features-section' className='p-2 md:p-0 lg:w-3/4'>
            {/* Product name */}
            <div className='flex items-center justify-between w-full pr-2'>
              <h1 className='text-2xl md:text-2xl' aria-label='product-name'>
                {product.name}
              </h1>
              <p className='text-sm text-neutral-500 lg:text-lg'>{product.category}</p>
            </div>

            {/* Price tag */}
            <div className='mb-5 mt-2'>
              <span className='bg-black/70 text-white px-2 py-1 rounded'>${product.price}</span>
            </div>

            {/* For screens >= 1024px description and meaning become this component */}
            <DescriptionToggler product={product} />

            {/* Product description */}
            <Accordion
              text={'Description'}
              content={product.description}
              margin={'mb-3'}
              visibility='lg:hidden'
            />

            {/* Product meaning */}
            <Accordion
              text={'Meaning'}
              content={product.meaning}
              margin={'mb-3'}
              visibility='lg:hidden'
            />

            {/* Product indications */}
            <Accordion
              text={'Indicated for'}
              content={product.indicated_for}
              margin={'mb-3'}
              isArray={true}
              listTitle='Helps with:'
            />

            {/* Product indications */}
            <Accordion
              text={'Properties'}
              content={product.properties}
              margin={'mb-3'}
              isArray={true}
              listTitle='This item has:'
            />

            {/* Product materials */}
            <Accordion
              text={'Material'}
              content={product.material}
              margin={''}
              isArray={true}
              listTitle='This item is made out of:'
            />

            {/* Product specifications */}
            <div id='product-specifications-wrapper' className='flex md:flex-row flex-col border-t-1 pt-5'>
              
              {/* Product sub-category (type) and weight wrapper */}
              <div
                className='flex flex-col items-start w-full justify-center text-md'
                id='subcategory-weight-wrapper'
              >
                <h1 className='mb-2 text-lg'>
                  Product specifications
                </h1>

                <p className='text-gray-500'>Type: {product.product_type}</p>
                <p className='text-gray-500'>Size: {product.size}</p>
                <p className='text-gray-500'>Weight: {product.weight}</p>
              </div>


              {/* Button wrapper to delete or edit product */}
              <div className='flex flex-col my-3 md:my-0 lg:w-3/5' id='buttons-wrapper'>
                <Link
                  href={`/inquiry/${product.id}`}
                  className='
                    lg:text-md lg:flex-row
                    md:p-2 md:flex-col
                    rounded-lg active:bg-black/50 bg-black flex items-center justify-center text-white py-8 hover:cursor-pointer hover:bg-black/60 transition-all text-lg text-center
                  '
                >
                  <Mail className='md:flex lg:hidden hidden' size={40} />
                  Inquiry about this product
                </Link>
              </div>

            </div>
          </section>
        </div>
      </div>
    </>
  );
}
