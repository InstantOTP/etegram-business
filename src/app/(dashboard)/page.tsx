import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1>Maintainence</h1>
      <p>We will be back shortly.</p>

      <Link
        href={'/auth/sign-in'}
        className={buttonVariants({ variant: 'default' })}
      >
        Logout
      </Link>
    </main>
  );
}
