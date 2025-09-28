'use client';

import { Box } from 'lucide-react';
import Select from '../Select';
import { useActionState, useEffect, useState } from 'react';
import { createSubCategory } from '@/app/lib/actions';
import { Category, SubCategory } from '@/app/types/types';
import InputImage from '../InputImage';

export default function ManageSubCategoryForm({
  subcategories,
}: {
  subcategories: undefined | SubCategory[];
}) {

  // wiggle wrong input
  const [wiggle, setWiggle] = useState(false);

  // selected category of the custom dropdown
  const [selectedCategory, setSelectCategory] = useState<string>('');

  // select sub-category of the custom dropdown
  const [selectedSubCategory, setSelectSubCategory] = useState<string>('');

  // changed by the toggler box
  const [toggleDelete, setToggleDelete] = useState<boolean>(false);

  // persists user input accross re-render
  const [subCategoryName, setSubCategoryName] = useState<string>('');

  // header categories for the custom dropdown
  const categories: Category[] = ['Jewelry', 'Metaphysical', 'Sterling Silver'];

  // handle form submission
  const [state, addSubCategoryAction] = useActionState(
    createSubCategory,
    undefined
  );

  // getting all the subcategory names from the subcategories array of objects
  const jewelrySubCategories = subcategories?.filter(
    (obj) => obj.parent_category === 'Jewelry'
  ).map(obj => obj.subcategory);
  const metaphysicalSubCategories = subcategories?.filter(
    (obj) => obj.parent_category === 'Metaphysical'
  ).map(obj => obj.subcategory);
  const sterlingSubCategories = subcategories?.filter(
    (obj) => obj.parent_category === 'Sterling Silver'
  ).map(obj => obj.subcategory);

  useEffect(() => {
    setSelectSubCategory('Choose one option...')
  }, [selectedCategory])

  useEffect(() => {
    if (state?.errors) {
      setWiggle(false);
      requestAnimationFrame(() => setWiggle(true)); // restart animation
    }
  }, [state?.errors]);

  return (
    <form
      action={addSubCategoryAction}
      className='rounded-lg shadow-xl p-2 bg-neutral-200 md:w-1/2 lg:w-2/5 w-11/12 my-10 relative'
    >
      <div className='flex justify-between items-center mb-5'>
        <h1 className='flex font-bold'>
          <Box className='mr-2' />
          {toggleDelete ? 'Delete Sub-category' : 'Add Sub-category'}
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
        // sub-categories dropdown
        <>
          <h2 className='mb-1 ml-1 font-bold'>Sub-category:</h2>
          <Select
            options={
              selectedCategory === 'Jewelry'
                ? jewelrySubCategories
                : selectedCategory === 'Metaphysical'
                ? metaphysicalSubCategories
                : sterlingSubCategories
            }
            selector={selectedSubCategory}
            setSelector={setSelectSubCategory}
            className='mb-6 sm:w-1/2 lg:w-full'
            id='subcategory-selection'
            ariaLabel='subcategory-selection'
            name='subcategory'
          />
        </>
      ) : (
        // input new sub-category name field
        <>
          <div className='sm:w-1/2 lg:w-full w-full mb-6'>
            <h2 className='mb-1 ml-1 font-bold'>New sub-category name</h2>
            <input
              value={subCategoryName}
              onChange={(e) => {
                if (e.target.value.length <= 15) {
                  setSubCategoryName(e.target.value);
                }
              }}
              type='text'
              className='rounded-lg bg-neutral-300 w-full p-2 focus-within:outline-none search-focus transition-all'
              placeholder='Name...'
              name='subcategory'
              aria-label='input-your-new-subcategory'
            />
            {state?.errors?.subcategory && (
              <p
                className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${wiggle ? 'wiggle-input' : ''}`}
                id='subcategory-error-text'
                aria-label='subcategory-error-text'
              >
                {state.errors.subcategory}
              </p>
            )}
          </div>

          <InputImage state={state} name={'featuredPhoto'} />
        </>
      )}

      <button
        className={`
          sm:w-1/2 w-full lg:w-full mt-10
          hover:cursor-pointer hover:bg-black/60 text-center rounded-lg py-2 transition-all
          ${
            toggleDelete
              ? 'bg-red-500 text-black font-bold'
              : 'bg-black text-white'
          }
        `}
        id={`${toggleDelete ? 'delete' : 'add'}-subcategory-button`}
        aria-label={`${toggleDelete ? 'delete' : 'add'}-subcategory-button`}
        onClick={() => {}}
      >
        {toggleDelete ? 'Delete Sub-category' : 'Add Sub-category'}
      </button>
    </form>
  );
}
