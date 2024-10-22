import { DashboardHeader, User } from '@/components/layout/dashboard-header';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { getUser } from '../apis/data/user';
import { getCurrentBusiness, getUserBusinesses } from '../apis/data/business';
import { getBusinessProjects } from '../apis/data/projects';
import VerifiedLayout from './verified-layout';

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

  // console.log(user);

  // console.log(projects);
  return (
    <VerifiedLayout user={user}>
      <section className='bg-[#ecf4fb] flex w-full min-h-svh overflow-y-hidden max-w-[90rem] mx-auto'>
        <DashboardSidebar
          user={user}
          businesses={businesses}
          projects={projects}
          currentBusiness={business}
        />
        <section className='relative flex-1 w-full'>
          <DashboardHeader
            user={user}
            business={business}
            businesses={businesses}
            projects={projects}
          />
          <main className='w-full lg:h-[84.1svh] overflow-y-auto pt-28 px-5 pb-5 lg:py-5 lg:pl-12 lg:pr-[70px]'>
            {children}
          </main>
        </section>
      </section>
    </VerifiedLayout>
  );
}
