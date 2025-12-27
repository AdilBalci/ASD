'use client';

import React from 'react';
import { useVeri } from '@/contexts/VeriContext';
import { Users, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { ogrenciler, notlar } = useVeri();

  // Basit istatistikler
  const toplamOgrenci = ogrenciler.length;
  const toplamNotSayisi = notlar.length;
  const notOrtalamasi = notlar.length > 0
    ? (notlar.reduce((acc, curr) => acc + curr.puan, 0) / notlar.length).toFixed(1)
    : '0';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Öğretmen Paneli - Genel Bakış</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Toplam Öğrenci</p>
            <p className="text-2xl font-bold text-gray-800">{toplamOgrenci}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Not Ortalaması</p>
            <p className="text-2xl font-bold text-gray-800">{notOrtalamasi}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Girilen Not Sayısı</p>
            <p className="text-2xl font-bold text-gray-800">{toplamNotSayisi}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/panel/ogrenciler" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-blue-600 mb-1">Öğrenci Listesi & Veri Girişi</h3>
            <p className="text-sm text-gray-500">Öğrencileri görüntüleyin, not veya devamsızlık girin.</p>
          </Link>
          <Link href="/panel/raporlar" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-blue-600 mb-1">Raporları İncele</h3>
            <p className="text-sm text-gray-500">Öğrenci gelişim raporlarını ve sınıf ortalamalarını görüntüleyin.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
