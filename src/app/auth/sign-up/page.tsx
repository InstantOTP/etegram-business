import LoadingForm from '@/components/common/loading-form';
import SignUpForm from '@/components/forms/sign-up';
import { Suspense } from 'react';

export default function SignUpPage() {
  return (
    <section className='w-full min-h-svh flex items-center justify-center py-14 max-w-[93%] mx-auto'>
      <div className='bg-white w-full max-w-[32rem] min-h-12 rounded-3xl'>
        <Suspense fallback={<LoadingForm />}>
          <SignUpForm />
        </Suspense>
      </div>
    </section>
  );
}
