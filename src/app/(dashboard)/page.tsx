import { Balance } from '@/components/common/balance';
import { TransactionChart } from '@/components/common/transaction-chart';
import VerifyBanner from '@/components/common/verified-banner';
import { Icons } from '@/components/icons';
import { User } from '@/components/layout/dashboard-header';
import LoadingTransactions from '@/components/loading/transaction-table';
import { Button, buttonVariants } from '@/components/ui/button';
import { formatter } from '@/lib/utils';
import { Suspense } from 'react';
import { getUser } from '../apis/data/user';
import Transactions from '../components/transactions';
import { getProjectDashboard } from '../apis/data/projects';
import { getCurrentBusiness } from '../apis/data/business';
import Link from 'next/link';

export default async function Home() {
  const user: User = await getUser();
  const dashboard = await getProjectDashboard();
  const business = await getCurrentBusiness();
  // console.log(dashboard);

  return (
    <section className='space-y-8'>
      {(business?.kycApprovalStatus === 'pending' ||
        user?.kycApprovalStatus === 'pending') && <VerifyBanner user={user} />}
      {/* <div className='flex justify-between space-x-8'> */}
      <div className='grid md:grid-cols-[minmax(340px,_430px)_minmax(auto,_221px)_minmax(auto,_386px)] gap-8'>
        <div className='card md:max-w-[26.875rem] text-primary-foreground min-h-[230px] bg-primary-light overflow-clip relative'>
          <div className=' absolute top-0 left-0 p-5 w-full  z-50'>
            <Balance
              value={dashboard?.walletBalances?.walletBalances?.available || 0}
            />
          </div>
          <div
            aria-hidden={true}
            className='absolute -right-24 -top-1 w-[280px] h-full bg-primary rounded-[20%] rotate-45'
          />
        </div>

        <div className='card md:max-w-[13.813rem] space-y-4'>
          <div>
            <Icons.expenses className='w-10 h-10' />
            <p className='text-sm'>Expenses</p>
            <p className='font-semibold text-xl tracking-tighter font-inter'>
              {formatter().format(dashboard?.totalDebitTransactions || 0)}
            </p>
          </div>
          <div>
            <Icons.income className='w-10 h-10' />
            <p className='text-sm'>Income</p>
            <p className='font-semibold text-xl font-inter'>
              {formatter().format(dashboard?.totalCreditTransactions || 0)}
            </p>
          </div>
        </div>

        <div className='card md:max-w-[24.125rem] space-y-4 flex justify-between flex-col'>
          <div className='space-y-4'>
            <p className='font-semibold text-lg'>Ledger Account</p>
            <h2 className='lg:text-3xl font-inter'>
              {formatter().format(
                dashboard?.walletBalances?.walletBalances?.ledger || 0
              )}
            </h2>
          </div>
          <div className='space-y-4'>
            <p className='text-sm'>No due date</p>
            <Link
              href={'/remittances'}
              className={buttonVariants()}
            >
              Previous payouts
            </Link>
            {/* max-w-[10rem] */}
          </div>
        </div>
      </div>

      <div className='grid md:grid-cols-[minmax(340px,_430px)_minmax(auto,_1fr)] gap-8'>
        <div className=' w-full max-w-[26.875rem]'>
          <div className='flex flex-col w-full gap-5 h-full'>
            <div className='w-full space-y-8'>
              <div className='card flex items-center justify-between py-9'>
                <div className='flex space-x-3'>
                  <Icons.customers2 className='w-10 h-10' />
                  <p className='font-medium text-base text-secondary-foreground'>
                    Total <br /> customers
                  </p>
                </div>
                <p className='font-bold text-xl lg:text-2xl text-secondary-foreground tracking-tighter'>
                  {dashboard?.customers || 0}
                </p>
              </div>
            </div>
            <div className='card flex items-center justify-between py-9'>
              <div className='flex space-x-3'>
                <Icons.transactions2 className='w-10 h-10' />
                <p className='font-medium text-base text-secondary-foreground'>
                  Total <br /> transactions
                </p>
              </div>
              <p className='font-bold text-xl lg:text-2xl text-secondary-foreground tracking-tighter'>
                {dashboard?.totalTransactions || 0}
              </p>
            </div>
          </div>
        </div>
        <div className='w-full hidden sm:block'>
          <TransactionChart data={dashboard?.dailyTransactions} />
        </div>
      </div>
      <Suspense fallback={<LoadingTransactions />}>
        <Transactions />
      </Suspense>
    </section>
  );
}
