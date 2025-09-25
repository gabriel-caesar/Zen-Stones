import { UserStar } from 'lucide-react';
import Link from 'next/link';
import InquiryForm from '../ui/InquiryForm';

export default function Inquiry() {
  return (
    <div
      className='flex flex-col justify-center items-center'
      id='inquiry-page-wrapper'
    >
      <InquiryForm />
      <div
        className='w-full border-t-1 border-neutral-500 px-2 py-6'
      >
        <h1 className='flex font-bold mb-6'>
          <UserStar className='ml-1 mr-2' />
          Admin log in
        </h1>
        <Link
          href={'/login'}
          className='bg-black text-white hover:cursor-pointer hover:bg-black/60 rounded-lg py-2 px-10'
          id='login-button'
          aria-label='login-button'
        >
          Log In
        </Link>
      </div>
    </div>
  )
}