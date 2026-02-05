'use client';

import React, { useState } from 'react';
import { useVeri } from '@/contexts/VeriContext';
import { Search, UserPlus } from 'lucide-react';
import { Ogrenci } from '@/types/veriTipleri';
import Link from 'next/link';

export default function OgrencilerPage() {
  const { ogrenciler, ogrenciEkle } = useVeri();
  const [aramaMetni, setAramaMetni] = useState('');
  const [yeniOgrenciModalAcik, setYeniOgrenciModalAcik] = useState(false);
  const [yeniOgrenci, setYeniOgrenci] = useState<Partial<Ogrenci>>({
    ad: '', soyad: '', numara: '', sinif: '', veliAdi: ''
  });

  const filtrelenmisOgrenciler = ogrenciler.filter(ogrenci =>
    ogrenci.ad.toLowerCase().includes(aramaMetni.toLowerCase()) ||
    ogrenci.soyad.toLowerCase().includes(aramaMetni.toLowerCase()) ||
    ogrenci.numara.includes(aramaMetni)
  );

  const handleOgrenciEkle = (e: React.FormEvent) => {
    e.preventDefault();
    if (yeniOgrenci.ad && yeniOgrenci.soyad && yeniOgrenci.numara && yeniOgrenci.sinif) {
      ogrenciEkle({
        id: Date.now().toString(),
        ad: yeniOgrenci.ad,
        soyad: yeniOgrenci.soyad,
        numara: yeniOgrenci.numara,
        sinif: yeniOgrenci.sinif,
        veliAdi: yeniOgrenci.veliAdi || ''
      });
      setYeniOgrenciModalAcik(false);
      setYeniOgrenci({ ad: '', soyad: '', numara: '', sinif: '', veliAdi: '' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Öğrenci Yönetimi</h1>
        <button
          onClick={() => setYeniOgrenciModalAcik(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={20} />
          <span>Yeni Öğrenci</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            aria-label="Öğrenci ara"
            placeholder="Öğrenci ara (Ad, Soyad, Numara)..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Numara</th>
              <th className="p-4">Ad Soyad</th>
              <th className="p-4">Sınıf</th>
              <th className="p-4">Veli Adı</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtrelenmisOgrenciler.length > 0 ? (
              filtrelenmisOgrenciler.map(ogrenci => (
                <tr key={ogrenci.id} className="hover:bg-gray-50 text-gray-900">
                  <td className="p-4 font-medium">{ogrenci.numara}</td>
                  <td className="p-4">{ogrenci.ad} {ogrenci.soyad}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                      {ogrenci.sinif}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{ogrenci.veliAdi || '-'}</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/panel/ogrenciler/${ogrenci.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Veri Gir / Detay
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Öğrenci bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {yeniOgrenciModalAcik && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 id="modal-title" className="text-xl font-bold mb-4 text-gray-900">Yeni Öğrenci Ekle</h2>
            <form onSubmit={handleOgrenciEkle} className="space-y-4">
              <div>
                <label htmlFor="student-ad" className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                <input
                  id="student-ad"
                  autoFocus
                  required
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                  value={yeniOgrenci.ad}
                  onChange={e => setYeniOgrenci({...yeniOgrenci, ad: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="student-soyad" className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                <input
                  id="student-soyad"
                  required
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                  value={yeniOgrenci.soyad}
                  onChange={e => setYeniOgrenci({...yeniOgrenci, soyad: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="student-numara" className="block text-sm font-medium text-gray-700 mb-1">Numara</label>
                  <input
                    id="student-numara"
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={yeniOgrenci.numara}
                    onChange={e => setYeniOgrenci({...yeniOgrenci, numara: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="student-sinif" className="block text-sm font-medium text-gray-700 mb-1">Sınıf</label>
                  <input
                    id="student-sinif"
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={yeniOgrenci.sinif}
                    onChange={e => setYeniOgrenci({...yeniOgrenci, sinif: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="student-veli" className="block text-sm font-medium text-gray-700 mb-1">Veli Adı (Opsiyonel)</label>
                <input
                  id="student-veli"
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                  value={yeniOgrenci.veliAdi}
                  onChange={e => setYeniOgrenci({...yeniOgrenci, veliAdi: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setYeniOgrenciModalAcik(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
