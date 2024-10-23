import { getBusinessKYC } from '@/app/apis/data/business';
import BusinessComplianceForm from '@/components/forms/business-compliance';

export default async function BusinessCompliancePage() {
  const data = await getBusinessKYC();
  // console.log(data);
  return (
    <section>
      <div className='max-w-2xl mx-auto rounded-3xl'>
        <BusinessComplianceForm data={data} />
      </div>
    </section>
  );
}
