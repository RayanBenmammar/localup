import { LoginForm } from '@/features/auth/components/LoginForm.tsx';

export function LoginPage() {
  return (
    <main className="max-w-md mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
      <LoginForm />
    </main>
  );
}
