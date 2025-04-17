import { api } from '@/lib/api.ts';

export async function createListing(data: {
  title: string;
  description: string;
  price: number;
  category: string;
}) {
  const response = await api.post('/listings', data);
  console.log('createListing response', response);
  return response.data;
}
