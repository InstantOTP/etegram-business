import { getCustomers } from '@/app/apis/data/customers';
import Customers from '@/app/components/customers';
import { Suspense } from 'react';
export default async function CustomersPage() {
  const customers = await getCustomers();
  // console.log(customers);
  return (
    <main className='flex min-h-screen space-y-4 md:space-y-0 flex-col lg:flex-row-reverse gap-8 items-start w-full'>
      <div className='section-grid lg:block w-full max-w-[18.7rem]'>
        <div className='card  bg-primary-light text-primary-foreground space-y-1 py-8 px-8'>
          <p className='text-4xl font-bold'>{customers?.totalDocuments || 0}</p>
          <p className='text-lg font-medium opacity-90'>Total Customers</p>
        </div>
      </div>
      <div>
        <Suspense>
          <Customers />
        </Suspense>
      </div>
    </main>
  );
}
