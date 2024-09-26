import { getCreditTransactions } from '../apis/data/transactions';
import DataTable from '@/components/ui/table';

export default async function Transactions() {
  const creditTransactions = await getCreditTransactions();

  return (
    <div>
      <DataTable
        title='Recent Transactions'
        headers={[
          'Reference',
          'Customer',
          'Amount',
          'Type',
          'Channel',
          'Date',
          'Status',
        ]}
        dataKeys={[
          'reference',
          'email',
          'amount',
          'type',
          'channel',
          'createdAt',
          'status',
        ]}
        data={creditTransactions?.data || []}
        totalPages={creditTransactions?.totalPages || 0}
        hideViewAll
      />
    </div>
  );
}
