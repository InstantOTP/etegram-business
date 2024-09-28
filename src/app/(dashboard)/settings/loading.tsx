import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Loading() {
  return (
    <div className='w-full min-h-[70svh] grid place-items-center'>
      <LucideLoader2 className={cn('animate-spin mr-1 w-[50px] h-[50px]')} />
    </div>
  );
}
