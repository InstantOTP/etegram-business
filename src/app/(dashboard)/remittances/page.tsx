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
    <main className='flex min-h-screen space-y-4 flex-col'>
      <div className='section-grid gap-7'>
        <div className='card card-xs bg-primary text-primary-foreground space-y-1'>
          <p className='text-4xl font-bold'>{formatter().format(0)}</p>
          <p className='text-sm font-medium'>Total Remittance</p>
        </div>
        <div className='card-xs space-y-4 flex justify-center flex-col'>
          <p className='font-semibold text-lg'>Ledger Account</p>
          <div>
            <h2 className='text-xl font-inter'>{formatter().format(0)}</h2>
            <p className='text-sm'>Due Tomorrow match 8</p>
          </div>
        </div>
      </div>
      <Suspense fallback={<LoadingTransactions />}>
        <RemittancesTable />
      </Suspense>
    </main>
  );
}
