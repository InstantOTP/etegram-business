import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be more longer 6' }),
});

export const SignUpSchema = z
  .object({
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

export const VerifyEmailSchema = z.object({
  otp: z.string().min(6, { message: 'Enter a valid your 6 digits code' }),
});

export const CreateBusinessSchema = z.object({
  businessName: z.string().min(1, { message: 'Business name is required' }),
  userName: z.string().min(1, { message: 'Username is required' }),
  businessType: z.string().min(1, { message: 'Business Type is required' }),
  businessIndustry: z
    .string()
    .min(1, { message: 'Business Industry is required' }),
  developer: z.string().min(1, { message: 'Business Type is required' }),
  consent: z
    .string({ required_error: 'Click on the checkbox to proceed' })
    .includes('on', { message: 'Click on the checkbox to proceed' }),
});
