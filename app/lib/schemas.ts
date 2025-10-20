import z from 'zod';

// product type schema to validade user input
const MAX_IMGS_FEATURED = 1;
export const productTypeSchema = z.object({
  featuredPhoto: z
    .array(
      z
        .union([
          z.instanceof(File), // real file uploads
          z.object({ name: z.string(), url: z.string(), type: z.string() }), // mimic type
        ])
        .refine((file) => file.type.startsWith('image/'), {
          message: 'Please, upload image files',
        })
    )
    .max(MAX_IMGS_FEATURED, {
      message: `You can upload up to ${MAX_IMGS_FEATURED} image`,
    }),
  category: z.string(),
  productType: z
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
      z
        .union([
          z.instanceof(File), // new uploaded files
          z.string().url(), // existing image URLs
        ])
        .refine(
          (item) => {
            // Only refine Files, skip strings
            return item instanceof File ? item.type.startsWith('image/') : true;
          },
          { message: 'Please, upload image files' }
        )
    )
    .max(MAX_IMGS_PRODUCT, {
      message: `You can upload up to ${MAX_IMGS_PRODUCT} images`,
    }),
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
  productType: z.string().refine((type) => type !== 'Choose one option...', {
    message: 'You have to choose one option',
  }),
  price: z
    .string()
    .regex(/^(?:\d{1,8})(?:\.\d{1,2})?$/, {
      message: 'Acceptable price formatting up to: 12650500.25',
    }),

  properties: z.array(z.string()).refine((arr) => arr.length > 0, {
    message: 'Needs to have at least 1 property',
  }),
  materials: z.array(z.string()).refine((arr) => arr.length > 0, {
    message: 'Needs to have at least 1 material',
  }),
  rarity: z.string(),
  featured_material: z
    .string()
    .refine((type) => type !== 'Choose one option...', {
      message: 'You have to choose one option',
    }),
  size: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?(mm|cm|m|inch)$/,
      'Acceptable units: mm, cm, m and inch. Only two decimals are allowed'
    ),
  weight: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?(g|kg|oz|lb)$/,
      'Acceptable units: g, kg, oz, lb. Only two decimals are allowed'
    ),
  indications: z.array(z.string()).refine((arr) => arr.length > 0, {
    message: 'Needs to have at least 1 indication',
  }),
  description: z.string().refine((desc) => desc.length >= 30, {
    message: 'Description needs to be 30+ characters long',
  }),
  meaning: z.string().refine((desc) => desc.length >= 30, {
    message: 'Meaning needs to be 30+ characters long',
  }),
});

// schema validator for the inquiry form
export const inquirySchema = z.object({
  name: z
    .string()
    .regex(
      /^(?!\s)[a-zA-Z'\s]+(?<!\s)$/,
      'Cannot contain numbers, special characters or spaces before and after the text'
    ),
  email: z.email({ message: 'Needs to be an email' }),
  title: z.string().regex(
      /^(?!\s)[a-zA-Z'\s\d]+(?<!\s)$/,
      'Cannot contain special characters or spaces before and after the text'
    ),
  inquiry: z.string().refine((inquiry) => inquiry.length >= 30, {
    message: 'Inquiry needs to be 30+ characters long',
  }),
  product_id: z.string().optional(),
});
