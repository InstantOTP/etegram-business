'use server';
import { CreateProjectSchema, CreateBankSchema } from '@/lib/form-schema';
import { fetchWithAuth } from '@/lib/http-config';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { PrevStateProps } from './auth';

interface CreateProductState extends PrevStateProps {}

// LOGIN ACTION
export async function createPayout(
  prevState: CreateProductState | undefined,
  formData: FormData
) {
  const businessID = cookies().get('businessId')?.value;
  const projectID = cookies().get('projectId')?.value;
  const data = Object.fromEntries(formData.entries());
  const validatedFields = CreateBankSchema.safeParse(data);
  // console.log(data);

  if (!validatedFields.success) {
    return {
      message: 'Missing fields.  Try Again.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }

  //data to submit to database
  const dataToSubmit = validatedFields.data;

  const dataToSend = {
    bankCode: dataToSubmit.bankCode,
    bankName: dataToSubmit.bankName,
    accountNumber: dataToSubmit.accountNumber,
    accountName: dataToSubmit.accountName,
  };

  try {
    // console.log(dataToSend);
    const response = await fetchWithAuth(`/bank/${businessID}/${projectID}`, {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });
    console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }
    revalidateTag(`banks-${businessID}`);
    return { ...prevState, message: 'Bank Added', status: 'success' };
  } catch (error) {
    if (error) {
      return {
        message: 'Login failed',
        status: 'failed',
      };
    }
  }
}
