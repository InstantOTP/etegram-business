'use client';

import { Search } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';

export default function SearchComp({
  name,
  placeholder,
}: {
  placeholder: string;
  name: string;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = useDebouncedCallback((text: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (text) {
      params.set(name, text);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className='hidden md:block relative lg:w-full'>
      <label
        htmlFor='search'
        className='sr-only'
      >
        Search {name ? name : ''}
      </label>
      <Input
        className='peer block w-full rounded-md py-[9px] pl-10 text-sm'
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get(name)?.toString()}
      />
      <Search className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
    </div>
  );
}
