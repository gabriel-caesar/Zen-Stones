'use client'

import { Image } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function InputImage({ state, name }: { state: any, name: string }) {

  // array of images being uploaded
  const [uploadedImageObjects, setUploadedImageObjects] = useState<File[] | []>(
    []
  );

  // wiggle wrong input
  const [wiggle, setWiggle] = useState(false);

  // handles ui changes when user uploads images
  function handleInputUpload(e: React.FormEvent<HTMLInputElement>) {
    const files = e.currentTarget.files; // FileList !== array
    if (!files) return;

    const filesArray = Array.from(files);

    // setting the array of files to the state
    setUploadedImageObjects(filesArray);
  }

  useEffect(() => {
    if (state?.errors) {
      setWiggle(false);
      requestAnimationFrame(() => setWiggle(true)); // restart animation
    }
  }, [state?.errors]);

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
            flex w-full items-center justify-between hover:cursor-pointer hover:bg-neutral-400 transition-all
          `}
          onClick={() => document.getElementById('product-photo-id')?.click()}
        >
          <span className='rounded-lg bg-black text-white px-2'>
            Choose file
          </span>
          <span className='border-l-2 pl-2 border-black'>
            {uploadedImageObjects.length > 0
              ? uploadedImageObjects.map((img) => {
                  return <p key={img.name}>{img.name}</p>;
                })
              : 'No file chosen'}
          </span>
        </div>

        {/* product image preview element */}
        <div
          id='image-preview-wrapper'
          className={`
            ${uploadedImageObjects.length <= 0 && 'hidden'}
            grid grid-cols-2 gap-2
          `}
        >
          {uploadedImageObjects.length > 0 &&
            uploadedImageObjects.map((img) => {
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
                    className='w-full border-1 border-neutral-400 rounded-lg shadow-lg mb-1'
                  />
                  <p className='w-full rounded-lg p-1 text-center bg-neutral-500 text-white'>
                    {img.name}
                  </p>
                </div>
              );
            })}
        </div>

        <input
          type='file'
          accept='image/*'
          multiple // accept multiple files
          name={name}
          id='product-photo-id'
          className='hidden'
          aria-label='product-image-input'
          onChange={(e) => handleInputUpload(e)}
        />
      </div>
      {state?.errors?.[name] && (
        <p
          className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${wiggle ? 'wiggle-input' : ''}`}
          id={`${name}-error-text`}
          aria-label={`${name}-error-text`}
        >
          {state.errors?.[name]}
        </p>
      )}
    </section>
  )
}