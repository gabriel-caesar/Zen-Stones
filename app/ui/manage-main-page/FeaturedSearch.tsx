'use client';

import SearchBarAdmin from '../adminspace/search-product/SearchBarAdmin';
import { BookmarkXIcon, Loader2, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProductWithImages } from '@/app/lib/types';
import { addProductToCollections, featurizeProduct } from '@/app/lib/actions';
import { getRarityColor } from '@/app/lib/utils';
import { IoIosTrophy } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Carousel from '../Carousel';

export default function FeaturedSearch({
  products,
  featuredProducts,
  query,
}: {
  products: ProductWithImages[];
  featuredProducts: ProductWithImages[];
  query: string;
}) {
  // loading state to control loading animation
  const [loading, setLoading] = useState<boolean>(false);

  // when user click a product to featurize it
  const [clickedFeature, setClickedFeature] = useState<string>('');

  // precaution input controller
  const [precaution, setPrecaution] = useState<string>('');

  // state to allow the final click to delete the product
  const [allowedToFeaturize, setAllowedToFeaturize] = useState<boolean>(false);

  // if there are two featured items already
  const [featuredCap, setFeaturedCap] = useState<boolean>(false);

  // if user clicked one product to add to the collections
  const [clickedCollection, setClickedCollection] = useState<string>('');

  // products to be displayed on the search
  const [unfeaturedProducts, setUnfeaturedProducts] = useState<
    ProductWithImages[]
  >(products.filter((p) => !p.featured_section && !p.is_collection) || []);

  // instantiating a router to redirect user after product is featured
  const router = useRouter();

  // handles featurezing and toggles the loading animation
  async function handleFeaturize(id: string) {
    setLoading(true);
    try {
      await featurizeProduct(id);
    } catch (error) {
      throw new Error(`Couldn't featurize product from front-end. ${error}`);
    } finally {
      setLoading(false);
    }

    // redirect user
    router.push('/admin-space/manage-main-page?feature=true');
  }

  // handles adding a product to the main page collections and toggles the loading animation
  async function handleCollection(product: ProductWithImages) {
    setLoading(true);
    try {
      await addProductToCollections(product);
    } catch (error) {
      throw new Error(`Couldn't handle collections from front-end. ${error}`);
    } finally {
      setLoading(false);
    }

    // reloading the page entirely so the change reflects in the UI
    window.location.href = '/admin-space/manage-main-page?added_collection=true';
  }

  // checks for the allowance of feature action
  useEffect(() => {
    if (precaution === 'Feature product') {
      setAllowedToFeaturize(true);
    } else {
      setAllowedToFeaturize(false);
    }
  }, [precaution]);

  // checking if two products are already featured
  useEffect(() => {
    if (featuredProducts.length === 2) {
      setFeaturedCap(true);
    } else {
      setFeaturedCap(false);
    }
  }, [featuredProducts]);

  // makes sure that unfeatured products array stays up to date
  useEffect(
    () => setUnfeaturedProducts(products.filter((p) => !p.featured_section && !p.is_collection)),
    [query, products]
  );

  return (
    <div
      id='featured-search-container'
      className='bg-neutral-200 rounded-lg p-2 shadow-md w-11/12'
    >
      <h1 className='flex items-center justify-center text-center mb-3 font-bold'>
        Select two featured products
        <IoIosTrophy className='ml-2 text-2xl' />
      </h1>

      <SearchBarAdmin />

      {featuredCap && (
        <h1 className='text-red-500 text-center mt-4'>
          You already have two featured products, remove one to add another.
        </h1>
      )}

      <div
        id='search-results-container'
        className={`
          ${
            products.length <= 0
              ? 'flex'
              : 'md:grid md:grid-cols-2 xl:grid-cols-3 md:place-content-center md:place-items-center md:gap-4'
          }
        `}
      >
        {unfeaturedProducts.length > 0 ? (
          unfeaturedProducts.map((p) => {
            return (
              <div
                id='searched-card'
                key={p.id}
                className={`
                  ${p.featured_section ? 'bg-neutral-200' : 'bg-white'}
                  shadow-md max-h-[450px]
                  flex flex-col items-center justify-center my-6 pb-6
                  rounded-lg border-1 border-neutral-400 overflow-hidden
                `}
              >
                <Carousel product={p} height='h-[272px]' />

                {/* Rarity badge */}
                <div className='absolute z-3 top-3 left-3'>
                  <div
                    className={`${getRarityColor(
                      p.rarity
                    )} text-white text-[12px] font-bold border-0 rounded-md px-2`}
                  >
                    {p.featured_material}
                  </div>
                </div>

                {/* Price tag */}
                <div
                  className='
                        md:left-3 md:w-fit md:right-0 md:top-10
                        absolute top-3 z-3 right-3 bg-black/70 text-white px-2 py-1 rounded
                      '
                >
                  <span className='text-sm'>${p.price}</span>
                </div>

                <div id='card-features-wrapper' className='w-full p-2'>
                  {/* Product name */}
                  <div className='flex flex-wrap items-center justify-between w-full mb-5 pr-2'>
                    <h1
                      className='text-lg md:text-2xl mr-2'
                      aria-label='product-name'
                    >
                      {p.name}
                    </h1>
                    <p className='text-sm text-neutral-500'>{p.category}</p>
                  </div>

                  {/* Product properties */}
                  <div
                    className='flex mb-3 gap-1 px-1 flex-wrap'
                    id='properties-wrapper'
                  >
                    {p.indicated_for.map((prop, index) => {
                      return (
                        <div
                          key={index}
                          className='text-xs rounded-lg bg-neutral-200 py-1 px-2 font-bold text-black'
                          aria-label={`${prop}-tag`}
                        >
                          {prop}
                        </div>
                      );
                    })}
                  </div>

                  {/* Product sub-category (type) and weight wrapper */}
                  <div
                    className={`flex items-center justify-between px-2 text-sm text-gray-500`}
                    id='subcategory-weight-wrapper'
                  >
                    <p>Type: {p.product_type}</p>
                    <p>{p.weight}</p>
                  </div>
                </div>

                <div
                  id='card-buttons-container'
                  className='flex flex-col justify-center items-center w-full px-3'
                >
                  {clickedFeature === p.id ? (
                    <div
                      className='flex flex-col w-full my-3 px-2'
                      id='featuring-wrapper'
                    >
                      <h1 className='text-center mb-3 font-bold'>
                        To feature this product, write 'Feature product'
                      </h1>
                      <span className='flex w-full mb-2 items-center justify-between'>
                        <input
                          type='text'
                          id='precaution-input'
                          aria-label='precaution-input'
                          className='rounded-lg p-2 focus-within:outline-none search-focus bg-neutral-200 border-1 border-neutral-400 w-full transition-all'
                          placeholder='Feature product'
                          onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                              setPrecaution('');
                              setClickedFeature('');
                            }
                          }}
                          value={precaution}
                          onChange={(e) => setPrecaution(e.target.value)}
                          disabled={loading}
                        />
                        <button
                          onClick={async () => {
                            if (allowedToFeaturize && !loading) {
                              await handleFeaturize(p.id);
                              setPrecaution('');
                              setClickedFeature('');
                            }
                          }}
                          id='delete-product-button'
                          aria-label='delete-product-button'
                          className={`
                              ${
                                allowedToFeaturize
                                  ? 'bg-green-500 shadow-2xl shadow-green-400 text-black hover:bg-black hover:text-white active:bg-red-700 hover:cursor-pointer'
                                  : 'hover:cursor-not-allowed bg-neutral-500 text-white'
                              }
                              transition-all rounded-lg p-2 ml-2 text-center
                            `}
                        >
                          <Star strokeWidth={1.5} />
                        </button>
                      </span>

                      <button
                        id='cancel-deletion-button'
                        aria-label='cancel-deletion-button'
                        className='rounded-lg w-full p-2 bg-yellow-300 shadow-md border-1 border-yellow-400 hover:bg-yellow-500 hover:cursor-pointer active:bg-yellow-600 transition-all'
                        disabled={loading}
                        onClick={() => {
                          if (!loading) {
                            setPrecaution('');
                            setClickedFeature('');
                          }
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      id='featurize-product-button'
                      aria-label='featurize-product-button'
                      className={`
                        ${featuredCap ? 'bg-red-300' : 'bg-yellow-100'}
                        rounded-lg p-2 shadow-md w-full mt-3
                        hover:cursor-pointer hover:bg-yellow-300 active:bg-yellow-500
                        transition-all
                      `}
                      onClick={() => {
                        if (!featuredCap) setClickedFeature(p.id);
                      }}
                    >
                      {featuredCap ? `Can't feature` : 'Select as featured'}
                    </button>
                  )}

                  {clickedCollection === p.id ? (
                    <div
                      id='add-cancel-button-wrapper'
                      className='border-1 border-neutral-500 rounded-lg p-1 mt-3'
                    >
                      <h1 className='text-center mb-3'>
                        Are you sure to add this item to the Collections?
                      </h1>

                      <div
                        id='add-cancel-buttons-container'
                        className='flex w-full justify-center items-center'
                      >
                        <button
                          id='add-button'
                          aria-label='add-button'
                          className={`
                            ${loading ? 'bg-neutral-600' : 'bg-yellow-300'}
                            rounded-lg shadow-md p-2 mr-2 w-full text-center flex items-center justify-center
                            hover:cursor-pointer hover:bg-yellow-300/60 active:bg-black active:text-white transition-all
                          `}
                          onClick={() => {
                            if (!loading) {
                              handleCollection(p);
                              }
                          }}
                        >
                          {loading ? (
                            <Loader2 strokeWidth={1.5} className='loading' />
                          ) : (
                            'Add'
                          )}
                        </button>

                        <button
                          id='cancel-button'
                          aria-label='cancel-button'
                          className={`
                            rounded-lg shadow-md p-2 bg-red-500 w-full
                            hover:cursor-pointer hover:bg-red-500/60 active:bg-black transition-all
                          `}
                          onClick={() => {
                            if (!loading) {
                              setClickedCollection('');
                            }
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      id='add-to-collection-button'
                      aria-label='add-to-collection-button'
                      className={`
                        rounded-lg shadow-md p-2 w-full bg-black text-white mt-3
                        hover:cursor-pointer hover:bg-black/60 active:bg-black/40 transition-all
                      `}
                      onClick={() => {
                        if (!loading) {
                          setClickedCollection(p.id);
                        }
                      }}
                    >
                      Add to collection
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-neutral-500 w-full flex flex-col items-center justify-center my-6'>
            No products found or no query done
            <BookmarkXIcon strokeWidth={1.5} className='text-neutral-500' />
          </p>
        )}
      </div>
    </div>
  );
}
