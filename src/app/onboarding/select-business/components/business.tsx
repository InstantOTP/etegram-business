'use client';
import { selectBusiness } from '@/app/apis/actions/business';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { findUpper } from '@/lib/utils';

export default function BusinessList({ businesses }: { businesses: any[] }) {
  return (
    <ul className='flex flex-col space-y-3 w-full'>
      {businesses?.map((item, index) => (
        <li
          key={index}
          className='w-full'
        >
          <button
            onClick={() => selectBusiness(item?.business?.id)}
            className='border border-border flex w-full py-4 rounded-[5px] p-4 hover:bg-accent/50 bg-transparent transition-colors'
          >
            <Avatar className='h-[60px] w-[60px] mr-1.5'>
              <AvatarImage
                src='/profile-pic.jpg'
                alt={`business-logo`}
                className='object-cover'
              />
              <AvatarFallback className='font-bold text-2xl'>
                {findUpper(`${item?.business?.name}`)}
              </AvatarFallback>
            </Avatar>

            <div>
              <h6 className='text-left font-medium'>{item?.business?.name}</h6>
              <p>Business ID: 232323</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
