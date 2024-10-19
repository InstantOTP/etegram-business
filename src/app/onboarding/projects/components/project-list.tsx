'use client';
import { selectBusiness } from '@/app/apis/actions/business';
import { selectProject } from '@/app/apis/actions/project';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { findUpper } from '@/lib/utils';

export default function ProjectList({
  projects,
}: {
  projects: { totalDocuments: number; data: any[] };
}) {
  // console.log(projects);
  return (
    <>
      {projects?.totalDocuments > 0 ? (
        <ul className='flex flex-col space-y-3 w-full'>
          {projects?.data?.map((item: any) => (
            <li
              key={item.id}
              className='w-full'
            >
              <button
                onClick={() => selectProject(item.id)}
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
                  <h6 className='font-medium text-left'>{item?.name}</h6>
                  <p className='text-xs'>Project ID: 232323</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>No Project yet</p>
          <p>Create a project for your business</p>
        </div>
      )}
    </>
  );
}
