"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Store, ShieldCheck, Zap, TrendingUp, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col justify-center overflow-hidden bg-[#f8faff] dark:bg-zinc-950">
      
      {/* ── Decorative background ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {/* Main blue blob */}
        <div className="absolute top-[-10%] left-[30%] w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[140px]" />
        {/* Indigo accent */}
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
        {/* Soft purple */}
        <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-violet-400/8 rounded-full blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* ── Left: Copy ── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700/60 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-[11px] font-black uppercase tracking-[0.15em] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles size={13} className="animate-pulse shrink-0" />
              Platform AI untuk UMKM Indonesia
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.92] mb-7 text-zinc-900 dark:text-white animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Punya Toko Online{' '}
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">
                  Dalam Hitungan
                </span>
              </span>
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-blue-600">
                  Detik.
                </span>
                {/* Underline decoration */}
                <span className="absolute -bottom-2 left-0 right-0 h-[5px] bg-linear-to-r from-blue-500/40 to-indigo-500/40 rounded-full blur-sm" />
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-lg mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Biarkan AI Storezy membangunkan identitas brand, deskripsi produk, hingga toko online siap pakai untuk bisnis Anda. <span className="font-semibold text-zinc-700 dark:text-zinc-300">Tanpa ribet, langsung jualan.</span>
            </p>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Link
                href="/generate"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-base font-black hover:from-blue-500 hover:to-indigo-500 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg transition-all duration-200 overflow-hidden"
              >
                {/* Shine effect */}
                <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <Zap size={18} className="shrink-0" />
                Bangun Toko Gratis
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#showcase"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5 transition-all duration-200 bg-white/60 dark:bg-white/5 backdrop-blur-sm"
              >
                Lihat Contoh Toko
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
              <div>
                <div className="text-2xl font-black text-zinc-900 dark:text-white">500+</div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">UMKM Aktif</div>
              </div>
              <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <div className="text-2xl font-black text-zinc-900 dark:text-white">99%</div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Kepuasan AI</div>
              </div>
              <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-zinc-900 dark:text-white">4.9</span>
                  <Star size={16} className="text-amber-400 fill-amber-400 mb-0.5" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Rating Pengguna</div>
              </div>
            </div>
          </div>

          {/* ── Right: Store card preview ── */}
          <div className="relative animate-in fade-in zoom-in-95 duration-700 delay-400 hidden lg:block">
            
            {/* Main Browser Mockup */}
            <div className="rounded-[28px] border border-zinc-200/80 dark:border-zinc-800 shadow-2xl shadow-zinc-300/30 dark:shadow-black/40 overflow-hidden bg-white dark:bg-zinc-900">
              {/* Browser chrome */}
              <div className="h-11 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <div className="ml-3 flex-1 h-6 max-w-[220px] bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center px-3 gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                </div>
              </div>
              
              {/* Store page preview */}
              <div className="bg-linear-to-br from-slate-50 to-blue-50/30 dark:from-zinc-900 dark:to-zinc-950 p-8">
                {/* Mini store header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Store size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-zinc-900 dark:text-white leading-none mb-0.5">Kedai Kopi Senja</div>
                      <div className="text-[10px] text-zinc-400 font-medium italic">Rasa Otentik di Setiap Tetes</div>
                    </div>
                  </div>
                  <div className="h-6 px-3 bg-blue-600 rounded-full text-white text-[9px] font-black flex items-center">AI Generated</div>
                </div>
                
                {/* Product grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Kopi Tubruk', price: 'Rp 15.000', color: 'from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20' },
                    { name: 'Es Kopi Susu', price: 'Rp 22.000', color: 'from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20' },
                    { name: 'Kopi Latte', price: 'Rp 28.000', color: 'from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20' },
                    { name: 'Cold Brew', price: 'Rp 32.000', color: 'from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20' },
                  ].map((item) => (
                    <div key={item.name} className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                      <div className={`h-20 bg-linear-to-br ${item.color} flex items-center justify-center`}>
                        <div className="w-10 h-10 bg-white/80 dark:bg-zinc-800/80 rounded-lg flex items-center justify-center text-lg">☕</div>
                      </div>
                      <div className="p-2.5">
                        <div className="text-[10px] font-black text-zinc-800 dark:text-white mb-0.5">{item.name}</div>
                        <div className="text-[10px] font-bold text-blue-600">{item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Floating cards ── */}

            {/* Payment card — top right */}
            <div className="absolute -top-5 -right-8 bg-white dark:bg-zinc-900 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/60 dark:shadow-black/40 flex items-center gap-3 hover:-translate-y-1 transition-transform duration-500">
              <div className="w-9 h-9 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-zinc-900 dark:text-white leading-none mb-0.5">Payment Aman</p>
                <p className="text-[10px] text-zinc-400 font-medium">Mayar.id Terintegrasi</p>
              </div>
            </div>

            {/* Revenue card — bottom left */}
            <div className="absolute -bottom-5 -left-8 bg-white dark:bg-zinc-900 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/60 dark:shadow-black/40 flex items-center gap-3 hover:-translate-y-1 transition-transform duration-500">
              <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-zinc-900 dark:text-white leading-none mb-0.5">+127% Penjualan</p>
                <p className="text-[10px] text-zinc-400 font-medium">Rata-rata bulan pertama</p>
              </div>
            </div>

            {/* AI badge — bottom right */}
            <div className="absolute -bottom-4 right-6 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center gap-2 hover:-translate-y-1 transition-transform duration-500">
              <Sparkles size={14} />
              <span className="text-xs font-black">Dibuat AI dalam 30 detik</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade-out */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
