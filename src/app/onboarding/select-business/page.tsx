import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SearchComp from '@/components/common/search';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Suspense } from 'react';

export default function SelectBusiness() {
  return (
    <main className='flex justify-center items-center min-h-[60svh] w-full'>
      <div className='space-y-5 w-full max-w-[23.188rem] mx-auto'>
        <div className='flex w-full justify-between items-center'>
          <p>Select a Business</p>

          <Link
            href={'/auth/create-business'}
            className={buttonVariants({ size: 'sm' })}
          >
            <Plus className='w-4 h-4 mr-1' />
            <span> Add new Business</span>
          </Link>
        </div>

        <Suspense>
          <SearchComp
            name='bussinessName'
            placeholder='Search Business'
          />
        </Suspense>

        <ul className='flex space-y-3 w-full'>
          <li className='w-full'>
            <Link
              href={'/onboarding/select-services'}
              className='border border-border flex w-full py-4 rounded-[5px] p-4 hover:bg-accent/50 bg-transparent transition-colors'
            >
              <Avatar className='h-[60px] w-[60px] mr-1.5'>
                <AvatarImage
                  src='/profile-pic.jpg'
                  alt={`business-logo`}
                  className='object-cover'
                />
                <AvatarFallback className='font-bold text-2xl'>
                  EE
                </AvatarFallback>
              </Avatar>

              <div>
                <h6 className='font-medium'>Etegram Enterprise</h6>
                <p>User ID: 232323</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
