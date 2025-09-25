'use client'

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { LogIn } from 'lucide-react';
import { login } from '../lib/actions';

export default function LoginForm() {

  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form
      action={loginAction}
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
        {state?.errors?.email && (
          <p
            className='bg-red-500 rounded-lg px-2 py-2 mb-3 text-white'
            id='email-error-text'
            aria-label='email-error-text'
          >
            {state.errors.email}
          </p>
        )}

        <input
          className='sm:w-1/2 w-full px-4 py-2 bg-neutral-200 rounded-lg border-1 border-neutral-300 search-focus focus-within:outline-none transition-all'
          type='password'
          name='password'
          placeholder='Password...'
        />
        {state?.errors?.password && (
          <p
            className='text-white rounded-lg px-2 py-2 mt-3 bg-red-500'
            id='password-error-text'
            aria-label='password-error-text'
          >
            {state.errors.password}
          </p>
        )}

        <SubmitButton />
      </div>

    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={ pending }
      id='send-inquiry-button'
      aria-label='send-inquiry-button'
      className='
        sm:w-1/2
        rounded-lg w-full bg-black text-white hover:cursor-pointer hover:bg-black/60 py-2 mt-6 
      '
    >
      Log In
    </button>
  )
}