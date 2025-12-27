'use client';

import { VeriSaglayici } from '@/contexts/VeriContext';
import Sidebar from '@/components/Sidebar';
import MainLayout from '@/components/MainLayout';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';

  if (isLoginPage) {
    return (
      <VeriSaglayici>
        {children}
      </VeriSaglayici>
    );
  }

  return (
    <VeriSaglayici>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <MainLayout>
          {children}
        </MainLayout>
      </div>
    </VeriSaglayici>
  );
}
