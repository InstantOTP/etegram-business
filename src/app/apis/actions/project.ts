'use server';
import { CreateProjectSchema } from '@/lib/form-schema';
import { PrevStateProps } from './auth';
import { fetchWithAuth } from '@/lib/http-config';
import { cookies } from 'next/headers';

interface CreateProjectState extends PrevStateProps {}

// LOGIN ACTION
export async function createProject(
  prevState: CreateProjectState | undefined,
  formData: FormData
) {
  const businessID = cookies().get('businessId')?.value;
  const servicesID = cookies().get('serviceId')?.value;
  const data = Object.fromEntries(formData.entries());
  const validatedFields = CreateProjectSchema.safeParse(data);

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
    name: dataToSubmit.projectName,
    description: dataToSubmit.projectDescription,
    useCase: '66c5b76f2fc6017398fb5c59',
  };

  try {
    // console.log(dataToSend);
    const response = await fetchWithAuth(`/business-project/${businessID}`, {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }

    return { ...prevState, message: 'Project Created', status: 'success' };
  } catch (error) {
    if (error) {
      return {
        message: 'Login failed',
        status: 'failed',
      };
    }
  }
}