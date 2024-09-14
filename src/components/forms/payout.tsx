'use client';

import { Input } from '../ui/input';

export default function PayoutForm() {
  return (
    <div className='w-full'>
      <form className='w-full space-y-6'>
        <div className='form-control'>
          <label htmlFor='firstName'>Bank Name</label>
          <Input
            id='bankName'
            name='bankName'
            type='text'
            placeholder='e.g Oluwabumi'
            defaultValue={'GT Bank'}
            disabled
            className='disabled:opacity-100'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='accountNumber'>Account Number</label>
          <Input
            id='accountNumber'
            name='accountNumber'
            type='text'
            placeholder='0000000000'
            defaultValue={5382639688}
            disabled
            className='disabled:opacity-100'
          />
        </div>

        <div className='flex justify-between items-center gap-5'>
          <div className='form-control'>
            <label htmlFor='AccountName'>Account Name</label>
            <Input
              id='accountName'
              name='accountName'
              type='text'
              placeholder=''
              defaultValue={'Korner Limited'}
              disabled
              className='disabled:opacity-100'
            />
          </div>
        </div>
      </form>
    </div>
  );
}
