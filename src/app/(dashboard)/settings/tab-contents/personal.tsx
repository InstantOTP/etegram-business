import { getUser } from '@/app/apis/data/user';
import PersonalInfoForm from '@/components/forms/personal-info';

export default async function PersonalSection() {
  const user = await getUser();
  //   console.log(user);
  return (
    <section className='border border-primary rounded-[30px] w-full max-w-2xl px-7 py-6 mx-auto'>
      <h2 className='text-lg mb-1.5'>Personal Information</h2>

      <p className='mb-10 text-sm'>
        This is what we know about you. Please do update it if there has been
        any changes.
      </p>

      <PersonalInfoForm user={user} />
    </section>
  );
}
