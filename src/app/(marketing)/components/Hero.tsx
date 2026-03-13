"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Store, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles size={14} className="animate-pulse" />
            Platform AI untuk UMKM Indonesia
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8 text-zinc-900 dark:text-white animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Punya Toko Online <br />
            <span className="text-blue-600">Dalam Hitungan Detik.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            Biarkan AI Storezy membangunkan identitas brand, deskripsi produk, hingga toko online siap pakai untuk bisnis Anda. Tanpa ribet, langsung jualan.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <Link 
              href="/generate"
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-3xl text-xl font-black hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3"
            >
              Bangun Tokomu Gratis <ArrowRight size={24} />
            </Link>
            
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-zinc-900 dark:text-white">500+</span>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">UMKM Aktif</span>
              </div>
              <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-zinc-900 dark:text-white">99%</span>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Kepuasan AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Preview / Floating Cards */}
        <div className="mt-24 relative animate-in fade-in zoom-in duration-1000 delay-500">
          <div className="rounded-[40px] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-100 dark:bg-zinc-900">
             <div className="h-12 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center px-6 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 h-6 w-full max-w-xs bg-zinc-100 dark:bg-zinc-800 rounded-md" />
             </div>
             <div className="aspect-video bg-zinc-50 dark:bg-black/40 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-blue-500/20">
                    <Store size={48} />
                  </div>
                  <h3 className="text-3xl font-black mb-2">Kedai Kopi Senja</h3>
                  <p className="text-zinc-500 font-medium italic">Rasa Otentik di Setiap Tetes</p>
                </div>
             </div>
          </div>

          {/* Floating Trust Cards */}
          <div className="absolute -top-10 -right-10 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl hidden lg:block hover:-translate-y-2 transition-transform duration-500">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-sm font-black">Payment Terintegrasi</p>
                  <p className="text-xs text-zinc-500 font-medium">Layanan Mayar.id Aman</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
