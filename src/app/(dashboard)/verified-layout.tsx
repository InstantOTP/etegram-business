'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { logout, sendVerificationCode } from '../apis/actions/auth';

export default function VerifiedLayout({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const { replace } = useRouter();

  async function redirectUser() {
    const res = await sendVerificationCode(user?.email);
    if (res?.status === 'success') {
      replace(`/auth/verify-email?email=${user?.email}&from=sign-in`);
    }
  }
  //   console.log(user);
  async function logoutUser() {
    const res = await logout();
    return res;
  }

  useEffect(() => {
    if (user?.message === 'Server Error') {
      logoutUser();
    }
    if (!user?.kyc?.isEmailVerified) {
      redirectUser();
    }

    if (user?.business?.length === 0) {
      replace('/auth/create-business');
    }
  }, [user]);

  if (!user?.kyc?.isEmailVerified) {
    return null;
  }

  return <>{children}</>;
}
