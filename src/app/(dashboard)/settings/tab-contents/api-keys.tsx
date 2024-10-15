import { getAPIKeys } from '@/app/apis/data/api-keys';
import { getCurrentBusiness } from '@/app/apis/data/business';
import { getSingleBusinessProject } from '@/app/apis/data/projects';
import GenerateKeyButton from '@/components/common/buttons/generate-apiKey';
import { TestApiKeysForm, LiveApiKeysForm } from '@/components/forms/api-keys';

export default async function APIKeysSection() {
  const data = await getAPIKeys();
  const project = await getSingleBusinessProject();
  const business = await getCurrentBusiness();
  // console.log(data);
  return (
    <>
      <section className='border border-primary rounded-[30px] w-full max-w-2xl px-7 py-6 my-20 mx-auto'>
        <div className='flex w-full justify-between items-start gap-x-4'>
          <h2 className='text-lg '>API Configuration - Test Mode</h2>
          <GenerateKeyButton type='test' />
        </div>

        <p className='mb-10 text-xs text-destructive'>
          The API key below is for test/development purposes
        </p>

        <TestApiKeysForm
          testPublic={data?.testApiKey}
          projectUrls={project}
        />
      </section>

      {/* LIVE KEYS */}
      {business?.kycApprovalStatus === 'verified' && (
        <section className='border border-primary rounded-[30px] w-full max-w-2xl px-7 py-6 my-20 mx-auto'>
          <div className='flex w-full justify-between items-start gap-x-4'>
            <h2 className='text-lg '>API Configuration - Live Mode</h2>
            <GenerateKeyButton type='live' />
          </div>

          <p className='mb-10 text-xs text-destructive'>
            The API key below is for live purposes
          </p>

          <LiveApiKeysForm
            livePublic={data?.liveApiKey}
            projectUrls={project}
          />
        </section>
      )}
    </>
  );
}
