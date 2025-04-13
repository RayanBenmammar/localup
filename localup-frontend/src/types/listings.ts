import { ListingCategory } from '@/types/listing-category';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  category: ListingCategory;
  createdAt: string;
  updatedAt: string;
  user: User;
}
