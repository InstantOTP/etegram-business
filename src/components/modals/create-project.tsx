'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import CreateProjectForm from '../forms/create-project';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export default function CreateProject({ projects }: { projects: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (projects?.length === 0) {
      setIsOpen(true);
    }
  }, [projects]);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className='w-4 h-4 mr-1' />
          <span>Add new Project</span>{' '}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <CreateProjectForm setIsOpen={setIsOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
