import { FileMimicType } from './types';

// get rarity color for the card rarity badge
export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'Legendary':
      return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    case 'Very Rare':
      return 'bg-gradient-to-r from-purple-500 to-pink-500';
    case 'Rare':
      return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    case 'Uncommon':
      return 'bg-gradient-to-r from-green-500 to-emerald-500';
    default:
      return 'bg-gradient-to-r from-gray-500 to-slate-500';
  }
};

// from next.js tutorial
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

// unique id generator
export function uniqueId() {
  let id = [];
  let counter = 0;
  for (let i = 0; i < 20; i++) {
    if (counter % 2 === 0) {
      id.push(Math.floor(Math.random() * 10)); // generating numbers from 0 to 9
      counter++;
    } else {
      id.push(String.fromCharCode(Math.floor(Math.random() * 26) + 97)); // generating letters from a to z
      counter++;
    }
  }
  return id.join(''); // turning the array into string
}

// turn the string params into an array of strings
export function makeArray(value: string | string[] | undefined): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }
  else if (Array.isArray(value)) {
    return value
  } else {
    return Array(value) as string[]
  }
}