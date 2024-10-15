import { Balance } from '@/components/common/balance';
import { TransactionChart } from '@/components/common/transaction-chart';
import VerifyBanner from '@/components/common/verified-banner';
import { Icons } from '@/components/icons';
import { User } from '@/components/layout/dashboard-header';
import LoadingTransactions from '@/components/loading/transaction-table';
import { Button } from '@/components/ui/button';
import { formatter } from '@/lib/utils';
import { Suspense } from 'react';
import { getUser } from '../apis/data/user';
import Transactions from '../components/transactions';
import { getProjectDashboard } from '../apis/data/projects';
import { getCurrentBusiness } from '../apis/data/business';

export default async function Home() {
  const user: User = await getUser();
  const dashboard = await getProjectDashboard();
  const business = await getCurrentBusiness();
  // console.log(dashboard);

  return (
    <section className='space-y-8'>
      {(business?.kycApprovalStatus === 'pending' ||
        user?.kycApprovalStatus === 'pending') && <VerifyBanner user={user} />}
      <div className='section-grid gap-10'>
        <div className='card-sm text-primary-foreground min-h-[230px] bg-primary-light overflow-clip relative'>
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

        <div className='card-2xs space-y-4'>
          <div>
            <Icons.expenses className='w-10 h-10' />
            <p className='text-sm'>Expenses</p>
            <p className='font-semibold tracking-tighter font-inter'>
              {formatter().format(dashboard?.totalDebitTransactions || 0)}
            </p>
          </div>
          <div>
            <Icons.income className='w-10 h-10' />
            <p className='text-sm'>Income</p>
            <p className='font-semibold font-inter'>
              {formatter().format(dashboard?.totalCreditTransactions || 0)}
            </p>
          </div>
        </div>

        <div className='card-xs space-y-4 flex justify-center flex-col'>
          <p className='font-semibold text-lg'>Ledger Account</p>
          <div>
            <h2 className='text-xl font-inter'>
              {formatter().format(
                dashboard?.walletBalances?.walletBalances?.ledger || 0
              )}
            </h2>
            <p className='text-sm'>Due Tomorrow match 8</p>
          </div>
          <Button className='max-w-[10rem]'>Previous payouts</Button>
        </div>
      </div>

      <div className='section-grid gap-10'>
        <div className='lg:col-span-5 w-full'>
          <div className='flex w-full gap-5 h-full'>
            <div className='w-full space-y-8'>
              {/* <Button className='flex w-full space-x-4 bg-background text-primary h-12 hover:bg-background/90'>
                <Icons.addMoney className='dashboard-icon active' />
                <span>Send Money</span>
              </Button> */}

              <div className='card h-[75%]'>
                <Icons.customers2 className='w-10 h-10 mb-10' />
                <div className='space-y-1'>
                  <p className='font-medium text-base text-secondary-foreground'>
                    Total <br /> customers
                  </p>
                  <p className='font-bold text-xl lg:text-2xl text-secondary-foreground tracking-tighter'>
                    {dashboard?.customers || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className='w-full space-y-8'>
              {/* <Button className='flex w-full space-x-4 h-12'>
                <Icons.sendMoney className='dashboard-icon white' />
                <span>Send Money</span>
              </Button> */}
              <div className='card py-8 h-[75%]'>
                <Icons.transactions2 className='w-10 h-10 mb-10' />
                <div className='space-y-1'>
                  <p className='font-medium text-base text-secondary-foreground'>
                    Total <br /> transactions
                  </p>
                  <p className='font-bold text-xl lg:text-2xl text-secondary-foreground tracking-tighter'>
                    {dashboard?.totalTransactions || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:col-span-7'>
          <TransactionChart data={dashboard?.dailyTransactions} />
        </div>
      </div>
      <Suspense fallback={<LoadingTransactions />}>
        <Transactions />
      </Suspense>
    </section>
  );
}
