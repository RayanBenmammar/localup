import axios from 'axios';
import { Listing } from '@/types/listings.ts';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
});

export async function getListings(): Promise<Listing[]> {
  const response = await api.get('/listings');
  return response.data.data;
}
