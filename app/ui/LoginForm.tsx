'use client'

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2, LogIn } from 'lucide-react';
import { login } from '../lib/actions';

export default function LoginForm() {

  // login function and error messages stored inside state
  const [state, loginAction] = useActionState(login, undefined);

  // used to persist user input even if validation failed
  const [emailState, setEmailState] = useState<string>('');
  const [passwordState, setPasswordState] = useState<string>('');

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
          value={emailState}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailState(e.target.value)}
          className='sm:w-1/2 w-full px-4 mb-3 py-2 bg-neutral-200 rounded-lg border-1 border-neutral-300 search-focus focus-within:outline-none transition-all'
          type='email'
          name='email'
          id='email-input-field'
          aria-label='email-input-field'
          placeholder='Email address...'
        />
        {state?.errors?.email && (
          <p
            className='bg-red-500 rounded-lg w-full sm:w-1/2 text-center px-2 py-2 mb-3 text-white'
            id='email-error-text'
            aria-label='email-error-text'
          >
            {state.errors.email}
          </p>
        )}

        <input
          value={passwordState}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordState(e.target.value)}
          className='sm:w-1/2 w-full px-4 py-2 bg-neutral-200 rounded-lg border-1 border-neutral-300 search-focus focus-within:outline-none transition-all'
          type='password'
          name='password'
          id='password-input-field'
          aria-label='password-input-field'
          placeholder='Password...'
        />
        {state?.errors?.password && (
          <p
            className='text-white sm:w-1/2 w-full text-center rounded-lg px-2 py-2 mt-3 bg-red-500'
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
      id='login-button'
      aria-label='login-button'
      className={`
        sm:w-1/2 ${pending ? 'bg-black/50 hover:cursor-not-allowed' : 'bg-black hover:cursor-pointer'}
        rounded-lg w-full text-white hover:bg-black/60 py-2 mt-6 flex items-center justify-center
      `}
    >
      Log In
      {pending && <Loader2 strokeWidth={1.5} className='loading ml-2' />}
    </button>
  )
}