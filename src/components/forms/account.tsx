'use client';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

const accountSettings = [
  {
    title: 'Accept payments via:',
    options: [
      { label: 'QR Code', value: 'qr-code' },
      { label: 'Card', value: 'card' },
      { label: 'Bank', value: 'bank' },
      { label: 'USSD', value: 'ussd' },
    ],
  },
  {
    title: 'Transaction receipts:',
    options: [
      { label: 'Send to me', value: 'send-to-me' },
      { label: 'Send to customers', value: 'customers' },
    ],
  },
  {
    title: 'Who bear the charges:',
    options: [
      { label: 'Me', value: 'me' },
      { label: 'Customers', value: 'customers' },
    ],
  },
];

export default function AccountSettingsForm() {
  return (
    <div className='w-full'>
      <form className='w-full space-y-6'>
        {accountSettings?.map((item, index) => (
          <div key={index}>
            <h2 className='text-lg mb-1.5'>{item.title}</h2>
            <ul className='grid grid-cols-2 gap-5'>
              {item.options.map((item, index) => (
                <li key={index}>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id={item.value}
                      defaultChecked
                      value={item.value}
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

        <Button type='button'>Update</Button>
      </form>
    </div>
  );
}
