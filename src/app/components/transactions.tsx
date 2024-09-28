import { getCreditTransactions } from '../apis/data/transactions';
import TransactionsTable from './transaction-detail';

export default async function Transactions() {
  const creditTransactions = await getCreditTransactions();

  return <TransactionsTable creditTransactions={creditTransactions} />;
}
