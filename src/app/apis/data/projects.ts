import { fetchWithAuth } from '@/lib/http-config';
import { cookies } from 'next/headers';

export async function getBusinessProjects() {
  const businessId = cookies().get('businessId')?.value;

  try {
    const response = await fetchWithAuth(`/business-project/${businessId}`, {
      next: { tags: [`business-projects-${businessId}`] },
    });
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
