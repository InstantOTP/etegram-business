'use server';

import { fetchWithAuth } from '@/lib/http-config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
  let errorMessage;

  try {
    const response = await fetchWithAuth(`/business/${businessId}`, {
      next: { tags: [`currentBusiness-${businessId}`] },
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      // if(data === 'Unauthorized: Business not found')
      return { message: data };
    }
    if (response?.ok) {
      return data;
    } else {
      errorMessage = data;
    }
  } catch (error) {
    if (error) {
      console.error(error);
    }
    return null;
  }
  // if (errorMessage === 'Unauthorized: Business not found') {
  //   redirect('/onboarding/select-business');
  // }
}

export async function getBusinessKYC() {
  const businessId = cookies().get('businessId')?.value;

  try {
    const response = await fetchWithAuth(`/business/kyc/${businessId}`, {
      next: { tags: [`business-kyc-${businessId}`] },
    });
    console.log(response);
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
