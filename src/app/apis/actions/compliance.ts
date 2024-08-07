'use server';

import { UserComplianceSchema } from '@/lib/form-schema';
import { PrevStateProps } from './auth';
import { redirect } from 'next/navigation';
// import { http } from '../../lib/httpConfig';

export interface UserComplianceState extends PrevStateProps {
  errors?: {
    bvn?: string[];
    documentType?: string[];
    documentUrl?: string[];
  };
}

// LOGIN ACTION
export async function userCompliance(
  prevState: UserComplianceState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = UserComplianceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields. Login Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;

  try {
    console.log(dataToSubmit);

    // const response = await http('/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify(dataToSubmit),
    // });
    // // console.log(response.body);
    // const data = await response.json();
    // // console.log(data);
    // if (!response.ok) {
    //   return { ...prevState, message: data, status: 'failed' };
    // }
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
