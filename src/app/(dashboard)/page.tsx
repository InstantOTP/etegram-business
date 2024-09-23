import { Balance } from '@/components/common/balance';
import { TransactionChart } from '@/components/common/transaction-chart';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { formatter } from '@/lib/utils';
import DataTable from '@/components/ui/table';
import { tableData } from '@/lib/static-data';
import Link from 'next/link';
import { getUser } from '../apis/data/user';
import { User } from '@/components/layout/dashboard-header';

export default async function Home() {
  const user: User = await getUser();
  return (
    <section className='space-y-12'>
      {user?.kycApprovalStatus === 'pending' && (
        <div className='bg-[#fff8dd] text-sm md:text-sm text-foreground flex flex-col md:flex-row md:items-center py-3 px-4 rounded-xl md:divide-x-2 md:divide-foreground max-w-fit'>
          <p className='md:pr-4 '>
            Hi {user?.firstname}, You are yet to complete setting up your
            business account
          </p>

          <Link
            href={'/settings'}
            className='md:pl-2 font-semibold text-primary hover:underline'
          >
            Click to update account
          </Link>
        </div>
      )}
      <div className='section-grid gap-10'>
        <div className='card-sm text-primary-foreground min-h-[230px] bg-primary-light overflow-clip relative'>
          <div className=' absolute top-0 left-0 p-5 w-full  z-50'>
            <Balance />
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
            <p className='font-semibold tracking-tighter'>
              {formatter().format(0)}
            </p>
          </div>
          <div>
            <Icons.income className='w-10 h-10' />
            <p className='text-sm'>Income</p>
            <p className='font-semibold'>{formatter().format(0)}</p>
          </div>
        </div>

        <div className='card-xs space-y-4 flex justify-center flex-col'>
          <p className='font-semibold text-lg'>Ledger Account</p>
          <div>
            <h2 className='text-xl'>{formatter().format(0)}</h2>
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
                    0
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
                    0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:col-span-7'>
          <TransactionChart />
        </div>
      </div>

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
