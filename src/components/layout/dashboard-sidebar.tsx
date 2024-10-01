'use client';

import { selectBusiness } from '@/app/apis/actions/business';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sidebarLinks } from '@/lib/static-data';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from '../common/logo';
import { Icons } from '../icons';
import { User } from './dashboard-header';

const DashboardSidebar = ({
  user,
  businesses,
}: {
  user: User;
  businesses: { business: bussinessType }[];
}) => {
  const pathname = usePathname();
  const [switchBusiness, setSwitchBusiness] = useState(false);
  // console.log(user);
  return (
    <aside className='relative hidden lg:flex flex-col justify-between w-full max-w-[15.625rem] h-svh shadow-md bg-background overflow-y-auto  border-r '>
      <div className='px-5 bg-white pt-3'>
        <Logo />
      </div>

      <ul className='grid gap-y-8 font-eudoxusSans h-[70svh] styled-scrollbar overflow-y-auto pb-4'>
        {sidebarLinks.map((item, index) => {
          return (
            <li
              key={index}
              className=''
            >
              <span className='uppercase font-semibold text-sm pl-5'>
                {item.heading}
              </span>
              <ul className='space-y-4'>
                {item.links.map((link, index) => {
                  const { icon: Icon } = link;

                  return (
                    <li
                      key={index}
                      className={cn(
                        'relative before:w-1.5 before:rounded-r-sm before:h-5 before:absolute before:top-0 before:left-0 before:bg-transparent',
                        { 'before:bg-primary': pathname === link.path }
                      )}
                    >
                      <Link
                        href={link.path}
                        className='transition-colors flex space-x-4 items-center mt-2.5 text-sm pl-5'
                      >
                        <Icon
                          className={cn('dashboard-icon', {
                            active: pathname === link.path,
                          })}
                        />
                        <span
                          className={cn('text-[#909090] font-medium', {
                            'text-primary': pathname === link.path,
                          })}
                        >
                          {link.label}
                        </span>
                        {link?.soon && item.heading !== 'Home' && (
                          <span className='text-[10px] font-semibold bg-accent px-0.5 rounded-md'>
                            Coming soon
                          </span>
                        )}
                        {link?.soon && item.heading === 'Home' && (
                          <span
                            className={cn(
                              'text-[10px] font-semibold bg-accent px-0.5 rounded-md',
                              {
                                'bg-destructive text-destructive-foreground':
                                  user?.kycApprovalStatus === 'pending',
                              }
                            )}
                          >
                            Not verified
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>

      <div className='px-5  bg-white z-10 py-3 w-full border-y'>
        <DropdownMenu
          open={switchBusiness}
          onOpenChange={setSwitchBusiness}
        >
          <DropdownMenuTrigger className='flex w-full items-center justify-between'>
            <Icons.arrowsCircle />
            <span>Switch Business</span>
            <ChevronRight />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[14.5rem] rounded-[20px] p-0 bg-accent'
            align='end'
            forceMount
          >
            <DropdownMenuLabel className='font-normal text-[#001943] text-sm px-1.5 py-3'>
              Your Business
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuGroup className='w-full bg-white pb-2'>
              <ul className='divide-y'>
                {businesses?.length > 0 &&
                  businesses?.map((item, key) => (
                    <li key={key}>
                      <button
                        className='text-xs w-full hover:bg-accent py-2.5 inline-flex items-center justify-between px-2'
                        onClick={() => selectBusiness(item?.business?.id)}
                      >
                        <span>{item.business.name}</span>
                        <ChevronRight className='w-4 h-4' />
                      </button>
                    </li>
                  ))}
              </ul>
              {/* <DropdownMenuItem asChild>
                <SwitchBusiness
                  currentBusiness={business}
                  businesses={businesses}
                />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <SwitchProject projects={projects} />
              </DropdownMenuItem> */}
              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export { DashboardSidebar };
