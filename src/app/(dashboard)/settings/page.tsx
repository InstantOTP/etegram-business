import { LogoutButton } from '@/components/common/buttons/logout';

export default function SettingsPage() {
  return (
    <main className='flex min-h-screen space-y-4 flex-col items-center justify-center'>
      <h1>Maintainence</h1>
      <p>Settings page</p>
      <p>We will be back shortly.</p>
      <LogoutButton />
    </main>
  );
}
