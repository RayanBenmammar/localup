import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/home.tsx';
import { LoginPage } from '@/pages/login.tsx';
import { RegisterPage } from '@/pages/register.tsx';
import { ListingDetailsPage } from '@/pages/listingDetails.tsx';
import { CreateListingPage } from '@/pages/createListingPage.tsx';
import { Layout } from '@/layouts/layout.tsx';
import { AuthGuard } from '@/guards/authGuard.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: '/register',
    element: (
      <Layout>
        <RegisterPage />
      </Layout>
    ),
  },
  {
    path: '/listing/:id',
    element: (
      <Layout>
        <ListingDetailsPage />
      </Layout>
    ),
  },
  {
    path: '/listing/new',
    element: (
      <Layout>
        <CreateListingPage />
      </Layout>
    ),
    loader: AuthGuard,
  },
]);
