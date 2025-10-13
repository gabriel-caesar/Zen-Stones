'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Accordion({
  text,
  content,
  margin,
  isArray,
  listTitle,
  visibility,
}: {
  text: string;
  content: string | string[];
  margin: string;
  isArray?: boolean;
  listTitle?: string;
  visibility?: string;
}) {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);

  return (
    <>
      <div
        id='accordion-wrapper'
        onClick={() => setOpenAccordion(!openAccordion)}
        className={`
        ${visibility}
        ${margin}
        ${openAccordion ? 'bg-yellow-100 border-1 border-yellow-300' : 'border-1 border-transparent'}
        w-full transition-all rounded-lg hover:cursor-pointer
        hover:bg-neutral-300 flex justify-between items-center flex-col
        p-2
      `}
      >
        <div className='w-full flex items-center justify-between'>
          <p className='text-xl md:text-[18px]'>{text}</p>
          <ChevronDown
            strokeWidth={1.5}
            size={30}
            className={`${
              openAccordion ? '-rotate-180' : 'rotate-0'
            } transition-all duration-500`}
          />
        </div>
      </div>

      <div
        id='accordion-content'
        className={`
          ${visibility}
          ${openAccordion ? 'max-h-120 opacity-100 mt-1 mb-3' : 'max-h-0 opacity-0 overflow-hidden'}
          rounded-lg bg-neutral-200 border-neutral-300 border-1 shadow-md p-2 flex-col overflow-auto w-full
          transition-all duration-500
        `}
      >
        {isArray && <h2 className='text-lg mb-2'>{listTitle}</h2>}
        {isArray
          ? (content as string[]).map((prop) => {
              return (
                <p key={prop} className='text-neutral-600'>
                  &#8226; {prop}
                </p>
              );
            })
          : content}
      </div>
    </>
  );
}
