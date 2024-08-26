'use client';
import { LucideLoader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { useToast } from './use-toast';

interface CustomDropZoneProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}
export default function CustomDropZone({
  value,
  setValue,
  name,
}: CustomDropZoneProps) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 5242880,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg'],
    },
  });
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  function uploadImage() {
    if (acceptedFiles.length === 0) {
      toast({ description: 'Please select a file', variant: 'destructive' });
      return;
    }
    setValue(URL.createObjectURL(acceptedFiles[0]));
  }
  return (
    <div>
      <div {...getRootProps({ className: 'relative dashed-border' })}>
        <div className='bg-accent relative min-h-[150px] z-10 w-full h-full'>
          {acceptedFiles?.length > 0 ? (
            <div className='relative w-full h-[150px] rounded-lg'>
              <Image
                src={URL.createObjectURL(acceptedFiles[0])}
                alt='selected image'
                fill
                className='object-cover rounded-lg'
              />
              {/* This input sends the url of the image kit uploaded image to the backend */}
              <input
                name={name}
                defaultValue={value}
                hidden
                type='text'
              />
            </div>
          ) : (
            <div className='flex flex-col gap-1 justify-center items-center h-full min-h-[150px]'>
              <input {...getInputProps()} />
              <Image
                src={'/assets/Pending-Verification.svg'}
                alt='upload image'
                width={40}
                height={40}
              />
              <p className='text-sm'>
                Drag &apos;n&apos; drop some files here, or{' '}
                <span className='font-bold text-primary'>browse</span>
              </p>
              <p className='text-[#909090] text-sm'>Max file size = 5MB</p>
            </div>
          )}
        </div>
      </div>

      {!value && (
        <button
          type='button'
          onClick={uploadImage}
          disabled={isLoading}
          className='bg-primary text-xs mt-2 p-2 rounded transition-all text-primary-foreground w-full flex justify-center items-center'
        >
          <LucideLoader2
            className={cn('animate-spin mr-1 w-[22px] h-[22px] hidden', {
              'inline-block': isLoading,
            })}
          />
          Upload
        </button>
      )}
    </div>
  );
}
