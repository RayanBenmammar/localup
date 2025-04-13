import { LoginForm } from '@/features/auth/components/LoginForm.tsx';

export function LoginPage() {
  return (
    <div className="flex min-h-svh md:min-w-lg w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
