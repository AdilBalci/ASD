'use client';

import React from 'react';
import { LayoutDashboard, Users, FileText, GraduationCap, LogOut } from 'lucide-react';
import { NavItem } from './NavItem';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-900 text-white p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <GraduationCap size={32} className="text-blue-500" />
        <h1 className="text-xl font-bold">Okul Sistemi</h1>
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem
          href="/panel"
          icon={LayoutDashboard}
          label="Ana Sayfa"
          active={pathname === '/panel'}
        />
        <NavItem
          href="/panel/ogrenciler"
          icon={Users}
          label="Öğrenciler"
          active={pathname === '/panel/ogrenciler'}
        />
        <NavItem
          href="/panel/raporlar"
          icon={FileText}
          label="Raporlar"
          active={pathname === '/panel/raporlar'}
        />
        {/* <NavItem
          href="/panel/ayarlar"
          icon={Settings}
          label="Ayarlar"
          active={pathname === '/panel/ayarlar'}
        /> */}
      </nav>

      <div className="pt-4 border-t border-gray-800">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-400 hover:bg-gray-800 rounded-md transition-colors">
          <LogOut size={20} />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
}
