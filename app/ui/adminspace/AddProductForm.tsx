'use client';

import {
  ChartBarIncreasingIcon,
  ChartColumnBig,
  CircleStar,
  DollarSign,
  FileBox,
  FolderPen,
  Image,
  List,
  Table,
  Weight,
} from 'lucide-react';
import { useState } from 'react';
import Select from '../Select';

export default function AddProductForm() {
  // selected category of the custom dropdown
  const [selectedCategory, setSelectCategory] = useState<string>('');

  // seleceted rarity of the custom dropdown
  const [selectedRarity, setSelectedRarity] = useState<string>('');

  // select sub-category of the custom dropdown
  const [selectedSubCategory, setSelectSubCategory] = useState<string>('');

  // header categories for the custom dropdown
  const categories = ['Jewelry', 'Metaphysical'];
  const subcategories = ['Bracelets', 'Necklaces', 'Earrings', 'Rings'];
  const rarities = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary'];

  return (
    <form
      action=''
      className='rounded-lg shadow-xl p-2 bg-neutral-200 md:w-1/2 lg:w-2/5 w-11/12 mt-10 relative lg:mr-10'
    >
      <h1 className='flex font-bold lg:text-lg'>
        <FileBox className='mr-2' />
        Add product
      </h1>

      <section className='mt-12 w-full' id='image-section'>
        <label htmlFor='product-photo' className='flex mb-1 ml-1'>
          <Image strokeWidth={1.5} className='mr-2' />
          Product image
        </label>
        <label className='flex items-center justify-between p-2 bg-neutral-300 rounded-lg cursor-pointer w-full'>
          <span className='rounded-lg bg-black text-white px-2'>
            Choose file
          </span>
          <span>No file chosen</span>{' '}
          {/* optional: dynamically show filename */}
          <input
            type='file'
            name='product-photo'
            id='product-photo'
            className='hidden'
            aria-label='product-image-input'
          />
        </label>
      </section>

      <section id='name-section' className='w-full mt-6'>
        <label htmlFor='name' className='flex mb-1 ml-1'>
          <FolderPen strokeWidth={1.5} className='mr-2' />
          Name
        </label>
        <input
          type='text'
          id='name-input'
          name='name'
          aria-label='product-name-input'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          placeholder='Name...'
        />
      </section>

      <section id='category-section' className='w-full mt-6'>
        <label htmlFor='category-selection' className='flex mb-1 ml-1'>
          <ChartColumnBig strokeWidth={1.5} className='mr-2' />
          Category
        </label>
        <Select
          options={categories}
          selector={selectedCategory}
          setSelector={setSelectCategory}
          id='category-selection'
          ariaLabel='category-selection'
          name='category'
        />
      </section>

      <section id='subcategory-section' className='w-full mt-6'>
        <label htmlFor='subcategory' className='flex mb-1 ml-1'>
          <ChartBarIncreasingIcon strokeWidth={1.5} className='mr-2' />
          Sub-category
        </label>
        <Select
          options={subcategories}
          selector={selectedSubCategory}
          setSelector={setSelectSubCategory}
          id='subcategory-selection'
          ariaLabel='subcategory-selection'
          name='subcategory'
        />
      </section>

      <section id='price-section' className='w-full mt-6'>
        <label htmlFor='price' className='flex mb-1 ml-1'>
          <DollarSign strokeWidth={1.5} className='mr-1' />
          Price
        </label>
        <input
          type='number'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          name='price'
          id='price-input'
          aria-label='product-price-input'
          placeholder='Price...'
        />
      </section>

      <section id='properties-section' className='w-full mt-6'>
        <label htmlFor='properties' className='flex mb-1 ml-1'>
          <List strokeWidth={1.5} className='mr-2' />
          Properties
        </label>
        <input
          type='text'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          name='properties'
          id='properties-input'
          aria-label='product-properties-input'
          placeholder='Properties...'
        />
      </section>

      <section id='rarity-section' className='w-full mt-6'>
        <label htmlFor='rarity' className='flex mb-1 ml-1'>
          <CircleStar strokeWidth={1.5} className='mr-2' />
          Rarity
        </label>
        <Select
          options={rarities}
          selector={selectedRarity}
          setSelector={setSelectedRarity}
          id='rarity-selection'
          ariaLabel='rarity-selection'
          name='rarity'
        />
      </section>

      <section id='weight-section' className='w-full mt-6'>
        <label htmlFor='weight' className='flex mb-1 ml-1'>
          <Weight strokeWidth={1.5} className='mr-2' />
          Weight
        </label>
        <input
          type='number'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          name='weight'
          id='weight-input'
          aria-label='product-weight-input'
          placeholder='Weight...'
        />
      </section>

      <section id='description-section' className='w-full mt-6'>
        <label htmlFor='description' className='flex mb-1 ml-1'>
          <Table strokeWidth={1.5} className='mr-2' />
          Description
        </label>
        <textarea
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all resize-none'
          name='description'
          id='description-input'
          aria-label='product-description-input'
          placeholder='Description...'
          rows={4}
        />
      </section>

      <button
        id='create-product-button'
        aria-label='create-product-button'
        className='bg-black text-white w-full mt-8 p-2 rounded-lg hover:cursor-pointer hover:bg-black/60 transition-all'
      >
        Create
      </button>
    </form>
  );
}
