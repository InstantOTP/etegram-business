import { getCurrentBusiness } from '@/app/apis/data/business';
import BusinessInfoForm from '@/components/forms/business-info';

export default async function BusinessSection() {
  const business = await getCurrentBusiness();
  //   console.log(business);
  return (
    <section className='border border-primary rounded-[30px] w-full max-w-2xl py-3 mx-auto'>
      <BusinessInfoForm business={business} />
    </section>
  );
}
