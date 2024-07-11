'use client';

import { logout } from '@/app/apis/actions/auth';
import { buttonVariants, Button } from '@/components/ui/button';
import { LucideLoader2 } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      className='w-full'
      disabled={pending}
    >
      <LucideLoader2
        className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
          'inline-block': pending,
        })}
      />
      <span>Log out</span>
    </Button>
  );
}

export function LogoutButton() {
  const [state, dispatch] = useFormState(logout, undefined);
  return (
    <form action={dispatch}>
      <SubmitButton />
    </form>
  );
}
