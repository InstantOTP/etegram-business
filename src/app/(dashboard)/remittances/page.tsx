import {
  getCreditTransactionStats,
  getDebitTransactionStats,
} from '@/app/apis/data/transactions';
import Transactions from '@/app/components/transactions';
import LoadingTransactions from '@/components/loading/transaction-table';
import Image from 'next/image';
import { Suspense } from 'react';
import { formatter } from '@/lib/utils';
import RemittancesTable from '@/app/components/remittance';

export default async function RemittancesPage() {
  const credit_stats = await getDebitTransactionStats();
  // console.log(credit_stats);

  return (
    <main className='flex min-h-screen space-y-4 md:space-y-0 flex-col lg:flex-row-reverse gap-8 items-start w-full'>
      <div className='section-grid lg:flex lg:flex-col w-full lg:max-w-[18.7rem] gap-6'>
        <div className='card card-xs bg-primary-light text-primary-foreground space-y-1 py-8'>
          <p className='text-4xl font-bold'>{formatter().format(0)}</p>
          <p className='text-sm lg:text-lg font-medium opacity-90'>
            Total Remittance
          </p>
        </div>
        <div className='card-xs space-y-4 flex justify-center flex-col py-8'>
          <p className='font-semibold text-lg'>Ledger Account</p>
          <div>
            <h2 className='text-xl font-inter'>{formatter().format(0)}</h2>
            <p className='text-sm'>Due Tomorrow match 8</p>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <Suspense fallback={<LoadingTransactions />}>
          <RemittancesTable />
        </Suspense>
      </div>
    </main>
  );
}
