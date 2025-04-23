import axios from 'axios';
import { Listing } from '@/types/listings.ts';
import { useQuery } from '@tanstack/react-query';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
});

export async function getListings({
  page = 1,
  search,
  category,
}: {
  page: number;
  search?: string;
  category?: string;
}) {
  const params = new URLSearchParams();
  params.set('page', String(page));
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  const response = await api.get(`/listings?${params.toString()}`);
  return response.data;
}

const fetchListing = async (id: string) => {
  const response = await api.get(`/listings/${id}`);
  return response.data;
};

export const useListing = (id: string) => {
  return useQuery<Listing>({
    queryKey: ['listing', id],
    queryFn: () => fetchListing(id),
    enabled: !!id,
  });
};
