'use client';

import {
  LogOut,
  MailIcon,
  Search,
  UserStar,
  X,
} from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { productType, SessionPayload } from '@/app/lib/types';
import { logout } from '@/app/lib/actions';
import NavButton from './NavButton';
import Link from 'next/link';
import Accordion from './Accordion';
import { useEffect } from 'react';

export default function Sidebar({
  openSidebarMenu,
  setOpenSidebarMenu,
  openSearchForm,
  setOpenSearchForm,
  searchFocus,
  setSearchFocus,
  sideBarRef,
  session,
  productTypes,
}: {
  openSidebarMenu: boolean;
  setOpenSidebarMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openSearchForm: boolean;
  setOpenSearchForm: React.Dispatch<React.SetStateAction<boolean>>;
  searchFocus: boolean;
  setSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarRef: React.RefObject<HTMLDivElement | null>;
  session: SessionPayload | undefined;
  productTypes: productType[] | undefined;
}) {

  // filtering subcategories
  const jewelryProductTypes = productTypes?.filter(type => type.parent_category === 'Jewelry');
  const metaphysicalProductTypes = productTypes?.filter(type => type.parent_category === 'Metaphysical');

  // only when in mobile, clean navbar to focus only searchbar
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setOpenSearchForm(searchFocus);
      } else {
        setOpenSearchForm(false); // or keep desktop behavior
      }
    }

    handleResize(); // run once on mount + whenever searchFocus changes
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [searchFocus]);

  return (
    <nav
      className={`
        ${openSidebarMenu ? 'translate-x-0 opacity-100' : 'translate-x-full'}
        fixed top-0 right-0 h-screen w-60 bg-yellow-100 border-l-1 p-3 transition-all
        lg:hidden z-4 overflow-y-auto
      `}
      ref={sideBarRef}
      id='sidebar-menu'
      aria-label='sidebar-menu'
    >
      <button
        className={`
          w-full hover:cursor-pointer hover:text-red-500 transition-all
        `}
        id='close-sidebar-button'
        aria-label='close-sidebar-button'
        onClick={() => setOpenSidebarMenu(!openSidebarMenu)}
      >
        <X />
      </button>

      <button
        className='flex md:hidden items-center justify-center mt-7 bg-neutral-900 py-1 px-3 rounded-md text-white hover:cursor-pointer hover:bg-neutral-400 hover:text-neutral-900 transition-all'
        id='sidebar-search-button'
        aria-label='sidebar-search-button'
        onClick={() => {
          setOpenSearchForm(!openSearchForm);
          setOpenSidebarMenu(!openSidebarMenu);
          setSearchFocus(true);
        }}
      >
        <Search size={16} className='mr-2' />
        Search
      </button>

      <span
        aria-label='sidebar-buttons-wrapper'
        className='flex flex-col items-start justify-around w-full md:mt-10'
      >

        <Accordion 
          text='Jewelry'
          array={jewelryProductTypes} 
          openSidebarMenu={openSidebarMenu}
          setOpenSidebarMenu={setOpenSidebarMenu}
        />

        <Accordion 
          text='Metaphysical'
          array={metaphysicalProductTypes} 
          openSidebarMenu={openSidebarMenu}
          setOpenSidebarMenu={setOpenSidebarMenu}
        />

        <NavButton 
          className='mt-3 w-full flex justify-between items-center active:bg-neutral-400 transition-all' 
          isLink={true} 
          href={'/catalog'} 
          openSidebarMenu={openSidebarMenu}
          setOpenSidebarMenu={setOpenSidebarMenu}
        >
          Shop All
        </NavButton>

        <NavButton
          className='mt-3 w-full flex justify-between items-center'
          isLink={true}
          href={'/about'}
          openSidebarMenu={openSidebarMenu}
          setOpenSidebarMenu={setOpenSidebarMenu}
        >
          About
        </NavButton>

      </span>

      <span
        id='social-media-container'
        aria-label='social-media-container'
        className='flex flex-col w-full justify-between items-start text-4xl h-[94px] mt-10'
      >
        <a
          href={'https://www.instagram.com/zenstonesjewelry/?hl=en'}
          target='_blank'
          className='hover:text-white hover:bg-black hover:cursor-pointer p-1 flex items-center rounded-md transition-all'
          id='instagram-nav-button'
          aria-label='instagram-nav-button'
        >
          <FaInstagram />
        </a>

        <a
          className='hover:text-white hover:bg-black hover:cursor-pointer p-1 rounded-md transition-all'
          href={'https://www.facebook.com/p/zenstonesjewelry-100063528523781/'}
          target='_blank'
          id='facebook-nav-button'
          aria-label='facebook-nav-button'
        >
          <FaFacebook />
        </a>
      </span>

      <Link
        href={session?.isAdmin ? '/admin-space' : '/inquiry'}
        className='w-2/3 bg-neutral-900 flex justify-center items-center text-white rounded-md text-md p-1 hover:cursor-pointer hover:bg-neutral-400 hover:text-neutral-900 active:bg-neutral-400/50 transition-all mt-10'
        id='sidebar-inquiry-button'
        aria-label='sidebar-inquiry-button'
        onClick={() => setOpenSidebarMenu(false)}
      >
        {session?.isAdmin ? (
          <UserStar strokeWidth={1.5} className='mr-2' />
        ) : (
          <MailIcon strokeWidth={1.5} className='mr-2' />
        )}
        {session?.isAdmin ? 'Admin Space' : 'Inquiry'}
      </Link>

      {session?.userId && (
        <button
          id='logout-button'
          aria-label='logout-button'
          className='w-1/2 bg-neutral-700 flex justify-center items-center text-white rounded-md text-md p-1 hover:cursor-pointer hover:bg-neutral-400 hover:text-neutral-900 transition-all mt-3'
          onClick={() => {
            logout();
            setOpenSidebarMenu(false);
          }}
        >
          <LogOut strokeWidth={1.5} className='mr-2' />
          Log out
        </button>
      )}
    </nav>
  );
}
