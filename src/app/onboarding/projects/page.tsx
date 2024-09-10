import { getBusinessProjects } from '@/app/apis/data/projects';
import CreateProject from '@/components/modals/create-project';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { findUpper } from '@/lib/utils';
import Link from 'next/link';
import ProjectList from './components/project-list';

export default async function SelectProject() {
  const projects = await getBusinessProjects();
  // console.log(projects);
  return (
    <main className='flex justify-center items-center min-h-[60svh] w-full'>
      <div className='space-y-5 w-full max-w-[23.188rem] mx-auto'>
        <div className='flex w-full justify-between items-center'>
          <p>Select Project</p>

          <CreateProject />
        </div>
        <ProjectList projects={projects} />
      </div>
    </main>
  );
}
