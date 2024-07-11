'use server';

import { redirect } from 'next/navigation';
import { revalidateTag, revalidatePath } from 'next/cache';
import {
  CreateBusinessSchema,
  LoginSchema,
  SignUpSchema,
  VerifyEmailSchema,
} from '@/lib/form-schema';
// import { http } from '../../lib/httpConfig';
import { cookies } from 'next/headers';

export interface PrevStateProps {
  message?: string;
  status?: string;
}
export interface SignupState extends PrevStateProps {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    phone?: string[];
  };
  referral?: string;
}

export interface SignInState extends PrevStateProps {
  errors?: {
    email?: string[];
    password?: string[];
  };
  redirectUrl?: string;
}

export interface VerifyEmailState extends PrevStateProps {
  errors?: {
    otp?: string[];
  };
  email?: string;
}

export interface CreateBusinessState extends PrevStateProps {
  errors?: {
    businessName?: string[];
    userName?: string[];
    businessType?: string[];
    businessIndustry?: string[];
    developer?: string[];
    consent?: string[];
    reasons?: string[];
  };
}

export interface ForgotPasswordState extends PrevStateProps {
  errors?: {
    email?: string[];
  };
}

export interface ResetPasswordState extends PrevStateProps {
  errors?: {
    password?: string[];
    confirmPassword?: string[];
  };
  email?: string;
  token?: string;
}

const expiresIn6hrs = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
const expiresIn1day = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);

// LOGIN ACTION
export async function login(
  prevState: SignInState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields. Login Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;
  //check if there's redirect url
  const redirectUrl = prevState?.redirectUrl
    ? `?redirectUrl=${prevState.redirectUrl}`
    : '';
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
    cookies().set({
      name: 'access_token',
      value: 'access',
      expires: expiresIn6hrs,
    });

    cookies().set({
      name: 'refresh_token',
      value: 'refresh',
      expires: expiresIn1day,
    });
    // return { ...prevState, message: 'Login Successful', status: 'success' };
  } catch (error) {
    if (error) {
      return {
        message: 'Login failed',
        status: 'failed',
      };
    }
  }
  redirect(`/`);
}

// SIGN UP ACTION
export async function signup(
  prevState: SignupState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = SignUpSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      ...prevState,
      message: 'Missing fields. Sign up Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  const referral = prevState?.referral ? prevState.referral : '';

  //data to submit to database
  const dataToSubmit = validatedFields.data;
  // const dataToSend = {
  //   username: dataToSubmit.username,
  //   email: dataToSubmit.email,
  //   phone: dataToSubmit.phone,
  //   password: dataToSubmit.password,
  //   referral,
  // };
  try {
    console.log(dataToSubmit);
    // const response = await http('/auth', {
    //   method: 'POST',
    //   body: JSON.stringify(dataToSend),
    // });
    // // console.log(response);
    // const data = await response.json();
    // // console.log(data);
    // if (!response.ok) {
    //   return { ...prevState, message: data, status: 'failed' };
    // }

    cookies().set({
      name: 'access_token',
      value: 'access',
      expires: expiresIn6hrs,
    });

    cookies().set({
      name: 'refresh_token',
      value: 'refresh',
      expires: expiresIn1day,
    });
  } catch (error) {
    console.error(error);
    // If a database error occurs, return a more specific error.
    return {
      ...prevState,
      message: 'Sign up failed',
      status: 'failed',
    };
  }
  redirect(`/auth/verify-email`);
}

// VERIFY EMAIL
export async function verifyEmail(
  prevState: VerifyEmailState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = VerifyEmailSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      ...prevState,
      message: 'Missing fields. Sign up Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;
  // const dataToSend = {
  //   username: dataToSubmit.username,
  //   email: dataToSubmit.email,
  //   phone: dataToSubmit.phone,
  //   password: dataToSubmit.password,
  //   referral,
  // };
  try {
    console.log(dataToSubmit);
    // const response = await http('/auth', {
    //   method: 'POST',
    //   body: JSON.stringify(dataToSend),
    // });
    // // console.log(response);
    // const data = await response.json();
    // // console.log(data);
    // if (!response.ok) {
    //   return { ...prevState, message: data, status: 'failed' };
    // }
  } catch (error) {
    console.error(error);
    // If a database error occurs, return a more specific error.
    return {
      ...prevState,
      message: 'Verification failed',
      status: 'failed',
    };
  }
  redirect(`/auth/create-business`);
}

// VERIFY EMAIL
export async function createBusiness(
  prevState: CreateBusinessState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const reasons = formData.getAll('reasons');
  // console.log(reasons);
  const validatedFields = CreateBusinessSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      ...prevState,
      message: 'Missing fields. Sign up Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;
  const dataToSend = {
    ...dataToSubmit,
    reasons,
  };
  try {
    console.log(dataToSend);
    // const response = await http('/auth', {
    //   method: 'POST',
    //   body: JSON.stringify(dataToSend),
    // });
    // // console.log(response);
    // const data = await response.json();
    // // console.log(data);
    // if (!response.ok) {
    //   return { ...prevState, message: data, status: 'failed' };
    // }
  } catch (error) {
    console.error(error);
    // If a database error occurs, return a more specific error.
    return {
      ...prevState,
      message: 'Verification failed',
      status: 'failed',
    };
  }
  redirect(`/`);
}
// FORGOT PASSWORD ACTION
// export async function forgotPassword(
//   prevState: ForgotPasswordState | undefined,
//   formData: FormData
// ) {
//   const data = Object.fromEntries(formData.entries());
//   const validatedFields = ForgotpasswordSchema.safeParse(data);

//   if (!validatedFields.success) {
//     return {
//       message: 'Missing fields. Login Failed.',
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   //data to submit to database
//   const dataToSubmit = validatedFields.data;
//   try {
//     const response = await http('/auth/forgot-password', {
//       method: 'PATCH',
//       body: JSON.stringify(dataToSubmit),
//     });
//     // console.log(response);
//     const data = await response.json();
//     // console.log(data);
//     if (!response.ok) {
//       return { ...prevState, message: data, status: 'failed' };
//     }
//     return {
//       ...prevState,
//       message: data,
//       status: 'success',
//     };
//   } catch (error) {
//     return {
//       message: 'Something happened. Try again!',
//       status: 'failed',
//     };
//   }
//   // redirect('/auth/sign-in');
// }

// LOGOIT ACTION
// export async function logout(prevState: PrevStateProps | undefined) {
//   let refreshToken = { refreshToken: cookies().get('refresh_token')?.value };
//   try {
//     const response = await http('/auth/logout', {
//       method: 'POST',
//       body: JSON.stringify(refreshToken),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return { message: data?.message, status: 'failed' };
//     }

//     cookies().delete('access_token');
//     cookies().delete('refresh_token');
//     cookies().delete('provider_id');

//     // return { message: data?.message, status: "success" }
//   } catch (error: any) {
//     if (error) {
//       // if (data === 'User not found!') {
//       //   redirect('/auth/sign-in');
//       // }
//       cookies().delete('access_token');
//       cookies().delete('refresh_token');
//       cookies().delete('provider_id');
//       redirect('/auth/sign-in');

//       // return {
//       //   message: 'Failed to logout. Please try again',
//       //   status: 'failed',
//       // };
//     }
//   }

//   revalidateTag('user');
//   revalidatePath('/dashboard', 'layout');
//   redirect('/auth/sign-in');
// }

//SELECT PROVIDER ACTION
// export async function handleSelectProviderAction(
//   providerID: string,
//   providerName: string,
//   changeRoute = true
// ) {
//   cookies().set('provider_id', providerID);
//   cookies().set('provider_name', providerName);
//   revalidateTag('countries');
//   revalidateTag('services');
//   if (changeRoute) {
//     redirect('/dashboard');
//   }
// }

// export async function resetPassword(
//   prevState: ResetPasswordState | undefined,
//   formData: FormData
// ) {
//   const data = Object.fromEntries(formData.entries());
//   const validatedFields = ResetPasswordSchema.safeParse(data);
//   // console.log(prevState);

//   if (!validatedFields.success) {
//     return {
//       ...prevState,
//       message: 'Missing fields. Please, Try again.',
//       errors: validatedFields.error.flatten().fieldErrors,
//       status: 'failed',
//     };
//   }

//   //data to submit to database
//   const dataToSubmit = validatedFields.data;

//   let dataToSend = {
//     password: dataToSubmit.password,
//     email: prevState?.email,
//     token: prevState?.token,
//   };
//   try {
//     const response = await http('/auth/reset-password', {
//       method: 'PATCH',
//       body: JSON.stringify(dataToSend),
//     });
//     // console.log(response);
//     const data = await response.json();
//     // console.log(data);
//     if (!response.ok) {
//       return { ...prevState, message: data, status: 'failed' };
//     }
//   } catch (error) {
//     console.error(error);
//     // If a database error occurs, return a more specific error.
//     return {
//       ...prevState,
//       message: 'failed',
//       status: 'failed',
//     };
//   }
//   redirect(`/auth/sign-in`);
// }
