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
import { createListing } from '@/features/listings/api.ts';
import { ListingCategory } from '@/types/listingCategory.ts';

export function ListingForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<listingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
    },
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createListing,
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

  const onSubmit = (data: listingFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nouvelle Annonce</CardTitle>
          <CardDescription>
            Entrer les informations concernant votre nouvelle annonce
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
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Ajout en cours...' : 'Ajouter'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
