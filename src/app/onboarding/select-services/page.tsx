import { getUseCases } from '@/app/apis/data/use-cases';
import ServicesList from './components/service';

export default async function SelectBusiness() {
  const services = await getUseCases();
  return (
    <main className='grid place-content-center min-h-[60svh] w-full max-w-[93%] mx-auto'>
      <div className='space-y-5 w-full mx-auto bg-background mt-12 rounded-3xl p-5 lg:p-10'>
        <p className='text-lg font-medium text-center'>
          What will you like to do with Etegram today?
        </p>

        <ServicesList services={services} />
      </div>
    </main>
  );
}
