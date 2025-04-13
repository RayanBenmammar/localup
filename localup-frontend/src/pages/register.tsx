import { RegisterForm } from '@/features/auth/components/RegisterForm';

export function RegisterPage() {
  return (
    <main className="max-w-md mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
      <RegisterForm />
    </main>
  );
}
