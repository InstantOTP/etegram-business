'use client';

import { ChevronRight, X } from 'lucide-react';
import { User } from '../layout/dashboard-header';
import Link from 'next/link';
import { useState } from 'react';

export default function VerifyBanner({ user }: { user: User }) {
  const [showBanner, setShowBanner] = useState(true);

  if (showBanner && user?.kycApprovalStatus === 'pending') {
    return (
      <div className='bg-[#FFC00133] text-sm md:text-sm text-foreground flex space-x-3 md:space-x-0  md:items-center py-3 px-4 rounded-xl justify-between max-w-[69.438rem]'>
        <div className='flex flex-col md:flex-row md:items-center gap-y-2 md:justify-between  md:gap-0 w-full max-w-[43.313rem]'>
          <p className='md:pr-4 text-[#FFC001]'>
            You are currently in test mode. Verify your business to activate
            Live Mode
          </p>

          <Link
            href={'/compliance/'}
            className='md:pl-0 text-primary underline underline-offset-2 inline-flex text-base items-center justify-between'
          >
            <span>Start Verification </span>{' '}
            <ChevronRight className='w-5 h-5 mt-1' />
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
