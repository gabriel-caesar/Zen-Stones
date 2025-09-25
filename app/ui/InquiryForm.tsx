import { Container } from 'lucide-react';

export default function InquiryForm() {
  return (
    <form
      action=''
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


      <div className='w-full md:flex md:justify-between'>
        <input
          className='
            md:mb-0 md:mr-8 
            w-full px-4 py-2 bg-neutral-200 rounded-lg mb-3 border-1 border-neutral-300 search-focus focus-within:outline-none transition-all
          '
          type='text'
          placeholder='Your first name...'
        />
        <input
          className='w-full px-4 py-2 bg-neutral-200 rounded-lg border-1 border-neutral-300 search-focus focus-within:outline-none transition-all'
          type='text'
          placeholder='Your last name...'
        />
      </div>

      <input
        className='w-full my-3 px-4 py-2 bg-neutral-200 rounded-lg border-1 border-neutral-300 search-focus focus-within:outline-none transition-all'
        type='text'
        placeholder='Inquiry title...'
      />

      <div className='flex flex-col'>
        <textarea
          className='resize-none w-full px-4 py-2 justify-center items-center bg-neutral-200 rounded-lg border-1 search-focus focus-within:outline-none transition-all border-neutral-300'
          aria-label='inquiry-input-field'
          name='inquiry-desc'
          id='inquiry-desc'
          placeholder='Your inquiry...'
        ></textarea>
      </div>

      <button
        id='send-inquiry-button'
        aria-label='send-inquiry-button'
        className='
          md:w-1/3
          rounded-lg w-full bg-black text-white hover:cursor-pointer hover:bg-black/60 py-2 mt-6 
        '
      >
        Send Inquiry
      </button>
    </form>
  );
}
