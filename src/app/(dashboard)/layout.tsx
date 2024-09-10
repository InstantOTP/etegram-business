import { DashboardHeader, User } from '@/components/layout/dashboard-header';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { getUser } from '../apis/data/user';
import { getCurrentBusiness, getUserBusinesses } from '../apis/data/business';
import { getBusinessProjects } from '../apis/data/projects';

export const dynamic = 'force-dynamic';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, business, businesses, projects] = await Promise.all([
    getUser(),
    getCurrentBusiness(),
    getUserBusinesses(),
    getBusinessProjects(),
  ]);
  // console.log(business);
  // console.log(projects);
  return (
    <section className='bg-[#ecf4fb] flex w-full min-h-svh overflow-y-hidden'>
      <DashboardSidebar user={user} />
      <section className='relative flex-1 w-full'>
        <DashboardHeader
          user={user}
          business={business}
          businesses={businesses}
          projects={projects}
        />
        <main className='w-full lg:h-[84.1svh] overflow-y-auto pt-28 px-5 pb-5 lg:p-5'>
          {children}
        </main>
      </section>
    </section>
  );
}
