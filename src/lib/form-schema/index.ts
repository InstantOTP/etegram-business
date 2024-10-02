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

export const UserComplianceSchema = z.object({
  bvn: z
    .string()
    .min(11, { message: 'BVN must be 11 digits' })
    .max(11, { message: 'BVN must be 11 digits' }),
  documentType: z.string().min(1, { message: 'Document Type is required' }),
  documentUrl: z.string().min(1, { message: 'Please upload document' }),
});

export const BusinessComplianceSchema = z.object({
  businessRegistrationType: z
    .string()
    .min(1, { message: 'Business Registraction Type is required' }),
  businessRegistrationNumber: z
    .string()
    .min(1, { message: 'Business Registraction Number is required' }),
  cacUrl: z.string().min(1, { message: 'Please upload document' }),
  directorBvn: z
    .string()
    .min(11, { message: 'BVN must be 11 digits' })
    .max(11, { message: 'BVN must be 11 digits' }),
  documentType: z.string().min(1, { message: 'Document Type is required' }),
  documentUrl: z.string().min(1, { message: 'Please upload document' }),
});

export const CreateProjectSchema = z.object({
  projectName: z.string().min(1, { message: 'Project Name is required' }),
  projectDescription: z.string(),
});
export const CreateBankSchema = z.object({
  bankName: z.string().min(1, { message: 'Enter Bank Name' }),
  bankCode: z.string(),
  accountNumber: z
    .string()
    .min(10, { message: 'Enter a Valid Account Number' })
    .max(10, { message: 'Enter a Valid Account Number' }),
  accountName: z.string().min(1, { message: 'Enter account Name' }),
});

export const ForgotpasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
});

export const ResetpasswordSchema = z
  .object({
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
