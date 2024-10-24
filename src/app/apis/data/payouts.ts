'use server';
import { fetchWithAuth } from '@/lib/http-config';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function getBanks() {
  try {
    const response = await fetchWithAuth(`/bank/list`, {
      next: { tags: [`bank-lists`] },
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

export async function getProjectBanks() {
  const businessId = cookies().get('businessId')?.value;
  const projectId = cookies().get('projectId')?.value;
  try {
    const response = await fetchWithAuth(`/bank/${businessId}/${projectId}`, {
      next: { tags: [`project-bank-${projectId}-${businessId}`] },
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

export async function verifyBanks(bankCode: string, accountNumber: string) {
  try {
    const response = await fetchWithAuth(
      `/bank/list?bankCode=${bankCode}&accountNumber=${accountNumber}`,
      {
        next: { tags: [`bank-details-${bankCode}-${accountNumber}`] },
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

export async function deleteProjectBanks(bankId: string) {
  const businessId = cookies().get('businessId')?.value;
  const projectId = cookies().get('projectId')?.value;
  try {
    const response = await fetchWithAuth(
      `/bank/${businessId}/${projectId}?bankID=${bankId}`,

      {
        method: 'DELETE',
      }
    );
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { message: data };
    }
    revalidateTag(`project-bank-${projectId}-${businessId}`);
    return data;
  } catch (error) {
    if (error) {
      console.error(error);
    }
    return null;
  }
}
