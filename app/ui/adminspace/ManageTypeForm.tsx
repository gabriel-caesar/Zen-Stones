'use client';

import { Box, Loader2 } from 'lucide-react';
import Select from '../Select';
import { useActionState, useEffect, useState } from 'react';
import { createType, deleteType } from '@/app/lib/actions';
import { Category, productType } from '@/app/lib/types';
import InputImage from '../InputImage';
import { useFormStatus } from 'react-dom';

export default function ManageTypeForm({
  productTypes,
}: {
  productTypes: undefined | productType[];
}) {
  // wiggle wrong input
  const [wiggle, setWiggle] = useState(false);

  // selected category of the custom dropdown
  const [selectedCategory, setSelectCategory] = useState<string>('');

  // select sub-category of the custom dropdown
  const [selectedType, setSelectedType] = useState<string>('');

  // changed by the toggler box
  const [toggleDelete, setToggleDelete] = useState<boolean>(false);

  // persists user input accross re-render
  const [productTypeName, setProductTypeName] = useState<string>('');

  // header categories for the custom dropdown
  const categories: Category[] = ['Jewelry', 'Metaphysical'];

  // array of images being uploaded
  const [uploadedImageObjects, setUploadedImageObjects] = useState<File[] | []>(
    []
  );

  // handle form submission for type creation
  const [state, addProductTypeAction] = useActionState(createType, undefined);

  // handle form submission for type deletion
  const [stateDelete, deleteProductTypeAction] = useActionState(deleteType, undefined);

  // getting all the productType names from the productTypes array of objects
  const jewelryProductTypes = productTypes
    ?.filter((obj) => obj.parent_category === 'Jewelry')
    .map((obj) => obj.product_type);
  const metaphysicalProductTypes = productTypes
    ?.filter((obj) => obj.parent_category === 'Metaphysical')
    .map((obj) => obj.product_type);

  useEffect(() => {
    setSelectedType('Choose one option...');
  }, [selectedCategory]);

  useEffect(() => {
    if (state?.errors) {
      setWiggle(false);
      requestAnimationFrame(() => setWiggle(true)); // restart animation
    }
  }, [state?.errors]);

  return (
    <form
      action={!toggleDelete ? addProductTypeAction : deleteProductTypeAction }
      className='rounded-lg shadow-xl p-2 bg-neutral-200 md:w-1/2 lg:w-2/5 w-11/12 my-10 relative'
    >
      <div className='flex justify-between items-center mb-5'>
        <h1 className='flex font-bold'>
          <Box className='mr-2' />
          {toggleDelete ? 'Delete Product Type' : 'Add Product Type'}
        </h1>

        <div
          className='flex w-[112px] justify-end items-center'
          id='toggle-wrapper'
        >
          <h1 className='font-bold mr-2'>Delete</h1>
          <button
            className={`
              ${toggleDelete ? 'bg-red-500' : 'bg-neutral-200'}
              inner-shadow rounded-xl w-12 h-7 p-1 hover:cursor-pointer transition-all duration-300
            `}
            id='toggle-button'
            aria-label='toggle-delete-button'
            onClick={() => setToggleDelete(!toggleDelete)}
            type='button'
          >
            <div
              className={`${
                toggleDelete ? 'translate-x-5' : 'translate-x-0'
              } rounded-full bg-neutral-700 w-1/2 h-5 transition-all duration-300`}
              id='circle-toggler'
            ></div>
          </button>
        </div>
      </div>

      {/* categories dropdown */}
      <h2 className='mb-1 ml-1 font-bold'>Category:</h2>
      <Select
        options={categories}
        selector={selectedCategory}
        setSelector={setSelectCategory}
        className='mb-6 sm:w-1/2 lg:w-full'
        id='category-selection'
        ariaLabel='category-selection'
        name='category'
      />
      <input
        type='text'
        defaultValue={selectedCategory}
        name='category'
        className='hidden'
        id='hidden-category-input'
      />

      {toggleDelete ? (
        // product types dropdown
        <>
          <h2 className='mb-1 ml-1 font-bold'>Type:</h2>
          <Select
            options={selectedCategory === 'Jewelry' ? jewelryProductTypes : metaphysicalProductTypes}
            selector={selectedType}
            setSelector={setSelectedType}
            className='mb-6 sm:w-1/2 lg:w-full'
            id='productType-selection'
            ariaLabel='productType-selection'
            name='productType'
          />
          {stateDelete?.errors?.type && (
              <p
                className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
                  wiggle ? 'wiggle-input' : ''
                }`}
                id='delete-type-error-text'
                aria-label='delete-type-error-text'
              >
                {stateDelete.errors.type}
              </p>
            )}
        </>
      ) : (
        // input new product types name field
        <>
          <div className='sm:w-1/2 lg:w-full w-full mb-6'>
            <h2 className='mb-1 ml-1 font-bold'>New product type name</h2>
            <input
              value={productTypeName}
              onChange={(e) => {
                if (e.target.value.length <= 15) {
                  setProductTypeName(e.target.value);
                }
              }}
              type='text'
              className='rounded-lg bg-neutral-300 w-full p-2 focus-within:outline-none search-focus transition-all'
              placeholder='Name...'
              name='productType'
              aria-label='input-your-new-productType'
            />
            {state?.errors?.productType && (
              <p
                className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
                  wiggle ? 'wiggle-input' : ''
                }`}
                id='productType-error-text'
                aria-label='productType-error-text'
              >
                {state.errors.productType}
              </p>
            )}
          </div>

          <InputImage
            state={state}
            name={'featuredPhoto'}
            uploadedImageObjects={uploadedImageObjects}
            setUploadedImageObjects={setUploadedImageObjects}
          />
        </>
      )}

      <SubmitButton toggleDelete={toggleDelete} />
    </form>
  );
}

function SubmitButton({ toggleDelete }: { toggleDelete: boolean }) {
  const { pending } = useFormStatus();
  return (

    <button
      type='submit'
      disabled={pending}
      id={`${toggleDelete ? 'delete' : 'add'}-productType-button`}
      aria-label={`${toggleDelete ? 'delete' : 'add'}-productType-button`}
      className={`
          sm:w-1/2 w-full lg:w-full mt-10 flex justify-center items-center
          hover:bg-black/60 text-center rounded-lg py-2 transition-all
          ${
            pending
              ? 'bg-black/50 hover:cursor-not-allowed'
              : toggleDelete
              ? 'bg-red-500 text-black font-bold hover:cursor-pointer'
              : 'bg-black text-white hover:cursor-pointer'
          }
        `}
    >
      {toggleDelete ? 'Delete Product Type' : 'Add Product Type'}
      {pending && <Loader2 strokeWidth={1.5} className='loading ml-2' />}
    </button>
    
    
  );
}
