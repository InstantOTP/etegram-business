import AccountSettingsForm from '@/components/forms/account';

export default async function AccountSection() {
  return (
    <section className='border border-primary rounded-[30px] w-full max-w-md px-7 py-6 my-20 mx-auto'>
      <AccountSettingsForm />
    </section>
  );
}
