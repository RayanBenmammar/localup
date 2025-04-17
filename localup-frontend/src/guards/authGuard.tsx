import { redirect } from 'react-router-dom';
import { getCurrentUser } from '@/features/auth/api';

export async function AuthGuard() {
  try {
    await getCurrentUser();
    return null;
  } catch (error) {
    console.error(error);
    return redirect('/login');
  }
}
