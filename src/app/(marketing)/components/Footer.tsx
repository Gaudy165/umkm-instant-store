"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-blue-600 rounded-[48px] p-12 md:p-20 text-center mb-20 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight relative z-10">
            Siap Majukan Bisnis <br className="hidden md:block" /> UMKM Anda Hari Ini?
          </h2>
          <Link 
            href="/generate"
            className="inline-block px-12 py-5 bg-white text-blue-600 rounded-3xl text-xl font-black hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 relative z-10"
          >
            Mulai Sekarang — Gratis
          </Link>
          <p className="mt-8 text-blue-100 font-bold opacity-70 relative z-10">Tanpa biaya pendaftaran. Hanya butuh 1 menit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-20">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl">S</div>
              <span className="text-2xl font-black tracking-tighter">Storezy</span>
            </Link>
            <p className="text-zinc-500 font-medium max-w-sm mb-8">
              Platform revolusioner berbasis AI untuk memberdayakan UMKM Indonesia di era digital. Membangun toko online profesional secara instan.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-xs text-zinc-400">Produk</h4>
            <ul className="space-y-4 font-bold text-zinc-500">
              <li><Link href="/generate" className="hover:text-white transition-colors">AI Generator</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Integrasi Payment</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard Vendor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-xs text-zinc-400">Hubungi Kami</h4>
            <ul className="space-y-4 font-bold text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Email Bisnis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Panduan UMKM</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-zinc-600">© 2026 Storezy Inc. Dirancang untuk UMKM Indonesia.</p>
          <div className="flex gap-8 text-sm font-bold text-zinc-600">
             <a href="#" className="hover:text-white transition-colors">Privasi</a>
             <a href="#" className="hover:text-white transition-colors">Ketentuan</a>
             <a href="#" className="hover:text-white transition-colors">Bantuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
