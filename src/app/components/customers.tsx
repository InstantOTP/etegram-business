import DataTable from '@/components/ui/table';
import { getCustomers } from '../apis/data/customers';
import CustomersTable from './customers-details';

export default async function Customers() {
  const customers = await getCustomers();

  return <CustomersTable customers={customers} />;
}
