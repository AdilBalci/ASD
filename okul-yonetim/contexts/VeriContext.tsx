'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Ogrenci, SinavNotu, Devamsizlik, DavranisNotu } from '@/types/veriTipleri';

// Başlangıç verileri (Mock Data)
const ornekOgrenciler: Ogrenci[] = [
  { id: '1', ad: 'Ali', soyad: 'Yılmaz', numara: '101', sinif: '5-A', veliAdi: 'Mehmet Yılmaz' },
  { id: '2', ad: 'Ayşe', soyad: 'Demir', numara: '102', sinif: '5-A', veliAdi: 'Fatma Demir' },
  { id: '3', ad: 'Burak', soyad: 'Çelik', numara: '103', sinif: '5-B', veliAdi: 'Hasan Çelik' },
];

const ornekNotlar: SinavNotu[] = [
  { id: '1', ogrenciId: '1', dersAdi: 'Matematik', puan: 85, tarih: '2023-10-10', notTipi: 'Yazılı' },
  { id: '2', ogrenciId: '1', dersAdi: 'Türkçe', puan: 90, tarih: '2023-10-12', notTipi: 'Yazılı' },
  { id: '3', ogrenciId: '2', dersAdi: 'Matematik', puan: 70, tarih: '2023-10-10', notTipi: 'Yazılı' },
];

const ornekDevamsizliklar: Devamsizlik[] = [
  { id: '1', ogrenciId: '1', tarih: '2023-09-20', tur: 'Tam' },
];

const ornekDavranislar: DavranisNotu[] = [
  { id: '1', ogrenciId: '1', baslik: 'Derse Katılım', aciklama: 'Derse çok aktif katıldı.', tarih: '2023-10-15', tip: 'Olumlu' },
];

interface VeriContextTipi {
  ogrenciler: Ogrenci[];
  notlar: SinavNotu[];
  devamsizliklar: Devamsizlik[];
  davranisNotlari: DavranisNotu[];
  ogrenciEkle: (ogrenci: Ogrenci) => void;
  notEkle: (not: SinavNotu) => void;
  devamsizlikEkle: (devamsizlik: Devamsizlik) => void;
  davranisNotuEkle: (davranis: DavranisNotu) => void;
  veriSifirla: () => void;
}

const VeriContext = createContext<VeriContextTipi | undefined>(undefined);

export function VeriSaglayici({ children }: { children: ReactNode }) {
  const [ogrenciler, setOgrenciler] = useState<Ogrenci[]>([]);
  const [notlar, setNotlar] = useState<SinavNotu[]>([]);
  const [devamsizliklar, setDevamsizliklar] = useState<Devamsizlik[]>([]);
  const [davranisNotlari, setDavranisNotlari] = useState<DavranisNotu[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  // Uygulama ilk açıldığında localStorage'dan veya mock veriden yükle
  useEffect(() => {
    const kayitliVeri = localStorage.getItem('okulVerileri');
    if (kayitliVeri) {
      const veri = JSON.parse(kayitliVeri);
      setOgrenciler(veri.ogrenciler || ornekOgrenciler);
      setNotlar(veri.notlar || ornekNotlar);
      setDevamsizliklar(veri.devamsizliklar || ornekDevamsizliklar);
      setDavranisNotlari(veri.davranisNotlari || ornekDavranislar);
    } else {
      setOgrenciler(ornekOgrenciler);
      setNotlar(ornekNotlar);
      setDevamsizliklar(ornekDevamsizliklar);
      setDavranisNotlari(ornekDavranislar);
    }
    setYukleniyor(false);
  }, []);

  // Veri değiştiğinde kaydet
  useEffect(() => {
    if (!yukleniyor) {
      const veri = { ogrenciler, notlar, devamsizliklar, davranisNotlari };
      localStorage.setItem('okulVerileri', JSON.stringify(veri));
    }
  }, [ogrenciler, notlar, devamsizliklar, davranisNotlari, yukleniyor]);

  const ogrenciEkle = (ogrenci: Ogrenci) => {
    setOgrenciler([...ogrenciler, ogrenci]);
  };

  const notEkle = (not: SinavNotu) => {
    setNotlar([...notlar, not]);
  };

  const devamsizlikEkle = (devamsizlik: Devamsizlik) => {
    setDevamsizliklar([...devamsizliklar, devamsizlik]);
  };

  const davranisNotuEkle = (davranis: DavranisNotu) => {
    setDavranisNotlari([...davranisNotlari, davranis]);
  };

  const veriSifirla = () => {
    setOgrenciler(ornekOgrenciler);
    setNotlar(ornekNotlar);
    setDevamsizliklar(ornekDevamsizliklar);
    setDavranisNotlari(ornekDavranislar);
    localStorage.removeItem('okulVerileri');
  };

  return (
    <VeriContext.Provider value={{
      ogrenciler,
      notlar,
      devamsizliklar,
      davranisNotlari,
      ogrenciEkle,
      notEkle,
      devamsizlikEkle,
      davranisNotuEkle,
      veriSifirla
    }}>
      {children}
    </VeriContext.Provider>
  );
}

export function useVeri() {
  const context = useContext(VeriContext);
  if (context === undefined) {
    throw new Error('useVeri must be used within a VeriSaglayici');
  }
  return context;
}
