'use client'

import FilterSidebar from './FilterSidebar';
import { Filter } from 'lucide-react';
import { useState } from 'react';

export default function FilterWrapper() {

  // state to signal if the filter bar was opened
  const [openSidebarFilter, setOpenSidebarFilter] = useState<boolean>(false);

  return (
    <>
      {/* Filter and sort elements */}
      <div
        id='filter-wrapper-container'
        className='flex w-full px-2 my-6 md:mb-0 flex-row justify-between'
      >

        <button
          className='
            md:py-0 md:w-30
            w-full py-1 text-center rounded-lg bg-neutral-300 text-black hover:bg-black/60 text-2xl
            justify-between px-3 transition-all  active:bg-black/30 flex items-center hover:cursor-pointer
          '
          id='open-filter-by-button'
          aria-label='open-filter-by-button'
          onClick={() => setOpenSidebarFilter(true)}
        >
          Filter by
          <Filter strokeWidth={1.5}  className='ml-2 scale-125' />
        </button>

      </div>

      <FilterSidebar 
        openSidebarFilter={openSidebarFilter}
        setOpenSidebarFilter={setOpenSidebarFilter}
      />
    </>
  )
}