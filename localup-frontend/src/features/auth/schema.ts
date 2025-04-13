import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z
    .string()
    .min(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Le nom doit avoir au moins 3 charactères' }),
    email: z.string().email({ message: 'Email invalide' }),
    password: z
      .string()
      .min(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' }),
    password_confirmation: z
      .string()
      .min(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['password_confirmation'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
