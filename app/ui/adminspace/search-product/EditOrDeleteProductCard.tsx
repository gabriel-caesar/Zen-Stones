'use client';

import { BookmarkXIcon, Loader2, Trash2 } from 'lucide-react';
import { ProductWithImages } from '@/app/lib/types';
import { deleteProduct } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard';
import Link from 'next/link';

export default function EditOrDeleteProductCard({
  products,
}: {
  products: ProductWithImages[];
}) {
  // loading state to control loading animation
  const [loading, setLoading] = useState<boolean>(false);

  // toggle a precaution input
  const [isDeleting, setIsDeleting] = useState<string>('');

  // precaution input controller
  const [precaution, setPrecaution] = useState<string>('');

  // state to allow the final click to delete the product
  const [allowedToDelete, setAllowedToDelete] = useState<boolean>(false);

  // instantiating a router to redirect user after product deletion
  const router = useRouter();

  // handles delete and toggles the loading animation
  async function handleDelete(id: string) {
    setLoading(true);
    try {
      await deleteProduct(id);
    } catch (error) {
      throw new Error(`Couldn't delete product from front-end. ${error}`);
    } finally {
      setLoading(false);
    }

    // redirect user
    router.push('/admin-space/manage-products?deletion=true');
  }

  const noProductsFound = products.length <= 0;

  // checks for the allowance of product deletion
  useEffect(() => {

    if (precaution === 'Permanently delete') {
      setAllowedToDelete(true);
    } else {
      setAllowedToDelete(false);
    }

  }, [precaution])

  return (
    <div className='rounded-lg' id='product-card-wrapper'>
      {!noProductsFound ? (
        products.map((product) => {
          return (
            <div
              key={product.id}
              className='rounded-2xl bg-white border-1 border-neutral-400 shadow-md lg:w-full relative overflow-hidden mb-3'
            >
              {/* Product item card */}
              <ProductCard product={product} />

              {/* Button wrapper to delete or edit product */}
              {isDeleting === product.id ? (
                <div
                  className='flex flex-col w-full my-3 px-2'
                  id='isDeleting-wrapper'
                >
                  <h1 className='text-center mb-3 font-bold'>
                    To delete the product, write 'Permanently delete'
                  </h1>
                  <span className='flex w-full mb-2 items-center justify-between'>
                     <input
                        type='text'
                        id='precaution-input'
                        aria-label='precaution-input'
                        className='rounded-lg p-2 focus-within:outline-none search-focus bg-neutral-200 border-1 border-neutral-400 w-full transition-all'
                        placeholder='Permanently delete'
                        onKeyDown={e => {
                          if (e.key === 'Escape') {
                            setPrecaution('');
                            setIsDeleting('');
                          }
                        }}
                        value={precaution}
                        onChange={(e) => setPrecaution(e.target.value)}
                        disabled={loading}
                      />
                      <button
                        onClick={async () => {
                          if (allowedToDelete && !loading) {
                            await handleDelete(product.id)
                            setPrecaution('');
                            setIsDeleting('');
                          }
                        }}
                        id='delete-product-button'
                        aria-label='delete-product-button'
                        className={`
                          ${allowedToDelete ? 'bg-red-500 text-black hover:bg-black hover:text-white active:bg-red-700 hover:cursor-pointer' : 'hover:cursor-not-allowed bg-neutral-500 text-white'}
                          transition-all rounded-lg p-2 ml-2
                        `}
                      >
                        {loading ? (
                          <Loader2 strokeWidth={1.5} className='loading' />
                        ) : (
                          <Trash2 strokeWidth={1.5} />
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
                        setIsDeleting('');
                      }
                    }}
                  >
                    Cancel
                  </button>
                 
                </div>
              ) : (
                <div className='flex flex-col my-3 px-2' id='buttons-wrapper'>
                  <Link
                    id='edit-product-button'
                    aria-label='edit-product-button'
                    className={`
                      ${loading ? 'hidden' : 'flex'}
                      items-center justify-center rounded-lg bg-black text-white 
                      py-1 hover:cursor-pointer hover:bg-black/60 transition-all
                    `}
                    href={`/edit-product/${product.id}`}
                  >
                    Edit
                  </Link>

                  <button
                    className={`
                     bg-red-600 hover:cursor-pointer
                      rounded-lg py-1 mt-2 text-white hover:bg-black/60 transition-all flex items-center justify-center
                    `}
                    id='start-deletion-button'
                    aria-label='start-deletion-button'
                    onClick={() => setIsDeleting(product.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className='text-neutral-500 w-full flex flex-col items-center justify-center'>
          No products found or no query done
          <BookmarkXIcon strokeWidth={1.5} className='text-neutral-500' />
        </p>
      )}
    </div>
  );
}
