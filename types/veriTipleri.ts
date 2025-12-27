export interface Ogrenci {
  id: string;
  ad: string;
  soyad: string;
  numara: string;
  sinif: string;
  veliAdi?: string;
}

export interface SinavNotu {
  id: string;
  ogrenciId: string;
  dersAdi: string;
  puan: number;
  tarih: string;
  notTipi: 'Yazılı' | 'Sözlü' | 'Proje';
}

export interface Devamsizlik {
  id: string;
  ogrenciId: string;
  tarih: string;
  tur: 'Tam' | 'Yarım' | 'İzinli';
}

export interface DavranisNotu {
  id: string;
  ogrenciId: string;
  baslik: string;
  aciklama: string;
  tarih: string;
  tip: 'Olumlu' | 'Olumsuz';
}
