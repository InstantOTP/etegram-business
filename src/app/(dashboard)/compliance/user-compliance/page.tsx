import { getUserKYC } from '@/app/apis/data/user';
import UserComplianceForm from '@/components/forms/user-compliance';

export default async function UserCompliancePage() {
  const data = await getUserKYC();
  console.log(data);
  return (
    <section>
      <div className='max-w-2xl mx-auto rounded-3xl'>
        <UserComplianceForm data={data} />
      </div>
    </section>
  );
}
