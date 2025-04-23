import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ModeToggle } from '@/components/mode-toggle.tsx';
import { useAuth } from '@/features/auth/useAuth.ts';
import { logoutUser } from '@/features/auth/api.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { ListingCategory } from '@/types/listingCategory.ts';

export function Navbar() {
  const [inputValue, setInputValue] = useState('');
  const [params] = useSearchParams();
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

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSearch = () => {
    const newParams = new URLSearchParams(params);
    newParams.set('search', inputValue);
    newParams.set('page', '1');
    navigate({
      pathname: '/',
      search: newParams.toString(),
    });
  };

  const handleCategory = (category: string) => {
    const newParams = new URLSearchParams(params);
    newParams.set('category', category);
    newParams.set('page', '1');
    navigate({
      pathname: '/',
      search: newParams.toString(),
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md p-4 pb-0 bg-background">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          LocalUp
        </Link>
        <div className="w-1/3 relative">
          <Input
            onChange={(event) => handleInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
            value={inputValue}
            placeholder="Rechercher sur LocalUp"
            className="pr-12"
          />
          <Button
            onClick={handleSearch}
            className="absolute right-0 top-0 scale-80 h-full "
            size="icon"
          >
            <Search className="h-4 w-4" />
          </Button>
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
      <div className="w-full pt-4">
        <nav>
          <ul className="inline-flex gap-4">
            {Object.entries(ListingCategory).map(
              ([key, value], index, array) => (
                <li key={key} className="flex items-center">
                  <Button
                    variant="link"
                    className="hover:cursor-pointer"
                    onClick={() => handleCategory(value.en)}
                  >
                    {value.fr}
                  </Button>
                  {index < array.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="relative flex-1 before:absolute before:content-['·'] before:font-bold before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:select-none before:pointer-events-none"
                    ></div>
                  )}
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
