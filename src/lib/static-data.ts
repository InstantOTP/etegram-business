import { Icons } from '@/components/icons';
import { User } from '@/components/layout/dashboard-header';
import { IconProps } from '@/components/icons';

type sidebarLinks = {
  heading: string;
  links: {
    icon: (props: IconProps) => JSX.Element;
    label: string;
    path: string;
    soon?: boolean;
  }[];
};

export const etegramUses = [
  {
    label: 'To create business bank accounts(s) for my business',
    value: 'create bank accounts',
  },
  {
    label: 'To collect payments from customers on my website/in-store',
    value: 'collect payments',
  },
  {
    label: 'To send invoices and payments links to my customers.',
    value: 'send invoices and links',
  },
  {
    label: 'To manage my business and automate staffs salary payments',
    value: 'manage and automate salary payments',
  },
];

export const sidebarLinks: sidebarLinks[] = [
  {
    heading: 'Home',
    links: [
      {
        icon: Icons.overview,
        label: 'Overview',
        path: '/',
      },
    ],
  },
  {
    heading: 'Banking',
    links: [
      {
        icon: Icons.addMoney,
        label: 'Add Money',
        path: '/add-money',
      },
      {
        icon: Icons.sendMoney,
        label: 'Send Money',
        path: '/send-money',
      },
      {
        icon: Icons.billsPayment,
        label: 'Bills Payment',
        path: '/bills-payment',
      },
    ],
  },
  {
    heading: 'Collections',
    links: [
      {
        icon: Icons.transactions,
        label: 'Transactions',
        path: '/transactions',
      },
      {
        icon: Icons.customers,
        label: 'Customers',
        path: '/customers',
      },
      {
        icon: Icons.remittance,
        label: 'Remittances',
        path: '/remittances',
      },
    ],
  },
  {
    heading: 'Tools',
    links: [
      {
        icon: Icons.qrCode,
        label: 'QR Code',
        path: '#',
        soon: true,
      },
      {
        icon: Icons.paymentLinks,
        label: 'Payment links',
        path: '#',
        soon: true,
      },
      {
        icon: Icons.invoices,
        label: 'Invoice',
        path: '#',
        soon: true,
      },
      {
        icon: Icons.storefront,
        label: 'Storefront',
        path: '#',
        soon: true,
      },
      {
        icon: Icons.posTerminal,
        label: 'POS Terminal',
        path: '#',
        soon: true,
      },
    ],
  },
  {
    heading: 'Account',
    links: [
      {
        icon: Icons.settings,
        label: 'Settings',
        path: '/settings',
      },
    ],
  },
];

export const fakeUsers: User = {
  userID: 'ete001',
  username: 'John Doe',
  email: 'johndoe@mail.com',
  isVerified: true,
  phone: '08012345678',
  status: 'active',
  totalTransactions: 2,
  wallet: 100000,
  pushedNumbers: 1,
  rentedNumbers: 1,
  referralCode: 'ete001',
  isPINset: 'yes',
};