import { getCustomers } from '@/app/apis/data/customers';
import Customers from '@/app/components/customers';
import CustomerTable from '@/app/components/customers';
import Logout from '@/components/common/buttons/logout';
import Image from 'next/image';
import { Suspense } from 'react';
export default async function CustomersPage() {
  const customers = await getCustomers();
  // console.log(customers);
  return (
    <main className='flex min-h-screen space-y-4 flex-col'>
      <div className='section-grid gap-7'>
        <div className='card card-xs bg-primary text-primary-foreground space-y-1 py-11'>
          <p className='text-4xl font-bold'>{customers?.totalDocuments || 0}</p>
          <p className='text-sm font-medium'>Total Customers</p>
        </div>
      </div>

      <Suspense>
        <Customers />
      </Suspense>
    </main>
  );
}
