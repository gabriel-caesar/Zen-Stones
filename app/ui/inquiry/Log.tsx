'use client'

import { logout } from '@/app/lib/actions';
import { useRootContext } from '@/app/RootContext';
import { UserStar } from 'lucide-react';
import Link from 'next/link';

export default function Log() {

  // getting the provided values from context
  const { session } = useRootContext();

  return (
    <div
      className='w-full border-t-1 border-neutral-300 px-2 py-6'
    >
      <h1 className='flex font-bold mb-6'>
        <UserStar className='ml-1 mr-2' />
        {!session ? 'Admin log in' : 'Admin log out'}
      </h1>
      
      {!session ? (
        <Link
          href={'/login'}
          className='bg-black text-white hover:cursor-pointer hover:bg-black/60 rounded-lg py-2 px-10 transition-all'
          id='login-button'
          aria-label='login-button'
        >
          Log In
        </Link>
      ) : (
        <button
          onClick={() => logout()}
          className='active:bg-black/30 bg-black text-white hover:cursor-pointer hover:bg-black/60 rounded-lg py-2 px-10 transition-all'
          id='logout-button'
          aria-label='logout-button'
        >
          Log Out
        </button>
      )}
    </div>
  )
}