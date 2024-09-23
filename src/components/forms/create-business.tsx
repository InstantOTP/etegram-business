'use client';

import Image from 'next/image';
import { Input, PasswordInput } from '../ui/input';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBusiness, login, signup } from '@/app/apis/actions/auth';
import { useSearchParams } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { etegramUses } from '@/lib/static-data';
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
      <span>Add Business</span>
    </Button>
  );
}

export default function CreateBusinessForm() {
  const searchParams = useSearchParams();
  const [viewPassword, setViewPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const initalState = {
    message: '',
    errors: {},
    status: '',
    redirectUrl: searchParams.get('redirectUrl') || '',
  };
  const [state, dispatch] = useFormState(createBusiness, initalState);
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
        <h3 className='font-semibold text-xl'>Business Information</h3>
        <p className='text-xs max-w-[16rem]'>
          Tell us about your business. This will help us tailor your onboarding
          process.
        </p>
      </div>

      <form
        action={dispatch}
        className='w-full max-w-md mx-auto space-y-5'
      >
        <div className='flex justify-between items-center gap-5'>
          <div className='form-control'>
            <label htmlFor='businessName'>Business Name</label>
            <Input
              id='businessName'
              name='businessName'
              type='text'
              placeholder='e.g Kebsly Enterprise'
            />
            {state?.errors?.businessName ? (
              <div
                id='businessName-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.businessName[0]}</p>
              </div>
            ) : null}
          </div>

          <div className='form-control'>
            <label htmlFor='username'>Username</label>
            <Input
              id='userName'
              name='userName'
              type='text'
              placeholder='e.g @kebslyenterprise'
            />
            {state?.errors?.userName ? (
              <div
                id='userName-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.userName[0]}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <p className='text-sm text-foreground mb-1'>Business Type</p>
          <RadioGroup
            className='flex justify-between items-center gap-5'
            defaultValue='starter business'
            name='businessType'
          >
            <div className='flex items-center space-x-2 p-2 rounded-[0.625rem] border-[1.5px] border-transparent bg-[#F3F8FF]  hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
              <RadioGroupItem
                value='starter'
                id='starter business'
                className='flex-shrink-0'
              />
              <label htmlFor='starter business'>
                <p className='text-[13px] font-semibold'>Starter Business</p>
                <p className='text-primary/50 text-xs'>
                  Choose this if your business is not registered yet
                </p>
              </label>
            </div>

            <div className='flex items-center space-x-2 p-2 rounded-[0.625rem] border-[1.5px] border-transparent bg-[#F3F8FF]  hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
              <RadioGroupItem
                value='registered'
                id='registered business'
                className='flex-shrink-0'
              />
              <label htmlFor='registered business'>
                <p className='text-[13px] font-semibold'>Register Business</p>
                <p className='text-primary/50 text-xs'>
                  Choose this if your business is registered with CAC
                </p>
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className='form-control'>
          <label htmlFor='businessIndustry'>Business Industry</label>
          <Select name='businessIndustry'>
            <SelectTrigger className='w-full bg-[#F3F8FF]'>
              <SelectValue
                placeholder='Select Industry'
                className='placeholder:!text-xs'
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='industry 1'>Industry 1</SelectItem>
              <SelectItem value='industry 2'>Industry 2</SelectItem>
              <SelectItem value='industry 3'>Industry 3</SelectItem>
            </SelectContent>
          </Select>
          {state?.errors?.businessIndustry ? (
            <div
              id='businessIndustry-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.businessIndustry[0]}</p>
            </div>
          ) : null}
        </div>

        <div>
          <p className='text-sm text-foreground mb-1'>
            How will be using Etegram?{' '}
            <span className='text-primary/50'>(Select all that applies)</span>
          </p>

          <div className='grid grid-cols-2 gap-5'>
            {etegramUses.map((item, index) => (
              <div
                key={index}
                className='flex items-center space-x-2 p-2 rounded-[0.625rem] border-[1.5px] border-transparent bg-[#F3F8FF]  hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
              >
                <Checkbox
                  id={item.value}
                  name='reasons'
                  value={item.value}
                />
                <label
                  htmlFor={item.value}
                  className='text-primary/50 text-xs font-medium'
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className='space-y-1'>
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
        </div>

        <div>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='consent'
                name='consent'
              />
              <label
                htmlFor='consent'
                className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                I consent to the collection and processing of my personal data
                in line with data regulations as dscribed in out Privacy Policy
              </label>
            </div>
          </div>
          {state?.errors?.consent ? (
            <div
              id='confirmpassword-error'
              aria-live='polite'
              className='error text-red-500 text-sm'
            >
              {state.errors.consent.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        <div className='max-w-full mx-auto !mt-9'>
          <SubmitButton />
        </div>

        {/* <div className='text-center text-sm'>
          <span>Already have an account?</span>{' '}
          <Link
            href={`/auth/sign-in`}
            className='font-semibold hover:underline'
          >
            Sign In
          </Link>
        </div> */}
      </form>
    </div>
  );
}
