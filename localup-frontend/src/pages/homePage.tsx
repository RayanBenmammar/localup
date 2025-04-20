import { getListings } from '@/lib/api.ts';
import { useQuery } from '@tanstack/react-query';
import { Listing } from '@/types/listings.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { PaginationControls } from '@/components/ui/paginationControls';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [params] = useSearchParams();
  const search = params.get('search') || '';
  const navigate = useNavigate();

  const {
    data: listings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['listings', { page, search }],
    queryFn: () => getListings({ page, search }),
  });

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Une erreur est survenue</div>;
  if (listings.data && listings.data.length === 0)
    return (
      <div className="p-4 space-y-4">
        <p>Aucune annonce disponible.</p>
      </div>
    );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Annonces récentes</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings?.data.map((listing: Listing) => (
          <li
            key={listing.id}
            className="border rounded-lg p-4 shadow"
            onClick={() => navigate(`/listing/${listing.id}`)}
          >
            <h2 className="text-xl font-semibold">{listing.title}</h2>
            <p className="text-gray-600">{listing.description}</p>
            <span className="text-sm text-blue-500">{listing.category}</span>
            <p className="text-sm text-gray-500 mt-2">
              Par {listing.user.name}
            </p>
          </li>
        ))}
      </ul>
      {listings?.meta && (
        <PaginationControls
          currentPage={listings.meta.currentPage}
          lastPage={listings.meta.lastPage}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
