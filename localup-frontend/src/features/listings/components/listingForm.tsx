import { useForm } from 'react-hook-form';
import { listingFormData, listingSchema } from '@/features/listings/schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { useMutation } from '@tanstack/react-query';
import { createListing, editListing } from '@/features/listings/api.ts';
import { ListingCategory } from '@/types/listingCategory.ts';
import { Listing } from '@/types/listings.ts';

interface ListingFormProps extends React.ComponentPropsWithoutRef<'div'> {
  data?: Listing;
}

export function ListingForm({ className, data, ...props }: ListingFormProps) {
  const form = useForm<listingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
      price: data?.price ?? 0,
      category: data?.category ?? undefined,
    },
  });

  const isEdit = Boolean(data);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: isEdit ? editListing : createListing,
    onSuccess: (data) => {
      try {
        const jsonStart = data.indexOf('{');
        const listingData = JSON.parse(data.substring(jsonStart));
        const listingId = listingData.id;
        navigate(`/listing/${listingId}`);
      } catch (error) {
        console.error('Erreur lors du parsing de la réponse', error);
        navigate(`/`);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (listingData: listingFormData) => {
    if (isEdit) {
      listingData.id = data!.id;
    }
    mutation.mutate(listingData);
  };

  const submitButtonComponent = (isPending: boolean) => {
    if (!isEdit)
      return (
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Ajout en cours...' : 'Ajouter'}
        </Button>
      );

    return (
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Modification en cours...' : 'Modifier'}{' '}
      </Button>
    );
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEdit ? "Editer l'annonce " : 'Nouvelle Annonce'}
          </CardTitle>
          <CardDescription>
            {isEdit
              ? 'Entrer les informations concernant votre annonce '
              : 'Entrer les informations concernant votre nouvelle annonce'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Prix"
                        step="any"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisissez une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(ListingCategory).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <div className={cn('flex justify-center gap-6', className)}>
                <Button
                  type="button"
                  onClick={() =>
                    navigate(isEdit ? `/listing/${data!.id}` : '/')
                  }
                >
                  Annuler
                </Button>
                {submitButtonComponent(mutation.isPending)}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
