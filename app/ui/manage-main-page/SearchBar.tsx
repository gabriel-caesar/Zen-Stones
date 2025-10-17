import { Search } from 'lucide-react';
import { SetStateAction } from 'react';

export default function SearchBar({
  search,
  setSearch
} : {
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>
}) {

  return (
    <div 
      id='search-collection-bar-container' 
      className='flex items-center justify-center bg-neutral-300 rounded-lg p-2 search-focus'
    >
      <Search strokeWidth={1.5} size={22} className='mr-2 text-neutral-500'/>
      <input 
        value={search}
        onChange={e => {
          if (e.target.value.length <= 25) {
            setSearch(e.target.value)
          }
        }}
        id='search-collection-bar'
        aria-label='search-collection-bar'
        placeholder='Search your collection...'
        type="text" 
        className='focus-within:outline-none w-full pr-4'
      />
    </div>
  )
}