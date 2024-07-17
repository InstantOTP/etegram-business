import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localfont from 'next/font/local';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

const eudoxusSans = localfont({
  src: [
    {
      path: '../assets/fonts/EudoxusSans-ExtraBold.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/EudoxusSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/EudoxusSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/EudoxusSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/EudoxusSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/EudoxusSans-ExtraLight.ttf',
      weight: '100',
      style: 'normal',
    },
  ],
  variable: '--eudoxusSans',
});

export const metadata: Metadata = {
  title: 'Etegram Business',
  description: 'Receive payment for tour business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} ${eudoxusSans.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
