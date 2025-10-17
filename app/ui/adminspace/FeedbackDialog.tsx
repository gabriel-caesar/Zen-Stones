'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FeedbackDialog({ params, text }: { params: string | undefined, text: string }) {
  // state used to close the feedback dialog after user created a product
  const [closeDialog, setCloseDialog] = useState<boolean>(false);

  const pathname = usePathname(); // current path (/admin-space/manage-products)
  const { replace } = useRouter(); // url replacer

  return (
    <>
      {(params && !closeDialog) && (
        <div 
          className='flex flex-col items-center justify-center rounded-lg p-2 z-3 bg-green-500 shadow-2xl w-3/4 py-10 border border-neutral-700 md:w-1/2 lg:w-1/4 fixed top-1/5'
        >
          <h1 className='text-center'>
            {text}
          </h1>
          <button
            className='bg-black text-white rounded-lg w-3/4 py-2 mt-8 transition-all hover:cursor-pointer hover:bg-black/60'
            onClick={() => {
              setCloseDialog(true);
              replace(`${pathname}`); // removes the params out of the URL
            }}
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  )
}