import DataTable from '@/components/ui/table';
import { tableData } from '@/lib/static-data';
import ComplianceLinks from './components/compliance-link';
import { getUser } from '@/app/apis/data/user';
import { User } from '@/components/layout/dashboard-header';
import { Suspense } from 'react';
import Transactions from '@/app/components/transactions';
import LoadingTransactions from '@/components/loading/transaction-table';

export default async function ComplianceHome() {
  const user: User = await getUser();
  return (
    <section className='space-y-8'>
      <ComplianceLinks user={user} />
      <Suspense fallback={<LoadingTransactions />}>
        <Transactions />
      </Suspense>
    </section>
  );
}
