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

export function ListingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate('/');
    }
  }, [id, navigate]);

  const { data, isLoading, error } = useListing(id!);

  if (isLoading) return <Spinner />;

  if (error) return <div>{error.message}</div>;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data?.description}</p>
      </CardContent>
    </Card>
  );
}
