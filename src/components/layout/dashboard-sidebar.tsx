'use client';

import { sidebarLinks } from '@/lib/static-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../common/logo';

const DashboardSidebar = () => {
  const pathname = usePathname();
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
    </aside>
  );
};

export { DashboardSidebar };
