import AccountSettingsForm from '@/components/forms/account';
import { getSingleBusinessProject } from '@/app/apis/data/projects';

export default async function AccountSection() {
  const project = await getSingleBusinessProject();
  return (
    <section className='border border-primary rounded-[30px] w-full max-w-md px-7 py-6 my-20 mx-auto'>
      <AccountSettingsForm project={project} />
    </section>
  );
}
