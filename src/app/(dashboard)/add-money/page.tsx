'use client';
import Logout from '@/components/common/buttons/logout';
import { Button } from '@/components/ui/button';
// import { sayHello, payWithEtegram } from 'test-etegram';
import { payWithEtegram } from '@/lib/checkout';
import Cookies from 'js-cookie';

export default function AddMoneyPage() {
  const projectID = Cookies.get('projectId') as string;
  console.log(projectID);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <h1>Maintainence</h1>
      <p>Add money page</p>
      <p>We will be back shortly.</p>
      <Button onClick={() => payWithEtegram(projectID, '')}>Test</Button>
      <Logout />
    </main>
  );
}
