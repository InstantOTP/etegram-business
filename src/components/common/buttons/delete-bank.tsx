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
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { logout } from '@/app/apis/actions/auth';
import { deleteProjectBanks } from '@/app/apis/data/payouts';
import React from 'react';
import { useToast } from '@/components/ui/use-toast';

function DeleteButton() {
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

export default function DeleteBank({ bankId }: { bankId: string }) {
  const [state, dispatch] = useFormState(deleteProjectBanks, bankId);

  const { toast } = useToast();

  React.useEffect(() => {
    if (state && state?.message) {
      toast({
        description: state?.message || 'Logged out successfully',
        variant: state?.status !== 'failed' ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        type='button'
        className={buttonVariants({ variant: 'destructive' })}
      >
        <p>Delete Bank</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Bank</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete bank?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=''>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <form
            action={dispatch}
            className='w-full lg:w-fit'
          >
            <DeleteButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
