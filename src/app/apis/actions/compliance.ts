'use server';

import {
  BusinessComplianceSchema,
  UserComplianceSchema,
} from '@/lib/form-schema';
import { PrevStateProps } from './auth';
import { fetchWithAuth } from '@/lib/http-config';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
// import { http } from '../../lib/httpConfig';

export interface UserComplianceState extends PrevStateProps {
  errors?: {
    bvn?: string[];
    documentType?: string[];
    documentUrl?: string[];
  };
}

export interface BusinessComplianceState extends PrevStateProps {
  errors?: {
    businessRegistrationType?: string[];
    businessRegistrationNumber?: string[];
    cacUrl?: string[];
    directorBvn?: string[];
    documentType?: string[];
    documentUrl?: string[];
  };
}

// USER COMPILANCE ACTION
export async function userCompliance(
  prevState: UserComplianceState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = UserComplianceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;
  const dataToSend = {
    BVN: dataToSubmit.bvn,
    type: dataToSubmit.documentType,
    document: dataToSubmit.documentUrl,
  };

  try {
    // console.log(dataToSend);

    const response = await fetchWithAuth('/account/kyc', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag('user');
    return {
      ...prevState,
      status: 'success',
    };
  } catch (error) {
    if (error) {
      return {
        message: 'Failed to update compliance',
        status: 'failed',
      };
    }
  }
  redirect('/compliance');
}

// BUSINESS COMPILANCE ACTION
export async function businessCompliance(
  prevState: BusinessComplianceState | undefined,
  formData: FormData
) {
  const businessID = cookies().get('businessId')?.value;
  const data = Object.fromEntries(formData.entries());
  const validatedFields = BusinessComplianceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields. Login Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;

  const dataToSend = {
    registrationType: dataToSubmit.businessRegistrationType, //["BN", "RC", "Nepza"]
    registrationNumber: dataToSubmit.businessRegistrationNumber,
    registrationCertificate: dataToSubmit.cacUrl,
    BVN: dataToSubmit.directorBvn,
    directorIdentityType: dataToSubmit.documentType, //["NIN", "international-passport", "driving-license", "voters-card"]
    directorIdentityDocument: dataToSubmit.documentUrl,
  };

  try {
    // console.log(dataToSend);

    const response = await fetchWithAuth(`/business/kyc/${businessID}`, {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response.body);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    return {
      ...prevState,
      message: 'Submitted. Waiting approval...',
      status: 'success',
    };

    // return { ...prevState, message: 'Login Successful', status: 'success' };
  } catch (error) {
    if (error) {
      return {
        ...prevState,
        message: 'Login failed',
        status: 'failed',
      };
    }
  }
}
