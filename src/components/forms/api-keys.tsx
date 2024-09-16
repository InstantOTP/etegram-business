'use client';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { RiFileCopyFill } from 'react-icons/ri';

export default function ApiKeysForm({ testPublic }: { testPublic?: string }) {
  const { toast } = useToast();
  function handleCopy(value: string | undefined) {
    if (value) {
      navigator.clipboard.writeText(value);
      toast({ description: 'Copied to clipboard' });
    }
  }
  return (
    <div className='w-full'>
      <form className='w-full space-y-6'>
        <div className='form-control'>
          <label htmlFor='testKey'>Test Public Key</label>
          <div className='flex items-center space-x-3'>
            <Input
              id='testKey'
              name='testKey'
              type='text'
              placeholder='Click on the button to generate API Key'
              defaultValue={testPublic}
              disabled
              className='disabled:opacity-100'
            />

            <Button
              type='button'
              onClick={() => handleCopy(testPublic)}
              variant={'outline'}
              className='w-full max-w-[9rem]'
            >
              <RiFileCopyFill className='w-4 h-4 text-primary' />
              <span>Copy</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
