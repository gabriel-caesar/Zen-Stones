'use client'

import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <form 
      action="" 
      className={`
        hidden md:w-3/5 lg:w-1/5
        md:flex items-center px-4 rounded-lg bg-neutral-200 h-10 search-focus transition-all
      `}
    >
      <Search size={16} className='mr-2 text-neutral-500' />
      <input 
        type="text" 
        className='focus-within:outline-none w-full' 
        placeholder='Search our catalog...'
        id='navigation-search-bar'
        aria-label='navigation-search-bar'
      />
    </form>
  )
}