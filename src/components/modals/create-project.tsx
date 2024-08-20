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
import { useState } from 'react';

export default function CreateProject() {
  const [isOpen, setIsOpen] = useState(false);
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
