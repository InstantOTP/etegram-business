'use client';

import Image from 'next/image';
import { Input, PasswordInput } from '../ui/input';
import { useState } from 'react';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { login } from '@/app/apis/actions/auth';
import { useSearchParams } from 'next/navigation';

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

export default function SignInForm() {
  const searchParams = useSearchParams();
  const [viewPassword, setViewPassword] = useState(false);
  const initalState = {
    message: '',
    errors: {},
    status: '',
    redirectUrl: searchParams.get('redirectUrl') || '',
  };
  const [state, dispatch] = useFormState(login, initalState);
  return (
    <div className='w-full space-y-5 p-11 flex flex-col justify-center items-center'>
      <div>
        <Image
          src='/logo/etegram-business-logo.svg'
          alt='etegram business logo'
          width={120}
          height={120}
        />
      </div>
      <div className='text-center space-y-1'>
        <h3 className='font-semibold text-xl'>Welcome back</h3>
        <p className='text-xs'>Please enter your details to continue</p>
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

        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <PasswordInput
            id='password'
            name='password'
            placeholder='Enter your password'
            view={viewPassword}
            setView={setViewPassword}
          />
          {state?.errors?.password ? (
            <div
              id='password-error'
              aria-live='polite'
              className='error'
            >
              {state.errors.password.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        <div className='flex justify-between items-center !mt-3'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='remember'
              defaultChecked
            />
            <label
              htmlFor='remember'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Keep me signed in
            </label>
          </div>

          <Link
            href={'/auth/forgot-password'}
            className='text-xs text-primary hover:underline'
          >
            Forgot password?
          </Link>
        </div>

        <div className='max-w-full mx-auto !mt-9'>
          <SubmitButton />
        </div>

        <div className='text-center text-sm'>
          <span>Don&apos;t have an account?</span>{' '}
          <Link
            href={`/auth/sign-up`}
            className='font-semibold hover:underline'
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
