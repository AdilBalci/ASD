'use client';

import React, { use } from 'react';
import { useVeri } from '@/contexts/VeriContext';
import { ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';

export default function KarnePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { ogrenciler, notlar, devamsizliklar, davranisNotlari } = useVeri();

  const ogrenci = ogrenciler.find(o => o.id === id);
  if (!ogrenci) return <div className="p-8">Öğrenci bulunamadı.</div>;

  const ogrenciNotlari = notlar.filter(n => n.ogrenciId === id);
  const ogrenciDevamsizliklari = devamsizliklar.filter(d => d.ogrenciId === id);
  const ogrenciDavranislari = davranisNotlari.filter(d => d.ogrenciId === id);

  // Ders Bazlı Ortalama Hesapla
  const dersOzetleri: Record<string, { yazili: number[], sozlu: number[], proje: number[] }> = {};

  ogrenciNotlari.forEach(not => {
    if (!dersOzetleri[not.dersAdi]) {
      dersOzetleri[not.dersAdi] = { yazili: [], sozlu: [], proje: [] };
    }
    if (not.notTipi === 'Yazılı') dersOzetleri[not.dersAdi].yazili.push(not.puan);
    if (not.notTipi === 'Sözlü') dersOzetleri[not.dersAdi].sozlu.push(not.puan);
    if (not.notTipi === 'Proje') dersOzetleri[not.dersAdi].proje.push(not.puan);
  });

  const karneSatirlari = Object.entries(dersOzetleri).map(([ders, notlar]) => {
    const tumNotlar = [...notlar.yazili, ...notlar.sozlu, ...notlar.proje];
    const ortalama = tumNotlar.length > 0
      ? tumNotlar.reduce((a, b) => a + b, 0) / tumNotlar.length
      : 0;

    return {
      ders,
      yazili: notlar.yazili.join(', '),
      sozlu: notlar.sozlu.join(', '),
      proje: notlar.proje.join(', '),
      ortalama: ortalama.toFixed(1),
      durum: ortalama >= 50 ? 'Geçti' : 'Kaldı'
    };
  });

  const toplamDevamsizlik = ogrenciDevamsizliklari.length; // Basit sayım

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg print:shadow-none">
      <div className="flex justify-between items-start mb-8 print:hidden">
        <Link href="/panel/raporlar" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
          <span>Geri Dön</span>
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <Printer size={20} />
          <span>Yazdır</span>
        </button>
      </div>

      {/* Karne Başlığı */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ÖĞRENCİ KARNESİ</h1>
        <p className="text-gray-600">2023 - 2024 EĞİTİM ÖĞRETİM YILI</p>
      </div>

      {/* Öğrenci Bilgileri */}
      <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
        <div>
          <p className="text-gray-500">Öğrenci Adı Soyadı:</p>
          <p className="text-lg font-bold text-gray-900">{ogrenci.ad} {ogrenci.soyad}</p>
        </div>
        <div>
          <p className="text-gray-500">Okul Numarası:</p>
          <p className="text-lg font-bold text-gray-900">{ogrenci.numara}</p>
        </div>
        <div>
          <p className="text-gray-500">Sınıfı:</p>
          <p className="text-lg font-bold text-gray-900">{ogrenci.sinif}</p>
        </div>
        <div>
          <p className="text-gray-500">Öğretim Yılı:</p>
          <p className="text-lg font-bold text-gray-900">2023-2024</p>
        </div>
      </div>

      {/* Notlar Tablosu */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-2 text-gray-800 border-b border-gray-200 pb-2">Ders Notları</h3>
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="border border-gray-300 p-2">Ders Adı</th>
              <th className="border border-gray-300 p-2 text-center">Yazılılar</th>
              <th className="border border-gray-300 p-2 text-center">Sözlüler</th>
              <th className="border border-gray-300 p-2 text-center">Projeler</th>
              <th className="border border-gray-300 p-2 text-center bg-gray-200">Ortalama</th>
              <th className="border border-gray-300 p-2 text-center">Durum</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {karneSatirlari.map((satir) => (
              <tr key={satir.ders}>
                <td className="border border-gray-300 p-2 font-medium">{satir.ders}</td>
                <td className="border border-gray-300 p-2 text-center">{satir.yazili || '-'}</td>
                <td className="border border-gray-300 p-2 text-center">{satir.sozlu || '-'}</td>
                <td className="border border-gray-300 p-2 text-center">{satir.proje || '-'}</td>
                <td className="border border-gray-300 p-2 text-center font-bold bg-gray-50">{satir.ortalama}</td>
                <td className={`border border-gray-300 p-2 text-center font-semibold ${satir.durum === 'Geçti' ? 'text-green-600' : 'text-red-600'}`}>
                  {satir.durum}
                </td>
              </tr>
            ))}
             {karneSatirlari.length === 0 && (
               <tr><td colSpan={6} className="p-4 text-center text-gray-500 border border-gray-300">Not girişi yapılmamış.</td></tr>
             )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Devamsızlık Bilgisi */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800 border-b border-gray-200 pb-2">Devamsızlık Durumu</h3>
          <div className="border border-gray-300 p-4 rounded bg-gray-50">
            <p className="flex justify-between mb-2 text-gray-900">
              <span>Toplam Devamsızlık:</span>
              <span className="font-bold">{toplamDevamsizlik} Gün</span>
            </p>
            <ul className="text-xs text-gray-600 list-disc pl-4">
              {ogrenciDevamsizliklari.map(d => (
                <li key={d.id}>{d.tarih} - {d.tur}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Davranış Notları */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800 border-b border-gray-200 pb-2">Davranış Değerlendirmesi</h3>
          <div className="border border-gray-300 p-4 rounded bg-gray-50 h-full">
            {ogrenciDavranislari.length > 0 ? (
              <ul className="space-y-2">
                 {ogrenciDavranislari.map(d => (
                   <li key={d.id} className="text-sm border-b border-gray-200 last:border-0 pb-1 text-gray-800">
                     <span className={d.tip === 'Olumlu' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                       {d.baslik}:
                     </span> {d.aciklama}
                   </li>
                 ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Davranış notu girilmemiş.</p>
            )}
          </div>
        </div>
      </div>

      {/* İmza Alanı */}
      <div className="mt-16 grid grid-cols-3 gap-8 text-center print:grid text-gray-900">
        <div>
          <p className="mb-8 font-bold">Sınıf Öğretmeni</p>
          <div className="border-t border-black w-32 mx-auto"></div>
        </div>
        <div>
          <p className="mb-8 font-bold">Okul Müdürü</p>
          <div className="border-t border-black w-32 mx-auto"></div>
        </div>
        <div>
          <p className="mb-8 font-bold">Veli</p>
          <div className="border-t border-black w-32 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
