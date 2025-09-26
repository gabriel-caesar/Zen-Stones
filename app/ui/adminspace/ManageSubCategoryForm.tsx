'use client';

import { Box } from 'lucide-react';
import Select from '../Select';
import { useState } from 'react';

export default function ManageSubCategoryForm() {
  // selected category of the custom dropdown
  const [selectedCategory, setSelectCategory] = useState<string>('');

  // select sub-category of the custom dropdown
  const [selectedSubCategory, setSelectSubCategory] = useState<string>('');

  // changed by the toggler box
  const [toggleDelete, setToggleDelete] = useState<boolean>(false);

  // header categories for the custom dropdown
  const categories = ['Jewelry', 'Metaphysical'];
  const subcategories = ['Bracelets', 'Necklaces', 'Earrings', 'Rings'];

  return (
    <form action='' className='rounded-lg shadow-xl p-2 bg-neutral-200 md:w-1/2 lg:w-2/5 w-11/12 my-10 relative'>

      <div className='flex justify-between items-center mb-5'>
        <h1 className='flex font-bold'>
          <Box className='mr-2' />
          {toggleDelete ? 'Delete Sub-category' : 'Add Sub-category'}
        </h1>
        
        <div 
          className='flex w-[112px] justify-end items-center'
          id='toggle-wrapper'
        >
          <h1
            className='font-bold mr-2'
          >
            Delete
          </h1>
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
              className={`${toggleDelete ? 'translate-x-5' : 'translate-x-0'} rounded-full bg-neutral-700 w-1/2 h-5 transition-all duration-300`}
              id='circle-toggler'
            ></div>
          </button>
        </div>
      </div>

      {/* categories dropdown */}
      <h2 className='mb-1 ml-1 font-bold'>
        Category:
      </h2>
      <Select
        options={categories}
        selector={selectedCategory}
        setSelector={setSelectCategory}
        className='mb-6 sm:w-1/2 lg:w-full'
        id='category-selection'
        ariaLabel='category-selection'
        name='category'
      />

      {toggleDelete ? (
        // sub-categories dropdown
        <>
          <h2 className='mb-1 ml-1 font-bold'>
            Sub-category:
          </h2>
          <Select
            options={subcategories}
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
        <div className='sm:w-1/2 lg:w-full w-full'>
          <h2 className='mb-1 ml-1 font-bold'>
            New sub-category name
          </h2>
          <input 
            type="text" 
            className='rounded-lg bg-neutral-300 w-full mb-6 p-2 focus-within:outline-none search-focus transition-all'
            placeholder='Name...'
          />
        </div>
      )}

      <button
        className={`
          sm:w-1/2 w-full lg:w-full
          hover:cursor-pointer hover:bg-black/60 text-center rounded-lg py-2 transition-all
          ${toggleDelete ? 'bg-red-500 text-black font-bold' : 'bg-black text-white'}
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
