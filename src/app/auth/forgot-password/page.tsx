import LoadingForm from '@/components/common/loading-form';
import ForgotPasswordForm from '@/components/forms/forgot-password';
import { Suspense } from 'react';

export default function ForgotPasswordPage() {
  return (
    <section className='w-full min-h-svh flex items-center justify-center'>
      <div className='bg-white w-full max-w-[30rem] min-h-12 rounded-3xl'>
        <Suspense fallback={<LoadingForm />}>
          <ForgotPasswordForm />
        </Suspense>
      </div>
    </section>
  );
}
