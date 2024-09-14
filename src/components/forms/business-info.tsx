'use client';

import { updateBusinessInfo } from '@/app/apis/actions/business';
import { uploadImageToImagekit } from '@/app/apis/actions/upload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { City, ICity, IState, State } from 'country-state-city';
import { LucideLoader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { Button, buttonVariants } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
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

export default function BusinessInfoForm({
  business,
}: {
  business?: bussinessType;
}) {
  const { toast } = useToast();
  const { replace } = useRouter();
  const { acceptedFiles, getInputProps, getRootProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
  });
  const [uploadedLogo, setUploadedLogo] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const initalState = {
    message: '',
    errors: {},
    status: '',
  };
  const [state, dispatch] = useFormState(updateBusinessInfo, initalState);
  const states: IState[] = State.getStatesOfCountry('NG');

  const cities: ICity[] = useMemo(() => {
    return City.getCitiesOfState('NG', selectedState);
  }, [selectedState]);

  async function uploadImage() {
    if (acceptedFiles.length === 0) {
      toast({ description: 'Please select a file', variant: 'destructive' });
      return;
    }
    const data = await uploadImageToImagekit(
      acceptedFiles[0],
      acceptedFiles[0]?.name
    );
    // console.log(data);
    setUploadedLogo(data?.url);
  }

  useEffect(() => {
    if (state?.message && state.status) {
      toast({
        description: state.message,
        variant: state.status !== 'success' ? 'destructive' : 'default',
      });
    }
    if (state?.status === 'success' && !business) {
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
          <input
            type='hidden'
            name='logo'
            id='logo'
            value={uploadedLogo}
          />
        </div>

        <p className='text-xs text-gray-400'>
          Use a square logo with a dimension of 100px by 100px for the best
          result on all touch points.
        </p>

        <div className='form-control'>
          <label htmlFor='businessName'>Business Name</label>
          <Input
            id='name'
            name='name'
            type='text'
            defaultValue={business?.name}
            placeholder='e.g Kebsly Enterprise'
          />
          {state?.errors?.name ? (
            <div
              id='name-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.name[0]}</p>
            </div>
          ) : null}
        </div>

        <div className='flex justify-between items-center gap-x-5'>
          <div className='form-control'>
            <label htmlFor='type'>Business Type</label>
            <Select
              name='type'
              defaultValue={business?.type}
            >
              <SelectTrigger className='w-full bg-[#F3F8FF]'>
                <SelectValue
                  placeholder='Select Type'
                  className='placeholder:!text-xs'
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='starter'>Starter</SelectItem>
                <SelectItem value='registered'>Registered</SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.type ? (
              <div
                id='type-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.type[0]}</p>
              </div>
            ) : null}
          </div>
          <div className='form-control'>
            <label htmlFor='industry'>Business Industry</label>
            <Select
              name='industry'
              defaultValue={business?.industry}
            >
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
            {state?.errors?.industry ? (
              <div
                id='businessIndustry-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.industry[0]}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className='form-control'>
          <label htmlFor='description'>Business Description</label>
          <Textarea
            name='description'
            id='description'
            className='min-h-[150px]'
            defaultValue={business?.description}
            placeholder='eg. Kolhmer is a business that do and that'
          />
          {state?.errors?.description ? (
            <div
              id='email-error'
              aria-live='polite'
              className='error'
            >
              <p>{state.errors.description[0]}</p>
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
              name='contactEmail'
              type='email'
              placeholder='contact@yourdomain.com'
              defaultValue={business?.contactEmail}
            />
            {state?.errors?.contactEmail ? (
              <div
                id='contact-email-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.contactEmail[0]}</p>
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
              defaultValue={business?.supportEmail}
            />
            {state?.errors?.supportEmail ? (
              <div
                id='support-email-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.supportEmail[0]}</p>
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
              defaultValue={business?.phone}
            />
            {state?.errors?.phone ? (
              <div
                id='email-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.phone[0]}</p>
              </div>
            ) : null}
          </div>
          <div className='form-control'>
            <label htmlFor='state'>State</label>
            <Select
              name='state'
              value={selectedState}
              onValueChange={setSelectedState}
              defaultValue={business?.address?.state}
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
            {state?.errors?.state ? (
              <div
                id='businessIndustry-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.state[0]}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className='flex w-full justify-between gap-x-5'>
          <div className='form-control'>
            <label htmlFor='supportEmail'>Town or City</label>
            <Select
              name='city'
              defaultValue={business?.address?.city}
            >
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
            {state?.errors?.city ? (
              <div
                id='city-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.city[0]}</p>
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
              defaultValue={business?.address?.address}
            />
            {state?.errors?.address ? (
              <div
                id='address-error'
                aria-live='polite'
                className='error'
              >
                <p>{state.errors.address[0]}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className='flex w-full justify-between gap-x-5'>
          <div className='form-control'>
            <label htmlFor='address'>Business Website Link (Optional)</label>
            <Input
              id='website'
              name='website'
              type='url'
              placeholder='eg.yourdomain.com'
              defaultValue={business?.website}
            />
          </div>
          <div className='form-control'>
            <p className='text-xs inline-block text-foreground font-medium'>
              Business Social Links(Optional)
            </p>

            <div className='space-y-2'>
              <div className='flex'>
                <label className='bg-primary-light flex items-center !text-primary-light-foreground rounded-lg px-3 z-10'>
                  Facebook
                </label>
                <Input
                  id='facebook'
                  name='facebook'
                  type='url'
                  placeholder='https://www.facebook.com/'
                  className='rounded-l-none -ml-1.5 text-xs placeholder:text-xs'
                  defaultValue={business?.socialLinks?.facebook}
                />
              </div>
              <div className='flex'>
                <label className='bg-primary-light flex items-center !text-primary-light-foreground rounded-lg px-3 z-10'>
                  Instagram
                </label>
                <Input
                  id='instagram'
                  name='instagram'
                  type='url'
                  placeholder='https://www.instagram.com/'
                  className='rounded-l-none -ml-1.5 text-xs placeholder:text-xs'
                  defaultValue={business?.socialLinks?.instagram}
                />
              </div>
              <div className='flex'>
                <label className='bg-primary-light flex items-center !text-primary-light-foreground rounded-lg px-3 z-10'>
                  Twitter
                </label>
                <Input
                  id='twitter'
                  name='twitter'
                  type='url'
                  placeholder='https://www.x.com/com'
                  className='rounded-l-none -ml-1.5 text-xs placeholder:text-xs'
                  defaultValue={business?.socialLinks?.twitter}
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
          <SubmitButton isImageUploaded={uploadedLogo} />
        </div>
      </form>
    </div>
  );
}
