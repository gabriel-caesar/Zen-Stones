'use client';

import { ArrowLeft, ArrowRight, Image } from 'lucide-react';
import { SetStateAction, useEffect, useState } from 'react';
import { ProductWithImages } from '../lib/types';
import { deleteSingleImageFile } from '../lib/actions';

export default function InputImage({
  state,
  name,
  product,
  error,
  setError,
  uploadedImageObjects,
  setUploadedImageObjects,
}: {
  state: any;
  name: string;
  product?: ProductWithImages;
  error?: boolean;
  setError?: React.Dispatch<SetStateAction<boolean>>
  uploadedImageObjects: File[]
  setUploadedImageObjects: React.Dispatch<SetStateAction<File[]>>
}) {

  // splits the image name from the url
  const getUrlName = (url: string) => {
    const isSplit = url.split('/');
    const imageName = isSplit[isSplit.length - 1];
    return imageName;
  };
  
  // old images of the product
  const [existingImages, setExistingImages] = useState<string[] | undefined>(product?.urls || []);
  
  // this array is to keep track how many images are there to
  // be passed to the backend, since the existing images can't 
  // be interpreted by the form validation and the S3 instance (which are not type File)
  const [allImages, setAllImages] = useState<any[] | undefined>(product?.urls || [])

  // prevent dumb image deletes
  const [areYouSure, setAreYouSure] = useState<string>('');

  // wiggle wrong input
  const [wiggle, setWiggle] = useState(false);

  // handles ui changes when user uploads images
  function handleInputUpload(e: React.FormEvent<HTMLInputElement>) {
    const files = e.currentTarget.files; // FileList !== array
    if (!files) return;

    const filesArray = Array.from(files);
    // setting the array of files to the state
    setUploadedImageObjects(filesArray);

    // Keep old images that weren’t removed yet
    const stillExistingOldImages = existingImages || [];

    setAllImages([...filesArray, ...stillExistingOldImages]);    
  }

  // removes any existing images
  async function removeExistingImage(url: string) {
    // filtering the local existing images array from the removed image
    const updatedExistingImages = existingImages?.filter((x) => x !== url);
    setExistingImages(updatedExistingImages);

    // all images get updated
    setAllImages((prev) => prev?.filter(img => img.url !== url) );

    await deleteSingleImageFile(product?.id, url);
  }

  // function that handles image positioning
  function moveImage(direction: string, index: number) {
    setUploadedImageObjects(prev => {
      const copy = [...prev];
      const len = copy.length;
      const target =
        direction === 'left'
          ? (index - 1 + len) % len // handling left out of bounds
          : (index + 1) % len; // handling right out of bounds

      // swapping values
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  }

  // if user re-submit wrong data, wiggle the inputs again
  useEffect(() => {
    if (state?.errors) {
      setWiggle(false);
      requestAnimationFrame(() => setWiggle(true)); // restart animation
    }
  }, [state?.errors]);

  // if allImages is >= 5, call the cap error
  useEffect(() => {
    if (allImages && allImages.length >= 5) {
      setError?.(true)
    } else {
      setError?.(false)
    }
  }, [allImages])


  return (
    <section className='w-full' id='image-section'>
      <label htmlFor='product-photo-id' className='flex mb-1 ml-1'>
        <Image strokeWidth={1.5} className='mr-2' />
        Product image
      </label>
      <div className='flex flex-col items-center p-2 bg-neutral-300 rounded-lg cursor-pointer w-full'>
        <div
          className={`
            ${
              uploadedImageObjects.length > 0 &&
              'mb-6 border-1 border-neutral-400 '
            }
            p-1 rounded-lg
            flex w-full items-center justify-between hover:bg-neutral-400 transition-all
          `}
          onClick={() => document.getElementById('product-photo-id')?.click()}
        >
          <span className='rounded-lg bg-black text-white px-2'>
            Choose file
          </span>
          <span className='border-l-2 pl-2 border-black'>
            {uploadedImageObjects.length > 0
              ? uploadedImageObjects.map((img, i) => {
                  return <p key={img.name}>{img.name} ({i + 1})</p>;
                })
              : 'No file chosen'}
          </span>
        </div>

        {/* product image preview element */}
        <div
          id='image-preview-wrapper'
          className={`
            ${
              allImages && allImages.length === 0 ? 'hidden' : ''
            }
            grid grid-cols-1 md:grid-cols-2 gap-2
          `}
        >
          <>
            {uploadedImageObjects.map((img, i) => {
              return (
                <div
                  key={img.name}
                  className='flex flex-col justify-center items-center'
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`${img.name}-image-preview`}
                    id={`${img.name}-image-preview`}
                    aria-label={`${img.name}-image-preview`}
                    className='w-full border-1 border-neutral-400 rounded-lg shadow-lg mb-1 object-cover'
                  />
                  <span className='flex gap-2 rounded-lg p-1 text-center bg-neutral-500'>
                    <button
                      id='move-image-left'
                      aria-label='move-image-left'
                      className='hover:cursor-pointer rounded-md border-transparent hover:text-black hover:bg-white px-2 text-white transition-all'
                      onClick={() => moveImage('left', i)}
                      type='button'
                    >
                      <ArrowLeft strokeWidth={1.5} />
                    </button>
                    <p className='w-full text-white'>
                      {img.name}
                    </p>
                    <button
                      id='move-image-right'
                      aria-label='move-image-right'
                      className='hover:cursor-pointer rounded-md border-transparent hover:text-black hover:bg-white px-2 text-white transition-all'
                      onClick={() => moveImage('right', i)}
                      type='button'
                    >
                      <ArrowRight strokeWidth={1.5} />
                    </button>
                  </span>
                  
                </div>
              );
            })}
            {existingImages?.[0] !== 'NULL' && existingImages?.map((url) => (
              <div
                key={getUrlName(url)}
                className='flex flex-col justify-center items-center my-6 overflow-hidden'
              >
                <img
                  src={url}
                  alt={`${getUrlName(url)}-image-preview`}
                  id={`${getUrlName(url)}-image-preview`}
                  aria-label={`${getUrlName(url)}-image-preview`}
                  className='w-full border-1 border-neutral-400 rounded-lg shadow-lg mb-1 object-cover'
                />
                <p className='w-full rounded-lg p-1 text-center bg-neutral-500 text-white'>
                  {getUrlName(url)}
                </p>

                {areYouSure !== getUrlName(url) ? (
                  <button
                    id='remove-image-button'
                    aria-label='remove-image-button'
                    className='rounded-lg hover:cursor-pointer hover:bg-red-500/50 bg-red-600 active:brightness-75 p-2 w-full mt-1 transition-all border-1'
                    onClick={() => setAreYouSure(getUrlName(url))}
                    type='button'
                  >
                    Remove
                  </button>
                ) : (
                  <div className='flex flex-col justify-between items-center w-full '>
                    <button
                      id='remove-image-button'
                      aria-label='remove-image-button'
                      className='rounded-lg hover:cursor-pointer hover:bg-red-500/50 bg-red-600 active:brightness-75 p-2 w-full mt-1 transition-all border-1'
                      onClick={() => removeExistingImage(url)}
                      type='button'
                    >
                      Permanently remove image
                    </button>
                    <button
                      id='remove-image-button'
                      aria-label='remove-image-button'
                      className='rounded-lg hover:cursor-pointer hover:bg-green-500/50 bg-green-500 active:brightness-75 p-2 w-full mt-1 transition-all border-1'
                      onClick={() => setAreYouSure('')}
                      type='button'
                    >
                      Go back
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        </div>
 
        <input
          type='file'
          accept='image/*'
          multiple // accept multiple files
          name={name}
          id='product-photo-id'
          className='hidden hover:cursor-pointer'
          aria-label='product-image-input'
          onChange={(e) => handleInputUpload(e)} // JS updates the file list under the hood
        />

      </div>

      {state?.errors?.[name] && (
        <p
          className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
            wiggle ? 'wiggle-input' : ''
          }`}
          id={`${name}-error-text`}
          aria-label={`${name}-error-text`}
        >
          {state.errors?.[name]}
        </p>
      )}

      {error && (
        <p
          className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
            wiggle ? 'wiggle-input' : ''
          }`}
          id={`${name}-max-capacity-error`}
          aria-label={`${name}-max-capacity-error`}
        >
          Caution! Max capacity reached
        </p>
      )}
    </section>
  );
}
