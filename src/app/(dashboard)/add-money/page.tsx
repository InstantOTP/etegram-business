'use client';
import Logout from '@/components/common/buttons/logout';
import { Button } from '@/components/ui/button';
import { sayHello, payWithEtegram } from 'test-etegram';

export default function AddMoneyPage() {
  function testing() {
    let name = sayHello({ firstName: 'Jesse' });
    console.log(name);
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <h1>Maintainence</h1>
      <p>Add money page</p>
      <p>We will be back shortly.</p>
      <Button onClick={() => payWithEtegram({ amount: 2000, key: '' })}>
        Test
      </Button>
      <Logout />
    </main>
  );
}
