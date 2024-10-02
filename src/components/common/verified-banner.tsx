'use client';

import { X } from 'lucide-react';
import { User } from '../layout/dashboard-header';
import Link from 'next/link';
import { useState } from 'react';

export default function VerifyBanner({ user }: { user: User }) {
  const [showBanner, setShowBanner] = useState(true);

  if (showBanner && user?.kycApprovalStatus === 'pending') {
    return (
      <div className='bg-[#FFC00133] text-sm md:text-sm text-foreground flex flex-col md:flex-row md:items-center py-3 px-4 rounded-xl justify-between max-w-[62.5rem]'>
        <div className='flex items-center'>
          <p className='md:pr-4 text-[#FFC001]'>
            You are currently in test mode. Verify your business to activate
            Live Mode
          </p>

          <Link
            href={'/compliance/'}
            className='md:pl-2 text-primary underline'
          >
            Click to update account
          </Link>
        </div>
        <button onClick={() => setShowBanner(false)}>
          <X className='text-[#FFC001] cursor-pointer' />
        </button>
      </div>
    );
  }

  return null;
}
