"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, ShieldCheck, Star, MessageCircle, Mail, BookOpen, Twitter, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  Produk: [
    { label: 'AI Generator', href: '/generate' },
    { label: 'Integrasi Payment', href: '#features' },
    { label: 'Dashboard Vendor', href: '/dashboard' },
    { label: 'Contoh Toko', href: '#showcase' },
  ],
  Perusahaan: [
    { label: 'Tentang Kami', href: '#' },
    { label: 'Blog & Tips UMKM', href: '#' },
    { label: 'Karir', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
  Bantuan: [
    { label: 'WhatsApp Support', href: '#' },
    { label: 'Email Bisnis', href: '#' },
    { label: 'Panduan UMKM', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
};

const trustBadges = [
  { icon: Zap, label: 'Setup < 60 Detik' },
  { icon: ShieldCheck, label: 'Pembayaran Aman' },
  { icon: Star, label: 'Rating 4.9 / 5.0' },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-hidden">

      {/* ── CTA Banner ── */}
      <div className="max-w-7xl mx-auto px-6 pt-20">
        <div className="relative rounded-[36px] overflow-hidden bg-linear-to-br from-blue-600 via-blue-600 to-indigo-700 p-12 md:p-16 text-center shadow-2xl shadow-blue-900/40">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-900/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-white/5 rounded-full blur-3xl" />
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>

          {/* Trust badges */}
          <div className="relative z-10 flex flex-wrap justify-center gap-3 mb-8">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-blue-50 text-xs font-bold">
                <Icon size={13} />
                {label}
              </div>
            ))}
          </div>

          <h2 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-4 text-white">
            Siap Majukan Bisnis{' '}
            <br className="hidden md:block" />
            UMKM Anda?
          </h2>
          <p className="relative z-10 text-blue-100/80 text-lg font-medium mb-10 max-w-xl mx-auto">
            Bergabung bersama 500+ pelaku UMKM yang sudah digital. Mulai gratis — tanpa kartu kredit.
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generate"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-blue-700 rounded-2xl text-base font-black hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20"
            >
              <Zap size={18} />
              Mulai Sekarang — Gratis
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#showcase"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white rounded-2xl text-base font-bold hover:bg-white/10 transition-all"
            >
              Lihat Contoh Toko
            </Link>
          </div>
        </div>
      </div>

      {/* ── Links grid ── */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 border-b border-white/8 pb-14">

          {/* Brand col */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg group-hover:scale-110 transition-transform">S</div>
              <span className="text-xl font-black tracking-tighter">Storezy</span>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs mb-8">
              Platform berbasis AI yang membantu pelaku UMKM Indonesia membangun toko online profesional secara instan — tanpa koding, tanpa ribet.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'Youtube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-500 hover:text-blue-600 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 hover:border-blue-200 dark:hover:border-white/20 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.15em] mb-5">{heading}</h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-600 font-medium">
            © 2026 Storezy Inc. Dirancang dengan ❤️ untuk UMKM Indonesia.
          </p>
          <div className="flex gap-6">
            {['Privasi', 'Ketentuan', 'Bantuan'].map((item) => (
              <a key={item} href="#" className="text-xs text-zinc-400 dark:text-zinc-600 font-medium hover:text-blue-600 dark:hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
