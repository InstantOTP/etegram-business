import { buttonVariants } from '@/components/ui/button';

export default function MaintenancePage() {
  return (
    <main className='w-full grid place-items-center h-svh'>
      <div className='w-[811px] flex justify-center  items-center bg-[#ecf4fb] rounded-[20px] py-20'>
        <div className='space-y-12'>
          <div className='space-y-6'>
            <div className='text-center text-[#001943] text-[35px] font-semibold '>
              Sorry, we&apos;re down for maintance in
            </div>
            <div>
              <div className='text-center'>
                We expect to be back in couple of hours. Thanks for your
                patience.
              </div>
            </div>
          </div>
          <div className='w-full max-w-[560px] h-[50px] px-8 py-4 bg-[#001943] rounded-[10px] justify-center items-center gap-[15px] inline-flex'>
            <a
              href='https://www.etegram.com/'
              className={buttonVariants()}
            >
              OK
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
