import { Loader2 } from 'lucide-react'; // Si tu as lucide-react installé (pour les icônes)

export const Spinner = () => (
  <div className="flex justify-center items-center">
    <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
  </div>
);
