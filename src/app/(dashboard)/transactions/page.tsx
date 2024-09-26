import { getCreditTransactionStats } from '@/app/apis/data/transactions';
import Transactions from '@/app/components/transactions';
import LoadingTransactions from '@/components/loading/transaction-table';
import Image from 'next/image';
import { Suspense } from 'react';
export default async function TransactionsPage() {
  const credit_stats = await getCreditTransactionStats();
  // console.log(creditTransactions);
  return (
    <main className='flex min-h-screen space-y-4 flex-col'>
      <div className='section-grid gap-7'>
        <div className='card card-xs bg-primary text-primary-foreground space-y-1'>
          <p className='text-4xl font-bold'>
            {credit_stats[0]?.totalTransactions || 0}
          </p>
          <p className='text-sm font-medium'>Total Transactions</p>
        </div>
        <div className='card card-xs space-y-1.5'>
          <p className='text-3xl font-bold'>
            <Image
              src={'/assets/Success.svg'}
              alt='stats logo'
              width={50}
              height={50}
            />
            {credit_stats[0]?.successfulTransactions || 0}
          </p>
          <p className='text-sm font-medium'>Successful Transactions</p>
        </div>
        <div className='card card-xs space-y-1.5'>
          <Image
            src={'/assets/Success.svg'}
            alt='stats logo'
            width={50}
            height={50}
          />
          <p className='text-3xl font-bold'>
            {credit_stats[0]?.failedTransactions || 0}
          </p>
          <p className='text-sm font-medium font-inter'>Failed Transactions</p>
        </div>
      </div>
      <Suspense fallback={<LoadingTransactions />}>
        <Transactions />
      </Suspense>
    </main>
  );
}
