import { buttonVariants } from '@/components/ui/button';

export default function MaintenancePage() {
  return (
    <main className='w-full grid place-items-center h-svh container'>
      <div className='max-w-[811px] flex justify-center  items-center bg-[#ecf4fb] rounded-[20px] py-20'>
        <div className='space-y-12 px-8'>
          <div className='space-y-6'>
            <div className='text-center text-[#001943] text-lg lg:text-[35px] font-semibold font-eudoxusSans '>
              Sorry, we&apos;re down for maintance
            </div>
            <div>
              <div className='text-center font-eudoxusSans text-sm lg:text-base'>
                We expect to be back in couple of hours. Thanks for your
                patience.
              </div>
            </div>
          </div>
          <a
            href='https://www.etegram.com/'
            className={buttonVariants({ className: 'w-full' })}
          >
            OK
          </a>
        </div>
      </div>
    </main>
  );
}
