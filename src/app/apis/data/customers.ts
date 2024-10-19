'use server';
import { fetchWithAuth } from '@/lib/http-config';
import { cookies } from 'next/headers';

export async function getCustomers() {
  const projectId = cookies().get('projectId')?.value;
  const businessId = cookies().get('businessId')?.value;

  try {
    const response = await fetchWithAuth(
      `/customer/${businessId}/${projectId}`,
      {
        next: { tags: [`customer-${projectId}-${businessId}`] },
      }
    );
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { message: data };
    }
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
    return null;
  }
}
