'use client'

import { createContext, useContext, useState } from 'react';
import Footer from './footer/Footer'
import Navbar from './navbar/Navbar'
import { WrapperContextType } from '../types/types';

// wrapper to send searchFocus to MainQueryProduct and bypass root page.tsx which is a server component
export const WrapperContext = createContext<WrapperContextType | null>(null);

export function useWrapperContext(): WrapperContextType {
  const ctx = useContext(WrapperContext);
  if (!ctx) throw new Error('useWrapperContext must be used inside WrapperContext');
  return ctx;
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {

  // focus the header search bar
  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const providedValues: WrapperContextType = {
    searchFocus,
    setSearchFocus,
  }

  return (
    <div className='relative'>
      <WrapperContext.Provider value={providedValues}>
        <Navbar searchFocus={searchFocus} setSearchFocus={setSearchFocus} />
        {/* padding === navbar.height to make content under navbar be pushed downwards */}
        <main className='pt-[112px]'>
                  
          {/* Dark screen that shows up when search bar is focused */}  
          <div 
            id='dark-focus-screen'
            className={`bg-black/80 fixed inset-0 ${searchFocus ? 'opacity-100 z-5' : 'opacity-0 -z-99'} transition-all duration-500`}
          />

          {children}
          <Footer />
        </main>
      </WrapperContext.Provider>
    </div>
  )
}