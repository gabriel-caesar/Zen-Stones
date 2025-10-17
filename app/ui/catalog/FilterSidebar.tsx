'use client';

import {
  fetchIndications,
  fetchMaterials,
  fetchPrice,
  fetchProperties,
  fetchTypes,
} from '@/app/lib/data';
import { SetStateAction, useEffect, useState } from 'react';
import { FrequencyArray } from '@/app/lib/types';
import { Filter, X } from 'lucide-react';
import Accordion from './Accordion';
import { useProductsContext } from './ProductsContext';
import { makeArray } from '@/app/lib/utils';

export default function FilterSidebar({
  openSidebarFilter,
  setOpenSidebarFilter,
}: {
  openSidebarFilter: boolean;
  setOpenSidebarFilter: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { paramsArr } = useProductsContext();

  const [category] = paramsArr;

  const categoryArray = makeArray(category);

  // flags to identify what types to fetch
  const [isJewelryChecked, setIsJewelryChecked] = useState<boolean>(false);
  const [isMetaChecked, setIsMetaChecked] = useState<boolean>(false);

  // array of types, materials and indications based on category filter
  const [typesArray, setTypesArray] = useState<FrequencyArray[] | []>([]);
  const [materialsArray, setMaterialsArray] = useState<FrequencyArray[] | []>(
    []
  );
  const [indicationsArray, setIndicationsArray] = useState<
    FrequencyArray[] | []
  >([]);
  const [propertiesArray, setPropertiesArray] = useState<FrequencyArray[] | []>(
    []
  );

  // max and min product prices
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);

  // every time metaphysical or jewelry is checked
  // fetch the types and count accordingly
  useEffect(() => {
    let types: FrequencyArray[] = [];
    let materials: FrequencyArray[] = [];
    let indications: FrequencyArray[] = [];
    let properties: FrequencyArray[] = [];
    let max: number = 0;
    let min: number = 0;

    async function dbCall() {
      if (categoryArray?.includes('jewelry') && categoryArray.includes('metaphysical')) {
        types = await fetchTypes('');
        materials = await fetchMaterials('');
        indications = await fetchIndications('');
        properties = await fetchProperties('');
        max = await fetchPrice('', 'max');
        min = await fetchPrice('', 'min');
      } else if (!categoryArray) {
        types = await fetchTypes('');
        materials = await fetchMaterials('');
        indications = await fetchIndications('');
        properties = await fetchProperties('');
        max = await fetchPrice('', 'max');
        min = await fetchPrice('', 'min');
      } else {
        // based on the checked states, this variable decides what category will be used to filter
        const categoryCondition = categoryArray.includes('metaphysical')
          ? 'Metaphysical'
          : categoryArray.includes('jewelry')
          ? 'Jewelry'
          : '';

        types = await fetchTypes(categoryCondition);
        materials = await fetchMaterials(categoryCondition);
        indications = await fetchIndications(categoryCondition);
        properties = await fetchProperties(categoryCondition);
        max = await fetchPrice(categoryCondition, 'max');
        min = await fetchPrice(categoryCondition, 'min');
      }

      setTypesArray(types);
      setMaterialsArray(materials);
      setIndicationsArray(indications);
      setPropertiesArray(properties);
      setMaxPrice(max);
      setMinPrice(min);
    }

    dbCall();
  }, [category]);

  return (
    <nav
      className={`
        ${
          openSidebarFilter ? 'translate-x-0 opacity-100' : '-translate-x-full'
        }  
        fixed top-0 left-0 h-screen w-70 bg-yellow-100 border-r-1 transition-all
        z-7 overflow-auto lg:hidden
      `}
      id='filter-sidebar-wrapper'
    >
      {/* Header section */}
      <span className='justify-between flex items-center w-full pb-2 border-b-1 p-3'>
        <h1 className='text-2xl flex items-center'>
          Filter <Filter className='ml-2' />
        </h1>

        <button
          id='close-filter-bar-button'
          aria-label='close-filter-bar-button'
          className='hover:opacity-80 hover:cursor-pointer transition-all'
          onClick={() => setOpenSidebarFilter(!openSidebarFilter)}
        >
          <X size={30} />
        </button>
      </span>

      {/* Filter section */}
      <section id='filter-by-category-wrapper' className='mt-6 p-3'>
        {/* Filter by Category section */}
        <Accordion
          text={'Category'}
          isCategory={true}
          isJewelryChecked={isJewelryChecked}
          setIsJewelryChecked={setIsJewelryChecked}
          isMetaChecked={isMetaChecked}
          setIsMetaChecked={setIsMetaChecked}
        />

        {/* Filter by Material section */}
        <Accordion text='Material' array={materialsArray} />

        {/* Filter by Price section */}
        <Accordion text='Price' maxPrice={maxPrice} minPrice={minPrice} />

        {/* Filter by Indications section */}
        <Accordion text='Indications' array={indicationsArray} />

        {/* Filter by Properties section */}
        <Accordion text='Properties' array={propertiesArray} />

        {/* Filter by Type section */}
        <Accordion text='Type' array={typesArray} />
      </section>
    </nav>
  );
}
