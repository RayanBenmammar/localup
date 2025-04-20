import { api } from '@/lib/api.ts';

export async function createListing(data: {
  title: string;
  description: string;
  price: number;
  category: string;
  id?: number;
}) {
  const response = await api.post('/listings', data);
  return response.data;
}

export async function editListing(data: {
  title: string;
  description: string;
  price: number;
  category: string;
  id?: number;
}) {
  const response = await api.put(`/listings/${data.id}`, data);
  return response.data;
}
