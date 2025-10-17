'use client'

import { ProductWithImages } from '@/app/lib/types';
import { useState } from 'react';

export default function DescriptionToggler({ product } : { product:ProductWithImages }) {
  
  const [toggleDescription, setToggleDescription] = useState<boolean>(false);

  return (
    <div
      id='large-screen-description-wrapper'
      className={`${!toggleDescription && 'bg-yellow-100'} hidden w-full lg:flex lg:flex-col rounded-2xl bg-neutral-200 shadow-lg p-4 mb-3 transition-all duration-700 overflow-hidden`}
    >

      <h2 className='mb-3 text-xl'>
        {toggleDescription ? 'Product Description' : 'Product Meaning'}
      </h2>

      <p id='desc-meaning-p' aria-label='description-or-meaning-text'>
        {toggleDescription ? product.description : product.meaning}
      </p>

      <button
        id='toggle-description-meaning-button'
        aria-label='toggle-description-meaning-button'
        className='transition-all mt-2 py-2 rounded-lg bg-black text-white hover:bg-black/60 hover:cursor-pointer active:bg-black/20'
        onClick={() => setToggleDescription(!toggleDescription)}
      >
        {toggleDescription ? 'See meaning' : 'See description'}
      </button>
    </div>
  )

}