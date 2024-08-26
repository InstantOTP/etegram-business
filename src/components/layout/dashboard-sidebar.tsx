'use client';

import { sidebarLinks } from '@/lib/static-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../common/logo';
import { User } from './dashboard-header';

const DashboardSidebar = ({ user }: { user: User }) => {
  const pathname = usePathname();
  // console.log(user);
  return (
    <aside className='hidden lg:block w-full max-w-[15.625rem] h-svh shadow-md bg-background overflow-y-auto pb-8  border-r styled-scrollbar'>
      <div className='px-5 sticky top-0 left-0 bg-white z-10 pt-3'>
        <Logo />
      </div>

      <ul className='mt-6 grid gap-y-8 font-eudoxusSans'>
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
    </aside>
  );
};

export { DashboardSidebar };
