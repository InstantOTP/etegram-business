'use server';

import { redirect } from 'next/navigation';
import { revalidateTag, revalidatePath } from 'next/cache';
import {
  CreateBusinessSchema,
  ForgotpasswordSchema,
  LoginSchema,
  ResetpasswordSchema,
  SignUpSchema,
  VerifyEmailSchema,
} from '@/lib/form-schema';
import { fetchWithAuth } from '@/lib/http-config';
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
  from?: string;
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
    // console.log(dataToSubmit);

    const response = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(dataToSubmit),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }

    cookies().set({
      name: 'access_token',
      value: data?.accessToken,
      expires: expiresIn6hrs,
    });

    cookies().set({
      name: 'refresh_token',
      value: data?.refreshToken,
      expires: expiresIn1day,
    });
  } catch (error) {
    if (error) {
      return {
        message: 'Login failed',
        status: 'failed',
      };
    }
  }
  redirect('/onboarding/select-business');
  // redirect(`/auth/verify-email?email=${dataToSubmit.email}&from=sign-in`);
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

  //data to submit to database
  const dataToSubmit = validatedFields.data;
  const dataToSend = {
    firstname: dataToSubmit.firstName,
    lastname: dataToSubmit.lastName,
    email: dataToSubmit.email,
    phone: dataToSubmit.phone,
    password: dataToSubmit.password,
  };
  try {
    // console.log(dataToSend);
    const response = await fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }

    cookies().set({
      name: 'access_token',
      value: data?.accessToken,
      expires: expiresIn6hrs,
    });

    cookies().set({
      name: 'refresh_token',
      value: data?.refreshToken,
      expires: expiresIn1day,
    });

    await sendVerificationCode(dataToSubmit?.email);
  } catch (error) {
    console.error(error);
    // If a database error occurs, return a more specific error.
    return {
      ...prevState,
      message: 'Sign up failed',
      status: 'failed',
    };
  }
  redirect(`/auth/verify-email?email=${dataToSubmit.email}&from=sign-up`);
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
  const dataToSend = {
    email: prevState?.email,
    verificationCode: dataToSubmit.otp,
  };
  try {
    console.log(dataToSend);
    // const response = await fetchWithAuth('/auth/verify-account', {
    //   method: 'PATCH',
    //   body: JSON.stringify(dataToSend),
    // });
    // console.log(response);
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
  if (prevState?.from === 'sign-up') {
    redirect(`/auth/create-business`);
  } else if (prevState?.from === 'sign-in') {
    redirect('/onboarding/select-business');
  } else {
    redirect(
      `/auth/reset-password?email=${prevState?.email}&otp=${dataToSubmit.otp}`
    );
  }
}

export async function sendVerificationCode(email: string) {
  try {
    const response = await fetchWithAuth('/auth/request-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
      return { message: data, status: 'failed' };
    }
    return { message: data, status: 'success' };
  } catch (e) {
    console.error(e);
    // If a database error occurs, return a more specific error.
    return {
      message: 'Failed to send Code. Try again',
      status: 'failed',
    };
  }
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
    name: dataToSubmit.businessName,
    username: dataToSubmit.userName,
    type: dataToSubmit.businessType,
    useCase: reasons,
    industry: dataToSubmit.businessIndustry,
    softwareDeveloper: dataToSubmit.developer === 'yes' ? true : false,
  };

  try {
    // console.log(dataToSend);
    const response = await fetchWithAuth('/business', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
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
      message: 'Verification failed',
      status: 'failed',
    };
  }
  redirect(`/onboarding/select-business`);
}
// FORGOT PASSWORD ACTION
export async function forgotPassword(
  prevState: ForgotPasswordState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = ForgotpasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields. Login Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;
  try {
    const response = await fetchWithAuth('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(dataToSubmit),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    // return {
    //   ...prevState,
    //   message: data,
    //   status: 'success',
    // };
  } catch (error) {
    return {
      message: 'Something happened. Try again!',
      status: 'failed',
    };
  }
  redirect(
    `/auth/verify-email?email=${dataToSubmit.email}&from=forgot-password`
  );
}

// LOGOIT ACTION
export async function logout() {
  let refreshToken = { refreshToken: cookies().get('refresh_token')?.value };

  try {
    const response = await fetchWithAuth('/auth/logout', {
      method: 'DELETE',
      body: JSON.stringify(refreshToken),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);

    if (!response.ok) {
      return { message: data?.message, status: 'failed' };
    }

    cookies().delete('access_token');
    cookies().delete('refresh_token');
  } catch (error: any) {
    if (error) {
      cookies().delete('access_token');
      cookies().delete('refresh_token');
      redirect('/auth/sign-in');
    }
  }

  revalidateTag('user');
  revalidatePath('/dashboard', 'layout');
  redirect('/auth/sign-in');
}

export async function resetPassword(
  prevState: ResetPasswordState | undefined,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = ResetpasswordSchema.safeParse(data);
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
    password: dataToSubmit.password,
    email: prevState?.email,
    token: prevState?.token,
  };
  try {
    const response = await fetchWithAuth('/auth/reset-password', {
      method: 'PATCH',
      body: JSON.stringify(dataToSend),
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
  redirect(`/auth/sign-in`);
}
