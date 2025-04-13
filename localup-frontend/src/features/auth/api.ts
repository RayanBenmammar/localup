import { api } from '@/lib/api';

export async function loginUser(data: { email: string; password: string }) {
  const response = await api.post('/login', data);
  return response.data;
}
