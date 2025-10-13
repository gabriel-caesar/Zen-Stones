'use client'

import { useActionState, useEffect, useState } from 'react';
import { BsStars } from 'react-icons/bs';
import Select from '../Select';
import { productType } from '@/app/types/types';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { PiImageBroken } from 'react-icons/pi';
import { featureType } from '@/app/lib/actions';
import { IoMdStar } from 'react-icons/io';

export default function FeaturedType({ types }: { types: productType[] }) {

  // wiggle wrong input
  const [wiggle, setWiggle] = useState(false);

  // form action
  const [state, featureTypeAction] = useActionState(featureType, undefined);

  // selected category of the custom dropdown
  const [selectedFeaturedType, setSelectedFeaturedType] = useState<string>('');

  // prevent the user to submit nothing
  const [allowedToSubmit, setAllowedToSubmit] = useState<boolean>(false);

  // stripping only the names from the frequency array
  const filteredTypes = types.map(t => {
    if (!t.featured_section) return t.product_type
  }).filter(t => t !== undefined);

  const featuredType = types.find(t => t.featured_section);

  // on mount, the select element will show 'Choose one option...'
  useEffect(() => {
    setSelectedFeaturedType('Choose one option...');
  }, []);

  useEffect(() => {
    if (state?.errors) {
      setWiggle(false);
      requestAnimationFrame(() => setWiggle(true)); // restart animation
    }
  }, [state?.errors]);

  // based on the featured type, allow the admin to submit
  useEffect(() => {
    if (selectedFeaturedType !== 'Choose one option...') {
      setAllowedToSubmit(true)
    } else {
      setAllowedToSubmit(false)
    }
  }, [selectedFeaturedType])

  return (
    <form
      onSubmit={e => {
        if (!allowedToSubmit) e.preventDefault();
      }}
      action={featureTypeAction}
      id='featured-types-container'
      className='bg-neutral-200 rounded-lg p-2 shadow-md w-11/12 mt-6'
    >
      <label htmlFor='featured-type-selection' className='flex items-center justify-center text-center mb-3 font-bold'>
        Your featured type collection
        <BsStars  className='ml-2 text-2xl' />
      </label>
      <Select
        options={filteredTypes ? filteredTypes as string[] : []}
        selector={selectedFeaturedType}
        setSelector={setSelectedFeaturedType}
        id='featured-type-selection'
        ariaLabel='featured-type-selection'
        name='featured-type'
      />
      {state?.errors?.featured_type && (
        <p
          className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
            wiggle ? 'wiggle-input' : ''
          }`}
          id='featured_type-error-text'
          aria-label='featured_type-error-text'
        >
          {state.errors.featured_type}
        </p>
      )}

      <SubmitButton allowedToSubmit={allowedToSubmit} />

      {featuredType ? (
        <div className='flex flex-col items-center justify-center my-4'>
          <h1 className='text-center mb-1'>
            Currently featuring {featuredType.product_type}
          </h1>
          <div 
          className='
            text-center flex w-full rounded-lg border-1 border-neutral-500 
            shadow-md items-center justify-between p-2
          '
          > 
            Type: {featuredType.product_type}
            <IoMdStar className='text-yellow-500' />
          </div>
        </div>
      ) : (
        <p className='flex flex-col items-center justify-center text-neutral-500 my-6'>
          No type was featured yet...
          <PiImageBroken className='text-2xl mt-3' />
        </p>
      )}
      
    </form>
  )
}

function SubmitButton({ allowedToSubmit }: { allowedToSubmit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      id='feature-type-button'
      aria-label='feature-type-button'
      className={`
        w-full mt-3 p-2 rounded-lg hover:bg-black/60 transition-all flex items-center justify-center
        ${
          pending
            ? 'bg-black/50 hover:cursor-not-allowed text-white'
            : !allowedToSubmit
              ? 'bg-neutral-500 text-black hover:cursor-not-allowed'
              : 'bg-black hover:cursor-pointer text-white'
        }
      `}
    >
      {pending ? <>Featuring <Loader2 strokeWidth={1.5} className='loading ml-2' /></> : 'Feature'}
    </button>
  );
}