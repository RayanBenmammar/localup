import { z } from 'zod';
import { ListingCategory } from '@/types/listingCategory.ts';

export const listingSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Le titre doit avoir au moins 5 caractères' }),
  description: z
    .string()
    .min(20, { message: 'La description doit avoir au moins 20 caractères' }),
  price: z
    .number()
    .positive({ message: 'Le prix doit être un nombre positif' }),
  category: z.enum(
    Object.values(ListingCategory).map((cat) => cat.en) as [
      string,
      ...string[],
    ],
  ),
  id: z.number().optional(),
});

export type listingFormData = z.infer<typeof listingSchema>;
