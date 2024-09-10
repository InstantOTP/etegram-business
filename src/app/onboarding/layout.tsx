import Logout from '@/components/common/buttons/logout';
import Logo from '@/components/common/logo';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export default function OnBoardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-svh'>
      <div className='container flex justify-between items-center'>
        <Logo />
        <Logout
          className={buttonVariants({
            variant: 'outline',
            className: 'text-primary',
          })}
        />
      </div>
      {children}
    </div>
  );
}
