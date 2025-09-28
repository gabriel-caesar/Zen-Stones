'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Select({
  options,
  selector,
  setSelector,
  className,
  id,
  ariaLabel,
  name,
}: {
  options: string[] | undefined;
  selector: string;
  setSelector: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  id?: string;
  ariaLabel?: string;
  name: string;
}) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const noOptionsRef = useRef<HTMLOptionElement | null>(null)

  useEffect(() => {
    if (options) {
      setSelector(options[0]); // selector will always be the first option of the dropdown
    }
  }, []);

  return (
    <div
      onClick={() => setOpenDropdown(!openDropdown)}
      className={`
        ${openDropdown && 'shadow-regular'}
        flex w-full justify-between items-center hover:cursor-pointer rounded-lg bg-neutral-300 p-2 relative transition-all ${className}
      `}
      id={id ? id : 'container-wrapper'}
      aria-label={ariaLabel ? ariaLabel : 'container-wrapper'}
    >
      <h3>
        {options && options.length > 0 ? selector : 'Choose one option'}
      </h3>

      <ChevronDown className={`${openDropdown ? '-rotate-180' : 'rotate-0'} transition-all duration-300`} />

      <div
        className={`
          ${openDropdown ? 'opacity-100 z-1' : 'opacity-0 -z-1'}
          absolute rounded-lg bg-neutral-200 p-2 border-1 border-neutral-500 shadow-lg transition-all
          top-11 w-full left-0
        `}
        id='dropdown'
        aria-label='dropdown'
      >
        {options && options.length > 0 ? (
          options?.map((opt) => (
          <option 
            key={opt} 
            value={opt}
            id='dropdown-option'
            aria-label={`${opt}-dropdown-option`}
            className = {`hover:cursor-pointer hover:bg-white hover:border-black rounded-lg py-1 px-3 border-1 border-transparent transition-all`}
            onClick={() => setSelector(opt)}
          >
            {opt}
          </option>
        ))
        ) : (
          <option disabled value="" ref={noOptionsRef}>
            No options available
          </option>
        )}
        
      </div>

      {/* this is a hidden element just for form validation down the road */}
      <select name={name} defaultValue={selector} className="hidden">
        <option value={selector}></option>
      </select>

    </div>
  );
}
