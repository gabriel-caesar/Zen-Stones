'use client';

import { ProductCollectionCard } from './ProductCollectionCard';
import { ProductWithImages } from '@/app/lib/types';
import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import Select from '../Select';


export function FeaturedGallery({ collectionProducts }: {collectionProducts: ProductWithImages[]}) {

  // filter and sort variables
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('Sort');
  const sortOptions = ['Sort', 'Price (high-low)', 'Price (low-high)', 'Name (A-Z)'];

  // function to deliver the array of products filtered and sorted
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = collectionProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.material.map(m => m.toLowerCase()).includes(searchTerm.toLowerCase()) ||
          p.properties.map(pr => pr.toLowerCase()).includes(searchTerm.toLowerCase()) || 
          p.indicated_for.map(i => i.toLowerCase()).includes(searchTerm.toLowerCase()) || 
          p.product_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
      filtered.sort((a, b) => {
        if (sortBy === 'Name (A-Z)') return a.name.localeCompare(b.name);
        if (sortBy === 'Price (low-high)') return a.price - b.price;
        if (sortBy === 'Price (high-low)') return b.price - a.price;
        return 0;
      });

    return filtered;
  }, [collectionProducts, searchTerm, sortBy]);

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8' id='collection-galery'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl mb-4'>Our Featured Collection</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Explore our exclusive selection of gemstone jewelry and 
            metaphysical treasures. From elegant necklaces and bracelets 
            to captivating statues, obelisks, and singing bowls. Each piece is 
            thoughtfully chosen to inspire balance, beauty, and spiritual harmony.
          </p>
        </div>

        {/* Filters */}
        <div 
          className='mb-8'
          id='filters-container'
        >

          <div 
            className='
              flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6
              w-full
            '
            id='search-sort-wrapper'
          >

            {/* Search */}
            <div 
              className='relative bg-neutral-300 rounded-lg py-2 search-focus transition-all w-full lg:w-1/4'
              id='search-collection-container'
            >
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4' />
              <input
                type='text'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => {
                  if (e.target.value.length < 25) {
                    setSearchTerm(e.target.value)
                  }
                }}
                className='pl-10 focus-within:outline-none w-full pr-4 rounded-lg'
              />
            </div>

            {/* Sort */}
            <Select
              options={sortOptions}
              selector={sortBy}
              setSelector={setSortBy}
              className='w-full mt-4 lg:mt-0 lg:w-1/4'
              id='sort-selection'
              ariaLabel='sort-selection'
              name='sort-dropdown'
            />
          </div>

        </div>

        {/* Results count */}
        <div className='mb-6 flex flex-col items-center justify-between'>
          {searchTerm && (
            <div 
              className='
                mb-3 bg-yellow-100 rounded-lg py-2 px-4 flex w-full justify-between items-center overflow-hidden
                lg:w-1/4
              '
              id='search-feedback-bubble'
            >
              Search: "{searchTerm}"
              <button
                id='erase-search-button'
                onClick={() => setSearchTerm('')}
                className='ml-1 hover:bg-background rounded-full w-4 h-4 flex items-center justify-center'
              >
                <X />
              </button>
            </div>
          )}
          <p className='text-muted-foreground'>
            Showing {filteredAndSortedProducts.length} of {collectionProducts.length}{' '}
            products
          </p>
        </div>

        {/* Product Grid */}
        <div
          className={
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          }
        >
          {filteredAndSortedProducts.map((p) => (
            <ProductCollectionCard
              key={p.id}
              collectionProducts={p}
            />
          ))}
        </div>

        {/* No results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-muted-foreground mb-4'>
              <Search className='h-12 w-12 mx-auto mb-4 opacity-50' />
              <h3 className='text-lg mb-2'>No Products found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
