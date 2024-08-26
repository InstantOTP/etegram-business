'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function selectBusiness(businessId: any) {
  cookies().set('businessId', businessId);
  redirect('/onboarding/select-services');
}

export async function selectService(serviceId: any) {
  cookies().set('serviceId', serviceId);
  redirect('/onboarding/projects');
}
