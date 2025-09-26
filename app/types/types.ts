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

export type Product = {
  id: string;
  photo: string;
  name: string;
  category: 'Jewelry' | 'Metaphysical';
  subcategory: string;
  price: number;
  properties: string[];
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary';
  weight: number;
}