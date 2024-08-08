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
import { userCompliance } from '@/app/apis/actions/compliance';
import { useToast } from '../ui/use-toast';

function SubmitButton({ isImageUploaded }: { isImageUploaded: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending || !isImageUploaded}
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

export default function UserComplianceForm() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { replace } = useRouter();
  const [uploadedImage, setUploadedImage] = useState('');
  const initalState = {
    message: '',
    errors: {},
    status: '',
  };
  const [state, dispatch] = useFormState(userCompliance, initalState);

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
          <label htmlFor='bvn'>Bank Verification Number (BVN)</label>
          <Input
            id='bvn'
            name='bvn'
            type='tel'
            placeholder='Enter your BVN'
          />
          {state?.errors?.bvn ? (
            <div
              id='email-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.bvn[0]}</p>
            </div>
          ) : null}
        </div>

        <div className='form-control'>
          <label htmlFor='documentType'>
            Document Type{' '}
            <span className='text-[#909090]'>
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
              <SelectItem value='National Passport'>
                National Passport
              </SelectItem>
              <SelectItem value='Drivers License'>Drivers License</SelectItem>
              <SelectItem value={`Voters card`}>Voters License</SelectItem>
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
          <SubmitButton isImageUploaded={uploadedImage} />
        </div>
      </form>
    </div>
  );
}
