'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center bg-muted pt-1 text-muted-foreground gap-x-5',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex !pl-0 !pr-4 !pt-3 !pb-3.5 relative before:bottom-0 before:left-0 before:z-10 before:w-full before:h-[2px] before:absolute before:bg-transparent items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-semibold ring-offset-background transition-all  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground  data-[state=active]:before:bg-primary',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

// 'use client';

// import * as React from 'react';
// import * as TabsPrimitive from '@radix-ui/react-tabs';

// import { cn } from '@/lib/utils';

// const Tabs = TabsPrimitive.Root;

// const TabsList = React.forwardRef<
//   React.ElementRef<typeof TabsPrimitive.List>,
//   React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
// >(({ className, ...props }, ref) => (
//   <TabsPrimitive.List
//     ref={ref}
//     className={cn(
//       'inline-flex items-center bg-muted pt-1 text-muted-foreground gap-x-5',
//       className
//     )}
//     {...props}
//   />
// ));
// TabsList.displayName = TabsPrimitive.List.displayName;

// const TabsTrigger = React.forwardRef<
//   React.ElementRef<typeof TabsPrimitive.Trigger>,
//   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
// >(({ className, ...props }, ref) => (
//   <TabsPrimitive.Trigger
//     ref={ref}
//     className={cn(
//       'inline-flex !pl-0 !pr-4 !pt-3 !pb-3.5 relative before:bottom-0 before:left-0 before:z-10 before:w-full before:h-[2px] before:absolute before:bg-transparent items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-semibold ring-offset-background transition-all  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground  data-[state=active]:before:bg-primary',
//       className
//     )}
//     {...props}
//   />
// ));
// TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// const TabsContent = React.forwardRef<
//   React.ElementRef<typeof TabsPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
// >(({ className, ...props }, ref) => (
//   <TabsPrimitive.Content
//     ref={ref}
//     className={cn(
//       'mt-2 ring-offset-background py-6 flex justify-center items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
//       className
//     )}
//     {...props}
//   />
// ));
// TabsContent.displayName = TabsPrimitive.Content.displayName;

// export { Tabs, TabsList, TabsTrigger, TabsContent };
