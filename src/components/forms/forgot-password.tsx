'use client';

import { forgotPassword } from '@/app/apis/actions/auth';
import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      className='w-full'
      disabled={pending}
    >
      <LucideLoader2
        className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
          'inline-block': pending,
        })}
      />
      <span>Continue</span>
    </Button>
  );
}

export default function ForgotPasswordForm() {
  const initalState = {
    message: '',
    errors: {},
    status: '',
  };
  const [state, dispatch] = useFormState(forgotPassword, initalState);
  return (
    <div className='w-full space-y-5 py-11 px-6 md:p-11 flex flex-col justify-center items-center'>
      <div>
        <Image
          src='/logo/etegram-business-logo.svg'
          alt='etegram business logo'
          width={120}
          height={120}
        />
      </div>
      <div className='text-center space-y-1'>
        <h3 className='font-semibold text-xl'>Forgot Password</h3>
        <p className='text-xs'>Please enter your email to continue</p>
      </div>

      <form
        action={dispatch}
        className='w-full max-w-md mx-auto space-y-5'
      >
        <div className='form-control'>
          <label htmlFor='email'>Email Address</label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email address'
          />
          {state?.errors?.email ? (
            <div
              id='email-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.email[0]}</p>
            </div>
          ) : null}
        </div>

        <div className='max-w-full mx-auto !mt-9'>
          <SubmitButton />
        </div>

        {/* <div className='text-center text-sm'>
          <span>Don&apos;t have an account?</span>{' '}
          <Link
            href={`/auth/sign-up`}
            className='font-semibold hover:underline'
          >
            Sign Up
          </Link>
        </div> */}
      </form>
    </div>
  );
}
