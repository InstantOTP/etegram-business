'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, RotateCwIcon } from 'lucide-react';
import CreateProjectForm from '../forms/create-project';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { findUpper } from '@/lib/utils';
import { selectBusiness } from '@/app/apis/actions/business';

// export default function SwitchBusiness({
//   currentBusiness,
//   businesses,
// }: {
//   currentBusiness: bussinessType;
//   businesses: { business: bussinessType }[];
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   // console.log(businesses);
//   //   let businesses: any[] = [{ business: { id: '1', name: 'More Bitters' } }];
//   return (

//   );
// }

// export default function SwitchBusiness({
//   currentBusiness,
//   businesses,
// }: {
//   currentBusiness: bussinessType;
//   businesses: { business: bussinessType }[];
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   console.log(businesses);
//     let businesses: any[] = [{ business: { id: '1', name: 'More Bitters' } }];
//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={setIsOpen}
//       modal={true}
//     >
//       <DialogTrigger asChild>
//         <Button
//           size={'sm'}
//           className='w-full'
//         >
//           <RotateCwIcon className='w-4 h-4 mr-1' />
//           <span>Switch Business</span>{' '}
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Switch Business</DialogTitle>
//         </DialogHeader>

//         <ul className='grid grid-cols-2 gap-3'>
//           {businesses &&
//             businesses.map((item, index) => (
//               <li key={index}>
//                 <button
//                   disabled={currentBusiness?.id === item?.business?.id}
//                   onClick={() => selectBusiness(item?.business?.id)}
//                   className='relative border border-border flex items-center w-full py-4 rounded-[5px] p-4 hover:bg-accent/50 bg-transparent transition-colors disabled:opacity-65 disabled:cursor-not-allowed'
//                 >
//                   <Avatar className='h-10 w-10 mr-1.5'>
//                     <AvatarImage
//                       src='/profile-pic.jpg'
//                       alt={`business-logo`}
//                       className='object-cover'
//                     />
//                     <AvatarFallback className='font-bold'>
//                       {findUpper(`${item?.business?.name}`)}
//                     </AvatarFallback>
//                   </Avatar>

//                   <div>
//                     <h6 className='text-left font-medium'>
//                       {item?.business?.name}
//                     </h6>
//                   </div>
//                   {currentBusiness?.id === item?.business?.id && (
//                     <p
//                       className='absolute top-0.5 right-0.5 rounded-md  py-[1px] px-3.5 bg-green-200 text-green-600 text-xs'
//                       aria-live='polite'
//                       aria-label='current business'
//                     >
//                       Current
//                     </p>
//                   )}
//                 </button>
//               </li>
//             ))}
//         </ul>
//       </DialogContent>
//     </Dialog>
//   );
// }
