"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag, Shield, Zap, Star, ChevronDown,
  MapPin, Clock, CheckCircle2, ArrowRight, Sparkles
} from 'lucide-react';

interface StoreHeroProps {
  name: string;
  tagline?: string;
  description?: string;
  logoUrl?: string;
  productCount?: number;
}

const STAT_ITEMS = [
  { icon: Star,         value: '4.9',     label: 'Rating' },
  { icon: CheckCircle2, value: '100%',    label: 'Terpercaya' },
  { icon: Zap,          value: '< 1 Jam', label: 'Respons' },
  { icon: Shield,       value: 'Aman',    label: 'Transaksi' },
];

export default function StoreHero({
  name, tagline, description, logoUrl, productCount,
}: StoreHeroProps) {
  const [imgError, setImgError] = useState(false);

  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const showLogo = logoUrl && !imgError;

  return (
    <section className="relative overflow-hidden">

      {/* ── Refined Boutique Canvas ── */}
      <div className="relative min-h-[85vh] flex flex-col justify-end bg-stone-50 dark:bg-zinc-950 transition-colors duration-700">

        {/* ── Soft Aura Background ── */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
          {/* Base soft glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(217,119,6,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_-20%,rgba(217,119,6,0.05),transparent)]" />

          {/* ── Organic Floating Auras (Warmer Colors) ── */}
          <div className="absolute top-[-15%] left-[10%] w-[700px] h-[700px] rounded-full bg-orange-100/40 dark:bg-orange-950/10 blur-[130px] animate-float opacity-60" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-rose-100/30 dark:bg-rose-950/10 blur-[120px] animate-float-reverse opacity-50" />
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-amber-50/50 dark:bg-amber-900/5 blur-[100px] animate-float-slow opacity-40" />

          {/* Grainy "Paper" Texture Overlay for warmth and tactile feel */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] grayscale mix-blend-multiply dark:mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/felt.png")' }} />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-12 sm:pt-18 pb-12">

          {/* Logo */}
          <div className="relative mb-8 animate-fadeInUp">
            <div className="relative p-1 rounded-[32px] sm:rounded-[36px] bg-white dark:bg-zinc-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] border border-stone-200/50 dark:border-zinc-800 transition-transform duration-500 hover:scale-[1.02]">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[28px] sm:rounded-[32px] overflow-hidden bg-stone-100 dark:bg-zinc-800">
                {showLogo ? (
                  <Image src={logoUrl} alt={name} fill className="object-cover" priority onError={() => setImgError(true)} />
                ) : (
                  <div className="w-full h-full bg-stone-100 dark:bg-zinc-800 flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-serif font-medium text-stone-400 dark:text-zinc-600 tracking-tight">{initials}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="animate-fadeInUp delay-100 inline-flex items-center gap-2 px-4 py-1.5 mb-6 sm:mb-8 bg-stone-100/80 dark:bg-zinc-800/50 backdrop-blur-md rounded-full border border-stone-200/50 dark:border-zinc-700/50">
            <Sparkles size={11} className="text-amber-600 dark:text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 dark:text-zinc-400">
              Premium Collection
            </span>
          </div>

          {/* Store name — Using Serif for Elegance */}
          <h1 className="animate-fadeInUp delay-200 text-4xl sm:text-6xl md:text-7xl font-serif text-stone-900 dark:text-white leading-[1.2] sm:leading-[1.1] mb-5 sm:mb-6 max-w-4xl tracking-tight px-4 sm:px-0">
            {name}
          </h1>

          {/* Tagline — Lighter and cleaner */}
          {tagline && (
            <p className="animate-fadeInUp delay-300 text-base sm:text-xl text-stone-500 dark:text-zinc-400 font-serif italic mb-6 max-w-2xl mx-auto leading-relaxed px-4">
              &ldquo;{tagline}&rdquo;
            </p>
          )}

          {/* Description — Warmer text color */}
          {description && (
            <p className="animate-fadeInUp delay-300 text-sm sm:text-base text-stone-400 dark:text-zinc-500 max-w-lg mx-auto leading-relaxed mb-10 font-medium px-4">
              {description}
            </p>
          )}

          {/* Meta row — Softer presentation */}
          <div className="animate-fadeInUp delay-400 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-stone-400 dark:text-zinc-600 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-10 sm:mb-12 px-4">
            <span className="flex items-center gap-2"><MapPin size={12} className="text-amber-600/60" /> Indonesia</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-stone-200 dark:bg-zinc-800" />
            <span className="flex items-center gap-2"><Clock size={12} className="text-amber-600/60" /> Daily Support</span>
            {productCount !== undefined && productCount > 0 && (
              <>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-stone-200 dark:bg-zinc-800" />
                <span className="flex items-center gap-2"><ShoppingBag size={12} className="text-amber-600/60" /> {productCount} Koleksi</span>
              </>
            )}
          </div>

          {/* CTA — Warm & Soft Buttons */}
          <div className="animate-fadeInUp delay-500 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-6 sm:px-0">
            <a
              href="#katalog"
              className="w-full sm:w-auto group flex items-center justify-center gap-3 px-10 py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full text-sm font-bold transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_40px_-12px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:scale-95"
            >
              <ShoppingBag size={17} className="transition-transform group-hover:scale-110" />
              <span>Mulai Belanja</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto px-9 py-4 border border-stone-200 dark:border-zinc-800 text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:border-stone-400 dark:hover:border-zinc-600 rounded-full text-sm font-bold transition-all active:scale-95"
            >
              Tentang Kami
            </Link>
          </div>
        </div>

        {/* ── Elegant Trust Bar ── */}
        <div className="relative z-10 w-full">
          <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-t border-stone-100 dark:border-zinc-800/50">
            <div className="max-w-5xl mx-auto flex flex-wrap sm:flex-nowrap justify-between">
              {STAT_ITEMS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex-1 min-w-[50%] sm:min-w-0 flex flex-col items-center gap-1 py-8 sm:py-10 transition-all duration-500 hover:bg-stone-50/50 dark:hover:bg-zinc-800/30 border-b sm:border-b-0 border-stone-50 dark:border-zinc-800/30 sm:border-r last:border-r-0 last:border-b-0"
                >
                  <Icon size={16} className="text-stone-400 dark:text-zinc-600 mb-1.5 transition-colors group-hover:text-amber-600" />
                  <span className="text-lg sm:text-xl font-serif text-stone-900 dark:text-white">{value}</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative transition */}
      <div className="h-24 bg-linear-to-b from-stone-50 to-white dark:from-zinc-950 dark:to-zinc-950" />
    </section>
  );
}
