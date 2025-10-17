'use client'

import { deleteProduct } from '@/app/lib/actions';
import { ProductWithImages } from '@/app/lib/types';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react'

export default function Buttons({
  product
} : {
  product: ProductWithImages
}) {

  const [loading, setLoading] = useState<boolean>(false);

  // handles delete and toggles the loading animation
  async function handleDelete(id: string) {
    try {
      await deleteProduct(id);
    } catch (error) {
      throw new Error(`Couldn't delete product from front-end. ${error}`)
    } finally {
    }
  }
  
  return (
    <div
      className='flex flex-col my-3 px-2'
      id='buttons-wrapper'
    >
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
          ${loading ? 'bg-neutral-600 hover:cursor-not-allowed' : 'bg-red-600 hover:cursor-pointer'}
          rounded-lg py-1 mt-2 text-white hover:bg-black/60 transition-all flex items-center justify-center
        `}
        id='delete-product-button'
        aria-label='delete-product-button'
        onClick={() => handleDelete(product.id)}
        disabled={loading}
      >
        Delete
        {loading && <Loader2 strokeWidth={1.5} className='loading ml-2' />}
      </button>
    </div>
  )
}