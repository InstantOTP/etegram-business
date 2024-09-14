import PayoutForm from '@/components/forms/payout';

export default async function PaymentSection() {
  //   console.log(user);
  return (
    <section className='border border-primary rounded-[30px] w-full max-w-2xl px-7 py-6 my-20 mx-auto'>
      <h2 className='text-lg mb-1.5'>Payout Information</h2>

      <p className='mb-10 text-sm'>
        This is your payout account. All your payments are settled to this
        account immediately.
      </p>

      <PayoutForm />
    </section>
  );
}
