import axios from 'axios';
import { Listing } from '@/types/listings.ts';
import { useQuery } from '@tanstack/react-query';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
});

export async function getListings(): Promise<Listing[]> {
  const response = await api.get('/listings');
  return response.data.data;
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
