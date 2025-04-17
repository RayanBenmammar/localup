import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ModeToggle } from '@/components/mode-toggle.tsx';

export function Navbar() {
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
          <Link to="/listing/new">
            <Button>Créer une annonce</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Se connecter</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
