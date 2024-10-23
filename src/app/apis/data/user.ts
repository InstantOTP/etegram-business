'use server';

import { fetchWithAuth } from '@/lib/http-config';

export async function getUser() {
  try {
    const response = await fetchWithAuth(`/account/profile`, {
      next: { tags: [`user`] },
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
    return { message: 'Server Error' };
  }
}

export async function getUserKYC() {
  try {
    const response = await fetchWithAuth(`/account/kyc`, {
      next: { tags: [`account-kyc`] },
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
