'use server';

import {
  UpdatepasswordSchema,
  UpdateProfileSchema,
} from '@/lib/form-schema/profile';
import { PrevStateProps } from './auth';
import { fetchWithAuth } from '@/lib/http-config';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { UserComplianceSchema } from '@/lib/form-schema';

interface UpdateProfileState extends PrevStateProps {}
interface UpdatePasswordState extends PrevStateProps {}

export async function updateProfile(
  prevState: UpdateProfileState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = UpdateProfileSchema.safeParse(data);

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
    firstname: dataToSubmit.firstName,
    lastname: dataToSubmit.lastName,
    phone: dataToSubmit.phone,
  };

  try {
    console.log(dataToSubmit);

    const response = await fetchWithAuth('/account/profile', {
      method: 'PUT',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response.body);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag('user');
    return {
      ...prevState,
      message: 'Profile Updated',
      status: 'success',
    };
  } catch (error) {
    if (error) {
      return {
        message: 'Login failed',
        status: 'failed',
      };
    }
  }
}

export async function updatePassword(
  prevState: UpdatePasswordState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = UpdatepasswordSchema.safeParse(data);
  // console.log(prevState);

  if (!validatedFields.success) {
    return {
      ...prevState,
      message: 'Missing fields. Please, Try again.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;

  let dataToSend = {
    oldPassword: dataToSubmit.oldPassword,
    newPassword: dataToSubmit.password,
  };
  try {
    const response = await fetchWithAuth('/account/change-password', {
      method: 'PATCH',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    return { ...prevState, message: 'Password Updated', status: 'success' };
  } catch (error) {
    console.error(error);
    // If a database error occurs, return a more specific error.
    return {
      ...prevState,
      message: 'failed',
      status: 'failed',
    };
  }
}

export async function deleteProfile(prevState: PrevStateProps) {
  try {
    const response = await fetchWithAuth('/account/profile', {
      method: 'DELETE',
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
  } catch (error) {
    console.error(error);
    // If a database error occurs, return a more specific error.
    return {
      ...prevState,
      message: 'failed',
      status: 'failed',
    };
  }
  redirect('/auth/sign-in');
}

// export async function updateProfileKYC(
//   prevState: UpdateProfileState | undefined,
//   formData: FormData
// ) {
//   const data = Object.fromEntries(formData.entries());
//   const validatedFields = UserComplianceSchema.safeParse(data);

//   if (!validatedFields.success) {
//     return {
//       message: 'Missing fields. Login Failed.',
//       errors: validatedFields.error.flatten().fieldErrors,
//       status: 'failed',
//     };
//   }

//   //data to submit to database
//   const dataToSubmit = validatedFields.data;
//   const dataToSend = {
//     BVN: dataToSubmit.bvn,
//     type: dataToSubmit.documentType,
//     document: dataToSubmit.documentUrl,
//   };

//   try {
//     console.log(dataToSend);

//     const response = await fetchWithAuth('/account/kyc', {
//       method: 'PUT',
//       body: JSON.stringify(dataToSend),
//     });
//     // console.log(response.body);
//     const data = await response.json();
//     // console.log(data);
//     if (!response.ok) {
//       return { ...prevState, message: data, status: 'failed' };
//     }
//     revalidateTag('user');
//     return {
//       ...prevState,
//       message: 'Profile Updated',
//       status: 'success',
//     };
//   } catch (error) {
//     if (error) {
//       return {
//         message: 'Login failed',
//         status: 'failed',
//       };
//     }
//   }
// }
