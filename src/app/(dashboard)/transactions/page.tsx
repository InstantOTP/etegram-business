import { getCreditTransactionStats } from '@/app/apis/data/transactions';
import Transactions from '@/app/components/transactions';
import LoadingTransactions from '@/components/loading/transaction-table';
import Image from 'next/image';
import { Suspense } from 'react';
import { Icons } from '@/components/icons';

export default async function TransactionsPage() {
  const credit_stats = await getCreditTransactionStats();
  // console.log(creditTransactions);
  return (
    <main className='flex min-h-screen space-y-4 md:space-y-0 flex-col lg:flex-row-reverse gap-8 items-start w-full'>
      <div className='section-grid lg:flex lg:flex-col w-full lg:max-w-[18.7rem] gap-6'>
        <div className='card card-xs bg-primary-light text-primary-foreground space-y-1 py-8'>
          <p className='text-4xl font-bold'>
            {credit_stats[0]?.totalTransactions || 0}
          </p>
          <p className='text-sm lg:text-lg font-medium opacity-90'>
            Total Transactions
          </p>
        </div>

        <div className='flex gap-4'>
          <div className='card card-xs space-y-1.5'>
            <Icons.transactions2 className='w-10 h-10 !mb-4 lg:!mb-10' />

            <p className='text-3xl font-bold'>
              {credit_stats[0]?.successfulTransactions || 0}
            </p>
            <p className='text-sm font-medium'>Successful Transactions</p>
          </div>

          <div className='card card-xs space-y-1.5'>
            <Icons.expenses className='w-10 h-10 !mb-4 lg:!mb-10' />

            <p className='text-3xl font-bold'>
              {credit_stats[0]?.failedTransactions || 0}
            </p>
            <p className='text-sm font-medium font-inter'>
              Failed Transactions
            </p>
          </div>
        </div>
      </div>
      <div className='w-full '>
        <Suspense fallback={<LoadingTransactions />}>
          <Transactions />
        </Suspense>
      </div>
    </main>
  );
}
