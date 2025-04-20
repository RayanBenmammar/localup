import { useNavigate, useParams } from 'react-router-dom';
import { useListing } from '@/lib/api.ts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useAuth } from '@/features/auth/useAuth.ts';

export function ListingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate('/');
    }
  }, [id, navigate]);

  const { data, isLoading, error } = useListing(id!);

  const displayEditButton = () => {
    if (!isAuthenticated) {
      return false;
    }
    return user!.data.id === data!.user.id;
  };

  if (isLoading) return <Spinner />;

  if (error) return <div>L'annonce n'est plus disponible</div>;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data?.description}</p>
        {displayEditButton() && (
          <div className="mt-4">
            <Button onClick={() => navigate(`/listing/edit/${id}`)}>
              Modifier
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
