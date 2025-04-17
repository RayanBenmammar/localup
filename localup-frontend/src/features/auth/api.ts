import { api } from '@/lib/api';
import { User } from '@/types/listings.ts';

export async function loginUser(data: { email: string; password: string }) {
  const response = await api.post('/login', data);
  return response.data;
}

export async function logoutUser() {
  const response = await api.post('/logout');
  return response.data;
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const response = await api.post('/register', data);
  return response.data;
}

export async function getCurrentUser() {
  return await api.get<User>('/me');
}
