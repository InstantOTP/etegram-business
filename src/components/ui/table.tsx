'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, CircleEllipsis, Ellipsis, Plus } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn, formatDateWithTime, formatter } from '@/lib/utils';
import Pagination from './pagination';
import Image from 'next/image';
import React from 'react';

export default function DataTable({
  title,
  description,
  headers,
  data,
  dataKeys,
  totalPages,
  action: Action,
  setIsOpen,
  setDetails,
  hideViewAll,
  showPagination = false,
}: {
  title: string;
  description?: string;
  headers: string[];
  data: any[];
  dataKeys: string[];
  totalPages: number;
  hideViewAll?: boolean;
  showPagination?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setDetails?: React.Dispatch<React.SetStateAction<any>>;
  action?: React.ComponentType<{
    item: { item: any };
  }>;
}) {
  return (
    <div className='bg-background p-5 rounded-3xl'>
      <div className='flex justify-between items-center'>
        <h3 className='text-foreground font-semibold mb-1'>{title}</h3>

        {!hideViewAll && data?.length !== 0 && (
          <div className='flex justify-end mt-3 items-center'>
            <Link
              href={'/dashboard/transactions?type=receiveSMS'}
              className='text-sm text-primary font-semibold'
            >
              See all
            </Link>
          </div>
        )}
      </div>
      {/* <p className='text-foreground/60 text-base mb-2'>{description}</p> */}

      {/* <div className='flex gap-x-4 mt-4 text-base'>
        <p>Sort by:</p>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex gap-x-1 items-center'>
            Date
            <span>
              <ChevronDown />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Date</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}

      <div className='grid w-full grid-cols-1 overflow-auto whitespace-normal styled-scrollbar'>
        <table className='w-full mt-1 text-left rtl:text-right'>
          <thead className='border-y border-gray-300'>
            <tr>
              <th className='text-left font-semibold text-sm py-3 px-2.5'>
                S/N
              </th>
              {headers.map((item, index) => (
                <th
                  key={index}
                  className='text-left font-semibold text-sm py-2 px-4'
                >
                  {item}
                </th>
              ))}
              {Action && (
                <th className='py-3 px-2.5'>
                  <Ellipsis className='w-4 h-4' />
                </th>
              )}
            </tr>
          </thead>

          {data?.length > 0 ? (
            <tbody className='divide-y'>
              {data.map((item, idx) => (
                <tr
                  key={idx}
                  className='hover:bg-accent cursor-pointer'
                  onClick={() => {
                    if (setIsOpen && setDetails) {
                      setIsOpen(true);
                      setDetails(item);
                    }
                  }}
                >
                  <td
                    key={idx}
                    className='text-sm py-3 px-2.5'
                  >
                    {idx + 1}
                  </td>
                  {dataKeys.map((key, idx) => {
                    if (key === 'amount') {
                      return (
                        <td
                          key={idx}
                          className='py-3 px-4'
                        >
                          <span className='text-sm font-inter font-bold'>
                            {formatter('NGN', 0).format(item?.amount)}
                          </span>
                        </td>
                      );
                    }

                    if (key === 'phoneNumber') {
                      return (
                        <td
                          key={idx}
                          className='text-sm py-3 px-4'
                        >
                          {item?.phoneNumber
                            ? ` +${item.phoneNumber}`
                            : 'No Number'}
                        </td>
                      );
                    }

                    if (key === 'createdAt') {
                      return (
                        <td
                          key={idx}
                          className='text-sm py-3 px-4 text-nowrap'
                        >
                          <span>{formatDateWithTime(item?.createdAt)}</span>
                        </td>
                      );
                    }

                    if (key === 'status') {
                      return (
                        <td
                          key={idx}
                          className='text-sm py-3 px-4'
                        >
                          <span
                            className={cn(
                              'block p-0.5 rounded-2xl capitalize',
                              {
                                'text-green-500': item.status === 'successful',
                                'text-yellow-300': item.status === 'pending',
                                'text-rose-400': item.status === 'failed',
                              }
                            )}
                          >
                            {item.status}
                          </span>
                        </td>
                      );
                    }
                    return (
                      <td
                        key={idx}
                        className='text-sm py-3 px-4 '
                      >
                        {item[key]}
                      </td>
                    );
                  })}

                  {Action && (
                    <td className='py-3 px-2.5'>
                      <Action item={item} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        {totalPages > 0 && !showPagination && (
          <div className='flex justify-end w-full mt-5'>
            <Pagination totalPages={totalPages} />
          </div>
        )}
      </div>

      {/* MOBILE Table */}

      {data?.length === 0 && (
        <div className='w-full h-[200px] flex flex-col gap-y-9 justify-center items-center mt-3'>
          {/* <div>
            <Image
              src={'/empty-table.svg'}
              alt='empty table'
              width={80}
              height={80}
            />
          </div> */}

          <p className='opacity-65'>No data to show </p>
        </div>
      )}
    </div>
  );
}
