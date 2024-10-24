'use client';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { RiFileCopyFill } from 'react-icons/ri';
import Cookies from 'js-cookie';
import { updateProjectUrl } from '@/app/apis/actions/project';
import { useState } from 'react';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TestApiKeysForm({
  testPublic,
  projectUrls,
}: {
  testPublic?: string;
  projectUrls: { webhookUrl: { test: string }; callbackUrl: { test: string } };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const projectId = Cookies.get('projectId');
  const [webhookUrl, setWebHookUrl] = useState(
    projectUrls?.webhookUrl?.test || ''
  );
  // console.log(projectUrls);
  const [callbackUrl, setCallbackUrl] = useState(
    projectUrls?.callbackUrl?.test || ''
  );
  function handleCopy(value: string | undefined) {
    if (value) {
      navigator.clipboard.writeText(value);
      toast({ description: 'Copied to clipboard' });
    }
  }

  async function handleUpdate() {
    setIsLoading(true);
    let formdata = {
      callbackUrl,
      webhookUrl,
      type: 'test',
    };
    // console.log(formdata);
    const data = await updateProjectUrl(formdata);
    toast({
      description: data?.message,
      variant: data?.status === 'success' ? 'default' : 'destructive',
    });
    setIsLoading(false);
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
        <div className='form-control'>
          <label htmlFor='testKey'>Project ID</label>
          <div className='flex items-center space-x-3'>
            <Input
              id='testKey'
              name='testKey'
              type='text'
              placeholder='projectID'
              defaultValue={projectId}
              disabled
              className='disabled:opacity-100'
            />

            <Button
              type='button'
              onClick={() => handleCopy(projectId)}
              variant={'outline'}
              className='w-full max-w-[9rem]'
            >
              <RiFileCopyFill className='w-4 h-4 text-primary' />
              <span>Copy</span>
            </Button>
          </div>
        </div>
        <div className='form-control'>
          <label htmlFor='callbackUrl'> Test Callback URL</label>
          <Input
            id='callbackUrl'
            name='callbackUrl'
            type='text'
            placeholder='eg: http://testurl/callback'
            className='disabled:opacity-100'
            value={callbackUrl}
            onChange={(e) => setCallbackUrl(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='callbackUrl'> Test Webhook URL</label>
          <Input
            id='callbackUrl'
            name='callbackUrl'
            type='text'
            placeholder='eg: http://testurl/webhook'
            className='disabled:opacity-100'
            value={webhookUrl}
            onChange={(e) => setWebHookUrl(e.target.value)}
          />
        </div>

        <Button
          type='button'
          onClick={handleUpdate}
          disabled={isLoading}
        >
          <LucideLoader2
            className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
              'inline-block': isLoading,
            })}
          />
          Update
        </Button>
      </form>
    </div>
  );
}

export function LiveApiKeysForm({
  livePublic,
  projectUrls,
}: {
  livePublic?: string;
  projectUrls: { webhookUrl: { live: string }; callbackUrl: { live: string } };
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const projectId = Cookies.get('projectId');
  const [webhookUrl, setWebHookUrl] = useState(
    projectUrls?.webhookUrl?.live || ''
  );
  // console.log(projectUrls);
  const [callbackUrl, setCallbackUrl] = useState(
    projectUrls?.callbackUrl?.live || ''
  );
  function handleCopy(value: string | undefined) {
    if (value) {
      navigator.clipboard.writeText(value);
      toast({ description: 'Copied to clipboard' });
    }
  }

  async function handleUpdate() {
    setIsLoading(true);
    let formdata = {
      callbackUrl,
      webhookUrl,
      type: 'live',
    };
    // console.log(formdata);
    const data = await updateProjectUrl(formdata);
    toast({
      description: data?.message,
      variant: data?.status === 'success' ? 'default' : 'destructive',
    });
    setIsLoading(false);
  }
  return (
    <div className='w-full'>
      <form className='w-full space-y-6'>
        <div className='form-control'>
          <label htmlFor='testKey'>Live Public Key</label>
          <div className='flex items-center space-x-3'>
            <Input
              id='liveKey'
              name='liveKey'
              type='text'
              placeholder='Click on the button to generate API Key'
              defaultValue={livePublic}
              disabled
              className='disabled:opacity-100'
            />

            <Button
              type='button'
              onClick={() => handleCopy(livePublic)}
              variant={'outline'}
              className='w-full max-w-[9rem]'
            >
              <RiFileCopyFill className='w-4 h-4 text-primary' />
              <span>Copy</span>
            </Button>
          </div>
        </div>
        <div className='form-control'>
          <label htmlFor='projectID'>Project ID</label>
          <div className='flex items-center space-x-3'>
            <Input
              id='projectID'
              name='projectID'
              type='text'
              placeholder='projectID'
              defaultValue={projectId}
              disabled
              className='disabled:opacity-100'
            />

            <Button
              type='button'
              onClick={() => handleCopy(projectId)}
              variant={'outline'}
              className='w-full max-w-[9rem]'
            >
              <RiFileCopyFill className='w-4 h-4 text-primary' />
              <span>Copy</span>
            </Button>
          </div>
        </div>
        <div className='form-control'>
          <label htmlFor='callbackUrl'> Live Callback URL</label>
          <Input
            id='callbackUrl'
            name='callbackUrl'
            type='text'
            placeholder='eg: http://liveurl/callback'
            className='disabled:opacity-100'
            value={callbackUrl}
            onChange={(e) => setCallbackUrl(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='callbackUrl'> Live Webhook URL</label>
          <Input
            id='callbackUrl'
            name='callbackUrl'
            type='text'
            placeholder='eg: http://liveurl/webhook'
            className='disabled:opacity-100'
            value={webhookUrl}
            onChange={(e) => setWebHookUrl(e.target.value)}
          />
        </div>

        <Button
          type='button'
          onClick={handleUpdate}
        >
          <LucideLoader2
            className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
              'inline-block': isLoading,
            })}
          />
          Update
        </Button>
      </form>
    </div>
  );
}
