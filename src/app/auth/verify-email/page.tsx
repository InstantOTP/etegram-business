import LoadingForm from '@/components/common/loading-form';
import VerifyEmailForm from '@/components/forms/verify-email';
import { Suspense } from 'react';

export default function VerifyEmailPage() {
  return (
    <section className='w-full min-h-svh flex items-center justify-center py-14'>
      <div className='bg-white w-full max-w-[32rem] min-h-12 rounded-3xl'>
        <Suspense fallback={<LoadingForm />}>
          <VerifyEmailForm />
        </Suspense>
      </div>
    </section>
  );
}
