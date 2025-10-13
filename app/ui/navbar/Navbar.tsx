'use client';

import { useEffect, useRef, useState } from 'react';
import { MailIcon, Menu, UserStar } from 'lucide-react';
import NavButton from './NavButton';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import NavbarDropdown from './NavbarDropdown';
import { useRootContext } from '@/app/RootContext';
import { useWrapperContext } from '../LayoutWrapper';

export default function Navbar() {
  // getting the provided values from context
  const { session, productTypes } = useRootContext();

  // getting the searchbar state utilities from context
  const { setSearchFocus, searchFocus, setOpenSearchForm, openSearchForm } =
    useWrapperContext();

  // opens side menu nav bar
  const [openSidebarMenu, setOpenSidebarMenu] = useState<boolean>(false);
  // served to reference the sidebar
  const sideBarRef = useRef<null | HTMLDivElement>(null);
  // served to reference the button which opens the sidebar
  const sideBarButton = useRef<null | HTMLButtonElement>(null);

  // filtering subcategories
  const jewelryProductTypes = productTypes?.filter(
    (subc) => subc.parent_category === 'Jewelry'
  );
  const metaphysicalProductTypes = productTypes?.filter(
    (subc) => subc.parent_category === 'Metaphysical'
  );

  // if the user clicks out of the sidebar, close it
  useEffect(() => {
    const handleClickOff = (e: MouseEvent) => {
      if (
        sideBarRef.current && // if the ref was assigned to the HTML element at this moment
        sideBarButton.current && // if the ref was assigned to the HTML element at this moment
        !sideBarRef.current.contains(e.target as Node) && // if the click target is not inside the sidebar
        !sideBarButton.current.contains(e.target as Node) // if the click target is not sidebar button opener
      ) {
        setOpenSidebarMenu(false);
      }
    };

    window.addEventListener('click', handleClickOff);

    return () => {
      window.removeEventListener('click', handleClickOff);
    };
  }, [openSidebarMenu]);

  return (
    <nav
      id='navigation-bar'
      aria-label='navigation-bar'
      className={`
        backdrop-blur bg-yellow-100 
        flex justify-around h-[112px] min-[2000px]:h-[200px] items-center w-full border-b-1 border-neutral-300 py-4 fixed top-0 z-6
      `}
    >
      <Link
        href='/'
        className={`
          ${openSearchForm ? 'hidden' : 'flex'} bg-white
          border-1 rounded-full h-25 w-25 min-[2000px]:w-45 min-[2000px]:h-45 p-2 justify-center items-center hover:bg-black/30 transition-all
        `}
      >
        <Image
          src='/store-logo-nobg.png'
          alt='store-logo-image'
          aria-label='store-logo-image'
          width={100}
          height={100}
        />
      </Link>

      {/* Navbar header buttons */}
      <span
        aria-label='navigation-bar-buttons-wrapper'
        className={`overflow-hidden ${
          searchFocus ? 'max-w-0' : 'max-w-full'
        } lg:flex items-center justify-around w-2/5 hidden transition-all duration-500`}
      >
        <NavbarDropdown
          array={jewelryProductTypes} 
          text={'Jewelry'} 
          href={'/catalog?category=jewelry'}
        />
        <NavbarDropdown
          array={metaphysicalProductTypes}
          text={'Metaphysical'}
          href={'/catalog?category=metaphysical'}
        />
        <NavButton 
          className='py-10 hover:border-b-black hover:text-yellow-500 min-[2000px]:text-2xl'
          isLink={true}
          href={'/catalog'}
        >
          Shop All
        </NavButton>
        <NavButton 
          className='py-10 hover:border-b-black hover:text-yellow-500 min-[2000px]:text-2xl'
          isLink={true}
          href={'/about'}
        >
          About
        </NavButton>
      </span>

      <SearchBar
        searchFocus={searchFocus}
        setSearchFocus={setSearchFocus}
        openSearchForm={openSearchForm}
        setOpenSearchForm={setOpenSearchForm}
      />

      <button
        className={`
          ${openSearchForm ? 'hidden' : 'lg:hidden'}
          ${openSidebarMenu ? 'opacity-0' : 'opacity-100'}
          hover:cursor-pointer hover:border-black border-2 border-transparent rounded-md p-1 transition-all
        `}
        id='sidebar-menu-button'
        aria-label='sidebar-menu-button'
        ref={sideBarButton}
        onClick={() => setOpenSidebarMenu(!openSidebarMenu)}
      >
        <Menu />
      </button>

      <Link
        className={`
          min-[2000px]:text-2xl min-[2000px]:w-55 min-[2000px]:p-3
          bg-neutral-900 items-center justify-between text-white rounded-md text-md py-1 px-2 w-35 hover:cursor-pointer hover:bg-neutral-400 hover:text-neutral-900 active:bg-white active:text-black hidden transition-all
          ${openSearchForm ? 'hidden' : 'lg:flex'}
        `}
        href={session?.isAdmin ? '/admin-space' : '/inquiry'}
        id='inquiry-button'
        aria-label='inquiry-button'
      >
        {session?.isAdmin ? 'Admin Space' : 'Inquiry'}
        {session?.isAdmin ? (
          <UserStar strokeWidth={1.5} className='min-[2000px]:scale-140' />
        ) : (
          <MailIcon strokeWidth={1.5} />
        )}
      </Link>

      <Sidebar
        openSidebarMenu={openSidebarMenu}
        setOpenSidebarMenu={setOpenSidebarMenu}
        openSearchForm={openSearchForm}
        setOpenSearchForm={setOpenSearchForm}
        searchFocus={searchFocus}
        setSearchFocus={setSearchFocus}
        sideBarRef={sideBarRef}
        session={session}
        productTypes={productTypes}
      />
    </nav>
  );
}
