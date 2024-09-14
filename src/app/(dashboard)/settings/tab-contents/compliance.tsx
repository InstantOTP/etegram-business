import { getCurrentBusiness } from '@/app/apis/data/business';
import { getUser } from '@/app/apis/data/user';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default async function ComplianceSection() {
  const business = await getCurrentBusiness();
  const user = await getUser();
  //   console.log(user);
  //   console.log(business);
  return (
    <section className='border border-primary rounded-[30px] w-full max-w-2xl mx-auto px-7 py-6 mb-14'>
      <h2 className='text-lg mb-1.5'>Verification Information</h2>

      <p className='mb-10 text-sm'>
        This is what we know about you & your business. Please do update it if
        there has been any changes.
      </p>

      <div className='space-y-2'>
        <p className='text-sm'>Business Owner Documents</p>
        <div className='flex items-center space-x-2.5'>
          <Icons.customers className='text-primary' />
          <p>
            {user?.firstname} {user?.lastname}
          </p>
          <span className='bg-green-100 text-green-500 rounded-sm text-[10px] py-0.5 px-2.5 capitalize'>
            {user?.kycApprovalStatus}
          </span>
        </div>
        <Link
          href={'/compliance/user-compliance'}
          className={buttonVariants({ size: 'lg' })}
        >
          Edit
        </Link>
      </div>

      {business?.type === 'registered' && (
        <div className='space-y-2 mt-14'>
          <p className='text-sm'>Business Verification Documents</p>
          <div className='flex items-center space-x-2.5'>
            <Icons.customers className='text-primary' />
            <p>{business?.name}</p>
            <span className='bg-green-100 text-green-500 rounded-sm text-[10px] py-0.5 px-2.5 capitalize'>
              {business?.kycApprovalStatus}
            </span>
          </div>
          <Link
            href={'/compliance'}
            className={buttonVariants({ size: 'lg' })}
          >
            Edit
          </Link>
        </div>
      )}
    </section>
  );
}
