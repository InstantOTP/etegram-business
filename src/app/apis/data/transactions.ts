'use server';
import { fetchWithAuth } from '@/lib/http-config';
import { cookies } from 'next/headers';

export async function getCreditTransactions() {
  const projectId = cookies().get('projectId')?.value;
  const businessId = cookies().get('businessId')?.value;

  try {
    const response = await fetchWithAuth(
      `/transaction/credit/${businessId}/${projectId}`,
      {
        next: { tags: [`business-transactions-${projectId}-${businessId}`] },
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

export async function getCreditTransactionStats() {
  const projectId = cookies().get('projectId')?.value;
  const businessId = cookies().get('businessId')?.value;

  try {
    const response = await fetchWithAuth(
      `/transaction/credit-stats/${businessId}/${projectId}`,
      {
        next: {
          tags: [`business-transaction-stats-${projectId}-${businessId}`],
        },
      }
    );
    // console.log(response);
    const data = await response.json();
    // /transaction/credit-stats/:projectID
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
