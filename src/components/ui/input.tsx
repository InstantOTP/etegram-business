import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full text-secondary-foreground/90 rounded-[0.625rem] bg-[#F3F8FF] px-3 py-[22px] text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  view: boolean;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, view, setView, ...props }, ref) => {
    return (
      <div className='relative'>
        <input
          type={view ? 'text' : 'password'}
          className={cn(
            'flex h-10 w-full bg-[#F3F8FF] text-secondary-foreground/90 rounded-[0.625rem] px-3 py-[22px] text-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />

        <button
          type='button'
          className='absolute right-3 top-1/2 -translate-y-1/2'
          onClick={() => setView(!view)}
        >
          {view ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { Input, PasswordInput };
