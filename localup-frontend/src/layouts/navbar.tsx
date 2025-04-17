import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ModeToggle } from '@/components/mode-toggle.tsx';
import { useAuth } from '@/features/auth/useAuth.ts';
import { logoutUser } from '@/features/auth/api.ts';
import { useQueryClient } from '@tanstack/react-query';

export function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await logoutUser();
      queryClient.removeQueries({ queryKey: ['me'] });
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md p-4 bg-background">
      {' '}
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          LocalUp
        </Link>
        <div className="w-1/3">
          <Input placeholder="Rechercher sur LocalUp" />
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() =>
              isAuthenticated ? navigate('/listing/new') : navigate('/login')
            }
          >
            Créer une annonce
          </Button>
          {isAuthenticated ? (
            <Button variant="outline" onClick={handleLogout}>
              Se déconnecter
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline">Se connecter</Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
