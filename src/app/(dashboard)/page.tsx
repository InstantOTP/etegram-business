import { LogoutButton } from '@/components/common/buttons/logout';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1>Maintainence</h1>
      <p>We will be back shortly.</p>
      <LogoutButton />
    </main>
  );
}