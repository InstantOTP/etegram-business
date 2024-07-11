'use client';

import { verifyEmail } from '@/app/apis/actions/auth';
import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
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

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const initalState = {
    message: '',
    errors: {},
    status: '',
    email: '',
  };
  const [state, dispatch] = useFormState(verifyEmail, initalState);
  return (
    <div className='w-full space-y-5 p-11 flex flex-col justify-center items-center'>
      <Image
        src='/logo/etegram-business-logo.svg'
        alt='etegram business logo'
        width={120}
        height={120}
      />
      <div className='text-center space-y-1'>
        <h3 className='font-semibold text-xl'>Check your mailbox</h3>
        <p className='text-xs max-w-[16rem] mx-auto'>
          We have sent a verification code to your email address to confirm that
          it is yours.
        </p>
      </div>

      <form
        action={dispatch}
        className='w-full max-w-md mx-auto space-y-5'
      >
        <div className='form-control'>
          <label htmlFor='otp'>Verification Code</label>
          <Input
            id='otp'
            name='otp'
            type='tel'
            placeholder='******'
          />
          {state?.errors?.otp ? (
            <div
              id='otp-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.otp[0]}</p>
            </div>
          ) : null}
        </div>
        <div className='max-w-full mx-auto !mt-9'>
          <SubmitButton />
        </div>

        <div className='text-sm font-eudoxusSans space-y-2'>
          <h4>Didn&apos;t get the email?</h4>

          <p>
            If you don&apos;t see an email from us with 5 minutes, one of the
            things could have happened:
          </p>

          <ol className='list-decimal list-inside text-[13px] space-y-2'>
            <li>The email is in your spam folder.</li>
            <li>The email address you entered had a typo</li>
            <li>
              You accidentally entered another email address.
              <br /> (Usually happens with auto-complete).
            </li>
            <li>
              We can&apos;t deliver the email to this address.
              <br />
              (Usually because of corporate firewalls or filtering)
            </li>
          </ol>
        </div>

        <div className='text-center text-sm'>
          <span>Didn&apos;t get a code?</span>{' '}
          <Link
            href={`/auth/sign-up`}
            className='font-semibold hover:underline'
          >
            Click to resend
          </Link>
        </div>
      </form>
    </div>
  );
}
