'use client';

import Image from 'next/image';
import { Input, PasswordInput } from '../ui/input';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { login, signup } from '@/app/apis/actions/auth';
import { useSearchParams } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const passwordState = [
  { text: 'One lowercase letter', value: true, regex: /^(?=.*[a-z]).*$/ },
  { text: 'One uppercase letter', value: true, regex: /^(?=.*[A-Z]).*$/ },
  {
    text: 'One number & special character',
    value: true,
    regex: /^(?=.*[0-9])(?=.*[\W_]).*$/,
  },
  { text: 'Minimum of 8 character', value: true, regex: /^.{8,}$/ },
];

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

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const [viewPassword, setViewPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const initalState = {
    message: '',
    errors: {},
    status: '',
    redirectUrl: searchParams.get('redirectUrl') || '',
  };
  const [state, dispatch] = useFormState(signup, initalState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message && state.status) {
      toast({
        description: state.message,
        variant: state.status !== 'success' ? 'destructive' : 'default',
      });
    }
  }, [state]);
  return (
    <div className='w-full space-y-5 py-11 px-6 md:p-11 flex flex-col justify-center items-center'>
      <Image
        src='/logo/etegram-business-logo.svg'
        alt='etegram business logo'
        width={120}
        height={120}
      />
      <div className='text-center space-y-1'>
        <h3 className='font-semibold text-xl'>Welcome back</h3>
        <p className='text-xs'>Enter the fields below to get started.</p>
      </div>

      <form
        action={dispatch}
        className='w-full max-w-md mx-auto space-y-5'
      >
        <div className='flex justify-between items-center gap-5'>
          <div className='form-control'>
            <label htmlFor='firstName'>First Name</label>
            <Input
              id='firstName'
              name='firstName'
              type='text'
              placeholder='e.g Oluwabumi'
            />
            {state?.errors?.firstName ? (
              <div
                id='firstName-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.firstName[0]}</p>
              </div>
            ) : null}
          </div>

          <div className='form-control'>
            <label htmlFor='lastName'>Last Name</label>
            <Input
              id='lastName'
              name='lastName'
              type='text'
              placeholder='e.g Abubakar'
            />
            {state?.errors?.lastName ? (
              <div
                id='lastName-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.lastName[0]}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className='flex justify-between items-center gap-5'>
          <div className='form-control'>
            <label htmlFor='email'>Email Address</label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='e.g youremail@here.com'
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
            <label htmlFor='phone'>Phone Number</label>
            <Input
              id='phone'
              name='phone'
              type='tel'
              placeholder='e.g 08135886523'
            />
            {state?.errors?.phone ? (
              <div
                id='phone-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.phone[0]}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className='flex justify-between items-center gap-5'>
          <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <PasswordInput
              id='password'
              name='password'
              placeholder='********'
              view={viewPassword}
              setView={setViewPassword}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
            {state?.errors?.password ? (
              <div
                id='password-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.password[0]}</p>
              </div>
            ) : null}
          </div>

          <div className='form-control'>
            <label htmlFor='password'>Confirm Password</label>
            <PasswordInput
              id='confirmPassword'
              name='confirmPassword'
              placeholder='********'
              view={viewPassword}
              setView={setViewPassword}
            />
            {state?.errors?.confirmPassword ? (
              <div
                id='confirmPassword-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.confirmPassword[0]}</p>

                {/* {state.errors.confirmPassword.map((error: string) => (
                  <p key={error}>{error}</p>
                ))} */}
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <h5 className='font-semibold text-secondary-foreground text-sm'>
            Password most contain atleast:
          </h5>
          <div className='grid grid-cols-2 gap-4 pt-5'>
            {passwordState.map((item, index) => (
              <div
                key={index}
                className=''
              >
                <div
                  className={cn(
                    'flex items-center space-x-2 opacity-50 transition-opacity',
                    {
                      'opacity-100': item.regex?.test(passwordValue),
                    }
                  )}
                >
                  <Checkbox
                    id='remember'
                    className='cursor-default'
                    checked={item.regex?.test(passwordValue)}
                  />
                  <label
                    htmlFor='remember'
                    className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {item.text}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className='flex justify-between items-center !mt-3'>
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
        </div> */}

        <div className='max-w-full mx-auto !mt-9'>
          <SubmitButton />
        </div>

        <div className='text-center text-sm'>
          <span>Already have an account?</span>{' '}
          <Link
            href={`/auth/sign-in`}
            className='font-semibold hover:underline'
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
