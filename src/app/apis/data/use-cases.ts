import { fetchWithAuth } from '@/lib/http-config';

export async function getUseCases() {
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

export async function getIndustries() {
  try {
    const response = await fetchWithAuth(`/industry`, {
      next: { tags: [`interests`] },
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
