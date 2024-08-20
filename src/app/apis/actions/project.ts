'use server';
import { CreateProjectSchema } from '@/lib/form-schema';
import { PrevStateProps } from './auth';

interface CreateProjectState extends PrevStateProps {}

// LOGIN ACTION
export async function createProject(
  prevState: CreateProjectState | undefined,
  formData: FormData
) {
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

  try {
    console.log(dataToSubmit);

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
