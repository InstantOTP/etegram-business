'use client';

import { login } from '@/app/apis/actions/auth';
import { cn } from '@/lib/utils';
import { LucideLoader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { createProject } from '@/app/apis/actions/project';
import React, { useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast';

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
      <span>Continue</span>
    </Button>
  );
}

export default function CreateProjectForm({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const initalState = {
    message: '',
    errors: {},
    status: '',
  };
  const [state, dispatch] = useFormState(createProject, initalState);
  useEffect(() => {
    if (state?.message && state.status) {
      toast({
        description: state.message,
        variant: state.status !== 'success' ? 'destructive' : 'default',
      });
    }
    if (state?.status === 'success') {
      setIsOpen(false);
    }
  }, [state]);
  return (
    <form
      action={dispatch}
      className='w-full max-w-md mx-auto space-y-5'
    >
      <div className='form-control'>
        <label htmlFor='email'>Enter Project Name</label>
        <Input
          id='name'
          name='projectName'
          type='text'
          placeholder='Enter Project name'
        />
        {state?.errors?.projectName ? (
          <div
            id='projectName-error'
            aria-live='polite'
            className='error'
          >
            <p>{state.errors.projectName[0]}</p>
          </div>
        ) : null}
      </div>

      <div className='form-control'>
        <label htmlFor='projectDescription'>Project Description</label>
        <Textarea
          name='projectDescription'
          id='projectDescription'
          className='min-h-[150px]'
          placeholder='What is your project'
        />
        {state?.errors?.projectDescription ? (
          <div
            id='project-description-error'
            aria-live='polite'
            className='error'
          >
            <p>{state.errors.projectDescription[0]}</p>
          </div>
        ) : null}
      </div>

      <div className='max-w-full mx-auto !mt-9'>
        <SubmitButton />
      </div>
    </form>
  );
}
