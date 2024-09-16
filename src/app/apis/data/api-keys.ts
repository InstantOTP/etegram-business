'use server';
import { cookies } from 'next/headers';
import { fetchWithAuth } from '@/lib/http-config';
import { revalidatePath } from 'next/cache';

export async function generateAPIKey() {
  const businessId = cookies().get('businessId')?.value;
  const projectId = cookies().get('projectId')?.value;
  try {
    const response = await fetchWithAuth(
      `/business-project/api-key/${businessId}/${projectId}?type=test`,
      {
        next: { tags: [`apikey-${businessId}-${projectId}`] },
      }
    );
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { message: data };
    }
    revalidatePath('/settings');
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
    console.log(error);
    return null;
  }
}

export async function getAPIKeys() {
  const storedKey = cookies().get('apiKey')?.value;

  if (storedKey) {
    return { testApiKey: storedKey };
  } else {
    return { testApiKey: undefined };
  }
}
