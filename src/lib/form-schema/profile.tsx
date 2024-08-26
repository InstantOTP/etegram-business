import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  phone: z
    .string()
    .min(11, { message: 'Invalid Phone number' })
    .max(11, { message: 'Invalid Phone number' }),
});

export const UpdatepasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: 'Password must be 8 or more character' }),
    password: z
      .string()
      .min(8, { message: 'Password must be 8 or more character' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be 8 or more character' }),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// export const UpdateProfileKYCSchema = z.object({
//   BVN: z.string().min(1, { message: 'First name is required' }),
//   type: z.string().min(1, { message: 'Last name is required' }),
//   document: z.string().min(1, {message: 'Document is required'}),
// });
