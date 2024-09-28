import DataTable from '@/components/ui/table';
import { getCustomers } from '../apis/data/customers';

export default async function CustomerTable() {
  const customers = await getCustomers();

  return (
    <div>
      <DataTable
        title='Total Customers'
        headers={['Customer', 'Email', 'Phone Number', 'Date Added']}
        dataKeys={['name', 'email', 'phone', 'createdAt']}
        data={customers?.data || []}
        totalPages={customers?.totalPages || 0}
        hideViewAll
      />
    </div>
  );
}
