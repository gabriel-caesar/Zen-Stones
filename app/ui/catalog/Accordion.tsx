'use client';

import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { FrequencyArray } from '@/app/lib/types';
import { useProductsContext } from './ProductsContext';

export default function Accordion({
  array,
  text,
  isCategory,
  maxPrice,
  minPrice,
  isJewelryChecked,
  setIsJewelryChecked,
  isMetaChecked,
  setIsMetaChecked,
}: {
  array?: FrequencyArray[];
  text: string;
  isCategory?: boolean;
  maxPrice?: number;
  minPrice?: number;
  isJewelryChecked?: boolean;
  setIsJewelryChecked?: React.Dispatch<SetStateAction<boolean>>;
  isMetaChecked?: boolean;
  setIsMetaChecked?: React.Dispatch<SetStateAction<boolean>>;
}) {
  // params arguments coming from page.tsx
  const { paramsArr } = useProductsContext();

  // destructuring the params from the arr
  const [category, type, material, properties, max, min, indication] = paramsArr;

  // UI filter counts
  const [filterCountArray, setFilterCountArray] = useState<number>(0);
  const [filterCountPrice, setFilterCountPrice] = useState<number>(0);
  const [filterCountCategory, setFilterCountCategory] = useState<number>(0);

  // transforms a str into an arraya
  const makeArray = (arr: string[] | undefined) => {
    if (arr) {
      if (Array.isArray(arr)) return arr;
      return Array(arr);
    }
  };

  // making sure every parameter is an array even if it is a single str
  const typeArray = makeArray(type);
  const materialArray = makeArray(material);
  const indicationArray = makeArray(indication);
  const propertiesArray = makeArray(properties);

  // checking if the filters are already set in the params
  // so the inputs are updated promptly for the front-end
  function isCheck(el: string) {
    if (typeArray?.some((x) => x === el.toLowerCase())) return true;
    if (materialArray?.some((x) => x === el.toLowerCase())) return true;
    if (indicationArray?.some((x) => x === el.toLowerCase())) return true;
    if (propertiesArray?.some((x) => x === el.toLowerCase())) return true;
    return false;
  }

  // opens the accordion
  const [openAccordion, setOpenAccordion] = useState(false);

  // locally control the max and min price values
  const [maxRange, setMaxRange] = useState<number | undefined>(0);
  const [minRange, setMinRange] = useState<number | undefined>(0);

  // utils to access and mutate the url
  const searchParams = useSearchParams(); // searches for key/value pairs in the URL
  const pathname = usePathname(); // current path (/admin-space/manage-products)
  const router = useRouter(); // url replacer

  // for checkbox filter inputs
  function handleCheckFilter(term: string, text: string, checked: boolean) {
    const params = new URLSearchParams(searchParams);

    // if there is user input, set it in the params, otherwise delete it
    if (term && checked) {
      // setting a key/value pair named query with the value term into the URL
      params.append(text.toLowerCase(), term.toLowerCase());
    } else {
      params.delete(text.toLowerCase(), term.toLowerCase());
    }

    // updating the URL
    router.push(`${pathname}?${params.toString()}`);
  }

  const handlePriceFilter = useDebouncedCallback((max: number, min: number) => {
    const params = new URLSearchParams(searchParams);

    if (max && min) {
      // turning the max and min numbers into str
      const stringifiedMax = String(max);
      const stringifiedMin = String(min);

      // setting them into the URL
      params.set('max', stringifiedMax);
      params.set('min', stringifiedMin);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, 800);

  // making sure max and min states are
  // updated with the maxPrice and minPrice from DB
  useEffect(() => {
    // checking if there are params setting the price
    setMaxRange(max ? max : maxPrice);
    setMinRange(min ? min : minPrice);
  }, [maxPrice, minPrice]);

  // check the URL for params
  // if the params is found inside
  // the array argument, so it will count up
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const paramsArr = [...params.keys()];

    // reseting the count before counting again
    setFilterCountArray(0)
    setFilterCountPrice(0)
    setFilterCountCategory(0)

    for (let i = 0; i < paramsArr.length; i++) {
      if (text.toLowerCase() === paramsArr[i]) {
        setFilterCountArray((prev) => prev + 1);
      }
    }

    for (let i = 0; i < paramsArr.length; i++) {
      if ('max' === paramsArr[i] || 'min' === paramsArr[i]) {
        setFilterCountPrice((prev) => prev + 1);
      }
    }
    for (let i = 0; i < paramsArr.length; i++) {
      if ('category' === paramsArr[i]) {
        setFilterCountCategory((prev) => prev + 1);
      }
    }
  }, [searchParams]);

  return (
    <div
      id='accordion-wrapper'
      className={`
        min-[2000px]:text-2xl
        flex w-full flex-col mb-4 border-b-1 rounded-lg
        hover:cursor-pointer transition-all p-2
        ${openAccordion ? 'bg-yellow-100' : ''}
      `}
      onClick={() => setOpenAccordion(!openAccordion)}
    >
      <button
        className={`
          flex w-full justify-between items-center hover:cursor-pointer
        `}
        id='open-accordion-button'
        aria-label='open-accordion-button'
      >
        <div className='flex items-center justify-center'>
          <p>
            {text} 
          </p>

          <div className='rounded-md bg-black shadow-md px-2 text-white text-sm ml-2'>
            {text === 'Price'
              ? filterCountPrice
              : isCategory
              ? filterCountCategory
              : filterCountArray}
          </div>
        </div>

        <ChevronDown
          className={`${
            openAccordion ? '-rotate-180' : 'rotate-0'
          } transition-all duration-500`}
          strokeWidth={1.5}
        />
      </button>

      <div
        id='content-wrapper'
        className={`
          ${
            openAccordion
              ? 'max-h-80 opacity-100 mt-1 mb-3 overflow-auto'
              : 'max-h-0 opacity-0 pointer-events-none'
          }
          rounded-lg p-2 bg-neutral-200 transition-all duration-500 shadow-md mt-1
        `}
      >
        {isCategory ? (
          <>
            <div
              id='filter-check-box'
              className='flex items-center justify-start mb-3'
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type='checkbox'
                id='jewelry-filter'
                className='mr-2 mt-1 scale-120'
                value='jewelry'
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  handleCheckFilter(
                    e.target.value,
                    'category',
                    e.target.checked
                  );
                  setIsJewelryChecked?.(!isJewelryChecked);
                }}
                checked={
                  category === 'jewelry'
                    ? true
                    : Array.isArray(category)
                    ? (category as string[]).some((x) => x === 'jewelry')
                    : false
                }
              />
              <label htmlFor='jewelry-filter'>Jewelry</label>
            </div>

            <div
              id='filter-check-box mb-2'
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type='checkbox'
                id='metaphysical-filter'
                className='mr-2 mt-1 scale-120'
                value='metaphysical'
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  handleCheckFilter(
                    e.target.value,
                    'category',
                    e.target.checked
                  );
                  setIsMetaChecked?.(!isMetaChecked);
                }}
                checked={
                  category === 'metaphysical'
                    ? true
                    : Array.isArray(category)
                    ? (category as string[]).some((x) => x === 'metaphysical')
                    : false
                }
              />
              <label htmlFor='metaphysical-filter'>Metaphysical</label>
            </div>
          </>
        ) : text === 'Price' ? (
          <div className='flex flex-col' onClick={(e) => e.stopPropagation()}>
            <span className='flex flex-col items-start justify-center w-full mb-3'>
              <label htmlFor='min-price'>Max:</label>
              <span className='flex'>
                <input
                  type='range'
                  name='max'
                  id='max-price'
                  className='mt-1'
                  value={maxRange}
                  step={0.01}
                  max={maxPrice}
                  min={minRange}
                  onChange={(e) => {
                    // making sure the handler gets the most
                    // up to date numbers
                    const nextMax = Number(e.target.value);
                    setMaxRange(nextMax);
                    handlePriceFilter(nextMax, minRange ? minRange : 0);
                  }}
                />
                <p id='most-expensive-price' className='ml-2 text-sm'>
                  (${maxRange})
                </p>
              </span>
            </span>
            <span
              className='flex flex-col items-start justify-center'
              onClick={(e) => e.stopPropagation()}
            >
              <label htmlFor='max-price'>Min:</label>
              <span className='flex'>
                <input
                  type='range'
                  name='min'
                  step={0.01}
                  value={minRange}
                  max={maxPrice}
                  min={0}
                  id='min-price'
                  className='mt-1'
                  onChange={(e) => {
                    // making sure the handler gets the most
                    // up to date numbers
                    const nextMin = Number(e.target.value);
                    setMinRange(nextMin);
                    handlePriceFilter(maxRange ? maxRange : 0, nextMin);
                  }}
                />
                <p id='most-cheap-price' className='ml-2 text-sm'>
                  (${minRange})
                </p>
              </span>
            </span>
          </div>
        ) : (
          array?.map((el) => {
            return (
              <div
                id='filter-check-box'
                key={el.name}
                className='flex mb-2'
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type='checkbox'
                  id={`${el.name.toLowerCase()}-filter`}
                  className='mr-2 mt-1 scale-120'
                  value={el.name}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    handleCheckFilter(e.target.value, text, e.target.checked);
                  }}
                  checked={isCheck(el.name)}
                />
                <label htmlFor={`${el.name.toLowerCase()}-filter`}>
                  {el.name}
                </label>
                <p className='ml-2'>({el.count})</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
