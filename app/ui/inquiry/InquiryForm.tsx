'use client'

import { useActionState, useEffect, useState } from 'react';
import { sendInquiry } from '../../lib/actions';
import { Container, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { ProductWithImages } from '@/app/lib/types';

export default function InquiryForm({ product } : { product?: ProductWithImages }) {

  // form action to send inquiries
  const [state, sendInquiryAction] = useActionState(sendInquiry, undefined);

  // wiggle wrong input
  const [wiggle, setWiggle] = useState(false);

  // default values based on a inquiried product
  const defaultValueInquiry = product ? `Hello, I want to know more about ${product.name}.` : '';
  const defaultValueTitle = product ? `Inquiry for ${product.name}` : '';

  // form states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [title, setTitle] = useState<string>(defaultValueTitle);
  const [inquiry, setInquiry] = useState<string>(defaultValueInquiry);

  // wiggle animation toggler
  useEffect(() => {
    if (state?.errors) {
      setWiggle(false);
      requestAnimationFrame(() => setWiggle(true)); // restart animation
    }
  }, [state?.errors]);

  return (
    <form
      action={sendInquiryAction}
      className='
        md:w-1/2
        border-1 w-5/6 border-neutral-300 shadow-2xl bg-transparent backdrop-blur rounded-lg my-10 p-6
      '
      id='inquiry-form-container'
      aria-label='inquiry-form-container'
    >
      <h2 className='font-bold mb-6 flex'>
        <Container className='mr-2' />
        Your inquiry
      </h2>

      <h3 className='mb-10 text-center'>
        Send us a question and we will be pleased to answer you with all details
        possible.
      </h3>


      <section className='mb-3' id='name-section'>
        <label 
          htmlFor="user-name"
          id='user-name-label'
          className='text-lg ml-1'
        >
          Name
        </label>
        <input
          className=' 
            w-full px-4 py-2 bg-neutral-200 rounded-lg border-1 border-neutral-300 search-focus 
            focus-within:outline-none transition-all mt-1
          '
          id='user-name'
          value={name}
          onChange={e => {
            if (e.target.value.length <= 18) {
              setName(e.target.value)
            }
          }}
          type='text'
          name='name'
          placeholder='Your name...'
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
      
      <section className='mb-3' id='email-section'>
        <label 
          htmlFor="user-email"
          id='user-email-label'
          className='text-lg ml-1'
        >
          Email
        </label>
        <input
          className=' 
            w-full px-4 py-2 bg-neutral-200 rounded-lg border-1 border-neutral-300 search-focus 
            focus-within:outline-none transition-all mt-1
          '
          value={email}
          onChange={e => setEmail(e.target.value)}
          id='user-email'
          type='text'
          name='email'
          placeholder='Your email...'
        />
        {state?.errors?.email && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='email-error-text'
            aria-label='email-error-text'
          >
            {state.errors.email}
          </p>
        )}
      </section>

      <section id="email-title-section" className='mb-3'>
        <label 
          htmlFor="title"
          className='text-lg ml-1'
          id='title-label'
        >
          Title
        </label>
         <input
          value={title}
          onChange={e => {
            if (e.target.value.length <= 40) {
              setTitle(e.target.value)
            }
          }}
          className='w-full px-4 py-2 bg-neutral-200 rounded-lg border-1 border-neutral-300 search-focus focus-within:outline-none transition-all mt-1'
          type='text'
          id='title'
          name='title'
          placeholder='Inquiry title...'
        />
        {state?.errors?.title && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='title-error-text'
            aria-label='title-error-text'
          >
            {state.errors.title}
          </p>
        )}
      </section>

     

      <section id='inquiry-section' className='flex flex-col'>
        <label htmlFor="inquiry" className='ml-1 text-lg'>
          Inquiry
        </label>
        <textarea
          value={inquiry}
          onChange={e => setInquiry(e.target.value)}
          className='resize-none w-full px-4 py-2 justify-center items-center bg-neutral-200 rounded-lg border-1 search-focus focus-within:outline-none transition-all border-neutral-300 mt-1'
          aria-label='inquiry-input-field'
          name='inquiry'
          id='inquiry'
          rows={8}
          placeholder='Your inquiry...'
        ></textarea>
        {state?.errors?.inquiry && (
          <p
            className={`bg-red-500 rounded-lg w-full text-center px-2 py-2 text-white mt-2 ${
              wiggle ? 'wiggle-input' : ''
            }`}
            id='inquiry-error-text'
            aria-label='inquiry-error-text'
          >
            {state.errors.inquiry}
          </p>
        )}
      </section>

      {/* Ghost input to be sent via server action */}
      {product && (
        <input 
          type="text" 
          className='hidden'
          name='product_id'
          value={product.id}
          readOnly
        />
      )}

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
      id='send-inquiry-button'
      aria-label='send-inquiry-button'
      className={`
        md:w-1/3 flex items-center justify-center text-center transition-all
        rounded-lg w-full bg-black text-white hover:bg-black/60 py-2 mt-6 
        ${
          pending
            ? 'bg-black/50 hover:cursor-not-allowed'
            : 'bg-black hover:cursor-pointer'
        }
      `}
    >
      {pending ? <>Sending <Loader2 strokeWidth={1.5} className='loading ml-2' /></> : 'Send Inquiry'}
    </button>
  );
}
