'use client';

import { FaRegMinusSquare, FaRegPlusSquare } from 'react-icons/fa';
import { removeProductFromCollections } from '@/app/lib/actions';
import { IoDiamond, IoStarSharp } from 'react-icons/io5';
import { ProductWithImages } from '@/app/lib/types';
import { GiColombianStatue } from 'react-icons/gi';
import { useMemo, useState } from 'react';
import { Loader2, Search, Trash, X } from 'lucide-react';
import { PiImageBroken } from 'react-icons/pi';
import { useFormStatus } from 'react-dom';
import { BsStars } from 'react-icons/bs';
import SearchBar from './SearchBar';
import Select from '../Select';
import Link from 'next/link';

export default function FeaturedCollection({
  collectionProducts,
}: {
  collectionProducts: ProductWithImages[];
}) {
  // controlled search state for the collection product search bar
  const [search, setSearch] = useState<string>('');

  // sorting state
  const [sortBy, setSortBy] = useState<string>('');

  // opens the collection product when user clicks the plus sign
  const [openCollectionDrawer, setOpenCollectionDrawer] = useState<string>('');

  // when user click to remove one collection product
  const [isRemoving, setIsRemoving] = useState<string>('');

  // sort options
  const sortOptions = [
    'Sort',
    'Price (high-low)',
    'Price (low-high)',
    'Name (A-Z)',
  ];

  // loading spinner
  const [loading, setLoading] = useState<boolean>(false);

  // handles adding a product to the main page collections and toggles the loading animation
  async function handleCollection(product: ProductWithImages) {
    setLoading(true);
    try {
      await removeProductFromCollections(product);
    } catch (error) {
      throw new Error(`Couldn't handle collections from front-end. ${error}`);
    } finally {
      setLoading(false);
    }

    // reloading the page entirely so the change reflects in the UI
    window.location.href =
      '/admin-space/manage-main-page?removed_collection=true';
  }

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = collectionProducts;

    // Filter by search term
    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.material
            .map((m) => m.toLowerCase())
            .includes(search.toLowerCase()) ||
          p.properties
            .map((pr) => pr.toLowerCase())
            .includes(search.toLowerCase()) ||
          p.indicated_for
            .map((i) => i.toLowerCase())
            .includes(search.toLowerCase()) ||
          p.product_type.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'Name') return a.name.localeCompare(b.name);
      if (sortBy === 'Price (low-high)') return a.price - b.price;
      if (sortBy === 'Price (high-low)') return b.price - a.price;
      return 0;
    });

    return filtered;
  }, [search, sortBy]);

  return (
    <div
      id='featured-types-container'
      className='bg-neutral-200 rounded-lg p-2 shadow-md w-11/12 mt-6'
    >
      <label
        htmlFor='search-collection-bar'
        className='flex items-center justify-center text-center mb-3 font-bold'
      >
        Your featured collection
        <BsStars className='ml-2 text-2xl' />
      </label>

      {/* Search bar */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Sort */}
      <Select
        options={sortOptions}
        selector={sortBy}
        setSelector={setSortBy}
        className='w-full mt-4'
        id='sort-selection'
        ariaLabel='sort-selection'
        name='sort-dropdown'
      />

      {/* Results count */}
      <div className='my-3 flex flex-col items-center justify-between'>
        {search && (
          <div
            className='
              mb-3 bg-yellow-100 rounded-lg py-2 px-4 flex w-full justify-between items-center overflow-hidden
              lg:w-1/2
            '
            id='search-feedback-bubble'
          >
            Search: "{search}"
            <button
              id='erase-search-button'
              onClick={() => setSearch('')}
              className='ml-1 hover:bg-background rounded-full w-4 h-4 flex items-center justify-center'
            >
              <X />
            </button>
          </div>
        )}
        <p className='text-muted-foreground'>
          Showing {filteredAndSortedProducts.length} of{' '}
          {collectionProducts.length} products
        </p>
      </div>

      <ul id='product-collection-list'>
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((p) => {
            return (
              <li
                key={p.id}
                id='list-option'
                aria-label={`${p.name.toLowerCase()}-option`}
                className={`
                flex flex-col items-center justify-start px-2 border-1 border-neutral-400 p-1 rounded-lg mt-3
                transition-all duration-300
                ${openCollectionDrawer === p.id ? 'h-25' : 'h-8'}
              `}
              >
                <div
                  id='header-wrapper'
                  className='flex items-center justify-between w-full'
                >
                  <p className='flex items-center justify-center'>
                    {p.category === 'Jewelry' ? (
                      <IoDiamond className='mr-2' />
                    ) : (
                      <GiColombianStatue className='mr-2' />
                    )}
                    {p.name}
                  </p>

                  <span
                    id='chevron-star-wrapper'
                    className='flex items-center justify-center'
                  >
                    <IoStarSharp className='text-yellow-400' />
                    <button
                      id='show-more-button'
                      aria-label='show-more-button'
                      onClick={() => {
                        setIsRemoving('');
                        setOpenCollectionDrawer(
                          openCollectionDrawer === p.id ? '' : p.id
                        );
                      }}
                      className={`
                      hover:cursor-pointer hover:text-black/60 transition-all
                    `}
                    >
                      {openCollectionDrawer !== p.id ? (
                        <FaRegPlusSquare className='ml-2' />
                      ) : (
                        <FaRegMinusSquare className='ml-2' />
                      )}
                    </button>
                  </span>
                </div>

                <div
                  id='buttons-container'
                  className={`
                  ${
                    openCollectionDrawer === p.id
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }
                  transition-all duration-300 w-full flex items-center justify-center
                  mt-3
                `}
                >
                  {isRemoving === p.id ? (
                    <>
                      <button
                        id='remove-permanently-button'
                        aria-label='remove-permanently-button'
                        className={`
                        ${loading ? 'bg-neutral-500' : 'bg-red-500'}
                        flex justify-center items-center
                        rounded-lg hover:cursor-pointer hover:bg-red-500/60 transition-all p-2 w-full
                      `}
                        onClick={() => handleCollection(p)}
                      >
                        {loading ? (
                          <Loader2 strokeWidth={1.5} className='loading' />
                        ) : (
                          'Remove permanently'
                        )}
                      </button>

                      <button
                        id='cancel-button'
                        aria-label='cancel-button'
                        className='rounded-lg bg-black hover:cursor-pointer hover:bg-black/60 transition-all p-2 text-white ml-5'
                        onClick={() => setIsRemoving('')}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        id='see-in-main-page-button'
                        aria-label='see-in-main-page-button'
                        className={`
                        w-full text-center
                        rounded-lg bg-black hover:cursor-pointer hover:bg-black/60 transition-all p-2 text-white
                      `}
                        href={'/#collection-galery'}
                      >
                        See it in main page
                      </Link>

                      <button
                        id='start-remove-button'
                        aria-label='start-remove-button'
                        onClick={() => setIsRemoving(p.id)}
                        className={`
                        ml-5
                        rounded-lg bg-red-500 hover:cursor-pointer hover:bg-red-500/60 transition-all p-2 text-white
                      `}
                      >
                        <Trash strokeWidth={1.5} />
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })
        ) : collectionProducts.length <= 0 ? (
          // if there is no product marked as from collection
          <p className='text-neutral-500 text-center w-full flex flex-col items-center justify-center my-6'>
            No product was inserted in the collection yet
            <PiImageBroken className='text-neutral-500 text-2xl mt-1' />
          </p>
        ) : (
          filteredAndSortedProducts.length === 0 && (
            // if there is no match from the product search
            <div className='text-center py-6'>
              <div className='text-muted-foreground mb-4'>
                <Search className='h-12 w-12 mx-auto mb-4 opacity-50' />
                <h3 className='text-lg mb-2'>No Products found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
              <button
                onClick={() => {
                  setSearch('');
                }}
              >
                Clear Filters
              </button>
            </div>
          )
        )}
      </ul>
    </div>
  );
}
