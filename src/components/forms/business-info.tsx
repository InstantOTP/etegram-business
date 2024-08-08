'use client';

import { businessCompliance } from '@/app/apis/actions/compliance';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { Button, buttonVariants } from '../ui/button';
import CustomDropZone from '../ui/dropzone';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { State, IState, ICity, City } from 'country-state-city';

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

export default function BusinessInfoForm() {
  const { toast } = useToast();
  const { replace } = useRouter();
  const { acceptedFiles, getInputProps, getRootProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
  });
  const [uploadedImage, setUploadedImage] = useState('');
  const [uploadedLogo, setUploadedLogo] = useState('');
  const [cacImage, setCacImage] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const initalState = {
    message: '',
    errors: {},
    status: '',
  };
  const [state, dispatch] = useFormState(businessCompliance, initalState);
  const states: IState[] = State.getStatesOfCountry('NG');

  const cities: ICity[] = useMemo(() => {
    return City.getCitiesOfState('NG', selectedState);
  }, [selectedState]);

  function uploadImage() {
    if (acceptedFiles.length === 0) {
      toast({ description: 'Please select a file', variant: 'destructive' });
      return;
    }
    setUploadedLogo(URL.createObjectURL(acceptedFiles[0]));
  }

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
      <h2>Business Information</h2>
      <p className='text-[13px] text-center max-w-md mx-auto'>
        We encourage you to fill out as many of these details as you can. This
        helps speed up the process of verifying and activating your business.
      </p>
      <form
        action={dispatch}
        className='w-full max-w-lg mx-auto space-y-5 !mt-5'
      >
        <div
          {...getRootProps()}
          className='py-5 bg-accent rounded-lg px-3'
        >
          <div className='flex justify-between items-center  lg:max-w-[80%]'>
            <div className='w-[60px] h-[60px] relative'>
              <Image
                src={
                  acceptedFiles.length > 0
                    ? URL.createObjectURL(acceptedFiles[0])
                    : '/logo/logomark.svg'
                }
                alt='company logo'
                fill
                // width={50}
                // height={50}
                className='rounded object-cover'
              />
            </div>
            {acceptedFiles.length === 0 && !uploadedLogo ? (
              <Button
                type='button'
                size={'sm'}
                onClick={open}
                className='!text-xs'
              >
                Select File
              </Button>
            ) : (
              <Button
                type='button'
                size={'sm'}
                className='!text-xs'
                onClick={uploadImage}
              >
                Upload New Logo
              </Button>
            )}

            <Button
              type='button'
              variant={'outline'}
              className='!text-xs'
              onClick={() => setUploadedLogo('')}
            >
              Delete{' '}
            </Button>
          </div>
        </div>

        <p className='text-xs text-gray-400'>
          Use a square logo with a dimension of 100px by 100px for the best
          result on all touch points.
        </p>

        <div className='form-control'>
          <label htmlFor='businessDescription'>Business Description</label>
          <Textarea
            name='businessDescription'
            id='businessDescription'
            className='min-h-[150px]'
            placeholder='eg. Kolhmer is a business that do and that'
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

          <p className='desc'>
            Please enter a detailed description of your business and what goods
            and services you provide.
          </p>
        </div>

        <div className='flex w-full justify-between gap-x-5'>
          <div className='form-control'>
            <label htmlFor='contactEmail'>Contact Email</label>
            <Input
              id='contactEmail'
              name='contantEmail'
              type='email'
              placeholder='contact@yourdomain.com'
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

            <p className='desc'>The Primary contact of your business</p>
          </div>
          <div className='form-control'>
            <label htmlFor='supportEmail'>Support Email</label>
            <Input
              id='supportEmail'
              name='supportEmail'
              type='email'
              placeholder='support@yourdomain.com'
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

            <p className='desc'>
              Support emails from your customers will go here
            </p>
          </div>
        </div>

        <div className='flex w-full justify-between gap-x-5'>
          <div className='form-control'>
            <label htmlFor='phone'>Phone Number</label>
            <Input
              id='phone'
              name='phone'
              type='tel'
              placeholder='Enter Phone number'
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
            <label htmlFor='state'>State</label>
            <Select
              name='state'
              value={selectedState}
              onValueChange={setSelectedState}
            >
              <SelectTrigger className='w-full bg-[#F3F8FF]'>
                <SelectValue
                  placeholder='Select State'
                  className='placeholder:!text-xs'
                />
              </SelectTrigger>
              <SelectContent className='h-[150px]'>
                {states.map((state, index) => (
                  <SelectItem
                    key={index}
                    value={state.isoCode}
                  >
                    {state.name}
                  </SelectItem>
                ))}
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
        </div>

        <div className='flex w-full justify-between gap-x-5'>
          <div className='form-control'>
            <label htmlFor='supportEmail'>Town or City</label>
            <Select name='city'>
              <SelectTrigger className='w-full bg-[#F3F8FF]'>
                <SelectValue
                  placeholder='Select City or Town'
                  className='placeholder:!text-xs'
                />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city, index) => (
                  <SelectItem
                    key={index}
                    value={city.name}
                  >
                    {city.name}
                  </SelectItem>
                ))}
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
            <label htmlFor='address'>Office Address</label>
            <Input
              id='address'
              name='address'
              type='text'
              placeholder='eg 7b Housing Estate'
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
        </div>

        <div className='flex w-full justify-between gap-x-5'>
          <div className='form-control'>
            <label htmlFor='address'>Business Website Link (Optional)</label>
            <Input
              id='businessUrl'
              name='businessUrl'
              type='url'
              placeholder='eg.yourdomain.com'
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
            <p className='text-xs inline-block text-foreground font-medium'>
              Business Social Links(Optional)
            </p>

            <div>
              <div className='flex'>
                <label className='bg-primary-light flex items-center !text-primary-light-foreground rounded-lg px-3 z-10'>
                  Facebook
                </label>
                <Input
                  id='facebookUrl'
                  name='facebookUrl'
                  type='url'
                  placeholder='https://www.facebook.com/'
                  className='rounded-l-none -ml-1.5'
                />
              </div>
              <div className='flex'>
                <label className='bg-primary-light flex items-center !text-primary-light-foreground rounded-lg px-3 z-10'>
                  Instagram
                </label>
                <Input
                  id='instagramUrl'
                  name='instagramUrl'
                  type='url'
                  placeholder='https://www.instagram.com/'
                  className='rounded-l-none -ml-1.5'
                />
              </div>
              <div className='flex'>
                <label className='bg-primary-light flex items-center !text-primary-light-foreground rounded-lg px-3 z-10'>
                  Twitter
                </label>
                <Input
                  id='xUrl'
                  name='xUrl'
                  type='url'
                  placeholder='https://www.x.com/com'
                  className='rounded-l-none -ml-1.5'
                />
              </div>
            </div>
          </div>
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
