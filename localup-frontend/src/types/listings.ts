import { ListingCategory } from '@/types/listingCategory.ts';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  price?: number;
  category: ListingCategory;
  createdAt: string;
  updatedAt: string;
  user: User;
}
