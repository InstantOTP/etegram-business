import ResetPasswordForm from '@/components/forms/reset-password';
import SignInForm from '@/components/forms/sign-in';
import { Suspense } from 'react';

export default function ResetPasswordPage() {
  return (
    <section className='w-full min-h-svh flex items-center justify-center'>
      <div className='bg-white w-full max-w-[30rem] min-h-12 rounded-3xl'>
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </section>
  );
}
