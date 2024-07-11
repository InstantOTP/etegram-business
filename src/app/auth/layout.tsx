export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className='min-h-svh auth-bg'>{children}</main>;
}
