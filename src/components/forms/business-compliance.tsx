'use client';

import Image from 'next/image';
import { Input, PasswordInput } from '../ui/input';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { useFormState, useFormStatus } from 'react-dom';
import { Button, buttonVariants } from '../ui/button';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { login } from '@/app/apis/actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CustomDropZone from '../ui/dropzone';
import {
  businessCompliance,
  userCompliance,
} from '@/app/apis/actions/compliance';
import { useToast } from '../ui/use-toast';

function SubmitButton({
  isImageUploaded,
  isCacUploaded,
}: {
  isImageUploaded: string;
  isCacUploaded: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending || !isImageUploaded || !isCacUploaded}
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

export default function BusinessComplianceForm() {
  const { toast } = useToast();
  const { replace } = useRouter();
  const [uploadedImage, setUploadedImage] = useState('');
  const [cacImage, setCacImage] = useState('');
  const initalState = {
    message: '',
    errors: {},
    status: '',
  };
  const [state, dispatch] = useFormState(businessCompliance, initalState);

  useEffect(() => {
    if (state?.message && state.status) {
      toast({
        description: state.message,
        variant: state.status !== 'success' ? 'destructive' : 'default',
      });
    }
    if (state?.status === 'success') {
      replace('/compliance');
    }
  }, [state]);
  return (
    <div className='w-full bg-background rounded-3xl space-y-2 py-11 px-6 md:p-11 flex flex-col justify-center items-center'>
      <h2>Document Verification</h2>
      <p className='text-[13px] text-center max-w-md mx-auto'>
        We encourage you to provide correct and valid documents. This helps
        speed up the process of verifying and activating your business.
      </p>
      <form
        action={dispatch}
        className='w-full max-w-lg mx-auto space-y-5 !mt-5'
      >
        <div className='form-control'>
          <label htmlFor='businessRegistrationType'>
            Business Registration Type{' '}
            <span className='text-[#909090]'>(BN, RC, Nepza)</span>
          </label>
          <Select name='businessRegistrationType'>
            <SelectTrigger className='w-full bg-[#F3F8FF]'>
              <SelectValue
                placeholder='Select Document Type'
                className='placeholder:!text-xs'
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='BN'>BN</SelectItem>
              <SelectItem value='RC'>RC</SelectItem>
              <SelectItem value='Nepza'>Nepza</SelectItem>
            </SelectContent>
          </Select>
          {state?.errors?.businessRegistrationType ? (
            <div
              id='businessIndustry-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.businessRegistrationType[0]}</p>
            </div>
          ) : null}
        </div>
        <div className='form-control'>
          <label htmlFor='businessRegistrationNumber'>
            Business Registration Number
          </label>
          <Input
            id='businessRegistrationNumber'
            name='businessRegistrationNumber'
            type='tel'
            placeholder='eg RC36584123'
          />
          {state?.errors?.businessRegistrationNumber ? (
            <div
              id='businessRegistrationNumber-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.businessRegistrationNumber[0]}</p>
            </div>
          ) : null}
        </div>

        <div className='form-control'>
          <label htmlFor='cacUrl'>Business CAC Certificate</label>
          <CustomDropZone
            value={cacImage}
            setValue={setCacImage}
            name='cacUrl'
          />
          {state?.errors?.cacUrl ? (
            <div
              id='cacUrl-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.cacUrl[0]}</p>
            </div>
          ) : null}
        </div>

        <div className='form-control'>
          <label htmlFor='directorBvn'>
            Bank Verification Number (BVN) of Director
          </label>
          <Input
            id='directorBvn'
            name='directorBvn'
            type='tel'
            placeholder='Enter your BVN'
          />
          {state?.errors?.directorBvn ? (
            <div
              id='email-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.directorBvn[0]}</p>
            </div>
          ) : null}
        </div>

        <div className='form-control'>
          <label htmlFor='documentType'>
            Director&apos;s Proof of Identity{' '}
            <span className='text-[#909090] text-xs'>
              (NIN, National Passport, Drivers License, Voter&apos;s card)
            </span>
          </label>
          <Select name='documentType'>
            <SelectTrigger className='w-full bg-[#F3F8FF]'>
              <SelectValue
                placeholder='Select Document Type'
                className='placeholder:!text-xs'
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='NIN'>NIN</SelectItem>
              <SelectItem value='international-passport'>
                International Passport
              </SelectItem>
              <SelectItem value='driving-license'>Drivers License</SelectItem>
              <SelectItem value={`voters-card`}>Voters License</SelectItem>
            </SelectContent>
          </Select>
          {state?.errors?.documentType ? (
            <div
              id='businessIndustry-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.documentType[0]}</p>
            </div>
          ) : null}
        </div>

        <div className='form-control'>
          <label htmlFor='bvn'>Upload Documents</label>
          <CustomDropZone
            value={uploadedImage}
            setValue={setUploadedImage}
            name='documentUrl'
          />
          {state?.errors?.documentUrl ? (
            <div
              id='email-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.documentUrl[0]}</p>
            </div>
          ) : null}
        </div>

        <div className='max-w-full flex justify-between mx-auto !mt-9'>
          <Link
            href={'/compliance'}
            className={buttonVariants({ variant: 'outline' })}
          >
            Back
          </Link>
          <SubmitButton
            isImageUploaded={uploadedImage}
            isCacUploaded={cacImage}
          />
        </div>
      </form>
    </div>
  );
}
