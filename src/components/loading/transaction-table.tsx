'use client';

import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';

const headers = [
  'Reference',
  'Customer',
  'Amount',
  'Type',
  'Channel',
  'Date',
  'Status',
];

export default function LoadingTransactions() {
  return (
    <div className='bg-background p-5 rounded-3xl'>
      <div className='flex justify-between items-center'>
        <h3 className='text-foreground font-semibold mb-1'>
          Recent Transactions
        </h3>
      </div>

      <div className='grid w-full grid-cols-1 overflow-auto whitespace-normal styled-scrollbar'>
        <table className='w-full mt-1 text-left rtl:text-right'>
          <thead className='border-y border-gray-300'>
            <tr>
              <th className='text-left font-semibold text-sm py-3 px-2.5'>
                S/N
              </th>
              {headers.map((item, index) => (
                <th
                  key={index}
                  className='text-left font-semibold text-sm py-2 px-4'
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <div className='w-full h-[200px] flex flex-col gap-y-9 justify-center items-center mt-3'>
              <LucideLoader2 className={cn('animate-spin mr-1 w-10 h-10')} />
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
}
