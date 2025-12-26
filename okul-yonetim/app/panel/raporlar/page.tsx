'use client';

import React from 'react';
import { useVeri } from '@/contexts/VeriContext';
import Link from 'next/link';
import { FileBarChart, Trophy } from 'lucide-react';

export default function RaporlarPage() {
  const { ogrenciler, notlar } = useVeri();

  // Sınıf Ortalaması Hesapla
  const dersOrtalamalari: Record<string, { toplam: number, sayi: number }> = {};

  notlar.forEach(not => {
    if (!dersOrtalamalari[not.dersAdi]) {
      dersOrtalamalari[not.dersAdi] = { toplam: 0, sayi: 0 };
    }
    dersOrtalamalari[not.dersAdi].toplam += not.puan;
    dersOrtalamalari[not.dersAdi].sayi += 1;
  });

  const sinifOrtalamalari = Object.entries(dersOrtalamalari).map(([ders, veri]) => ({
    ders,
    ortalama: (veri.toplam / veri.sayi).toFixed(1)
  }));

  // En Başarılı Öğrenciler (Basit bir hesaplama: tüm notların ortalaması)
  const ogrenciBasarilari = ogrenciler.map(ogrenci => {
    const ogrenciNotlari = notlar.filter(n => n.ogrenciId === ogrenci.id);
    const ortalama = ogrenciNotlari.length > 0
      ? ogrenciNotlari.reduce((a, b) => a + b.puan, 0) / ogrenciNotlari.length
      : 0;
    return { ...ogrenci, ortalama };
  }).sort((a, b) => b.ortalama - a.ortalama).slice(0, 5); // İlk 5

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Raporlar ve Analizler</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* Sınıf Ders Ortalamaları */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <FileBarChart className="text-blue-600" size={24} />
            <h2 className="text-lg font-bold text-gray-800">Sınıf Ders Ortalamaları</h2>
          </div>
          <div className="space-y-4">
            {sinifOrtalamalari.length > 0 ? sinifOrtalamalari.map((item) => (
              <div key={item.ders}>
                <div className="flex justify-between text-sm mb-1 text-gray-700">
                  <span>{item.ders}</span>
                  <span className="font-bold">{item.ortalama}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${Math.min(Number(item.ortalama), 100)}%` }}
                  ></div>
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-sm">Henüz not girişi yapılmamış.</p>
            )}
          </div>
        </div>

        {/* En Başarılı Öğrenciler */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-500" size={24} />
            <h2 className="text-lg font-bold text-gray-800">En Başarılı Öğrenciler</h2>
          </div>
          <ul className="space-y-3">
            {ogrenciBasarilari.length > 0 && ogrenciBasarilari[0].ortalama > 0 ? (
              ogrenciBasarilari.map((ogrenci, index) => (
                <li key={ogrenci.id} className="flex justify-between items-center border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                      {index + 1}
                    </span>
                    <span className="text-gray-800 font-medium">{ogrenci.ad} {ogrenci.soyad}</span>
                  </div>
                  <span className="font-bold text-blue-600">{ogrenci.ortalama.toFixed(1)}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Veri yetersiz.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Öğrenci Karnesi Linki */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Öğrenci Bazlı Raporlar</h2>
        <p className="text-gray-500 mb-4">Detaylı karne ve gelişim raporu için aşağıdaki listeden bir öğrenci seçin.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-3">No</th>
                <th className="p-3">Ad Soyad</th>
                <th className="p-3">Sınıf</th>
                <th className="p-3 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ogrenciler.map(ogrenci => (
                <tr key={ogrenci.id} className="hover:bg-gray-50">
                  <td className="p-3 text-gray-900">{ogrenci.numara}</td>
                  <td className="p-3 text-gray-900">{ogrenci.ad} {ogrenci.soyad}</td>
                  <td className="p-3 text-gray-600">{ogrenci.sinif}</td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/panel/raporlar/${ogrenci.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Karne Görüntüle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
