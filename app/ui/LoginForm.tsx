import { LogIn } from 'lucide-react';

export default function LoginForm() {
  return (
    <form
      action=''
      className='
        md:w-1/2 
        flex flex-col border-1 w-5/6 border-neutral-300 shadow-2xl bg-transparent backdrop-blur rounded-lg my-10 p-6
      '
      id='inquiry-form-container'
      aria-label='inquiry-form-container'
    >
      <h2 className='font-bold mb-6 flex sm:justify-center sm:items-center'>
        <LogIn className='mr-2' />
        Log into you account
      </h2>

      <div className='flex flex-col justify-center items-center'>
        <input
          className='sm:w-1/2 w-full px-4 mb-3 py-2 bg-neutral-200 rounded-lg border-1 border-neutral-300 search-focus focus-within:outline-none transition-all'
          type='email'
          name='email'
          placeholder='Email address...'
        />

        <input
          className='sm:w-1/2 w-full px-4 py-2 bg-neutral-200 rounded-lg border-1 border-neutral-300 search-focus focus-within:outline-none transition-all'
          type='password'
          name='password'
          placeholder='Password...'
        />

        <button
          id='send-inquiry-button'
          aria-label='send-inquiry-button'
          className='
            sm:w-1/2
            rounded-lg w-full bg-black text-white hover:cursor-pointer hover:bg-black/60 py-2 mt-6 
          '
        >
          Log In
        </button>
      </div>

    </form>
  )
}