'use client'

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBarAdmin() {

  const searchParams = useSearchParams(); // searches for key/value pairs in the URL
  const pathname = usePathname(); // current path (/admin-space/manage-products)
  const { replace } = useRouter(); // url replacer

  const handleSearch = useDebouncedCallback((term: string) => {

    const params = new URLSearchParams(searchParams)

    // if there is user input, set it in the params, otherwise delete it
    if (term) {
      params.set('query', term) // setting a key/value pair named query with the value term into the URL
    } else {
      params.delete('query')
    }

    // updating the url translating params into a readable string
    replace(`${pathname}?${params.toString()}`);
  }, 300)

  return (
    <form 
      action="" 
      className={`
        flex w-full items-center px-4 rounded-lg bg-neutral-300 h-10 search-focus transition-all
      `}
    >
      <Search size={16} className='mr-2 text-black' />
      <input 
        onChange={e => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
        type="text" 
        className='focus-within:outline-none w-full' 
        placeholder='Search product...'
        id='product-search-bar'
        aria-label='product-search-bar'
      />
    </form>
  )
}