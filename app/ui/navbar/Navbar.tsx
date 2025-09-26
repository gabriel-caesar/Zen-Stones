'use client';

import { useEffect, useRef, useState } from 'react';
import { MailIcon, Menu, UserStar } from 'lucide-react';
import SideSearchBar from './SideSearchBar';
import NavButton from './NavButton';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { SessionPayload } from '@/app/types/types';

export default function Navbar({ session }: { session: SessionPayload | undefined }) {
  // opens side menu nav bar
  const [openSidebarMenu, setOpenSidebarMenu] = useState<boolean>(false);
  // opens side search form from side nav bar
  const [openSearchForm, setOpenSearchForm] = useState<boolean>(false);
  // served to reference the sidebar
  const sideBarRef = useRef<null | HTMLDivElement>(null);
  // served to reference the button which opens the sidebar
  const sideBarButton = useRef<null | HTMLButtonElement>(null);

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

  window.addEventListener("click", handleClickOff);

  return () => {
    window.removeEventListener("click", handleClickOff);
  };
}, [openSidebarMenu]);

  return (
    <nav
      id='navigation-bar'
      aria-label='navigation-bar'
      className={`
        backdrop-blur bg-transparent
        flex justify-around h-[112px] items-center w-full py-4 fixed top-0 z-4 border-b border-b-neutral-300
      `}
    >
      <Link href='/'>
        <Image
          src='/store-logo.png'
          alt='store-logo-image'
          aria-label='store-logo-image'
          width={80}
          height={80}
        />
      </Link>

      <span
        aria-label='navigation-bar-buttons-wrapper'
        className='lg:flex items-center justify-around w-2/5 hidden'
      >
        <NavButton>Jewelry</NavButton>

        <NavButton>Metaphysical</NavButton>

        <NavButton>About</NavButton>

        <NavButton>Our Story</NavButton>
      </span>

      <SearchBar />

      {openSearchForm && (
        <SideSearchBar
          openSidebarMenu={openSidebarMenu}
          setOpenSidebarMenu={setOpenSidebarMenu}
          openSearchForm={openSearchForm}
          setOpenSearchForm={setOpenSearchForm}
        />
      )}

      {(openSearchForm) && (
        <div className='fixed w-full h-full md:hidden bg-black/50 z-5'></div>
      )}

      <button
        className={`
              ${openSidebarMenu ? 'opacity-0' : 'opacity-100'}
              lg:hidden
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
        className='bg-neutral-900 lg:flex items-center justify-between text-white rounded-md text-md py-1 px-3 hover:cursor-pointer hover:bg-neutral-400 hover:text-neutral-900 hidden transition-all'
        href={session?.isAdmin ? '/admin-space' : '/inquiry'}
        id='inquiry-button'
        aria-label='inquiry-button'
      >
        {session?.isAdmin ? (
          <UserStar strokeWidth={1.5} className='mr-2' />
        ) : (
          <MailIcon strokeWidth={1.5} className='mr-2' />
        )}
        {session?.isAdmin ? 'Admin Space' : 'Inquiry'}
      </Link>

      <Sidebar
        openSidebarMenu={openSidebarMenu}
        setOpenSidebarMenu={setOpenSidebarMenu}
        openSearchForm={openSearchForm}
        setOpenSearchForm={setOpenSearchForm}
        sideBarRef={sideBarRef}
        session={session}
      />
    </nav>
  );
}
