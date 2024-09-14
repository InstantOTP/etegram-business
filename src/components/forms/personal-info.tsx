'use client';

import { signup } from '@/app/apis/actions/auth';
import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { User } from '../layout/dashboard-header';
import { Button } from '../ui/button';
import { Input, PasswordInput } from '../ui/input';
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
      className=''
      disabled={pending}
    >
      <LucideLoader2
        className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
          'inline-block': pending,
        })}
      />
      <span>Update</span>
    </Button>
  );
}

export default function PersonalInfoForm({ user }: { user: User }) {
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
    <div className='w-full'>
      <form
        action={dispatch}
        className='w-full space-y-6'
      >
        <div className='flex justify-between items-center gap-5'>
          <div className='form-control'>
            <label htmlFor='firstName'>First Name</label>
            <Input
              id='firstName'
              name='firstName'
              type='text'
              placeholder='e.g Oluwabumi'
              defaultValue={user?.firstname}
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
              defaultValue={user?.lastname}
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
              defaultValue={user?.email}
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
              defaultValue={user?.phone}
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
          <div className='form-control max-w-sm'>
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

          <Button className='mt-6 w-full max-w-[14rem]'>Change Password</Button>
        </div>

        {/* <div className='space-y-1 flex items-center space-x-2'>
          <label className='text-sm text-foreground'>
            Are you a software developer?
          </label>
          <RadioGroup
            defaultValue=''
            className='flex space-x-4'
            name='developer'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem
                value='yes'
                id='yes'
              />
              <label
                htmlFor='yes'
                className='text-xs'
              >
                Yes, I am
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem
                value='no'
                id='no'
              />
              <label
                htmlFor='no'
                className='text-xs'
              >
                No, I am not
              </label>
            </div>
          </RadioGroup>

          {state?.errors?.developer ? (
            <div
              id='developer-error'
              aria-live='polite'
              className='error'
            >
              <p className=''>{state.errors.developer[0]}</p>
            </div>
          ) : null}
        </div> */}

        <div className='max-w-full mx-auto !mt-9'>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
