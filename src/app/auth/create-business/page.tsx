import { getIndustries } from '@/app/apis/data/use-cases';
import LoadingForm from '@/components/common/loading-form';
import CreateBusinessForm from '@/components/forms/create-business';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function CreatBusinessPage() {
  const industries = await getIndustries();
  return (
    <section className='w-full min-h-svh flex items-center justify-center py-14'>
      <div className='bg-white w-full max-w-[36rem] min-h-12 rounded-3xl'>
        <Suspense fallback={<LoadingForm />}>
          <CreateBusinessForm industries={industries} />
        </Suspense>
      </div>
    </section>
  );
}
