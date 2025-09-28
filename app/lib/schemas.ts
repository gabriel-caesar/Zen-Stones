import z from 'zod';

// subcategory schema to validade user input
const MAX_IMGS_FEATURED = 1;
export const subCategorySchema = z.object({
  featuredPhoto: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith('image/'), {
        message: 'Please, upload image files',
      })
    )
    .max(MAX_IMGS_FEATURED, { message: `You can upload up to ${MAX_IMGS_FEATURED} image` }),
  category: z.string(),
  subcategory: z
    .string()
    .regex(
      /^(?!\s)[a-zA-Z'\s]+(?<!\s)$/,
      'Cannot contain numbers, special characters or spaces before and after the text'
    ),
});

// login schema to validade user input
export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .trim(),
});

// product schema to validade product addition
const MAX_IMGS_PRODUCT = 5;
export const productSchema = z.object({
  productPhoto: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith('image/'), {
        message: 'Please, upload image files',
      })
    )
    .max(MAX_IMGS_PRODUCT, { message: `You can upload up to ${MAX_IMGS_PRODUCT} images` }),
  name: z
    .string()
    .regex(
      /^(?!\s)[a-zA-Z'\s]+(?<!\s)$/,
      'Cannot contain numbers, special characters or spaces before and after the text'
    ),
  category: z
    .string()
    .refine((str) => str === 'Jewelry' || str === 'Metaphysical', {
      message: 'Choose between Jewelry and Metaphysical',
    }),
  subcategory: z.string(),
  price: z.coerce.number().refine(
    (n) => {
      if (n > 0) {
        // price needs to be positive

        const stringPrice = String(n);
        if (stringPrice.includes('.')) {
          // checking for decimals
          const array = stringPrice.split('.');
          return array[0].length <= 8 && array[1].length <= 2 ? true : false;
        }
        return stringPrice.length <= 8 ? true : false;
      }

      return false; // if price is negative, return right away
    },
    { message: 'Acceptable price formatting up to: 12650500.25' }
  ),
  properties: z
    .array(z.string())
    .refine((arr) => arr.length > 0, {
      message: 'Needs to have at least 1 property',
    }),
  rarity: z.string(),
  weight: z.coerce.number().refine(
    (n) => {
      if (n > 0) {
        // weight needs to be positive

        const stringWeight = String(n);
        if (stringWeight.includes('.')) {
          // checking for decimals
          const array = stringWeight.split('.');
          return array[0].length <= 7 && array[1].length <= 3 ? true : false;
        }
        return stringWeight.length <= 7 ? true : false;
      }

      return false; // if price is negative, return right away
    },
    { message: 'Acceptable weight formatting up to: 126500.255' }
  ),
  description: z
    .string()
    .refine((desc) => desc.length >= 30, {
      message: 'Description needs to be 30+ characters long',
    }),
});
