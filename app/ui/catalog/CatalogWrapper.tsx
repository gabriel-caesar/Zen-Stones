'use client';

import { FileQuestionMark, Filter } from 'lucide-react';
import { useProductsContext } from './ProductsContext';
import { useMemo, useState } from 'react';
import FilterLargeScreen from './FilterLargeScreen';
import FilterSidebar from './FilterSidebar';
import CatalogCard from './CatalogCard';
import Select from '../Select';
import Link from 'next/link';

export default function CatalogWrapper({
  productCount,
}: {
  productCount: number;
}) {
  const { filteredProducts, paramsArr } = useProductsContext();

  const [category] = paramsArr;

  // sort options
  const sort = ['Sort', 'Price (high-low)', 'Price (low-high)', 'Name (A-Z)'];

  // sort selected by the user
  const [selectedSort, setSelectedSort] = useState<string>('');

  // state to signal if the filter bar was opened
  const [openSidebarFilter, setOpenSidebarFilter] = useState<boolean>(false);

  // useMemo is used to not recompute the sorted values every re-render
  const filteredAndSortedProducts = useMemo(() => {
    const filteredCatalog = [...filteredProducts]; // copy

    filteredCatalog.sort((a, b) => {
      if (selectedSort === 'Name') return a.name.localeCompare(b.name);
      if (selectedSort === 'Price (low-high)') return a.price - b.price;
      if (selectedSort === 'Price (high-low)') return b.price - a.price;
      return 0;
    });

    return filteredCatalog;
  }, [selectedSort, filteredProducts]);

  return (
    <div className='' id='category-catalog-wrapper'>
      <div
        className='flex flex-col mt-3 md:flex-row md:flex-wrap'
        id='category-products-wrapper'
      >
        {/* Presentation wrapper */}
        <div
          id='catalog-presentation-wrapper'
          className='w-full flex flex-col justify-center items-center p-2'
        >
          <h1
            id='catalog-title'
            aria-label='catalog-title'
            className='w-full text-center text-3xl font-bold mb-3'
          >
            {category === 'jewelry'
              ? 'SHOP JEWELRY'
              : category === 'metaphysical'
              ? 'SHOP METAPHYSICAL'
              : 'SHOP ALL'}
          </h1>

          <p
            id='catalog-text-presentation'
            aria-label='catalog-text-presentation'
            className='text-center'
          >
            {category === 'jewelry'
              ? 'From subtle elegance to statement sparkle, these pieces are made to elevate every moment.'
              : category === 'metaphysical'
              ? 'From inner balance to spiritual awakening, these stones are crafted to align mind, body, and soul.'
              : 'From timeless staples to rare finds, discover everything that defines your unique energy.'}
          </p>
        </div>

        {/* Filter and sort wrapper */}
        <span className='w-full px-2 mt-5 flex items-center justify-between lg:hidden'>
          <button
            className='
              w-3/5 mr-5 text-center rounded-lg bg-neutral-300 text-black hover:bg-black/60
              justify-between p-2 transition-all  active:bg-black/30 flex items-center hover:cursor-pointer
            '
            id='open-filter-by-button'
            aria-label='open-filter-by-button'
            onClick={() => setOpenSidebarFilter(!openSidebarFilter)}
          >
            Filter by
            <Filter strokeWidth={1.5} className='ml-2' size={20} />
          </button>

          <Select
            options={sort}
            selector={selectedSort}
            setSelector={setSelectedSort}
            className='w-3/5'
            id='category-selection'
            ariaLabel='category-selection'
            name='category'
          />
        </span>

        <p
          id='item-count'
          aria-label='item-count'
          className='text-neutral-500 w-full text-center my-5'
        >
          Products: {productCount}
        </p>

        <FilterSidebar
          openSidebarFilter={openSidebarFilter}
          setOpenSidebarFilter={setOpenSidebarFilter}
        />

        {/* Sort element for large screen sizes */}
        <div
          id='sort-lg-screen'
          className='w-full lg:flex items-center justify-end px-2 min-[2000px]:px-22 hidden'
        >
          <Select
            options={sort}
            selector={selectedSort}
            setSelector={setSelectedSort}
            className='w-1/6 mb-3'
            id='category-selection'
            ariaLabel='category-selection'
            name='category'
          />
        </div>

        <div id='grid-filter-wrapper' className='flex w-full p-2'>

          {/* Filter navigation bar for large screen sizes */}
          <FilterLargeScreen />

          {/* Catalog container where all products show up */}
          <div
            id='card-grid'
            className={`
              min-[2000px]:px-20
              px-2 w-full relative
            ${
              filteredAndSortedProducts.length <= 0
                ? 'flex items-center justify-center'
                : 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-4 gap-2 items-start justify-items-center'
            }
          `}
          >
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product) => {
                return (
                  <div
                    key={product.id}
                    className='
                    md:w-full md:h-[450px] lg:h-[550px]
                    rounded-md bg-white border-1 border-neutral-400 shadow-md 
                    relative overflow-hidden mb-3 w-full h-[450px]
                  '
                  >
                    {/* Product item card */}
                    <CatalogCard product={product} />

                    <div
                      className='flex flex-col my-3 px-2 absolute bottom-0 w-full'
                      id='buttons-wrapper'
                    >
                      <Link
                        aria-label='view-details-button'
                        id='view-details-button'
                        href={`/product/${product.id}`}
                        className='flex justify-center items-center rounded-lg bg-black text-white py-1 hover:cursor-pointer hover:bg-black/60 active:bg-black/50 transition-all'
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                className='w-3/4 flex flex-col items-center justify-center'
                id='blank-search-feedback'
                aria-label='blank-search-feedback'
              >
                <h1 className='text-neutral-600 text-center mb-3'>
                  No matches were found with this filtering...
                </h1>
                <FileQuestionMark
                  className='text-neutral-500'
                  size={42}
                  strokeWidth={1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
