'use server';
import { CreateProjectSchema } from '@/lib/form-schema';
import { PrevStateProps } from './auth';
import { fetchWithAuth } from '@/lib/http-config';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

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
    useCase: servicesID,
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
    revalidateTag(`business-projects-${businessID}`);
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

export async function updateProjectUrl(formData: {
  callbackUrl: string;
  webhookUrl: string;
  type: 'test' | 'live' | string;
}) {
  const businessID = cookies().get('businessId')?.value;
  const projectID = cookies().get('projectId')?.value;

  let dataToSend;

  if (formData.type === 'test') {
    dataToSend = {
      callbackUrl: {
        test: formData.callbackUrl,
      },
      webhookUrl: {
        test: formData.webhookUrl,
      },
    };
  } else {
    dataToSend = {
      callbackUrl: {
        live: formData.callbackUrl,
      },
      webhookUrl: {
        live: formData.webhookUrl,
      },
    };
  }

  // console.log(dataToSend);

  try {
    // console.log(dataToSend);
    const response = await fetchWithAuth(
      `/business-project/${businessID}/${projectID}`,
      {
        method: 'PUT',
        body: JSON.stringify(dataToSend),
      }
    );
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { message: data, status: 'failed' };
    }
    revalidateTag(`business-projects-${businessID}`);
    return { message: 'Project Updated', status: 'success' };
  } catch (error) {
    if (error) {
      return {
        message: 'Login failed',
        status: 'failed',
      };
    }
  }
}

export async function selectProject(projectId: any) {
  cookies().set('projectId', projectId);
  redirect('/');
}
