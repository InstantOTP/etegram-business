import LoadingForm from '@/components/common/loading-form';
import ResetPasswordForm from '@/components/forms/reset-password';
import { Suspense } from 'react';

export default function ResetPasswordPage() {
  return (
    <section className='w-full min-h-svh flex items-center justify-center max-w-[93%] mx-autor'>
      <div className='bg-white w-full max-w-[30rem] min-h-12 rounded-3xl'>
        <Suspense fallback={<LoadingForm />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </section>
  );
}
