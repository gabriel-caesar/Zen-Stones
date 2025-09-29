import { SetStateAction } from 'react';

export type RootContextType = {
  session: SessionPayload | undefined;
  subcategories: SubCategory[];
}

export type WrapperContextType = {
  searchFocus: boolean,
  setSearchFocus: React.Dispatch<SetStateAction<boolean>>
}

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  admin: boolean,
}

export type SessionPayload = {
  userId: string;
  isAdmin: boolean;
  expiresAt: Date;
};

export type Category = 'Jewelry' | 'Metaphysical' | 'Sterling Silver'

export type Product = {
  id: string;
  name: string;
  category: Category;
  subcategory: string;
  price: number;
  properties: string[];
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary';
  weight: number;
}

export type ProductWithImages = Product & {
  urls: string[];
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  position: number;
  created_at: string;
}

export type SubCategory = {
  id: string;
  subcategory: string;
  parent_category: Category;
  featured_image: string;
}

