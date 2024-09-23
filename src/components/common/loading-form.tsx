import { LucideLoader2 } from 'lucide-react';

export default function LoadingForm() {
  return (
    <div className='max-w-[30rem] h-[30svh] bg-background rounded-3xl grid place-items-center'>
      <LucideLoader2 className={'animate-spin mr-1 w-[22px] h-[22px] hidden'} />
    </div>
  );
}
