import DataTable from '@/components/ui/table';
import { fakeUsers, tableData } from '@/lib/static-data';
import ComplianceLinks from './components/compliance-link';

export default function ComplianceHome() {
  return (
    <section className='space-y-8'>
      <ComplianceLinks user={fakeUsers} />
      <div>
        <DataTable
          title='Recent Transactions'
          headers={['Customer', 'Amount', 'Channel', 'Date', 'Status']}
          dataKeys={['customer', 'amount', 'channel', 'date', 'status']}
          data={tableData || []}
          totalPages={tableData.length}
        />
      </div>
    </section>
  );
}
