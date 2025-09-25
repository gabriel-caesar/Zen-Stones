'use client';

import { useState, useMemo } from 'react';
import {
  Gemstone,
  GEMSTONE_CATEGORIES,
  GemstoneCategory,
} from '@/app/types/gemstone';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { GemstoneCard } from './GemstoneCard';

interface GemstoneGalleryProps {
  gemstones: Gemstone[];
}

export function GemstoneGallery({ gemstones }: GemstoneGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GemstoneCategory>('All');
  const [searchTerm, setSearchTerm] = useState('');
  type sortOption = 'name' | 'price' | 'rarity';
  const [sortBy, setSortBy] = useState<sortOption>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedGemstones = useMemo(() => {
    let filtered = gemstones;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter((gem) => {
        if (activeCategory === 'Precious') return gem.type === 'Precious';
        if (activeCategory === 'Semi-Precious')
          return gem.type === 'Semi-Precious';
        if (activeCategory === 'Rare')
          return (
            gem.rarity === 'Rare' ||
            gem.rarity === 'Very Rare' ||
            gem.rarity === 'Legendary'
          );
        if (activeCategory === 'Crystal')
          return gem.properties.some((prop) => prop.includes('Crystal'));
        return true;
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (gem) =>
          gem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gem.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gem.origin.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'price') {
        return b.price - a.price;
      }
      if (sortBy === 'rarity') {
        const rarityOrder = {
          Common: 1,
          Uncommon: 2,
          Rare: 3,
          'Very Rare': 4,
          Legendary: 5,
        };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      }
      return 0;
    });

    return filtered;
  }, [gemstones, activeCategory, searchTerm, sortBy]);

  const handleAddToCart = (gemstone: Gemstone) => {
    // Mock function - in a real app, this would add to cart
    console.log('Added to cart:', gemstone.name);
  };

  const handleToggleFavorite = (gemstone: Gemstone) => {
    // Mock function - in a real app, this would toggle favorite status
    console.log('Toggled favorite:', gemstone.name);
  };

  return (
    <section className='py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl mb-4'>Our Gemstone Collection</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Explore our carefully curated selection of premium gemstones from
            around the world, each piece authenticated and graded by certified
            gemologists.
          </p>
        </div>

        {/* Filters */}
        <div className='mb-8'>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6'>
            {/* Search */}
            <div className='relative flex-1 max-w-md bg-neutral-100 rounded-lg py-2 search-focus transition-all'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4' />
              <input
                type='search'
                placeholder='Search by name, color, or origin...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 text-[14px] focus-within:outline-none w-full pr-4'
              />
            </div>

            <div 
              className='flex gap-3 justify-between items-center bg-neutral-100 rounded-lg p-2 w-1/10'
              onClick={() => {}}
            >
              {/* Sort */}
              <Filter size={14} className='text-neutral-500' />
              <select
                value={sortBy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSortBy(e.target.value as sortOption)
                }
                className='hover:cursor-pointer'
                id='dropdown-filter'
                aria-label='dropdown-filter'
              >
                <option value='name'>Name</option>
                <option value='Price'>Price</option>
                <option value='Rarity'>Rarity</option>
              </select>
            </div>
          </div>

          {/* Category filters */}
          <div className='flex flex-wrap gap-2'>
            {GEMSTONE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className='rounded-full'
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className='mb-6 flex items-center justify-between'>
          <p className='text-muted-foreground'>
            Showing {filteredAndSortedGemstones.length} of {gemstones.length}{' '}
            gemstones
          </p>
          {searchTerm && (
            <div className='gap-1'>
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className='ml-1 hover:bg-background rounded-full w-4 h-4 flex items-center justify-center'
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Gemstone Grid */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'flex flex-col gap-4'
          }
        >
          {filteredAndSortedGemstones.map((gemstone) => (
            <GemstoneCard
              key={gemstone.id}
              gemstone={gemstone}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>

        {/* No results */}
        {filteredAndSortedGemstones.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-muted-foreground mb-4'>
              <Search className='h-12 w-12 mx-auto mb-4 opacity-50' />
              <h3 className='text-lg mb-2'>No gemstones found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
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
