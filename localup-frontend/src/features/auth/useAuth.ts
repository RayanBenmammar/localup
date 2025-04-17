import { getCurrentUser } from '@/features/auth/api.ts';
import { useQuery } from '@tanstack/react-query';

export function useAuth() {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['me'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
    refetchUser: refetch,
  };
}
