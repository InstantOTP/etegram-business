import { getAPIKeys } from '@/app/apis/data/api-keys';
import ApiKeysForm from '@/components/forms/api-keys';
import GenerateKeyButton from '@/components/common/buttons/generate-apiKey';
export default async function APIKeysSection() {
  const data = await getAPIKeys();
  // console.log(data);
  return (
    <section className='border border-primary rounded-[30px] w-full max-w-2xl px-7 py-6 my-20 mx-auto'>
      <div className='flex w-full justify-between items-start gap-x-4'>
        <h2 className='text-lg '>API Configuration - Test Mode</h2>
        <GenerateKeyButton />
      </div>

      <p className='mb-10 text-xs text-destructive'>
        The API key below is for test/development purposes
      </p>

      <ApiKeysForm testPublic={data?.testApiKey} />
    </section>
  );
}
