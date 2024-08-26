import { cookies } from 'next/headers';

export async function getTokens(): Promise<{
  access_token: string;
  refresh_token: string;
}> {
  'use server';
  const cookieStore = cookies();
  const access_token = cookieStore.get('access_token')?.value ?? '';
  const refresh_token = cookieStore.get('refresh_token')?.value ?? '';
  return new Promise((resolve) =>
    resolve({
      access_token,
      refresh_token,
    })
  );
}

export const BACKEND_URL = process.env.API_BASE_URL;

//CUSTOM FETCH REQUEST WITH ACCESS TOKEN INCLUDED IF AVAILABLE
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const { access_token } = await getTokens();

  const headers = new Headers(options.headers);

  if (access_token) {
    headers.set('Authorization', `Bearer ${access_token}`);
  }
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  return fetch(`${process.env.API_BASE_URL}${url}`, { ...options, headers });
}
