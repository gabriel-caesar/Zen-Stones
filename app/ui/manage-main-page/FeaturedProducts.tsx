'use client'

import { Loader2, StarOff, VectorSquare } from 'lucide-react';
import { ProductWithImages } from '@/app/lib/types';
import { unfeatureProduct } from '@/app/lib/actions';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdStar } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import Carousel from '../Carousel';
import Link from 'next/link';

export default function FeaturedProducts({
  featuredProducts,
}: {
  featuredProducts: ProductWithImages[];
}) {
  const [clickUnfeature, setClickUnfeature] = useState<string>('');

  // loading state to control loading animation
  const [loading, setLoading] = useState<boolean>(false);

  // precaution input controller
  const [precaution, setPrecaution] = useState<string>('');

  // state to allow the final click to delete the product
  const [allowedToUnfeature, setAllowedToUnfeature] = useState<boolean>(false);

  // instantiating a router to redirect user after product is featured
  const router = useRouter();

  async function handleUnfeature(id: string) {
    setLoading(true);
    try {
      await unfeatureProduct(id);
    } catch (error) {
      throw new Error(`Couldn't featurize product from front-end. ${error}`);
    } finally {
      setLoading(false);
    }

    // redirect user
    router.push('/admin-space/manage-main-page?unfeature=true');
  }

  // checks for the allowance of feature action
  useEffect(() => {

    if (precaution === 'Unfeature product') {
      setAllowedToUnfeature(true);
    } else {
      setAllowedToUnfeature(false);
    }

  }, [precaution])

  return (
    <div
      id='featured-products-container'
      className='bg-neutral-200 rounded-lg p-2 shadow-md w-11/12 mt-6 lg:mt-0'
    >
      <h1 className='flex items-center justify-center text-center mb-3 font-bold'>
        Your featured products
        <IoMdStar className='ml-2 text-2xl' />
      </h1>

      <div
        id='chosen-featured-items-container'
        className='flex items-center justify-center flex-col w-full md:grid md:grid-cols-2 md:gap-4 md:place-items-center'
      >
        {featuredProducts.length > 0 ? (
          featuredProducts.map((p) => {
            return (
              <div
                key={p.id}
                id='featured-product-card'
                className='
                  rounded-lg overflow-hidden shadow-md w-3/4 flex flex-col 
                  items-center justify-center relative mb-3 bg-white md:h-[360px]
                '
              >
                <Carousel product={p} />

                <span className='absolute top-3 right-3 text-yellow-400 text-xl'>
                  <FaStar />
                </span>

                {/* Product Name */}
                <h1 className='text-xl text-center'>{p.name}</h1>

                {/* Product brief details */}
                <div
                  id='brief-product-details'
                  className='w-full items-center justify-start text-neutral-500 px-2 text-sm my-3'
                >
                  <p>Type: {p.product_type}</p>
                  <p>Category: {p.category}</p>
                </div>

                {/* Buttons Wrapper */}

                {clickUnfeature === p.id ? (
                  <div
                    className='flex flex-col w-full my-3 px-2'
                    id='unfeaturing-wrapper'
                  >
                    <h1 className='text-center mb-3 font-bold'>
                      To unfeature this product, write 'Unfeature product'
                    </h1>
                    <span className='flex w-full mb-2 items-center justify-between'>
                      <input
                          type='text'
                          id='precaution-input'
                          aria-label='precaution-input'
                          className='rounded-lg p-2 focus-within:outline-none search-focus bg-neutral-200 border-1 border-neutral-400 w-full transition-all'
                          placeholder='Unfeature product'
                          onKeyDown={e => {
                            if (e.key === 'Escape') {
                              setPrecaution('');
                              setClickUnfeature('');
                            }
                          }}
                          value={precaution}
                          onChange={(e) => setPrecaution(e.target.value)}
                          disabled={loading}
                        />
                        <button
                          onClick={async () => {
                            if (allowedToUnfeature && !loading) {
                              await handleUnfeature(p.id)
                              setPrecaution('');
                              setClickUnfeature('');
                            }
                          }}
                          id='delete-product-button'
                          aria-label='delete-product-button'
                          className={`
                            ${allowedToUnfeature ? 'bg-green-500 shadow-2xl shadow-green-400 text-black hover:bg-black hover:text-white active:bg-red-700 hover:cursor-pointer' : 'hover:cursor-not-allowed bg-neutral-500 text-white'}
                            transition-all rounded-lg p-2 ml-2
                          `}
                        >
                          {loading ? (
                            <Loader2 strokeWidth={1.5} className='loading' />
                          ) : (
                            <StarOff strokeWidth={1.5} />
                          )}
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
                          setClickUnfeature('');
                        }
                      }}
                    >
                      Cancel
                    </button>
                  
                  </div>

                ) : (
                  <div
                    id='button-wrapper'
                    className='flex items-center justify-center flex-col my-3 w-full px-2'
                  >
                    <Link
                      href={'/#featured-rarities'}
                      id='view-on-mainpage-button'
                      aria-label='view-on-mainpage-button'
                      className='
                        transition-all
                        hover:cursor-pointer hover:bg-black/60 active:bg-black/40
                        rounded-lg bg-black py-1 px-2 text-white w-full text-center
                      '
                    >
                      View on main page
                    </Link>

                    <button
                      id='view-on-mainpage-button'
                      aria-label='view-on-mainpage-button'
                      className='
                        transition-all mt-3
                        hover:cursor-pointer hover:bg-yellow-300 active:bg-yellow-600
                        rounded-lg bg-yellow-100 py-1 px-2 text-black w-full text-center
                      '
                      onClick={() => setClickUnfeature(p.id)}
                    >
                      Unfeature product
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className='text-neutral-500 w-full flex flex-col items-center justify-center my-6'>
            No featured products found...
            <VectorSquare strokeWidth={1.5} className='text-neutral-500 mt-3' />
          </p>
        )}
      </div>
    </div>
  );
}
