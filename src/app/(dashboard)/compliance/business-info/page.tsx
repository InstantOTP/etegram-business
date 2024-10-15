import { getCurrentBusiness } from '@/app/apis/data/business';
import { getIndustries } from '@/app/apis/data/use-cases';
import BusinessInfoForm from '@/components/forms/business-info';

export default async function BusinessInfoPage() {
  const business = await getCurrentBusiness();
  const industries = await getIndustries();
  console.log(industries);
  return (
    <section>
      <div className='max-w-2xl mx-auto rounded-3xl'>
        <BusinessInfoForm
          business={business}
          industries={industries}
        />
      </div>
    </section>
  );
}
