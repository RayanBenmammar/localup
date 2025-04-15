import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/home.tsx';
import { LoginPage } from '@/pages/login.tsx';
import { RegisterPage } from '@/pages/register.tsx';
import { ListingDetailsPage } from '@/pages/listing-details.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/listing/:id',
    element: <ListingDetailsPage />,
  },
]);
