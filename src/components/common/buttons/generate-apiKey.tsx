'use client';
import { generateAPIKey } from '@/app/apis/data/api-keys';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
export default function GenerateKeyButton({ type }: { type: string }) {
  const { toast } = useToast();
  const { refresh } = useRouter();
  async function getKeys() {
    const data = await generateAPIKey(type);
    Cookies.set('apiKey', data?.testApiKey);
    toast({ description: '"Test API key generated"' });
    refresh();
  }

  return (
    <Button
      variant={'outline'}
      onClick={getKeys}
      className='w-full max-w-[9rem]'
    >
      Regenerate Key
    </Button>
  );
}
