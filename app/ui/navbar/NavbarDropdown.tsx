import { SubCategory } from '@/app/types/types';
import NavButton from './NavButton';
import Link from 'next/link';

export default function NavbarDropdown({
  array,
  text,
}: {
  array: SubCategory[] | undefined;
  text: string;
}) {
  return (
    <div className='group'>
      <NavButton className='group-hover:border-b-black border-1 py-10'>
        {text}
      </NavButton>

      <div
        id='dropdown'
        aria-label='dropdown'
        className='
          flex flex-col justify-center items-center shadow-xl
          group-hover:opacity-100 group-hover:pointer-events-auto border-b-1 border-black
          w-full absolute left-0 top-full opacity-0 pointer-events-none p-2 bg-white transition-all
        '
      >
        <h1 className='text-3xl font-light pb-2 mb-2 border-b-1 w-11/12 text-center'>{`Our ${text} catalog`}</h1>

        {/* Grid container for the sub-categories */}
        {array && array.length > 0 ? (
          <div className='grid grid-cols-4 place-items-center w-full'>
            {array?.map((subc, index) => {
              return (
                <div key={index}>
                  <Link
                    href={'#'}
                    className='flex flex-col items-center justify-center hover:pointer-cursor transition-all font-light my-4 p-4 rounded-lg shadow-lg border-1 border-transparent hover:border-neutral-300 text-3xl w-full hover:bg-neutral-200'
                    aria-label={`${subc.subcategory}-dropdown-option`}
                  >
                    {subc.subcategory}
                    <img
                      src={subc.featured_image}
                      alt={`${subc.subcategory}-image`}
                      className='w-30 rounded-lg mt-6 '
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  );
}
