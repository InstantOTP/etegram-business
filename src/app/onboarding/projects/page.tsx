import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SearchComp from '@/components/common/search';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CreateProject from '@/components/modals/create-project';

export default function SelectProject() {
  return (
    <main className='flex justify-center items-center min-h-[60svh] w-full'>
      <div className='space-y-5 w-full max-w-[23.188rem] mx-auto'>
        <div className='flex w-full justify-between items-center'>
          <p>Select Project</p>

          <CreateProject />
        </div>

        <ul className='flex space-y-3 w-full'>
          <li className='w-full'>
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
                  I
                </AvatarFallback>
              </Avatar>

              <div>
                <h6 className='font-medium'>InstantOtp</h6>
                <p>Project ID: 232323</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
