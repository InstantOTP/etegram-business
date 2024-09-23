import LoadingForm from '@/components/common/loading-form';
import SignInForm from '@/components/forms/sign-in';
import { Suspense } from 'react';

export default function SignInPage() {
  return (
    <section className='w-full min-h-svh flex items-center justify-center'>
      <div className='bg-white w-full max-w-[30rem] min-h-20 rounded-3xl'>
        <Suspense fallback={<LoadingForm />}>
          <SignInForm />
        </Suspense>
      </div>
    </section>
  );
}
