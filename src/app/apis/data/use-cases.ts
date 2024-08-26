import { cookies } from 'next/headers';
import { fetchWithAuth } from '@/lib/http-config';

export async function getUseCases() {
  const businessId = cookies().get('businessId')?.value;

  try {
    const response = await fetchWithAuth(`/use-case`, {
      next: { tags: [`use-case`] },
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
