'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, User, Users, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <GraduationCap size={64} className="text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Okul Yönetim Sistemi</h1>
        <p className="text-gray-600">Lütfen giriş yapmak için rolünüzü seçin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {/* Öğretmen Girişi */}
        <Link href="/panel" className="group">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-transparent hover:border-blue-500 cursor-pointer h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
              <User size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Öğretmen</h2>
            <p className="text-sm text-gray-500">Not, devamsızlık ve davranış girişi yapın.</p>
          </div>
        </Link>

        {/* Veli Girişi */}
        <div className="group opacity-75 hover:opacity-100">
          <div className="bg-white p-8 rounded-xl shadow-md transition-all border border-transparent cursor-not-allowed h-full flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Yakında</div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
              <Users size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Veli</h2>
            <p className="text-sm text-gray-500">Öğrencinizin durumunu takip edin.</p>
          </div>
        </div>

        {/* Yönetici Girişi */}
        <div className="group opacity-75 hover:opacity-100">
          <div className="bg-white p-8 rounded-xl shadow-md transition-all border border-transparent cursor-not-allowed h-full flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Yakında</div>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
              <Shield size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Yönetici</h2>
            <p className="text-sm text-gray-500">Okul genel durumunu yönetin.</p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-sm text-gray-500">
        &copy; 2024 Okul Yönetim Sistemi MVP
      </div>
    </div>
  );
}
