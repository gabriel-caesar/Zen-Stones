'use client';

import { Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({
  searchFocus,
  setSearchFocus,
  openSearchForm,
  setOpenSearchForm,
}: {
  searchFocus: boolean;
  setSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
  openSearchForm: boolean;
  setOpenSearchForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const searchParams = useSearchParams(); // searches for key/value pairs in the URL
  const pathname = usePathname(); // current path (/admin-space/manage-products)
  const { replace } = useRouter(); // url replacer
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [disableSearchBar, setDisableSearchBar] = useState<boolean>(false);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    // if there is user input, set it in the params, otherwise delete it
    if (term) {
      params.set('mainquery', term); // setting a key/value pair named query with the value term into the URL
    } else {
      params.delete('mainquery');
    }

    // trying to clean the url after unfocusing
    if (inputRef.current) {
      if (!inputRef.current.value) {
        // input is empty → clear main query
        replace(pathname);
      } else {
        // input has value → update URL
        replace(`${pathname}?${params.toString()}`);
      }
    }
  }, 300)

  useEffect(() => {
    if (pathname.includes('inquiry')) {
      setDisableSearchBar(true)
    } else {
      setDisableSearchBar(false)
    }
  }, [pathname])

  return (
    <>
      <form
        className={`
        ${
          openSearchForm
            ? 'flex w-3/4'
            : `hidden  ${
                searchFocus ? 'lg:w-3/5' : 'lg:w-1/5'
              } md:w-3/5 md:flex focus-within:w-3/5`
        }
        ${disableSearchBar ? 'bg-neutral-600' : 'bg-white'}
        items-center px-4 min-[2000px]:p-8 rounded-lg h-10 search-focus transition-all duration-500
      `}
      >
        <Search size={16} className='mr-2 text-neutral-500 min-[2000px]:scale-150 min-[2000px]:mr-6' />
        <input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          type='text'
          ref={inputRef}
          className='focus-within:outline-none w-full pr-2 min-[2000px]:text-2xl'
          placeholder={disableSearchBar ? 'Search disabled while inquirying...' : 'Search our catalog...'}
          id='navigation-search-bar'
          aria-label='navigation-search-bar'
          onFocus={() => setSearchFocus(true)}
          disabled={disableSearchBar}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSearchFocus(false);
              (e.target as HTMLInputElement).blur(); // force unfocus
            }
          }}
        />
      </form>
      <button
        id='close-searchbar-button'
        aria-label='close-searchbar-button'
        className={`
        ${searchFocus ? 'opacity-100' : 'opacity-0 absolute -z-99'} 
        bg-neutral-600 text-white rounded-lg p-1
        hover:cursor-pointer hover:bg-black active:bg-black/60 transition-all
      `}
        type='button'
        onClick={() => {
          inputRef.current?.blur();
          setOpenSearchForm(false);
          setSearchFocus(false);
        }}
      >
        <X />
      </button>
    </>
  );
}
