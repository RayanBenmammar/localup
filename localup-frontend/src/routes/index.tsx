import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from '@/pages/homePage.tsx';
import { LoginPage } from '@/pages/loginPage.tsx';
import { RegisterPage } from '@/pages/registerPage.tsx';
import { ListingDetailsPage } from '@/pages/listingDetailsPage.tsx';
import { CreateListingPage } from '@/pages/createListingPage.tsx';
import { Layout } from '@/layouts/layout.tsx';
import { AuthGuard } from '@/guards/authGuard.tsx';
import { EditListingPage } from '@/pages/editListingPage.tsx';

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
    path: '/listing/',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/listing/edit/',
    element: <Navigate to="/" replace />,
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
  {
    path: '/listing/edit/:id',
    element: (
      <Layout>
        <EditListingPage />
      </Layout>
    ),
    loader: AuthGuard,
  },
]);
