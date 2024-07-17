import { DashboardHeader } from '@/components/layout/dashboard-header';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { fakeUsers } from '@/lib/static-data';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='bg-[#ecf4fb] flex w-full min-h-svh overflow-y-hidden'>
      <DashboardSidebar />
      <section className='relative flex-1 w-full'>
        <DashboardHeader user={fakeUsers} />
        <main className='w-full lg:h-[84.1svh] overflow-y-auto pt-28 px-5 pb-5 lg:p-5'>
          {children}
        </main>
      </section>
    </section>
  );
}
