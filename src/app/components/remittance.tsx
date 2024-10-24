import DataTable from '@/components/ui/table';
import { getDebitTransactions } from '../apis/data/transactions';

export default async function RemittancesTable() {
  const remitance = await getDebitTransactions();
  const remittance = { data: [], totalPages: 0 };
  // console.log(remitance);

  return (
    <div>
      <DataTable
        title='Remittance'
        headers={['Remittance For', 'Recipient', 'Paid out Amount', 'Status']}
        dataKeys={['name', 'email', 'phone', 'createdAt']}
        data={remittance?.data || []}
        totalPages={remittance?.totalPages || 0}
        hideViewAll
        hideNumbering
      />
    </div>
  );
}
