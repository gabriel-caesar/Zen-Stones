import { ChevronDown, MailIcon, Search, UserStar, X } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import NavButton from './NavButton';
import Link from 'next/link'

export default function Sidebar({
  openSidebarMenu,
  setOpenSidebarMenu,
  openSearchForm,
  setOpenSearchForm,
  sideBarRef,
  isAdmin
}: {
  openSidebarMenu: boolean;
  setOpenSidebarMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openSearchForm: boolean;
  setOpenSearchForm: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarRef: React.RefObject<HTMLDivElement | null>;
  isAdmin: boolean | undefined
}) {
  return (
    <nav
      className={`
        ${openSidebarMenu ? 'translate-x-0 opacity-100' : 'translate-x-full'}
        fixed top-0 right-0 h-screen w-60 bg-neutral-300 p-3 transition-all
        lg:hidden z-4
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
          setOpenSearchForm(!openSearchForm)
          setOpenSidebarMenu(!openSidebarMenu)
        }}
      >
        <Search size={16} className='mr-2' />
        Search
      </button>

      <span
        aria-label='sidebar-buttons-wrapper'
        className='flex flex-col items-start justify-around w-full md:mt-10'
      >
        <NavButton
          className={`mt-3 w-full flex justify-between items-center`}
        >
          Jewelry
          <ChevronDown strokeWidth={1} />
        </NavButton>

        <NavButton
          className={`mt-3 w-full flex justify-between items-center`}
        >
          Metaphysical
          <ChevronDown strokeWidth={1} />
        </NavButton>

        <NavButton
          className='mt-3 w-full flex justify-start'
        >
          About
        </NavButton>

        <NavButton
          className='mt-3 w-full flex justify-start'
        >
          Our Story
        </NavButton>
      </span>

      <span
        id='social-media-container'
        aria-label='social-media-container'
        className='flex flex-col w-full justify-between items-start text-4xl h-1/6 mt-10'
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
        href={isAdmin ? '/admin-space' : '/inquiry'}
        className='w-3/4 bg-neutral-900 flex justify-center items-center text-white rounded-md text-md p-1 hover:cursor-pointer hover:bg-neutral-400 hover:text-neutral-900 transition-all mt-10'
        id='sidebar-inquiry-button'
        aria-label='sidebar-inquiry-button'
        onClick={() => setOpenSidebarMenu(false)}
      >
        {isAdmin ? (
          <UserStar strokeWidth={1.5} className='mr-2' />
        ) : (
          <MailIcon strokeWidth={1.5} className='mr-2' />
        )}
        {isAdmin ? 'Admin Space' : 'Inquiry'}
      </Link>
    </nav>
  );
}
