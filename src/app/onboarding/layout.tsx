import Logo from '@/components/common/logo';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OnBoardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-svh'>
      <div className='container flex justify-between items-center'>
        <Logo />
        <Link
          href={'/auth/login'}
          className={buttonVariants({ variant: 'outline' })}
        >
          <ArrowLeft />
          <span> Return to Login</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
