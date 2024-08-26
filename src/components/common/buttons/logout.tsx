'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { logout } from '@/app/apis/actions/auth';

function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      disabled={pending}
      className='flex w-full'
    >
      <LucideLoader2
        className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
          'inline-block': pending,
        })}
      />
      Continue
    </Button>
  );
}

export default function Logout() {
  const [state, dispatch] = useFormState(logout, undefined);

  // const { toast } = useToast();

  //   useEffect(() => {
  //     if (state && state?.message) {
  //       toast({
  //         description: state?.message || 'Logged out successfully',
  //         variant: state?.status !== 'failed' ? 'default' : 'destructive',
  //       });
  //     }
  //   }, [state, toast]);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <p className='text-sm text-destructive px-2 pb-1'>Logout</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=''>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <form
            action={dispatch}
            className='w-full lg:w-fit'
          >
            <LogoutButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
