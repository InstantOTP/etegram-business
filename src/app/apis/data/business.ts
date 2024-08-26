'use server';

import { fetchWithAuth } from '@/lib/http-config';
import { cookies } from 'next/headers';

export async function getUserBusinesses() {
  try {
    const response = await fetchWithAuth(`/business-admin`, {
      next: { tags: [`user-businessses`] },
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

export async function getCurrentBusiness() {
  const businessId = cookies().get('businessId')?.value;

  try {
    const response = await fetchWithAuth(`/business/${businessId}`, {
      next: { tags: [`currentBusiness-${businessId}`] },
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
