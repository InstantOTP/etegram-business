'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { useState } from 'react';
import { selectService } from '@/app/apis/actions/business';

export type selectServicesType = {
  name: string;
  description: string;
  id: string;
};

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
        {services.map((item) => (
          <div
            key={item.id}
            className='flex justify-between space-x-3 p-4 items-center  rounded-[0.625rem] border-[1.5px] border-border w-full  peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
          >
            <label
              htmlFor={item.name}
              className='max-w-[25rem] flex space-x-6 items-center'
            >
              <div className='flex justify-center items-center bg-accent p-2 rounded-full w-[60px] h-[60px] flex-shrink-0'>
                <Image
                  src={'/assets/icons/sidebar/bill-payment.svg'}
                  alt='Invoice'
                  width={25}
                  height={25}
                />
              </div>
              <div className='space-y-1'>
                <p className='text-base font-medium'>{item.name}</p>
                <p className='text-primary/50 text-sm'>{item.description}</p>
              </div>
            </label>
            <RadioGroupItem
              value={item.id}
              id={item.name}
              className='flex-shrink-0'
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
