'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import Logout from '@/components/common/buttons/logout';
import { ArrowLeft } from 'lucide-react';

export default function LayoutButton() {
  const pathname = usePathname();
  const isSelectBusiness = pathname === '';
  const { back } = useRouter();

  return (
    <>
      {isSelectBusiness ? (
        <Logout
          className={buttonVariants({
            variant: 'destructive',
          })}
        />
      ) : (
        <Button onClick={back}>
          <ArrowLeft className='mr-1.5' />
          <span>Go Back</span>
        </Button>
      )}
    </>
  );
}
