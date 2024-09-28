import Logout from '@/components/common/buttons/logout';
import Logo from '@/components/common/logo';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LayoutButton from './layout-button';

export const dynamic = 'force-dynamic';
export default function OnBoardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-svh auth-bg'>
      <div className='container flex justify-end items-center  sticky top-0 left-0 pt-4'>
        {/* <Logo white /> */}
        <LayoutButton />
      </div>
      {children}
    </div>
  );
}
