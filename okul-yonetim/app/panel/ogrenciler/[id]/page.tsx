'use client';

import React, { useState, use } from 'react';
import { useVeri } from '@/contexts/VeriContext';
import { SinavNotu, Devamsizlik, DavranisNotu } from '@/types/veriTipleri';
import { ArrowLeft, Save, Calendar, Star } from 'lucide-react';
import Link from 'next/link';

export default function OgrenciDetayPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const { id } = use(params);

  const { ogrenciler, notlar, devamsizliklar, davranisNotlari, notEkle, devamsizlikEkle, davranisNotuEkle } = useVeri();

  const ogrenci = ogrenciler.find(o => o.id === id);

  const [aktifTab, setAktifTab] = useState<'not' | 'devamsizlik' | 'davranis'>('not');

  // Form States
  const [notForm, setNotForm] = useState<Partial<SinavNotu>>({ dersAdi: 'Matematik', puan: 0, notTipi: 'Yazılı', tarih: new Date().toISOString().split('T')[0] });
  const [devamsizlikForm, setDevamsizlikForm] = useState<Partial<Devamsizlik>>({ tur: 'Tam', tarih: new Date().toISOString().split('T')[0] });
  const [davranisForm, setDavranisForm] = useState<Partial<DavranisNotu>>({ baslik: '', aciklama: '', tip: 'Olumlu', tarih: new Date().toISOString().split('T')[0] });

  if (!ogrenci) return <div className="p-8">Öğrenci bulunamadı.</div>;

  const ogrenciNotlari = notlar.filter(n => n.ogrenciId === id);
  const ogrenciDevamsizliklari = devamsizliklar.filter(d => d.ogrenciId === id);
  const ogrenciDavranislari = davranisNotlari.filter(d => d.ogrenciId === id);

  const handleNotKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (notForm.dersAdi && notForm.puan !== undefined && notForm.notTipi && notForm.tarih) {
      notEkle({
        id: Date.now().toString(),
        ogrenciId: id,
        dersAdi: notForm.dersAdi,
        puan: Number(notForm.puan),
        notTipi: notForm.notTipi,
        tarih: notForm.tarih
      } as SinavNotu);
      setNotForm({ ...notForm, puan: 0 }); // Reset score only maybe
    }
  };

  const handleDevamsizlikKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (devamsizlikForm.tarih && devamsizlikForm.tur) {
      devamsizlikEkle({
        id: Date.now().toString(),
        ogrenciId: id,
        tarih: devamsizlikForm.tarih,
        tur: devamsizlikForm.tur
      } as Devamsizlik);
    }
  };

  const handleDavranisKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (davranisForm.baslik && davranisForm.aciklama && davranisForm.tarih) {
      davranisNotuEkle({
        id: Date.now().toString(),
        ogrenciId: id,
        baslik: davranisForm.baslik,
        aciklama: davranisForm.aciklama,
        tip: davranisForm.tip,
        tarih: davranisForm.tarih
      } as DavranisNotu);
      setDavranisForm({ ...davranisForm, baslik: '', aciklama: '' });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/panel/ogrenciler" className="p-2 hover:bg-gray-200 rounded-full text-gray-600">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{ogrenci.ad} {ogrenci.soyad}</h1>
          <p className="text-gray-500 text-sm">Numara: {ogrenci.numara} | Sınıf: {ogrenci.sinif}</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setAktifTab('not')}
          className={`pb-2 px-4 font-medium transition-colors ${aktifTab === 'not' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Not Girişi
        </button>
        <button
          onClick={() => setAktifTab('devamsizlik')}
          className={`pb-2 px-4 font-medium transition-colors ${aktifTab === 'devamsizlik' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Devamsızlık
        </button>
        <button
          onClick={() => setAktifTab('davranis')}
          className={`pb-2 px-4 font-medium transition-colors ${aktifTab === 'davranis' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Davranış Notu
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Giriş Formu Alanı */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              {aktifTab === 'not' && 'Not Ekle'}
              {aktifTab === 'devamsizlik' && 'Devamsızlık Ekle'}
              {aktifTab === 'davranis' && 'Davranış Notu Ekle'}
            </h2>

            {aktifTab === 'not' && (
              <form onSubmit={handleNotKaydet} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ders</label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={notForm.dersAdi}
                    onChange={e => setNotForm({...notForm, dersAdi: e.target.value})}
                  >
                    <option value="Matematik">Matematik</option>
                    <option value="Türkçe">Türkçe</option>
                    <option value="Fen Bilimleri">Fen Bilimleri</option>
                    <option value="Sosyal Bilgiler">Sosyal Bilgiler</option>
                    <option value="İngilizce">İngilizce</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Not Tipi</label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={notForm.notTipi}
                    onChange={e => setNotForm({...notForm, notTipi: e.target.value as 'Yazılı' | 'Sözlü' | 'Proje'})}
                  >
                    <option value="Yazılı">Yazılı</option>
                    <option value="Sözlü">Sözlü</option>
                    <option value="Proje">Proje</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Puan (0-100)</label>
                  <input
                    type="number"
                    min="0" max="100"
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={notForm.puan}
                    onChange={e => setNotForm({...notForm, puan: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={notForm.tarih}
                    onChange={e => setNotForm({...notForm, tarih: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Save size={18} /> Kaydet
                </button>
              </form>
            )}

            {aktifTab === 'devamsizlik' && (
              <form onSubmit={handleDevamsizlikKaydet} className="space-y-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Devamsızlık Türü</label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={devamsizlikForm.tur}
                    onChange={e => setDevamsizlikForm({...devamsizlikForm, tur: e.target.value as 'Tam' | 'Yarım' | 'İzinli'})}
                  >
                    <option value="Tam">Tam Gün</option>
                    <option value="Yarım">Yarım Gün</option>
                    <option value="İzinli">İzinli</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={devamsizlikForm.tarih}
                    onChange={e => setDevamsizlikForm({...devamsizlikForm, tarih: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Save size={18} /> Kaydet
                </button>
              </form>
            )}

            {aktifTab === 'davranis' && (
              <form onSubmit={handleDavranisKaydet} className="space-y-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                  <input
                    type="text"
                    placeholder="Örn: Derse Katılım"
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={davranisForm.baslik}
                    onChange={e => setDavranisForm({...davranisForm, baslik: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={davranisForm.tip}
                    onChange={e => setDavranisForm({...davranisForm, tip: e.target.value as 'Olumlu' | 'Olumsuz'})}
                  >
                    <option value="Olumlu">Olumlu</option>
                    <option value="Olumsuz">Olumsuz</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={davranisForm.aciklama}
                    onChange={e => setDavranisForm({...davranisForm, aciklama: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                    value={davranisForm.tarih}
                    onChange={e => setDavranisForm({...davranisForm, tarih: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Save size={18} /> Kaydet
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Liste Alanı */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-4 border-b border-gray-100 bg-gray-50 font-semibold text-gray-700">
              {aktifTab === 'not' && 'Not Geçmişi'}
              {aktifTab === 'devamsizlik' && 'Devamsızlık Geçmişi'}
              {aktifTab === 'davranis' && 'Davranış Geçmişi'}
             </div>

             {aktifTab === 'not' && (
               <table className="w-full text-left">
                 <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                   <tr>
                     <th className="p-4">Tarih</th>
                     <th className="p-4">Ders</th>
                     <th className="p-4">Tip</th>
                     <th className="p-4">Puan</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {ogrenciNotlari.map(not => (
                     <tr key={not.id} className="text-gray-900">
                       <td className="p-4 text-sm">{not.tarih}</td>
                       <td className="p-4">{not.dersAdi}</td>
                       <td className="p-4 text-sm">{not.notTipi}</td>
                       <td className="p-4 font-bold">{not.puan}</td>
                     </tr>
                   ))}
                   {ogrenciNotlari.length === 0 && (
                     <tr><td colSpan={4} className="p-4 text-center text-gray-500">Kayıt bulunamadı.</td></tr>
                   )}
                 </tbody>
               </table>
             )}

             {aktifTab === 'devamsizlik' && (
               <table className="w-full text-left">
                 <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                   <tr>
                     <th className="p-4">Tarih</th>
                     <th className="p-4">Tür</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {ogrenciDevamsizliklari.map(dev => (
                     <tr key={dev.id} className="text-gray-900">
                       <td className="p-4 text-sm flex items-center gap-2">
                         <Calendar size={16} className="text-gray-400" />
                         {dev.tarih}
                       </td>
                       <td className="p-4">
                         <span className={`px-2 py-1 rounded text-xs font-semibold
                           ${dev.tur === 'Tam' ? 'bg-red-100 text-red-700' :
                             dev.tur === 'Yarım' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                           {dev.tur}
                         </span>
                       </td>
                     </tr>
                   ))}
                    {ogrenciDevamsizliklari.length === 0 && (
                     <tr><td colSpan={2} className="p-4 text-center text-gray-500">Kayıt bulunamadı.</td></tr>
                   )}
                 </tbody>
               </table>
             )}

             {aktifTab === 'davranis' && (
               <div className="p-4 space-y-4">
                 {ogrenciDavranislari.map(dav => (
                   <div key={dav.id} className={`p-4 rounded-lg border ${dav.tip === 'Olumlu' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                     <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                         <Star size={18} className={dav.tip === 'Olumlu' ? 'text-green-600' : 'text-red-600'} />
                         <span className="font-bold text-gray-800">{dav.baslik}</span>
                       </div>
                       <span className="text-xs text-gray-500">{dav.tarih}</span>
                     </div>
                     <p className="text-gray-700 text-sm">{dav.aciklama}</p>
                   </div>
                 ))}
                 {ogrenciDavranislari.length === 0 && (
                   <div className="text-center text-gray-500">Kayıt bulunamadı.</div>
                 )}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
