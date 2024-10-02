'use client';

import { Input } from '../ui/input';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '../ui/use-toast';
import { useEffect, useMemo, useState } from 'react';
import { createPayout } from '@/app/apis/actions/payout';
import Select from 'react-select';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { LucideLoader2 } from 'lucide-react';

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
      <span>Add Bank</span>
    </Button>
  );
}

export default function PayoutForm({
  banks,
  projectBank,
}: {
  banks: any;
  projectBank: any;
}) {
  const initalState = {
    message: '',
    errors: {},
    status: '',
  };
  const [state, dispatch] = useFormState(createPayout, initalState);
  const [bankCode, setBankCode] = useState('');
  const { toast } = useToast();

  const selectBanks = useMemo(() => {
    if (banks) {
      return banks.map((item: any) => ({
        bankCode: item.bankCode,
        label: item.name,
        value: item.name,
      }));
    } else {
      return [];
    }
  }, [banks]);
  console.log(projectBank);

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
        <div className='form-control'>
          <label htmlFor='firstName'>Bank Name</label>
          {projectBank[0]?.bankName ? (
            <Input
              id='bankName'
              name='bankName'
              type='text'
              placeholder='e.g Oluwabumi'
              defaultValue={projectBank[0]?.bankName}
              disabled
              className='disabled:opacity-100'
            />
          ) : (
            <Select
              id='bankName'
              name='bankName'
              options={selectBanks}
              onChange={(e: any) => setBankCode(e?.bankCode)}
              unstyled
              classNames={{
                control: () =>
                  'h-10 w-full text-secondary-foreground/90 rounded-[0.625rem] bg-[#F3F8FF] px-3 text-sm ',
                menu: () =>
                  'bg-white text-sm  mt-1 shadow-md rounded-[0.625rem] py-1 space-y-3',
                option: ({ isFocused }) =>
                  cn('py-1.5 px-3', { 'bg-[#F3F8FF] ': isFocused }),
              }}
            />
          )}

          {state?.errors?.bankName ? (
            <div
              id='bankName-error'
              aria-live='polite'
              className='error'
            >
              {state.errors.bankName.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className='form-control'>
          <label htmlFor='accountNumber'>Account Number</label>
          <Input
            id='accountNumber'
            name='accountNumber'
            type='text'
            placeholder='1234567890'
            className='disabled:opacity-100'
            defaultValue={projectBank[0]?.accountNumber}
          />
          {state?.errors?.accountNumber ? (
            <div
              id='bankName-error'
              aria-live='polite'
              className='error'
            >
              {state.errors.accountNumber.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        <Input
          id='bankCode'
          name='bankCode'
          type='hidden'
          defaultValue={bankCode}
          placeholder='1234567890'
          className='disabled:opacity-100'
        />

        <div className='flex justify-between items-center gap-5'>
          <div className='form-control'>
            <label htmlFor='AccountName'>Account Name</label>
            <Input
              id='accountName'
              name='accountName'
              type='text'
              placeholder='Korner Limited'
              className='disabled:opacity-100'
              defaultValue={projectBank[0]?.accountName}
            />
            {state?.errors?.accountName ? (
              <div
                id='bankName-error'
                aria-live='polite'
                className='error'
              >
                {state.errors.accountName.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {projectBank?.length === 0 ? <SubmitButton /> : null}
      </form>
    </div>
  );
}
