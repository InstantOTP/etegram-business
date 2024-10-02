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

export async function getSingleBusinessProject() {
  const businessId = cookies().get('businessId')?.value;
  const projectId = cookies().get('projectId')?.value;

  try {
    const response = await fetchWithAuth(
      `/business-project/${businessId}/${projectId}`,
      {
        next: { tags: [`business-projects-${businessId}-${projectId}`] },
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

export async function getProjectDashboard() {
  const businessId = cookies().get('businessId')?.value;
  const projectId = cookies().get('projectId')?.value;
  // console.log(projectId);

  try {
    const response = await fetchWithAuth(
      `/business-project/${businessId}/${projectId}/dashboard`,
      {
        next: {
          tags: [`business-projects-${businessId}-${projectId}-dashboard`],
        },
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
