'use client';

import { selectService } from '@/app/apis/actions/business';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { IconType } from 'react-icons/lib';
import { RiHandCoinFill } from 'react-icons/ri';

export type selectServicesType = {
  name: string;
  description: string;
  id: string;
  status: 'active' | 'inactive';
  icon: IconType | string;
};

const moreServices: selectServicesType[] = [
  {
    icon: RiHandCoinFill,
    id: '72678',
    name: 'Collect Payment',
    description:
      'Easily collect payments online with various options like virtual accounts and payment modal!',
    status: 'active',
  },
  {
    icon: '/assets/icons/QR Code Payments.svg',
    id: '7288788',
    name: 'QR code Payments',
    description:
      'Accept payment easily and effortlessly in your physcial store by displaying your contactless QR code.',
    status: 'inactive',
  },
  {
    icon: '/assets/icons/Corporate Account.svg',
    id: '7288789',
    name: 'Corporate Account',
    description:
      'Separate your personal finances from your business finances with the etegram business bank account',
    status: 'inactive',
  },
  {
    icon: '/assets/icons/Payment Links.svg',
    id: '7288790',
    name: 'Payment links',
    description:
      'Easily sell online without a website using our payment link feature',
    status: 'inactive',
  },
];

export default function ServicesList({
  services,
}: {
  services: selectServicesType[];
}) {
  const [value, setValue] = useState('');
  return (
    <div>
      <RadioGroup
        className='flex flex-col items-center gap-3 w-full  max-w-[31.625rem]'
        defaultValue='starter business'
        name='businessType'
        value={value}
        onValueChange={setValue}
      >
        {moreServices?.map((item) => (
          <div
            key={item.id}
            className='flex relative justify-between space-x-3 p-4 items-center  rounded-[0.625rem] border-[1.5px] border-border w-full  peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
          >
            {item.status !== 'active' && (
              <p className='text-destructive absolute right-4 top-3.5 text-xs'>
                Coming Soon
              </p>
            )}
            <label
              htmlFor={item.name}
              className={cn(
                'max-w-[25rem] flex space-x-6 items-center cursor-pointer',
                { 'opacity-75 cursor-not-allowed': item.status !== 'active' }
              )}
            >
              {typeof item.icon === 'string' ? (
                <div className='flex justify-center items-center bg-accent p-2 rounded-full w-[60px] h-[60px] flex-shrink-0'>
                  <Image
                    src={item.icon}
                    alt='Invoice'
                    width={30}
                    height={30}
                    quality={100}
                  />
                </div>
              ) : (
                <div className='flex justify-center items-center bg-accent p-2 rounded-full w-[60px] h-[60px] flex-shrink-0'>
                  <item.icon className='w-[30px] h-[30px]' />
                </div>
              )}
              <div className='space-y-1'>
                <p className='text-base font-medium'>{item.name}</p>
                <p className='text-primary/50 text-sm'>{item.description}</p>
              </div>
            </label>
            <RadioGroupItem
              value={item.id}
              id={item.name}
              className='flex-shrink-0'
              disabled={item.status !== 'active'}
            />
          </div>
        ))}
      </RadioGroup>

      <Button
        className='w-full !mt-10'
        size={'lg'}
        onClick={() => selectService(value)}
      >
        Continue
      </Button>
    </div>
  );
}
