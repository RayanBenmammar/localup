import { ListingForm } from '@/features/listings/components/listingForm.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useListing } from '@/lib/api.ts';
import { Spinner } from '@/components/ui/spinner.tsx';

export function EditListingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate('/');
    }
  }, [id, navigate]);

  const { data, isLoading, error } = useListing(id!);

  if (isLoading) return <Spinner />;

  if (error) return <div>L'annonce n'est plus disponible</div>;

  return (
    <div className="flex min-h-svh md:min-w-lg w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ListingForm data={data} />
      </div>
    </div>
  );
}
