'use client';

import {
  Atom,
  Boxes,
  ChartBarIncreasingIcon,
  ChartColumnBig,
  CircleStar,
  DollarSign,
  FileBox,
  FolderPen,
  List,
  Loader2,
  RulerDimensionLine,
  Sparkles,
  Table,
  Weight,
  X,
  Zap,
} from 'lucide-react';
import { SetStateAction, startTransition, useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRootContext } from '@/app/RootContext';
import Select from '../../Select';
import InputImage from '../../InputImage';
import { ProductWithImages } from '@/app/lib/types';
import { uniqueId } from '@/app/lib/utils';
import { editProduct } from '@/app/lib/actions';

export default function EditProductForm({
  product,
}: {
  product: ProductWithImages;
}) {
  // form action
  const [state, editProductAction] = useActionState(editProduct, undefined);

  // wiggle wrong input
  const [wiggle, setWiggle] = useState(false);

  // array of images being uploaded
  const [uploadedImageObjects, setUploadedImageObjects] = useState<File[] | []>(
    []
  );

  // controllable form data
  const formData = new FormData();

  // selected category of the custom dropdown
  const [selectedCategory, setSelectCategory] = useState<string>(
    product.category || 'Choose one option...'
  );

  // select product type of the custom dropdown
  const [selectedType, setSelectedType] = useState<string>(
    product?.product_type || 'Choose one option...'
  );

  // type for the errors
  type InputError = { message: string; input: string };

  // error state to warn user of whatever error that pops up
  const [inputError, setInputError] = useState<InputError | string>('');

  // prevents the form submission if there are >= 5 images uploaded
  const [imageCapError, setImageCapError] = useState<boolean>(false);

  // states to persist user input
  const [productName, setProductName] = useState<string>(product.name);
  const [productPrice, setProductPrice] = useState<string>(
    String(product.price)
  );
  const [productWeight, setProductWeight] = useState<string>(product.weight);
  const [productSize, setProductSize] = useState<string>(product.size);
  const [productDescription, setProductDescription] = useState<string>(
    product.description
  );
  const [productMeaning, setProductMeaning] = useState<string>(product.meaning);
  const [featuredMaterial, setFeaturedMaterial] = useState<string>(
    product.featured_material
  );
  const [selectedRarity, setSelectedRarity] = useState<string>(product.rarity);
  const [productProperties, setProductProperties] = useState<string>('');
  const [productMaterials, setProductMaterials] = useState<string>('');
  const [productIndications, setProductIndications] = useState<string>('');

  // for properties and materials input
  type inputProps = { name: string; id: string };

  const productPros = product.properties.map((p) => ({
    name: p,
    id: uniqueId(),
  }));
  const productMat = product.material.map((p) => ({ name: p, id: uniqueId() }));
  const productInd = product.indicated_for.map((p) => ({
    name: p,
    id: uniqueId(),
  }));

  // will store all properties that user've inputed
  const [arrayOfProperties, setArrayOfProperties] =
    useState<inputProps[]>(productPros);

  // will store all materials of a product
  const [arrayOfMaterials, setArrayOfMaterials] =
    useState<inputProps[]>(productMat);

  // will store all indications of a product
  const [arrayOfIndications, setArrayOfIndications] =
    useState<inputProps[]>(productInd);

  // header categories for the custom dropdown
  const categories = ['Jewelry', 'Metaphysical'];
  const { productTypes } = useRootContext();
  const rarities = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary'];

  // getting all the productType names from the productTypes array of objects
  const jewelryProductType = productTypes
    ?.filter((obj) => obj.parent_category === 'Jewelry')
    .map((obj) => obj.product_type);
  const metaphysicalProductType = productTypes
    ?.filter((obj) => obj.parent_category === 'Metaphysical')
    .map((obj) => obj.product_type);

  function feedProperties(
    state: string,
    setState: React.Dispatch<SetStateAction<string>>,
    array: inputProps[],
    setArray: React.Dispatch<SetStateAction<inputProps[]>>,
    max: number,
    inputName: string
  ) {
    if (state.length <= 0) return;
    const id = uniqueId();
    const newObj = { name: state.trim(), id: id };

    // prevent duplicates
    const isDuplicate = array.some(
      (p) => p.name.toLowerCase() === state.toLowerCase()
    );

    // prevents overflow
    const maxProps = array.length === max;

    if (isDuplicate) {
      setInputError({
        message: `Cannot have duplicate ${inputName}`,
        input: inputName,
      });
      return;
    } else if (maxProps) {
      setInputError({
        message: `Max number of ${inputName} reached`,
        input: inputName,
      });
      return;
    }

    setArray((prev) => [...prev, newObj]);
    setState('');

    // if duplicate error is not empty
    if (inputError !== '') setInputError('');
  }

  useEffect(() => {
    if (state?.errors) {
      setWiggle(false);
      requestAnimationFrame(() => setWiggle(true)); // restart animation
    }
  }, [state?.errors]);

  return (
    <form
      onSubmit={(e) => {
        // of there are 5 or more images being uploaded, disable submission
        if (imageCapError) return;

        // submitting the formData manually to have
        // control over the product image positionings
        e.preventDefault();

        // appending the image file objects to the form data
        uploadedImageObjects.forEach(file => {
          formData.append('productPhoto', file)
        })

        formData.append('name', productName);
        formData.append('price', productPrice);
        formData.append('weight', productWeight);
        formData.append('size', productSize);
        formData.append('description', productDescription);
        formData.append('meaning', productMeaning);
        formData.append('featured_material', featuredMaterial);
        formData.append('productType', selectedType);
        formData.append('rarity', selectedRarity);
        formData.append('category', selectedCategory);
        formData.append('id', product.id)
        arrayOfProperties.forEach(p => formData.append('properties', p.name))
        arrayOfMaterials.forEach(p => formData.append('materials', p.name))
        arrayOfIndications.forEach(p => formData.append('indications', p.name))

        // we need this function to tell React “this is a low-priority async update”
        startTransition(() => {
          editProductAction(formData);
        });

      }}
      className='rounded-lg shadow-xl p-2 bg-neutral-200 md:w-1/2 lg:w-2/5 w-11/12 my-10 relative lg:ml-10'
    >
      <h1 className='flex font-bold lg:text-lg mb-8'>
        <FileBox className='mr-2' />
        Add product
      </h1>

      <InputImage
        state={state}
        name={'productPhoto'}
        product={product}
        error={imageCapError}
        setError={setImageCapError}
        uploadedImageObjects={uploadedImageObjects}
        setUploadedImageObjects={setUploadedImageObjects}
      />

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
        {state?.errors && 'name' in state.errors && state.errors.name && (
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
          isEditing={true}
        />
        {state?.errors &&
          'category' in state.errors &&
          state.errors.category && (
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

      <section id='productType-section' className='w-full mt-6'>
        <label htmlFor='productType-selection' className='flex mb-1 ml-1'>
          <ChartBarIncreasingIcon strokeWidth={1.5} className='mr-2' />
          Product type
        </label>
        <Select
          options={
            selectedCategory === 'Jewelry'
              ? jewelryProductType
              : selectedCategory === 'Metaphysical'
              ? metaphysicalProductType
              : []
          }
          selector={selectedType}
          setSelector={setSelectedType}
          id='productType-selection'
          ariaLabel='productType-selection'
          name='productType'
          isEditing={true}
        />
        {state?.errors &&
          'productType' in state.errors &&
          state.errors.productType && (
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
        {state?.errors && 'price' in state.errors && state.errors.price && (
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
            if (e.target.value.length <= 25) {
              setProductProperties(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              feedProperties(
                productProperties,
                setProductProperties,
                arrayOfProperties,
                setArrayOfProperties,
                10,
                'properties'
              );
            }
          }}
          type='text'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          name='properties-for-ui' // doesn't get captured on submission
          id='properties-input'
          aria-label='product-properties-input'
          placeholder='This product has...'
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

        {(inputError as InputError).input === 'properties' && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
          >
            {(inputError as InputError).message}
          </p>
        )}

        {state?.errors &&
          'properties' in state.errors &&
          state.errors.properties && (
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

      <section id='materials-section' className='w-full mt-6'>
        <label htmlFor='materials-input' className='flex mb-1 ml-1'>
          <Zap strokeWidth={1.5} className='mr-2' />
          Materials
        </label>
        <input
          value={productMaterials}
          onChange={(e) => {
            if (e.target.value.length <= 15) {
              setProductMaterials(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              feedProperties(
                productMaterials,
                setProductMaterials,
                arrayOfMaterials,
                setArrayOfMaterials,
                15,
                'materials'
              );
            }
          }}
          type='text'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          name='materials-for-ui' // doesn't get captured on submission
          id='materials-input'
          aria-label='product-materials-input'
          placeholder='Materials...'
        />

        {arrayOfMaterials.length > 0 && (
          <>
            <div className='flex flex-wrap p-1 rounded-lg border-1 shadow-lg border-neutral-500 mt-2'>
              {arrayOfMaterials.map((prop) => {
                return (
                  <span
                    key={prop.id}
                    className='flex shadow-lg justify-between items-center rounded-lg py-1 px-2 bg-neutral-300 mr-2 mb-2'
                  >
                    <p>{prop.name}</p>
                    <button
                      type='button'
                      onClick={() => {
                        const updatedProps = arrayOfMaterials.filter(
                          (x) => x.id !== prop.id
                        );
                        setArrayOfMaterials(updatedProps);
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
            {arrayOfMaterials.map((prop) => {
              return (
                <input
                  key={prop.id}
                  type='text'
                  defaultValue={prop.name}
                  name='materials'
                  id={`${prop.name}-hidden-input`}
                  className='hidden'
                />
              );
            })}
          </>
        )}

        {(inputError as InputError).input === 'materials' && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
          >
            {(inputError as InputError).message}
          </p>
        )}

        {state?.errors &&
          'materials' in state.errors &&
          state.errors.materials && (
            <p
              className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
                wiggle ? 'wiggle-input' : ''
              }`}
              id='materials-error-text'
              aria-label='materials-error-text'
            >
              {state.errors.materials}
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
          raritySelect={true}
          isEditing={true}
        />
        {state?.errors && 'rarity' in state.errors && state.errors.rarity && (
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

      <section id='featured-material-section' className='w-full mt-6'>
        <label htmlFor='featured-material-selection' className='flex mb-1 ml-1'>
          <Boxes strokeWidth={1.5} className='mr-2' />
          Featured material
        </label>
        <Select
          options={arrayOfMaterials.map((el) => el.name)}
          selector={featuredMaterial}
          setSelector={setFeaturedMaterial}
          id='featured-material-selection'
          ariaLabel='featured-material-selection'
          name='featured_material'
          isEditing={true}
        />
        {state?.errors &&
          'featured_material' in state.errors &&
          state.errors.featured_material && (
            <p
              className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
                wiggle ? 'wiggle-input' : ''
              }`}
              id='featured-material-error-text'
              aria-label='featured-material-error-text'
            >
              {state.errors.featured_material}
            </p>
          )}
      </section>

      <section id='size-section' className='w-full mt-6'>
        <label htmlFor='size-input' className='flex mb-1 ml-1'>
          <RulerDimensionLine strokeWidth={1.5} className='mr-2' />
          Size
        </label>
        <input
          value={productSize}
          onChange={(e) => setProductSize(e.target.value)}
          type='text'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          name='size'
          id='size-input'
          aria-label='product-size-input'
          placeholder='8mm...'
        />
        {state?.errors && 'size' in state.errors && state.errors.size && (
          <p
            className={`
              ${wiggle ? 'wiggle-input' : ''}
              bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 
            `}
            id='size-error-text'
            aria-label='size-error-text'
          >
            {state.errors.size}
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
        {state?.errors && 'weight' in state.errors && state.errors.weight && (
          <p
            className={`
              ${wiggle ? 'wiggle-input' : ''}
              bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 
            `}
            id='weight-error-text'
            aria-label='weight-error-text'
          >
            {state.errors.weight}
          </p>
        )}
      </section>

      <section id='indications-section' className='w-full mt-6'>
        <label htmlFor='indications-input' className='flex mb-1 ml-1'>
          <Atom strokeWidth={1.5} className='mr-2' />
          Indicated for
        </label>
        <input
          value={productIndications}
          onChange={(e) => {
            if (e.target.value.length <= 25) {
              setProductIndications(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              feedProperties(
                productIndications,
                setProductIndications,
                arrayOfIndications,
                setArrayOfIndications,
                15,
                'indications'
              );
            }
          }}
          type='text'
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all'
          name='indications-for-ui' // doesn't get captured on submission
          id='indications-input'
          aria-label='product-indications-input'
          placeholder='Indications...'
        />

        {arrayOfIndications.length > 0 && (
          <>
            <div className='flex flex-wrap p-1 rounded-lg border-1 shadow-lg border-neutral-500 mt-2'>
              {arrayOfIndications.map((prop) => {
                return (
                  <span
                    key={prop.id}
                    className='flex shadow-lg justify-between items-center rounded-lg py-1 px-2 bg-neutral-300 mr-2 mb-2'
                  >
                    <p>{prop.name}</p>
                    <button
                      type='button'
                      onClick={() => {
                        const updatedProps = arrayOfIndications.filter(
                          (x) => x.id !== prop.id
                        );
                        setArrayOfIndications(updatedProps);
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
            {arrayOfIndications.map((prop) => {
              return (
                <input
                  key={prop.id}
                  type='text'
                  defaultValue={prop.name}
                  name='indications'
                  id={`${prop.name}-hidden-input`}
                  className='hidden'
                />
              );
            })}
          </>
        )}

        {(inputError as InputError).input === 'indications' && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
          >
            {(inputError as InputError).message}
          </p>
        )}

        {state?.errors &&
          'indications' in state.errors &&
          state.errors.indications && (
            <p
              className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
                wiggle ? 'wiggle-input' : ''
              }`}
              id='indications-error-text'
              aria-label='indications-error-text'
            >
              {state.errors.indications}
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
        {state?.errors &&
          'description' in state.errors &&
          state.errors.description && (
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

      <section id='meaning-section' className='w-full mt-6'>
        <label htmlFor='meaning-input' className='flex mb-1 ml-1'>
          <Sparkles strokeWidth={1.5} className='mr-2' />
          Meaning
        </label>
        <textarea
          value={productMeaning}
          onChange={(e) => setProductMeaning(e.target.value)}
          className='rounded-lg bg-neutral-300 p-2 w-full focus-within:outline-none search-focus transition-all resize-none'
          name='meaning'
          id='meaning-input'
          aria-label='product-meaning-input'
          placeholder='Meaning...'
          rows={4}
        />
        {state?.errors && 'meaning' in state.errors && state.errors.meaning && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='meaning-error-text'
            aria-label='meaning-error-text'
          >
            {state.errors.meaning}
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
      {pending ? <>Submitting <Loader2 strokeWidth={1.5} className='loading ml-2' /></> : 'Submit'}
    </button>
  );
}
