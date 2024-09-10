import { getBusinessProjects } from '@/app/apis/data/projects';
import CreateProject from '@/components/modals/create-project';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { findUpper } from '@/lib/utils';
import Link from 'next/link';

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
        {projects?.totalDocuments > 0 ? (
          <ul className='flex flex-col space-y-3 w-full'>
            {projects?.data?.map((item: any) => (
              <li
                key={item.id}
                className='w-full'
              >
                <Link
                  href={'/'}
                  className='border border-border flex w-full py-4 rounded-[5px] p-4 hover:bg-accent/50 bg-transparent transition-colors'
                >
                  <Avatar className='h-[40px] w-[40px] mr-3'>
                    <AvatarImage
                      src='/profile-pic.jpg'
                      alt={`business-logo`}
                      className='object-cover'
                    />
                    <AvatarFallback className='font-bold text-2xl'>
                      {item?.name ? findUpper(item?.name) : 'P'}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h6 className='font-medium'>{item?.name}</h6>
                    <p className='text-xs'>Project ID: 232323</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p>No Project yet</p>
            <p>Create a project for your business</p>
          </div>
        )}
      </div>
    </main>
  );
}
