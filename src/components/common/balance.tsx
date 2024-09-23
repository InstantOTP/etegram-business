'use client';
import { formatter } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function Balance() {
  const [view, setView] = useState(true);
  return (
    <div className='flex  w-full justify-between'>
      <div>
        <h2 className='text-primary-foreground text-3xl z-[50]'>
          {view ? formatter().format(0) : '*******'}
        </h2>
        <p className='text-xs mt-1'>Total Balance</p>
      </div>
      <div
        role='button'
        className='mt-2 cursor-pointer'
        onClick={() => setView(!view)}
      >
        {!view ? <Eye /> : <EyeOff />}
      </div>
    </div>
  );
}
