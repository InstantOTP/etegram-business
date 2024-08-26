'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, findUpper } from '@/lib/utils';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, useState } from 'react';
import Logo from '../common/logo';
import { Sheet, SheetContent } from '../ui/sheet';
// import { Notification } from 'iconsax-react';
// import { ModeToggle } from '../ui/toggle-theme';
// import { Setting2, Login } from 'iconsax-react';
import { logout } from '@/app/apis/actions/auth';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '../ui/use-toast';
// import Logout from '../common/buttons/logout';
import { sidebarLinks } from '@/lib/static-data';
import SearchTransactions from '../common/search-transactions';
import { Icons } from '../icons';
import Logout from '../common/buttons/logout';
// import { SwitchProvider } from '../switch-provider';

// export interface User {
//   userID: string;
//   username: string;
//   email: string;
//   isVerified: boolean;
//   phone: string;
//   status: string;
//   totalTransactions: number;
//   wallet: number;
//   pushedNumbers: number;
//   rentedNumbers: number;
//   referralCode: string;
//   isPINset: string;
//   hasBusiness: boolean;
//   isBusinessVerified: boolean;
// }
export interface User {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  kycApprovalStatus: 'pending' | 'approved';
  status: 'pending' | 'active';
  business: any[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

const PageTitle = ({ username }: { username: string }) => {
  return (
    <div className='flex space-x-2 items-center'>
      <h2 className='text-gradient font-semibold font-manrope text-xl lg:text-2xl'>
        Hi, {username || 'User'}
      </h2>
      <div>
        <Image
          src={'/hand.png'}
          alt='welcome'
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      className='pl-3 text-destructive'
      disabled={pending}
    >
      Log out
    </button>
  );
}

export const DashboardHeader = ({
  user,
  business,
}: {
  user: User;
  business: bussinessType;
}) => {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // const pageTitle = useMemo(() => {
  //   return sidebarLinks.find((item) => item.path === pathname)?.label;
  // }, [pathname, sidebarLinks]);

  return (
    <header className='bg-background p-5 flex w-full fixed lg:sticky top-0 left-0 border-b justify-between items-center gap-x-3 z-50'>
      <div className='relative z-10 bg-transparent block lg:hidden'>
        <div className='flex items-center gap-x-1'>
          <button
            className='relative h-8 w-8 bg-transparent focus:outline-none z-50'
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className='sr-only'>Open main menu</span>
            <div className='flex items-center justify-center absolute w-full'>
              <span
                aria-hidden='true'
                className={`absolute mb-2 block h-0.5 w-5 transform rounded bg-primary transition duration-500 ease-in-out ${
                  isNavOpen && 'translate-y-1 -rotate-45'
                }`}
              />
              <span
                aria-hidden='true'
                className={`absolute block h-0.5 w-5 transform rounded bg-primary transition duration-500 ease-in-out ${
                  isNavOpen && 'opacity-0 '
                }`}
              />
              <span
                aria-hidden='true'
                className={`absolute mt-2 block h-0.5 w-5 transform rounded bg-primary transition duration-500 ease-in-out ${
                  isNavOpen && '-translate-y-1 rotate-45'
                } `}
              />
            </div>
          </button>
          <div className='block lg:hidden'>
            {/* <PageTitle username={user?.username} /> */}
          </div>
        </div>
        {/* MObile sidebar */}
        <Sheet
          open={isNavOpen}
          onOpenChange={setIsNavOpen}
        >
          {/* <SheetOverlay className='md:hidden' /> */}
          <SheetContent
            side={'left'}
            className='lg:hidden bg-background px-0 pt-0 pb-0 max-w-[250px]'
          >
            {/* <CustomSheetClose /> */}
            <div className='flex flex-col gap-y-4 h-full overflow-y-auto'>
              <div className='px-3 pb-4 border-y border-border sticky top-0 left-0 bg-background z-10'>
                <div className='sticky top-0 left-0 z-10 bg-white flex justify-between items-center gap-x-4'>
                  <Logo />
                  <button
                    onClick={() => setIsNavOpen(false)}
                    className='w-5 h-5 bg-[#F4F4F4] rounded-full grid place-items-center '
                  >
                    <X className='w-4 h-4 font-bold text-black' />
                  </button>
                </div>
              </div>
              <ul className='mb-6 grid gap-y-8 font-eudoxusSans '>
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
                        {item.links.map((item, index) => {
                          const { icon: Icon } = item;

                          return (
                            <li
                              key={index}
                              className={cn(
                                'relative before:w-1.5 before:rounded-r-sm before:h-5 before:absolute before:top-0 before:left-0 before:bg-transparent',
                                { 'before:bg-primary': pathname === item.path }
                              )}
                            >
                              <Link
                                href={item.path}
                                className='transition-colors  flex space-x-4 items-center mt-2.5 text-sm pl-5'
                              >
                                <Icon
                                  className={cn('dashboard-icon', {
                                    active: pathname === item.path,
                                  })}
                                />
                                <span
                                  className={cn('text-[#909090] font-medium', {
                                    'text-primary': pathname === item.path,
                                  })}
                                >
                                  {item.label}
                                </span>
                                {item?.soon && (
                                  <span className='text-[10px] font-semibold bg-accent px-0.5 rounded-md'>
                                    Coming soon
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className='hidden lg:block'>
        <h2 className='text-gradient font-semibold text-lg'>Dashboard</h2>
      </div>

      <div className='flex gap-x-3 items-center'>
        <Suspense>
          <SearchTransactions placeholder='Search for transaction or customer' />
        </Suspense>

        <div className='flex items-center space-x-2 bg-[#f5f9ff] p-2 rounded-md'>
          <p
            className={cn('text-sm text-[#ffc001] capitalize', {
              'text-green-500': business?.status === 'active',
            })}
          >
            {business?.status}
          </p>
          <div
            aria-hidden
            className={cn('w-2.5 h-2.5 bg-[#ffc001] rounded-full', {
              'text-green-500': business?.status === 'active',
            })}
          />
        </div>

        {/* <SwitchProvider /> */}
        {/* <ModeToggle /> */}
        <button className='relative bg-[#f5f9ff] rounded-md p-1.5'>
          <span className='sr-only'>Notifications</span>
          <Icons.notification />
          {/* <Notification className='w-5 h-5' /> */}
        </button>
        <DropdownMenu
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='relative h-12 p-2'
            >
              <Avatar className='h-8 w-8 mr-1.5'>
                <AvatarImage
                  src='/profile-pic.jpg'
                  alt={`@${user?.firstname}`}
                  className='object-cover'
                />
                <AvatarFallback>
                  {user ? findUpper(`${user.firstname} ${user.lastname}`) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className=''>
                <h6>{business?.name}</h6>
                <p className='text-left text-[#909090] text-[13px]'>
                  ETN123456
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-56'
            align='end'
            forceMount
          >
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {user?.firstname} {user?.lastname}
                </p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={'/dashboard/settings'}>Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
