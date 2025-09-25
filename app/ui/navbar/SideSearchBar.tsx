import { Search, X } from 'lucide-react';
import { useRef } from 'react';

export default function SideSearchBar({
  openSidebarMenu,
  setOpenSidebarMenu,
  openSearchForm,
  setOpenSearchForm,
}: {
  openSidebarMenu: boolean;
  setOpenSidebarMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openSearchForm: boolean;
  setOpenSearchForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const searchBarRef = useRef<null | HTMLInputElement>(null);

  return (
    <form 
      action=""
      id='search-form-from-sidebar'
      aria-label='search-form-from-sidebar'
      className='absolute z-6 md:hidden flex items-center w-11/12 shadow-2xl bg-neutral-300 rounded-md p-2'
    >
      <Search size={20} className='mr-2' />
      <input 
        type="text" 
        id='search-catalog-input'
        aria-label='search-catalog-input'
        placeholder='Search our catalog...'
        className='focus-within:outline-none w-full' 
        ref={searchBarRef}
        autoFocus
      />
      <button
        id='close-search-button'
        aria-label='close-search-button'
        className='ml-2 hover:cursor-pointer hover:bg-black hover:text-white transition-all rounded-md p-2'
        onClick={() => {
          setOpenSearchForm(!openSearchForm)
          setOpenSidebarMenu(!openSidebarMenu)
        }}
      >
        <X />
      </button>
    </form>
  )
}