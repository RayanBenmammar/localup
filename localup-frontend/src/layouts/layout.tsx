import { Navbar } from '@/layouts/navbar.tsx';
import * as React from 'react';
import { ThemeProvider } from '@/components/theme-provider.tsx';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Navbar />
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
}
