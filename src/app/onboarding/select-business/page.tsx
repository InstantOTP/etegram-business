import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SearchComp from '@/components/common/search';
import { Suspense } from 'react';
import { getUserBusinesses } from '@/app/apis/data/business';
import BusinessList from './components/business';

export default async function SelectBusiness() {
  const businesses: any[] = await getUserBusinesses();
  // console.log(businesses);
  return (
    <main className='flex justify-center items-center min-h-[60svh] w-full max-w-[93%] mx-auto'>
      <div className='space-y-5 w-full max-w-[30rem] mx-auto bg-background mt-12 rounded-3xl p-5 lg:p-10'>
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

        <BusinessList businesses={businesses} />
      </div>
    </main>
  );
}
