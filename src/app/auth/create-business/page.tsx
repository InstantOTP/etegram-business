import CreateBusinessForm from '@/components/forms/create-business';
import { Suspense } from 'react';

export default function SignUpPage() {
  return (
    <section className='w-full min-h-svh flex items-center justify-center py-14'>
      <div className='bg-white w-full max-w-[36rem] min-h-12 rounded-3xl'>
        <Suspense>
          <CreateBusinessForm />
        </Suspense>
      </div>
    </section>
  );
}
