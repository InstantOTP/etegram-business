import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo() {
  return (
    <div className='relative w-[130px] h-[80px] flex-shrink-0'>
      <Image
        src='/logo/etegram-business-logo.svg'
        alt='etegram business logo'
        fill
      />
    </div>
  );
}
