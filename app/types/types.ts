import { SetStateAction } from 'react';

export type RootContextType = {
  session: SessionPayload | undefined;
  productTypes: productType[];
}

export type WrapperContextType = {
  searchFocus: boolean,
  setSearchFocus: React.Dispatch<SetStateAction<boolean>>
  openSearchForm: boolean,
  setOpenSearchForm: React.Dispatch<SetStateAction<boolean>>,
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

export type Category = 'Jewelry' | 'Metaphysical'

export type Product = {
  id: string;
  name: string;
  category: Category;
  product_type: string;
  price: number;
  material: string[];
  properties: string[];
  indicated_for: string[];
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary';
  weight: string;
  meaning: string;
  size: string;
  featured_material: string;
  featured_section: boolean;
  is_collection: boolean;
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

export type productType = {
  id: string;
  product_type: string;
  parent_category: Category;
  featured_image: string;
}

// name of the uploaded files
export type fileCopy = {
  url: string;
  name: string;
  folder: string;
}

// 'mimic' of a type file for editing a product
export type FileMimicType = {
  name: string,
  url: string,
  type: string,
}

// tells how many times 'name' was repeated
export type FrequencyArray = {
  name: string,
  count: number,
}
