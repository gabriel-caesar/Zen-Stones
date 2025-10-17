'use client';

import { createContext, useContext } from 'react';
import { RootContextType } from './lib/types';

export const RootContextWrapper = createContext<RootContextType | null>(null);

export function useRootContext(): RootContextType {
  const ctx = useContext(RootContextWrapper);
  if (!ctx) throw new Error('useRootContext must be used inside RootContextWrapper');
  return ctx;
}

export function RootContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: RootContextType;
}) {

  return (
    <RootContextWrapper.Provider value={value}>
      {children}
    </RootContextWrapper.Provider>
  );
}