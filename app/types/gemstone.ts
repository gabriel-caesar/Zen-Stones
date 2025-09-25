export interface Gemstone {
  id: string;
  name: string;
  type: string;
  color: string;
  origin: string;
  hardness: number;
  price: number;
  description: string;
  properties: string[];
  imageUrl: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary';
  carat?: number;
}

export const GEMSTONE_CATEGORIES = [
  'All',
  'Precious',
  'Semi-Precious',
  'Rare',
  'Crystal'
] as const;

export type GemstoneCategory = typeof GEMSTONE_CATEGORIES[number];