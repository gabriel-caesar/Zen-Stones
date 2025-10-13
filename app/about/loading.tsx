import { Loader2 } from 'lucide-react';

export default function Loading() {
  return(
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <h1
        className='text-neutral-500 mb-5'
      >
        Loading...
      </h1>
      <Loader2 size={64} strokeWidth={1} className='loading text-neutral-500' />
    </div>
  )
}