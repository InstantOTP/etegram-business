import { getBusinessProjects } from '@/app/apis/data/projects';
import CreateProject from '@/components/modals/create-project';
import ProjectList from './components/project-list';

export default async function SelectProject() {
  const projects = await getBusinessProjects();
  // console.log(projects);
  return (
    <main className='flex justify-center items-center min-h-[60svh] w-full'>
      <div className='space-y-5 w-full max-w-[30rem] mx-auto bg-background my-12 rounded-3xl p-10'>
        <div className='flex w-full justify-between items-center'>
          <p>Select Project</p>

          <CreateProject projects={projects?.data} />
        </div>
        <ProjectList projects={projects} />
      </div>
    </main>
  );
}
