import zod from 'zod';

export const registerSchema = zod
  .object({
    username: zod
      .string()
      .min(3, { message: 'Username must be at least 3 characters long' }),
    password: zod
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: zod
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    email: zod.string().email({ message: 'Invalid email' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterData = zod.infer<typeof registerSchema>;
