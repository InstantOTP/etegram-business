import { z } from 'zod';

export const BusinessInfoSchema = z.object({
  name: z.string().min(1, { message: 'Business name is required' }),
  description: z
    .string()
    .min(1, { message: 'Business Description is required' }),
  type: z.string().min(1, { message: 'Business Type is required' }),
  industry: z.string().min(1, { message: 'Business Industry is required' }),
  contactEmail: z
    .string()
    .min(1, { message: 'Contact Email is required' })
    .email({ message: 'Invalid email' }),
  supportEmail: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  phone: z
    .string()
    .min(11, { message: 'Invalid Phone number' })
    .max(11, { message: 'Invalid Phone number' }),
  state: z.string().min(1, { message: 'State is required' }),
  city: z.string().min(1, { message: 'Country is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  website: z.string(),
  facebook: z.string(),
  instagram: z.string(),
  twitter: z.string(),
  logo: z.string(),
});
