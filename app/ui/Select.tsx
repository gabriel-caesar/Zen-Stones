'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getRarityColor } from '../lib/utils';

export default function Select({
  options,
  selector,
  setSelector,
  className,
  id,
  ariaLabel,
  name,
  raritySelect,
  isEditing,
}: {
  options: string[] | undefined;
  selector: string;
  setSelector: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  id?: string;
  ariaLabel?: string;
  name: string;
  raritySelect?: boolean;
  isEditing?: boolean;
}) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (options) {
      if (!isEditing) {
        setSelector(options[0]); // selector will always be the first option of the dropdown
      }
    }
  }, []);

  return (
    <div
      onClick={() => setOpenDropdown(!openDropdown)}
      className={`
        ${openDropdown && 'shadow-regular'} ${className} ${raritySelect && getRarityColor(selector)}
        flex justify-between items-center hover:cursor-pointer rounded-lg bg-neutral-300 p-2 relative transition-all 
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
          ${openDropdown ? "opacity-100 z-10" : "opacity-0 -z-10"}
          absolute rounded-lg bg-neutral-200 p-2 border border-neutral-500 shadow-lg transition-all
          top-11 w-full left-0
        `}
        id="dropdown"
        aria-label="dropdown"
        role="listbox"
      >
        <ul>
          {options && options.length > 0 ? (
            options.map((opt) => (
              <li
                key={opt}
                role="option"
                aria-selected={selector === opt}
                data-value={opt}
                className={`
                  hover:cursor-pointer hover:bg-white hover:border-black rounded-lg py-1 px-3 border border-transparent transition-all ${raritySelect && 'flex justify-between items-center'}
                `}
                onClick={() => setSelector(opt)}
              >
                {opt}
                {raritySelect && (
                  <div
                    className={`w-8 h-8 rounded-lg ${getRarityColor(opt)}`}
                  />
                )}
              </li>
            ))
          ) : (
            <li className="text-neutral-500 py-1 px-3">No options available</li>
          )}
        </ul>
      </div>

      {/* this is a hidden element just for form validation down the road */}
      <select name={name} defaultValue={selector} className="hidden">
        <option value={selector}></option>
      </select>

    </div>
  );
}
