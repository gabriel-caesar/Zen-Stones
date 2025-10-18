import { ChevronDown } from 'lucide-react';
import NavButton from './NavButton';
import { useState } from 'react';
import Link from 'next/link';
import { productType } from '@/app/lib/types';

export default function Accordion({
  text,
  array,
  openSidebarMenu,
  setOpenSidebarMenu
}: {
  text: string;
  array: undefined | productType[];
  openSidebarMenu?: boolean;
  setOpenSidebarMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [openAccordion, setOpenAccordion] = useState<string>('');

  return (
    <div className={`w-full`}>
      <NavButton
        className={`
            ${openAccordion === text && 'bg-neutral-600 text-white'} 
            mt-3 w-full flex justify-between items-center transition-all rounded-lg hover:bg-neutral-400
          `}
        onClick={() => setOpenAccordion(openAccordion === text ? '' : text)}
      >
        {text}
        <ChevronDown
          strokeWidth={1}
          className={`${
            openAccordion === text ? '-rotate-180' : 'rotate-0'
          } transition-all`}
        />
      </NavButton>
      {/* Jewelry sub-categories list */}
      <div
        id='subcategories-list'
        aria-label='subcategories-list'
        className={`
            ${
              openAccordion === text
                ? 'max-h-40 opacity-100 mt-1'
                : 'max-h-0 opacity-0'
            }
            flex flex-col rounded-lg bg-neutral-200 border-1 border-neutral-400 shadow-md h-full w-full transition-all duration-300
          `}
      >
        {array!.length > 0 ? (
          array?.map((type, index) => {
            return (
              <Link
                key={index}
                href={openAccordion !== text ? '#' : `catalog?category=${text.toLowerCase()}&type=${type.product_type.toLowerCase()}`}
                onClick={(e) => {
                  if (openAccordion !== text) e.preventDefault();
                  setOpenSidebarMenu?.(!openSidebarMenu)
                }}
                className={`${
                  openAccordion !== text && 'pointer-events-none'
                } rounded-lg px-2 py-1 w-full hover:cursor-pointer`}
              >
                {type.product_type}
              </Link>
            );
          })
        ) : (
          // pointer-events-none makes the invisible element not able to get in the way of the visible ones when user is clicking
          <p
            className={`text-center p-2 ${
              openAccordion !== text && 'pointer-events-none'
            }`}
          >
            No sub-categories found
          </p>
        )}
        <Link
          href={text === 'Jewelry' ? '/catalog?category=jewelry' : text === 'Metaphysical' ? '/catalog?category=metaphysical' : ''}
          className={`${
            openAccordion !== text && 'pointer-events-none'
          } rounded-lg px-2 py-1 w-full hover:cursor-pointer`}
          onClick={(e) => {
            if (openAccordion !== text) e.preventDefault();
            setOpenSidebarMenu?.(!openSidebarMenu)
          }}
          >
          {text === 'Jewelry' ? 'All Jewelry' : text === 'Metaphysical' ? 'All Metaphysical' : ''}
        </Link>
      </div>
    </div>
  );
}
