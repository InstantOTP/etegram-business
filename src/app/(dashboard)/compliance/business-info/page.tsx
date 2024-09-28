import { getCurrentBusiness } from '@/app/apis/data/business';
import BusinessInfoForm from '@/components/forms/business-info';

export default async function BusinessInfoPage() {
  const business = await getCurrentBusiness();
  return (
    <section>
      <div className='max-w-2xl mx-auto rounded-3xl'>
        <BusinessInfoForm business={business} />
      </div>
    </section>
  );
}
