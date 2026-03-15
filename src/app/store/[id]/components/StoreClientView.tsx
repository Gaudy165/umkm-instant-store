"use client";

import React, { useState } from 'react';
import StoreHero from './StoreHero';
import ProductCard from './ProductCard';
import { Store } from '@/types/store';
import { Package, Sparkles, LayoutGrid, List, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface StoreClientViewProps {
  store: Store;
}

export default function StoreClientView({ store }: StoreClientViewProps) {
  const count = store.products?.length ?? 0;
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-12 transition-colors duration-700">

      {/* Hero */}
      <StoreHero
        name={store.name}
        tagline={store.tagline}
        description={store.description}
        logoUrl={store.logoUrl}
        productCount={count}
      />

      {/* ── Catalog ── */}
      <section id="katalog" className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-10">

        {/* ── Catalog Header — Elegant & Focused ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="h-px w-6 sm:w-8 bg-stone-200 dark:bg-zinc-800" />
              <p className="text-[9px] sm:text-[10px] font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-[0.3em]">Our Collection</p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-stone-900 dark:text-white tracking-tight leading-tight">
              Pilihan Koleksi Terbaik
              <span className="block sm:inline sm:ml-4 mt-1 sm:mt-0 text-base sm:text-lg font-serif italic text-stone-400 dark:text-zinc-600">
                 ({count} items)
              </span>
            </h2>
          </div>

          {/* Layout Toggle */}
          {count > 0 && (
            <div className="hidden sm:flex items-center p-1.5 bg-stone-50 dark:bg-zinc-900 rounded-2xl border border-stone-100 dark:border-zinc-800 shadow-sm self-start">
              {(['grid', 'list'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLayout(mode)}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${layout === mode
                    ? 'bg-white dark:bg-zinc-800 shadow-sm text-amber-700 dark:text-amber-500'
                    : 'text-stone-400 hover:text-stone-600 dark:hover:text-zinc-500'
                  }`}
                >
                  {mode === 'grid' ? <LayoutGrid size={18} /> : <List size={18} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid — Staggered and Airy */}
        {count > 0 ? (
          <div className={
            layout === 'grid'
              ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-10'
              : 'flex flex-col gap-6'
          }>
            {store.products!.map((product, i) => (
              <div
                key={product.id || i}
                className="animate-fadeInUp"
                style={{ animationDelay: `${Math.min(i * 100, 800)}ms` }}
              >
                <ProductCard product={product} layout={layout} />
              </div>
            ))}
          </div>
        ) : (
          /* ── Artistic Empty State ── */
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <div className="relative mb-10 group">
              {/* Soft aura behind */}
              <div className="absolute inset-0 scale-150 bg-stone-100 dark:bg-zinc-900 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-32 h-32 rounded-[40px] bg-white dark:bg-zinc-900 border border-stone-100 dark:border-zinc-800 flex items-center justify-center shadow-sm">
                <Package size={36} strokeWidth={1} className="text-stone-300 dark:text-zinc-700 animate-float" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-stone-900 dark:bg-stone-50 rounded-2xl flex items-center justify-center text-white dark:text-stone-900 shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-serif text-stone-900 dark:text-white mb-4 tracking-tight">Menyiapkan Koleksi Baru</h3>
            <p className="text-stone-400 dark:text-zinc-500 max-w-sm leading-relaxed mb-10 font-medium">
              Kami sedang mengkurasi produk terbaik untuk Anda. Silakan kembali lagi nanti untuk melihat pembaruan koleksi kami.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-10 py-3.5 bg-stone-100 dark:bg-zinc-900 text-stone-600 dark:text-zinc-400 rounded-full text-sm font-bold hover:bg-stone-200 dark:hover:bg-zinc-800 transition-all border border-stone-200 dark:border-zinc-800"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <footer className="max-w-7xl mx-auto px-6 mt-12">
        <div className="py-6 border-t border-stone-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
           {/* Boutique Identity */}
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-stone-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-stone-900 font-serif text-sm shadow-sm">
                {store.name[0]}
              </div>
              <div className="flex flex-col">
                <h4 className="font-serif text-base text-stone-900 dark:text-white leading-none">{store.name}</h4>
                <p className="text-[10px] font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-widest mt-1.5 leading-none">
                  Precision Boutique Experience
                </p>
              </div>
           </div>

           {/* Legal & Credits */}
           <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
             <p className="text-[10px] font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-widest leading-none">
               © {new Date().getFullYear()} — All rights reserved
             </p>
             <div className="h-4 w-px bg-stone-100 dark:bg-zinc-800 hidden md:block" />
             <Link
                href="/"
                className="group flex items-center gap-2 text-[10px] font-bold text-stone-400 hover:text-amber-700 transition-colors uppercase tracking-widest leading-none"
              >
                Powered by Storezy
                <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
           </div>
        </div>
      </footer>

    </div>
  );
}
