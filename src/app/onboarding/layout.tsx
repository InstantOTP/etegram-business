import Logout from '@/components/common/buttons/logout';
import Logo from '@/components/common/logo';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LayoutButton from './layout-button';
import VerifiedLayout from '../(dashboard)/verified-layout';
import { getUser } from '../apis/data/user';

export const dynamic = 'force-dynamic';
export default async function OnBoardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  // console.log(user);
  return (
    <VerifiedLayout user={user}>
      <div className='min-h-svh auth-bg'>
        <div className='max-w-[93%] mx-auto flex justify-end items-center  sticky top-0 left-0 pt-4'>
          {/* <Logo white /> */}
          <LayoutButton />
        </div>
        {children}
      </div>
    </VerifiedLayout>
  );
}
