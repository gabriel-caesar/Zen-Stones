import { productType } from '@/app/lib/types';
import NavButton from './NavButton';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

export default function NavbarDropdown({
  array,
  text,
  href,
  header,
}: {
  array: productType[] | undefined;
  text: string;
  href: Url
  header?: string;
}) {
  return (
    <div className='group'>
      <NavButton 
        className='text-md hover:cursor-pointer transition-all border-transparent px-2 group-hover:border-b-black border-1 py-10 hover:border-b-black hover:text-yellow-600 min-[2000px]:text-2xl active:brightness-50'
        isLink={true}
        href={href}
      >
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
          <div className='grid grid-cols-4 gap-2 place-items-center w-full'>
            {array?.map((type, index) => {
              return (
                  <Link
                    key={index}
                    href={`${href}&type=${type.product_type.toLowerCase()}`}
                    className='
                      flex flex-col items-center justify-center hover:pointer-cursor transition-all font-light my-4
                      rounded-lg border-1 border-black h-50 w-60
                      relative overflow-hidden
                    '
                    aria-label={`${type.product_type.toLowerCase()}-dropdown-option`}
                  >
                    <img
                      src={type.featured_image}
                      alt={`sterling-silver-image`}
                      className='
                        absolute inset-0 w-full h-full
                        object-cover hover:brightness-80 hover:scale-110 transition-all duration-500
                      '
                    />
                    <h1 className='text-center text-md absolute bottom-1 pointer-events-none text-white'>
                      {type.product_type}
                    </h1>
                  </Link>
              );
            })}
            {text === 'Jewelry' && (
              <Link 
                href={`${href}&material=sterling+silver`}
                className='flex flex-col items-center justify-center hover:pointer-cursor font-light my-4 rounded-lg relative h-50 w-60 overflow-hidden transition-all border-1'
                aria-label={`sterlingsilver-dropdown-option`}
              >
                <img
                  src='/sterling-jewelry.jpg'
                  alt={`sterling-silver-image`}
                  className='w-full rounded-lg object-cover hover:brightness-80 pb-10 hover:scale-110 transition-all duration-500'
                />
                <h1 className='
                  text-center text-md text-white absolute bottom-1 pointer-events-none
                '>
                  Sterling Silver Collection
                </h1>
              </Link>
            )}
          </div>
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  );
}
