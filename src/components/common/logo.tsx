import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ white }: { white?: boolean }) {
  return (
    <div className='relative w-[130px] h-[80px] flex-shrink-0'>
      <Image
        src={
          white
            ? '/logo/etegram-business-logo-white.png'
            : '/logo/etegram-business-logo.svg'
        }
        alt='etegram business logo'
        fill
        className='object-contain'
      />
    </div>
  );
}
