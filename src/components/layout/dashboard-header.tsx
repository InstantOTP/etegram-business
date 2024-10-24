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
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import Logo from '../common/logo';
import { Sheet, SheetContent } from '../ui/sheet';
import { sidebarLinks } from '@/lib/static-data';
import Logout from '../common/buttons/logout';
import SearchTransactions from '../common/search-transactions';
import { Icons } from '../icons';
// import SwitchBusiness from '../modals/switch-business';
import SwitchProject from '../modals/switch-project';
import { Switch } from '../ui/switch';
import { useToast } from '../ui/use-toast';
import { ChevronRight } from 'lucide-react';
import { selectProject } from '@/app/apis/actions/project';
import Cookies from 'js-cookie';
import { toggleLive } from '@/app/apis/actions/business';

export interface User {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  kycApprovalStatus: 'pending' | 'verified';
  status: 'pending' | 'active';
  business: any[];
  createdAt: string;
  updatedAt: string;
  id: string;
}
export const DashboardHeader = ({
  user,
  business,
  businesses,
  projects,
  isLive,
}: {
  user: User;
  business: any;
  businesses: { business: bussinessType }[];
  projects: any;
  isLive: string;
}) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { toast } = useToast();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [isLive, setIsLive] = useState<'yes' | 'no'>('no');
  const [switchBusiness, setSwitchBusiness] = useState(false);
  // const isLive = Cookies.get('isLive') ?? 'no';

  // console.log(isLive);
  // const Check = business?.kycApprovalStatus === 'pending' ? Link : div;

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
            <div className='flex flex-col justify-between h-full'>
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
                  {sidebarLinks.map((link, index) => {
                    return (
                      <li
                        key={index}
                        className=''
                      >
                        <span className='uppercase font-semibold text-sm pl-5'>
                          {link.heading}
                        </span>
                        <ul className='space-y-4'>
                          {link.links.map((item, index) => {
                            const { icon: Icon } = item;

                            return (
                              <li
                                key={index}
                                className={cn(
                                  'relative before:w-1.5 before:rounded-r-sm before:h-5 before:absolute before:top-0 before:left-0 before:bg-transparent',
                                  {
                                    'before:bg-primary': pathname === item.path,
                                  }
                                )}
                              >
                                <Link
                                  href={item.path}
                                  onClick={() => setIsNavOpen(false)}
                                  className='transition-colors  flex space-x-4 items-center mt-2.5 text-sm pl-5'
                                >
                                  <Icon
                                    className={cn('dashboard-icon', {
                                      active: pathname === item.path,
                                    })}
                                  />
                                  <span
                                    className={cn(
                                      'text-[#909090] font-medium',
                                      {
                                        'text-primary': pathname === item.path,
                                      }
                                    )}
                                  >
                                    {item.label}
                                  </span>
                                  {item?.soon && link.heading === 'Home' && (
                                    <span
                                      className={cn(
                                        'text-xs bg-accent px-1.5 py-1 rounded-[1rem] hidden',
                                        {
                                          'bg-[#FEF3F2] text-[#F0142F] inline-block':
                                            user?.kycApprovalStatus ===
                                              'pending' ||
                                            business?.kycApprovalStatus ===
                                              'pending',
                                          'bg-green-100 text-green-400 inline-block':
                                            business?.kycApprovalStatus ===
                                              'verified' &&
                                            user?.kycApprovalStatus ===
                                              'verified',
                                        }
                                      )}
                                    >
                                      {business?.kycApprovalStatus ===
                                        'pending' || user?.status === 'pending'
                                        ? 'Not verified'
                                        : 'Verified'}
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
              <div className='px-5  bg-white z-10 py-3 w-full border-y self-end'>
                <DropdownMenu
                  open={switchBusiness}
                  onOpenChange={setSwitchBusiness}
                >
                  <DropdownMenuTrigger className='flex w-full items-center justify-between'>
                    <Icons.arrowsCircle />
                    <span>Switch Project</span>
                    <ChevronRight />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className='w-[14.5rem] rounded-[20px] p-0 bg-accent'
                    align='end'
                    forceMount
                  >
                    <DropdownMenuLabel className='font-normal text-[#001943] text-sm px-1.5 py-3'>
                      Your Projects
                    </DropdownMenuLabel>
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuGroup className='w-full bg-white pb-2'>
                      {/* <ul className='divide-y'>
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
              </ul> */}
                      <ul className='divide-y'>
                        {projects?.data?.length > 0 &&
                          projects?.data?.map((item: any, key: number) => (
                            <li key={key}>
                              <button
                                className='text-xs w-full hover:bg-accent py-2.5 inline-flex items-center justify-between px-2'
                                onClick={() => selectProject(item?.id)}
                              >
                                <span>{item.name}</span>
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

        {/* <div className='flex items-center space-x-2 bg-[#f5f9ff] p-2 rounded-md'>
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
        </div> */}
        <div className='flex items-center space-x-2 bg-[#f5f9ff] p-2 rounded-md'>
          <Switch
            className='data-[state=checked]:bg-green-500'
            disabled={!business}
            checked={isLive === 'yes'}
            onCheckedChange={() => {
              if (business?.kycApprovalStatus === 'pending') {
                toast({
                  description: 'Complete business compliance to go Live',
                  variant: 'destructive',
                });
                push('/compliance/business-compliance');
                return;
              } else {
                // console.log('it ran');
                toggleLive();
              }
            }}
          />
          <span className='text-sm font-bold'>
            {isLive === 'yes' ? 'Live' : 'Test'}
          </span>
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
              <Avatar className='h-9 w-9 mr-1.5'>
                <AvatarImage
                  src={business?.logo ? business.logo : '/default-profile.png'}
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
            className='w-80 rounded-[20px] py-4'
            align='end'
            forceMount
          >
            <DropdownMenuLabel className='font-normal'>
              <div className='flex px-3'>
                <Avatar className='h-9 w-9 mr-1.5'>
                  <AvatarImage
                    src='/default-profile.png'
                    alt={`@${user?.firstname}`}
                    className='object-cover'
                  />
                  <AvatarFallback>
                    {user
                      ? findUpper(`${user.firstname} ${user.lastname}`)
                      : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {user?.firstname} {user?.lastname}
                  </p>
                  <p className='text-xs leading-none text-muted-foreground'>
                    {user?.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <SwitchBusiness
                  currentBusiness={business}
                  businesses={businesses}
                />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <SwitchProject projects={projects} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup> */}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href={'/settings'}
                  className='px-4 text-muted-foreground'
                >
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className='px-4'
              >
                <Logout />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
