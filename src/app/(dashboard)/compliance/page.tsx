import DataTable from '@/components/ui/table';
import { tableData } from '@/lib/static-data';
import ComplianceLinks from './components/compliance-link';
import { getUser } from '@/app/apis/data/user';
import { User } from '@/components/layout/dashboard-header';

export default async function ComplianceHome() {
  const user: User = await getUser();
  return (
    <section className='space-y-8'>
      <ComplianceLinks user={user} />
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
