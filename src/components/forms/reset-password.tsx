'use client';

import { resetPassword } from '@/app/apis/actions/auth';
import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { PasswordInput } from '../ui/input';
import { useToast } from '../ui/use-toast';

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

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [viewPassword, setViewPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState<string>('');

  const [state, dispatch] = useFormState(resetPassword, {
    message: '',
    errors: {},
    status: '',
    token: searchParams.get('otp') || '',
    email: searchParams.get('email') || '',
  });
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
        <h3 className='font-semibold text-xl'>Reset Password</h3>
        <p className='text-xs'>Enter Your new Password</p>
      </div>

      <form
        action={dispatch}
        className='w-full max-w-md mx-auto space-y-5'
      >
        <div className='form-control'>
          <label htmlFor='password'>New Password</label>
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
            </div>
          ) : null}
        </div>

        <div className='max-w-full mx-auto !mt-9'>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
