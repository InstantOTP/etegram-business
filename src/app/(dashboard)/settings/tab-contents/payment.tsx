import { getBanks, getProjectBanks } from '@/app/apis/data/payouts';
import PayoutForm from '@/components/forms/payout';

export default async function PaymentSection() {
  const banksList = await getBanks();
  const projectBank = await getProjectBanks();
  // console.log(banksList);
  console.log(projectBank);
  return (
    <section className='border border-primary rounded-[30px] w-full max-w-2xl px-7 py-6 my-20 mx-auto'>
      <h2 className='text-lg mb-1.5'>Payout Information</h2>

      <p className='mb-10 text-sm'>
        This is your payout account. All your payments are settled to this
        account immediately.
      </p>

      <PayoutForm
        banks={banksList}
        projectBank={projectBank}
      />
    </section>
  );
}
