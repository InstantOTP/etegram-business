'use client';

import { User } from '@/components/layout/dashboard-header';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useMemo } from 'react';

export default function ComplianceLinks({ user }: { user: User }) {
  const availableLinks = useMemo(() => {
    return [
      {
        title: 'Personal Information',
        subtitle: 'Please Tell us more about yourself',
        link: '/compliance/user-compliance',
        verified: user.isVerified,
      },
      {
        title: 'Business Information',
        subtitle: 'Please Tell us more about your business',
        link: '/compliance/business-info',
        verified: user.isBusinessVerified,
      },
      {
        title: 'Business Information',
        subtitle: 'Please provide legal documents based on business type',
        link: '/compliance/business-compliance',
        verified: user.isBusinessVerified,
      },
    ];
  }, [user]);
  return (
    <div className='bg-background p-5 rounded-3xl'>
      <p className='font-semibold'>What to do next...</p>

      <ul className='divide-y-[1.5px] divide-primary/90 border-t-[1.5px] border-primary/90 mt-4'>
        {availableLinks.map((item, index) => (
          <li
            key={index}
            className='flex justify-between items-center py-4'
          >
            <div className='flex space-x-3 items-center'>
              <Image
                src={
                  item.verified
                    ? '/assets/Verified.svg'
                    : '/assets/Pending-Verification.svg'
                }
                alt='personal'
                width={40}
                height={40}
              />
              <div>
                <h3 className='text-sm'>{item.title}</h3>
                <p className='text-sm'>{item.subtitle}</p>
              </div>
            </div>
            <Link
              href={item.link}
              className={buttonVariants({
                size: 'sm',
                variant: item.verified ? 'outline' : 'default',
                className: 'text-primary text-sm',
              })}
            >
              {item.verified ? 'Update' : 'Continue'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
