import { ListingForm } from '@/features/listings/components/listingForm.tsx';

export function CreateListingPage() {
  return (
    <div className="flex min-h-svh md:min-w-lg w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ListingForm />
      </div>
    </div>
  );
}
