'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PrevStateProps } from './auth';
import { BusinessInfoSchema } from '@/lib/form-schema/business';
import { fetchWithAuth } from '@/lib/http-config';

export interface BusinessInfoState extends PrevStateProps {
  errors?: {
    name?: string[];
    type?: string[];
    industry?: string[];
    description?: string[];
    contactEmail?: string[];
    supportEmail?: string[];
    phone?: string[];
    state?: string[];
    city?: string[];
    address?: string[];
  };
}

export async function selectBusiness(businessId: any) {
  cookies().set('businessId', businessId);
  redirect('/onboarding/select-services');
}

export async function selectService(serviceId: any) {
  cookies().set('serviceId', serviceId);
  redirect('/onboarding/projects');
}

// BUSINESS COMPILANCE ACTION
export async function updateBusinessInfo(
  prevState: BusinessInfoState | undefined,
  formData: FormData
) {
  const businessID = cookies().get('businessId')?.value;
  const data = Object.fromEntries(formData.entries());
  const validatedFields = BusinessInfoSchema.safeParse(data);
  // console.log(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields. Update Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;

  const dataToSend = {
    name: dataToSubmit.name,
    type: dataToSubmit.type,
    industry: dataToSubmit.industry,
    description: dataToSubmit.description,
    logo: dataToSubmit.logo,
    phone: dataToSubmit.phone,
    supportEmail: dataToSubmit.supportEmail,
    contactEmail: dataToSubmit.contactEmail,
    address: {
      state: dataToSubmit?.state,
      city: dataToSubmit?.city,
      address: dataToSubmit.address,
    },
    website: dataToSubmit.website,
    socialLinks: {
      facebook: dataToSubmit.facebook,
      instgram: dataToSubmit.instagram,
      twitter: dataToSubmit.twitter,
    },
  };

  try {
    // console.log(dataToSend);

    const response = await fetchWithAuth(`/business/${businessID}`, {
      method: 'PUT',
      body: JSON.stringify(dataToSend),
    });
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    return {
      ...prevState,
      message: 'Submitted.',
      status: 'success',
    };

    // return { ...prevState, message: 'Login Successful', status: 'success' };
  } catch (error) {
    if (error) {
      return {
        ...prevState,
        message: 'Failed to update',
        status: 'failed',
      };
    }
  }
}
