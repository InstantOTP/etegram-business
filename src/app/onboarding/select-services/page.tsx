import { getUseCases } from '@/app/apis/data/use-cases';
import ServicesList from './components/service';

export default async function SelectBusiness() {
  const services = await getUseCases();
  console.log(services);
  return (
    <main className='grid place-content-center min-h-[60svh] w-full'>
      <div className='space-y-5 w-full  mx-auto'>
        <p className='text-lg font-medium text-center'>
          What will you like to do with Etegram today?
        </p>

        <ServicesList services={services} />
      </div>
    </main>
  );
}
