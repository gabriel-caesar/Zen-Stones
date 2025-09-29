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
  Loader2,
  Table,
  Weight,
  X,
} from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import Select from '../Select';
import { createProduct, uniqueId } from '@/app/lib/actions';
import InputImage from '../InputImage';
import { useFormStatus } from 'react-dom';
import { useRootContext } from '@/app/RootContext';

export default function AddProductForm() {
  // form action
  const [state, addProductAction] = useActionState(createProduct, undefined);

  // wiggle wrong input
  const [wiggle, setWiggle] = useState(false);

  // selected category of the custom dropdown
  const [selectedCategory, setSelectCategory] = useState<string>('');

  // seleceted rarity of the custom dropdown
  const [selectedRarity, setSelectedRarity] = useState<string>('');

  // select sub-category of the custom dropdown
  const [selectedSubCategory, setSelectSubCategory] = useState<string>('');

  // error state to warn user of whatever error that pops up
  const [inputError, setInputError] = useState<string>('');

  // states to persist user input
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productWeight, setProductWeight] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productProperties, setProductProperties] = useState<string>('');

  // will store all properties that user've inputed
  const [arrayOfProperties, setArrayOfProperties] = useState<
    { name: string; id: string }[]
  >([]);

  // header categories for the custom dropdown
  const categories = ['Jewelry', 'Metaphysical', 'Sterling Silver'];
  const { subcategories } = useRootContext();
  const rarities = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary'];

  // getting all the subcategory names from the subcategories array of objects
  const jewelrySubCategories = subcategories
    ?.filter((obj) => obj.parent_category === 'Jewelry')
    .map((obj) => obj.subcategory);
  const metaphysicalSubCategories = subcategories
    ?.filter((obj) => obj.parent_category === 'Metaphysical')
    .map((obj) => obj.subcategory);
  const sterlingSubCategories = subcategories
    ?.filter((obj) => obj.parent_category === 'Sterling Silver')
    .map((obj) => obj.subcategory);

  async function feedProperties() {
    if (productProperties.length <= 0) return;
    const id = await uniqueId();
    const newObj = { name: productProperties, id: id };

    // prevent duplicates
    const isDuplicate = arrayOfProperties.some(
      (p) => p.name.toLowerCase() === productProperties.toLowerCase()
    );

    // prevents overflow
    const maxProps = arrayOfProperties.length === 4;

    if (isDuplicate) {
      setInputError('Cannot have duplicate properties');
      return;
    } else if (maxProps) {
      setInputError('Max number of properties reached');
      return;
    }

    setArrayOfProperties((prev) => [...prev, newObj]);
    setProductProperties('');

    // if duplicate error is not empty
    if (inputError !== '') setInputError('');
  }

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
      // onSubmit={(e) => e.preventDefault()}
      action={addProductAction}
      className='rounded-lg shadow-xl p-2 bg-neutral-200 md:w-1/2 lg:w-2/5 w-11/12 my-10 relative lg:ml-10'
    >
      <h1 className='flex font-bold lg:text-lg mb-8'>
        <FileBox className='mr-2' />
        Add product
      </h1>

      <InputImage state={state} name={'productPhoto'} />

      <section id='name-section' className='w-full mt-6'>
        <label htmlFor='name-input' className='flex mb-1 ml-1'>
          <FolderPen strokeWidth={1.5} className='mr-2' />
          Name
        </label>
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          type='text'
          id='name-input'
          name='name'
          aria-label='product-name-input'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          placeholder='Name...'
        />
        {state?.errors?.name && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='name-error-text'
            aria-label='name-error-text'
          >
            {state.errors.name}
          </p>
        )}
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
        {state?.errors?.category && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='category-error-text'
            aria-label='category-error-text'
          >
            {state.errors.category}
          </p>
        )}
      </section>

      <section id='subcategory-section' className='w-full mt-6'>
        <label htmlFor='subcategory-selection' className='flex mb-1 ml-1'>
          <ChartBarIncreasingIcon strokeWidth={1.5} className='mr-2' />
          Sub-category
        </label>
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
          id='subcategory-selection'
          ariaLabel='subcategory-selection'
          name='subcategory'
        />
        {state?.errors?.subcategory && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='subcategory-error-text'
            aria-label='subcategory-error-text'
          >
            {state.errors.subcategory}
          </p>
        )}
      </section>

      <section id='price-section' className='w-full mt-6'>
        <label htmlFor='price-input' className='flex mb-1 ml-1'>
          <DollarSign strokeWidth={1.5} className='mr-1' />
          Price
        </label>
        <input
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          type='text'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          name='price'
          id='price-input'
          aria-label='product-price-input'
          placeholder='Price...'
        />
        {state?.errors?.price && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='price-error-text'
            aria-label='price-error-text'
          >
            {state.errors.price}
          </p>
        )}
      </section>

      <section id='properties-section' className='w-full mt-6'>
        <label htmlFor='properties-input' className='flex mb-1 ml-1'>
          <List strokeWidth={1.5} className='mr-2' />
          Properties
        </label>
        <input
          value={productProperties}
          onChange={(e) => {
            if (e.target.value.length <= 12) {
              setProductProperties(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              feedProperties();
            }
          }}
          type='text'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          name='properties-for-ui' // doesn't get captured on submission
          id='properties-input'
          aria-label='product-properties-input'
          placeholder='Properties...'
        />

        {arrayOfProperties.length > 0 && (
          <>
            <div className='flex flex-wrap p-1 rounded-lg border-1 shadow-lg border-neutral-500 mt-2'>
              {arrayOfProperties.map((prop) => {
                return (
                  <span
                    key={prop.id}
                    className='flex shadow-lg justify-between items-center rounded-lg py-1 px-2 bg-neutral-300 mr-2 mb-2'
                  >
                    <p>{prop.name}</p>
                    <button
                      type='button'
                      onClick={() => {
                        const updatedProps = arrayOfProperties.filter(
                          (x) => x.id !== prop.id
                        );
                        setArrayOfProperties(updatedProps);
                      }}
                      className='bg-neutral-700 text-white rounded-full p-1 ml-2 hover:cursor-pointer hover:bg-black transition-all'
                    >
                      <X size={14} />
                    </button>
                  </span>
                );
              })}
            </div>

            {/* creating ghost inputs with the same name attribute so formData store them as string[] */}
            {arrayOfProperties.map((prop) => {
              return (
                <input
                  key={prop.id}
                  type='text'
                  defaultValue={prop.name}
                  name='properties'
                  id={`${prop.name}-hidden-input`}
                  className='hidden'
                />
              );
            })}
          </>
        )}

        {inputError !== '' && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
          >
            {inputError}
          </p>
        )}

        {state?.errors?.properties && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='properties-error-text'
            aria-label='properties-error-text'
          >
            {state.errors.properties}
          </p>
        )}
      </section>

      <section id='rarity-section' className='w-full mt-6'>
        <label htmlFor='rarity-selection' className='flex mb-1 ml-1'>
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
        {state?.errors?.rarity && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='rarity-error-text'
            aria-label='rarity-error-text'
          >
            {state.errors.rarity}
          </p>
        )}
      </section>

      <section id='weight-section' className='w-full mt-6'>
        <label htmlFor='weight-input' className='flex mb-1 ml-1'>
          <Weight strokeWidth={1.5} className='mr-2' />
          Weight
        </label>
        <input
          value={productWeight}
          onChange={(e) => setProductWeight(e.target.value)}
          type='text'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          name='weight'
          id='weight-input'
          aria-label='product-weight-input'
          placeholder='Weight...'
        />
        {state?.errors?.weight && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='weight-error-text'
            aria-label='weight-error-text'
          >
            {state.errors.weight}
          </p>
        )}
      </section>

      <section id='description-section' className='w-full mt-6'>
        <label htmlFor='description-input' className='flex mb-1 ml-1'>
          <Table strokeWidth={1.5} className='mr-2' />
          Description
        </label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all resize-none'
          name='description'
          id='description-input'
          aria-label='product-description-input'
          placeholder='Description...'
          rows={4}
        />
        {state?.errors?.description && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='description-error-text'
            aria-label='description-error-text'
          >
            {state.errors.description}
          </p>
        )}
      </section>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      id='create-product-button'
      aria-label='create-product-button'
      className={`
        text-white w-full mt-8 p-2 rounded-lg hover:bg-black/60 transition-all flex items-center justify-center
        ${
          pending
            ? 'bg-black/50 hover:cursor-not-allowed'
            : 'bg-black hover:cursor-pointer'
        }
      `}
    >
      Create
      {pending && <Loader2 strokeWidth={1.5} className='loading ml-2' />}
    </button>
  );
}
