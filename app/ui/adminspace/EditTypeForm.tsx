'use client';

import { SetStateAction, useActionState, useEffect, useState } from 'react';
import { Category, productType } from '@/app/lib/types';
import { Loader2, SquarePen } from 'lucide-react';
import { fetchTypeImage } from '@/app/lib/data';
import { editType } from '@/app/lib/actions';
import { useFormStatus } from 'react-dom';
import InputImage from '../InputImage';
import Select from '../Select';

export default function EditTypeForm({
  productTypes,
}: {
  productTypes: undefined | productType[];
}) {
  // handle form submission for type editing
  const [state, editProductTypeAction] = useActionState(editType, undefined);

  // wiggle wrong input
  const [wiggle, setWiggle] = useState(false);

  // selected category of the custom dropdown
  const [selectedCategory, setSelectCategory] = useState<string>('');

  // select sub-category of the custom dropdown
  const [selectedType, setSelectedType] = useState<string>(
    'Choose one option...'
  );

  // sets a new name to the current type being edited
  const [newName, setNewName] = useState<string>(selectedType);

  // header categories for the custom dropdown
  const categories: Category[] = ['Jewelry', 'Metaphysical'];

  // array of images being uploaded
  const [uploadedImageObjects, setUploadedImageObjects] = useState<File[] | []>(
    []
  );

  // state to add one more layer for security
  const [areYouSureEdit, setAreYouSureEdit] = useState<boolean>(false);

  // making sure admin is editing a type
  const [notEditingWarning, setNotEditingWarning] = useState<boolean>(false);

  // current type featured image
  const [currentTypeImage, setCurrentTypeImage] = useState<string | null>(null);

  // loading feedback for featured image fetch
  const [loadingFeatureImage, setLoadingFeatureImage] =
    useState<boolean>(false);

  // condition to edit types
  const isEditing = selectedType !== 'Choose one option...';

  // getting all the productType names from the productTypes array of objects
  const jewelryProductTypes = productTypes
    ?.filter((obj) => obj.parent_category === 'Jewelry')
    .map((obj) => obj.product_type);
  const metaphysicalProductTypes = productTypes
    ?.filter((obj) => obj.parent_category === 'Metaphysical')
    .map((obj) => obj.product_type);

  useEffect(() => {
    // brings the type selection to neutral
    setSelectedType('Choose one option...');
    // if a category is changed while areYouSure is true, toggle it off
    if (areYouSureEdit) setAreYouSureEdit(false);
    if (currentTypeImage) setCurrentTypeImage(null); // if an image was being show, hide it
  }, [selectedCategory]);

  useEffect(() => {
    if (state?.errors) {
      setWiggle(false);
      requestAnimationFrame(() => setWiggle(true)); // restart animation
    }
  }, [state?.errors]);

  useEffect(() => {
    if (isEditing) setNotEditingWarning(false); // if a type is selected, warning fades
    if (currentTypeImage) setCurrentTypeImage(null); // if an image was being show, hide it
    setNewName(selectedType); // input will have the selected type name by default
  }, [selectedType]);

  async function fetchFeaturedImage() {
    setLoadingFeatureImage(true);
    try {
      const featuredImage = await fetchTypeImage(
        selectedType,
        selectedCategory
      );
      setCurrentTypeImage(featuredImage);
    } catch (error) {
      throw new Error(`Couldn't fetch featured image. ${error}`);
    } finally {
      setLoadingFeatureImage(false);
    }
  }

  return (
    <form
      action={editProductTypeAction}
      className='rounded-lg shadow-xl p-2 bg-neutral-200 md:w-1/2 lg:w-2/5 w-11/12 my-10 relative'
      id='edit-productType-form'
    >
      <h1 className='flex font-bold mb-5'>
        <SquarePen className='mr-2' />
        Edit Product Type
      </h1>

      <div>
        <h2 className='mb-1 ml-1 font-bold'>Category:</h2>
        <Select
          options={categories}
          selector={selectedCategory}
          setSelector={setSelectCategory}
          className='mb-6 w-full'
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
      </div>

      <div>
        <h2 className='mb-1 ml-1 font-bold'>Type:</h2>
        <Select
          options={
            selectedCategory === 'Jewelry'
              ? jewelryProductTypes
              : metaphysicalProductTypes
          }
          selector={selectedType}
          setSelector={setSelectedType}
          className='w-full'
          id='productType-selection'
          ariaLabel='productType-selection'
          name='productType'
        />
        {state?.errors?.productType && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='edit-type-error-text'
            aria-label='edit-type-error-text'
          >
            {state.errors.productType}
          </p>
        )}
      </div>

      <div
        id='editing-wrapper'
        className={`
          bg-yellow-100 rounded-md p-2
          ${isEditing ? 'h-auto opacity-100 my-3' : 'h-0 opacity-0 pointer-events-none'} transition-all duration-500
        `}
      >
        <h1 className='mb-1 ml-1 font-bold' id='edited-type-header'>
          Editing <strong className='text-red-500'>{selectedType}</strong>
        </h1>
        <div
          id='new-type-name-container'
          className={`${isEditing ? 'opacity-100 mb-3' : 'opacity-0 pointer-events-none'} transition-all duration-300`}
        >
          <h2 className='mb-1 ml-1'>New type name:</h2>
          <input
            type='text'
            id='new-type-name-field'
            name='newTypeName'
            aria-label='new-type-name-field'
            placeholder='Type...'
            className='rounded-lg bg-neutral-300 w-full p-2 focus-within:outline-none search-focus transition-all'
            value={newName}
            onChange={(e) => {
              if (e.target.value.length <= 20) setNewName(e.target.value);
            }}
          />
        </div>
        {state?.errors?.newTypeName && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white my-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='edit-type-error-text'
            aria-label='edit-type-error-text'
          >
            {state.errors.newTypeName}
          </p>
        )}

        <div
          id='input-image-wrapper'
          className={`${isEditing ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all`}
        >
          <InputImage
            state={state}
            name={'newFeaturedPhoto'}
            uploadedImageObjects={uploadedImageObjects}
            setUploadedImageObjects={setUploadedImageObjects}
            isFeaturing={true}
          />
        </div>

        <div
          id='old-featured-image-container'
          className='flex flex-col justify-center items-center'
        >
          <button
            type='button'
            id='show-old-featured-image-button'
            aria-label='show-old-featured-image-button'
            onClick={async () => {
              if (!currentTypeImage) {
                await fetchFeaturedImage(); // show
              } else {
                setCurrentTypeImage(null); // hide
              }
            }}
            className={`
              ${isEditing ? 'opacity-100 mt-6' : 'opacity-0 pointer-events-none'} transition-all
              bg-black text-white hover:cursor-pointer hover:bg-neutral-600 active:bg-neutral-400
              rounded-lg p-2 text-center text-sm
            `}
          >
            {currentTypeImage
              ? 'Hide current featured image'
              : 'Show current featured image'}
          </button>
          {loadingFeatureImage && (
            <div
              id='image-loader'
              className='w-full flex flex-col items-center justify-center mt-6'
            >
              <Loader2 className='loading' />
              <p>Loading image...</p>
            </div>
          )}
          <div
            id='featured-image-wrapper'
            className={`${currentTypeImage ? 'opacity-100 mt-5' : 'opacity-0 pointer-events-none'} rounded-md shadow-md overflow-hidden border-1 border-white w-3/4 transition-all`}
          >
            <img
              src={currentTypeImage as string}
              alt='old-image'
              className='w-full'
              id='old-type-image'
              aria-label='old-type-image'
            />
          </div>
        </div>
      </div>

      {areYouSureEdit ? (
        <div>
          <h2 className='text-center font-bold'>
            Are you sure you want to proceed editing?
          </h2>
          <p
            id='editing-info-text'
            aria-label='editing-info-text'
            className='text-neutral-400 text-sm my-3 text-center'
          >
            By editing this type, all products under it will change to this new
            type name and if a new featured photo is being added, the old one
            will be permanently removed
          </p>
          <div
            id='buttons-container'
            className='flex items-center justify-between'
          >
            <button
              type='button'
              id='cancel-button'
              aria-label='cancel-button'
              className='w-full rounded-lg flex justify-center items-center bg-yellow-100 py-2 mr-6 border-1 border-yellow-300 hover:bg-yellow-300 hover:cursor-pointer active:bg-yellow-500 transition-all'
              onClick={() => setAreYouSureEdit(false)}
            >
              Cancel
            </button>
            <SubmitButton
            />
          </div>
        </div>
      ) : (
        <button
          id='first-edit-button'
          aria-label='first-edit-button'
          className={`
            ${!isEditing && 'mt-3'}
            w-full flex justify-center items-center active:bg-neutral-600
            hover:brightness-60 text-center rounded-lg py-2 transition-all  
            bg-black text-white hover:cursor-pointer
          `}
          type='button'
          onClick={() => {
            if (isEditing) {
              setNotEditingWarning(false);
              setAreYouSureEdit(true);
            } else {
              setNotEditingWarning(true);
            }
          }}
        >
          Edit Product Type
        </button>
      )}
      {notEditingWarning && (
        <div
          id='select-type-warning'
          className={`
            bg-red-400 text-white border-1 border-red-500 rounded-lg 
            p-2 text-center mt-3
          `}
        >
          Select a type to edit something
        </div>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      id={`edit-productType-button`}
      aria-label={`edit-productType-button`}
      className={`
          sm:w-1/2 w-full lg:w-full flex justify-center items-center
          hover:bg-black/60 text-center rounded-lg py-2 transition-all
          ${
            pending
              ? 'bg-black/50 hover:cursor-not-allowed'
              : 'bg-black text-white hover:cursor-pointer'
          }
        `}
    >
      {pending ? 'Editing' : 'Proceed'}
      {pending && <Loader2 strokeWidth={1.5} className='loading ml-2' />}
    </button>
  );
}
