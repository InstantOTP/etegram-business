'use client';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import DataTable from '@/components/ui/table';
import { findUpper, formatDateWithTime, formatter } from '@/lib/utils';
import { X } from 'lucide-react';
import { useState } from 'react';

interface detailsType {
  amount: number;
  fees: number;
  createdAt: string;
  status: string;
  reference: string;
  channel: string;
  name: string;
  email: string;
  phone: string;
}

export default function TransactionsTable({
  creditTransactions,
}: {
  creditTransactions: any;
}) {
  const [details, setDetails] = useState<detailsType | undefined>();
  const [showModal, setShowModal] = useState(false);
  // console.log(details);

  return (
    <div>
      <DataTable
        title='Recent Transactions'
        headers={['Customer', 'Amount', 'Type', 'Channel', 'Date', 'Status']}
        dataKeys={['email', 'amount', 'type', 'channel', 'createdAt', 'status']}
        data={creditTransactions?.data || []}
        totalPages={creditTransactions?.totalPages || 0}
        hideViewAll
        setDetails={setDetails}
        setIsOpen={setShowModal}
      />

      <Sheet
        open={showModal}
        onOpenChange={setShowModal}
      >
        <SheetContent className='bg-primary flex  items-end px-0 border-0 focus:outline-transparent sm:max-w-[31rem]'>
          <button
            className='absolute top-16 right-10 '
            onClick={() => {
              setDetails(undefined);
              setShowModal(false);
            }}
          >
            <X className='text-white' />
          </button>

          <div className='h-[75%] w-full'>
            <SheetTitle className='text-white px-10 mb-6'>
              Transaction Details
            </SheetTitle>
            {details && (
              <div className='bg-[#f1faff] rounded-t-3xl h-full w-full px-10 py-7'>
                <div className='bg-background p-2 rounded-md flex space-x-4 items-center mb-4'>
                  <div className='w-10 font-inter h-10 grid place-items-center bg-primary text-primary-foreground font-bold rounded-md'>
                    {details?.name ? `${findUpper('JesseOlisa')} ` : 'E'}
                  </div>

                  <div className='font-inter'>
                    <h4 className='text-sm'>{details?.name}</h4>
                    <p className='text-xs'>{details?.email}</p>
                  </div>
                </div>
                <ul className='divide-y divide-gray-300 h-[80%] overflow-y-auto'>
                  <li className='flex justify-between py-1.5 w-full px-3 text-sm'>
                    <p>Amount:</p>
                    <p className='font-bold'>
                      {formatter().format(details?.amount)}
                    </p>
                  </li>
                  <li className='flex justify-between py-1.5 w-full px-3 text-sm'>
                    <p>Fee:</p>
                    <p className='font-bold'>
                      {formatter().format(details?.fees)}
                    </p>
                  </li>{' '}
                  <li className='flex justify-between py-1.5 w-full px-3 text-sm'>
                    <p>Status:</p>
                    <p className='font-bold uppercase'> {details?.status}</p>
                  </li>{' '}
                  <li className='flex justify-between py-1.5 w-full px-3 text-sm'>
                    <p>Paid Date</p>
                    <p className='font-bold'>
                      {formatDateWithTime(details?.createdAt)}
                    </p>
                  </li>{' '}
                  <li className='flex justify-between py-1.5 w-full px-3 text-sm'>
                    <p>Reference:</p>
                    <p className='font-bold text-right'>{details?.reference}</p>
                  </li>{' '}
                  <li className='flex justify-between py-1.5 w-full px-3 text-sm'>
                    <p>Channel:</p>
                    <p className='font-bold'>{details?.channel}</p>
                  </li>
                  <li className='flex justify-between py-1.5 w-full px-3 text-sm'>
                    <p>Phone Number:</p>
                    <p className='font-bold'>{details?.phone}</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
