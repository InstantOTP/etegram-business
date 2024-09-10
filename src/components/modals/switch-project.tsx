'use client';

import { selectProject } from '@/app/apis/actions/project';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { findUpper } from '@/lib/utils';
import Cookies from 'js-cookie';
import { RotateCwIcon } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

export default function SwitchProject({ projects }: { projects: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const projectId = Cookies.get('projectId');

  function handleSetProject(id: string) {
    Cookies.set('projectId', id);
    setIsOpen(false);
  }

  if (projects?.data?.length < 2) {
    return null;
  }
  return (
    <div className='border-t border-border mt-1'>
      <p className='!text-left px-1 text-sm mb-2'>
        <b>Project:</b>
        {projects?.data?.find((item: any) => item.id === projectId)?.name}
      </p>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
        modal={true}
      >
        <DialogTrigger asChild>
          <Button
            size={'sm'}
            className='w-full'
          >
            <RotateCwIcon className='w-4 h-4 mr-1' />
            <span>Switch Project</span>{' '}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Switch Business</DialogTitle>
          </DialogHeader>

          <ul className='grid grid-cols-2 gap-3'>
            {projects?.data?.map((item: any, index: number) => (
              <li key={index}>
                <button
                  disabled={projectId === item?.id}
                  onClick={() => handleSetProject(item?.id)}
                  className='relative border border-border flex items-center w-full py-4 rounded-[5px] p-4 hover:bg-accent/50 bg-transparent transition-colors disabled:opacity-65 disabled:cursor-not-allowed'
                >
                  <Avatar className='h-10 w-10 mr-1.5'>
                    <AvatarImage
                      src='/profile-pic.jpg'
                      alt={`business-logo`}
                      className='object-cover'
                    />
                    <AvatarFallback className='font-bold'>
                      {findUpper(`${item?.name}`)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h6 className='text-left font-medium'>{item?.name}</h6>
                  </div>
                  {projectId === item?.id && (
                    <p
                      className='absolute top-0.5 right-0.5 rounded-md  py-[1px] px-3.5 bg-green-200 text-green-600 text-xs'
                      aria-live='polite'
                      aria-label='current business'
                    >
                      Current
                    </p>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
