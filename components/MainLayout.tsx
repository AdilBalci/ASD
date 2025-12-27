import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Öğretmen Paneli</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Merhaba, Öğretmen</span>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            Ö
          </div>
        </div>
      </header>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
