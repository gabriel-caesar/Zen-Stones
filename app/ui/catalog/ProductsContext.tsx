'use client';

// used to pass down the filtered products from the layout component to its children
import { ProductWithImages } from '@/app/lib/types';
import { createContext, useContext } from 'react';
export const ProductsContext = createContext<ContextValues | null>(null);

type ContextValues = {
  filteredProducts: ProductWithImages[];
  paramsArr: any[];
};

export function useProductsContext() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('Error with ProductsContext');
  return ctx;
}

// defining the wrapper here so it doesn't break by using the provider in a server component
export function ProductsContextWrapper({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ContextValues;
}) {
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
