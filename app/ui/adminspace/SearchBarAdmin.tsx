import { Search } from 'lucide-react';

export default function SearchBarAdmin() {
  return (
    <form 
      action="" 
      className={`
        flex w-full items-center px-4 rounded-lg bg-neutral-300 h-10 search-focus transition-all
      `}
    >
      <Search size={16} className='mr-2 text-black' />
      <input 
        type="text" 
        className='focus-within:outline-none w-full' 
        placeholder='Search product...'
        id='product-search-bar'
        aria-label='product-search-bar'
      />
    </form>
  )
}