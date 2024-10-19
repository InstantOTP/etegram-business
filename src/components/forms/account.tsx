'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useFormState, useFormStatus } from 'react-dom';
import { updateProject } from '@/app/apis/actions/project';
import { useToast } from '../ui/use-toast';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const accountSettings = [
  {
    title: 'Accept payments via:',
    options: [
      { label: 'Bank', value: 'bank', name: 'gateway' },
      { label: 'QR Code', value: 'qr-code', name: 'gateway' },
      { label: 'Card', value: 'card', name: 'gateway' },
      { label: 'USSD', value: 'ussd', name: 'gateway' },
    ],
  },
];

const receiptsTo = [
  {
    title: 'Transaction receipts:',
    options: [
      { label: 'Send to me', value: 'business', name: 'recieptReceipient' },
      {
        label: 'Send to customers',
        value: 'customer',
        name: 'recieptReceipient',
      },
    ],
  },
];

const charges = [
  {
    title: 'Who bear the charges:',
    options: [
      { label: 'Me', value: 'business' },
      { label: 'Customers', value: 'customer' },
    ],
  },
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
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

export default function AccountSettingsForm({ project }: { project: any }) {
  const [state, dispatch] = useFormState(updateProject, undefined);
  const { toast } = useToast();

  React.useEffect(() => {
    if (state && state.message) {
      toast({
        description: state?.message,
        variant: state?.status !== 'success' ? 'destructive' : 'default',
      });
    }
  }, [state]);
  return (
    <div className='w-full'>
      <form
        className='w-full space-y-6'
        action={dispatch}
      >
        {accountSettings?.map((item, index) => (
          <div key={index}>
            <h2 className='text-lg mb-1.5'>{item.title}</h2>
            <ul className='grid grid-cols-2 gap-5'>
              {item.options.map((item, index) => (
                <li key={index}>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id={item.value}
                      defaultChecked={item.label === 'Bank'}
                      value={item.value}
                      name={item.name}
                      disabled={item.label !== 'Bank'}
                    />
                    <label
                      htmlFor={item.value}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {item.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {receiptsTo?.map((item, index) => (
          <div key={index}>
            <h2 className='text-lg mb-1.5'>{item.title}</h2>
            <ul className='grid grid-cols-2 gap-5'>
              {item.options.map((item, index) => (
                <li key={index}>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id={item.value}
                      defaultChecked={
                        project?.recieptReceipient === 'both' ||
                        project?.recieptReceipient === item?.value
                      }
                      value={item.value}
                      name={item.name}
                    />
                    <label
                      htmlFor={item.value}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {item.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <RadioGroup
          className='flex justify-between items-center gap-5'
          name='chargeFeeFrom'
          defaultValue={project?.chargeFeeFrom}
        >
          {charges.map((item, index) => (
            <div key={index}>
              <h2 className='text-lg mb-1.5'>{item.title}</h2>
              <ul className='grid grid-cols-2 gap-5'>
                {item.options.map((item, index) => (
                  <li key={index}>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value={item.value}
                        id={item.value}
                        className='flex-shrink-0'
                      />
                      <label
                        htmlFor={item.value}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {item.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RadioGroup>
        <SubmitButton />
      </form>
    </div>
  );
}
