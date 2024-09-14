import Logout from '@/components/common/buttons/logout';
import { buttonVariants } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Link from 'next/link';
import PersonalSection from './tab-contents/personal';
import BusinessSection from './tab-contents/business';
import ComplianceSection from './tab-contents/compliance';
import PaymentSection from './tab-contents/payment';
export default function SettingsPage() {
  return (
    <section className='flex items-center justify-center'>
      <Tabs
        defaultValue='personal'
        className='w-full bg-background rounded-[30px] px-7'
      >
        <TabsList className='bg-transparent border-b border-border rounded-none w-full'>
          <TabsTrigger value='personal'>Personal Details</TabsTrigger>
          <TabsTrigger value='business'>Business Details</TabsTrigger>
          <TabsTrigger value='compliance'>Compliance</TabsTrigger>
          <TabsTrigger value='payment'>Payment</TabsTrigger>
          <TabsTrigger value='api-keys'>API Keys & Webooks</TabsTrigger>
          <TabsTrigger value='account'>Account Settings</TabsTrigger>
        </TabsList>
        <TabsContent value='personal'>
          <PersonalSection />
        </TabsContent>
        <TabsContent value='business'>
          <BusinessSection />
        </TabsContent>
        <TabsContent value='compliance'>
          <ComplianceSection />
        </TabsContent>
        <TabsContent value='payment'>
          <PaymentSection />
        </TabsContent>
      </Tabs>
    </section>
  );
}
