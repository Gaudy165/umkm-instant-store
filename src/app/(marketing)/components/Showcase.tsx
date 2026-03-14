"use client";

import React from 'react';
import { ExternalLink, Star, ArrowRight, CheckCircle2, Users, ShoppingBag, TrendingUp } from 'lucide-react';

const examples = [
  {
    name: 'Warisan Rasa Bunda',
    tagline: 'Kelezatannya Melegenda',
    category: 'Kuliner',
    emoji: '🍜',
    color: 'from-red-500 to-orange-500',
    bg: 'bg-red-50 dark:bg-red-950/20',
    stats: { orders: '1.2K', rating: '4.9', revenue: 'Rp 18 Jt' },
    products: ['Rendang Spesial', 'Gulai Ayam', 'Nasi Padang'],
  },
  {
    name: 'Langkah Nyaman',
    tagline: 'Sneaker Lokal Kualitas Global',
    category: 'Fashion',
    emoji: '👟',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    stats: { orders: '876', rating: '4.8', revenue: 'Rp 24 Jt' },
    products: ['Running Series', 'Casual Low', 'Limited Ed'],
  },
  {
    name: 'Glow Nature',
    tagline: 'Kecantikan Alami Setiap Hari',
    category: 'Skincare',
    emoji: '🌿',
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50 dark:bg-green-950/20',
    stats: { orders: '2.1K', rating: '5.0', revenue: 'Rp 31 Jt' },
    products: ['Face Serum', 'Toner Aloe', 'Night Cream'],
  },
];

const testimonials = [
  {
    name: 'Rina Kartika',
    role: 'Pemilik Warisan Rasa Bunda',
    text: 'Dalam 2 menit toko saya sudah jadi! AI-nya benar-benar ngerti bisnis kuliner saya. Deskripsi produknya bikin pelanggan langsung pengen beli.',
    avatar: '👩‍🍳',
    rating: 5,
  },
  {
    name: 'Budi Santoso',
    role: 'Owner Langkah Nyaman',
    text: 'Dulu butuh developer dan bayar jutaan untuk buat toko online. Sekarang pakai Storezy cuma 5 menit dan hasilnya jauh lebih profesional.',
    avatar: '👨‍💼',
    rating: 5,
  },
  {
    name: 'Sari Dewi',
    role: 'Founder Glow Nature',
    text: 'Omzet naik 3x lipat setelah pakai Storezy. Payment-nya lancar, tampilan tokonya cantik, dan pelanggan makin percaya sama brand saya.',
    avatar: '👱‍♀️',
    rating: 5,
  },
];

export default function Showcase() {
  return (
    <section id="showcase" className="py-28 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-[11px] font-black uppercase tracking-widest mb-5">
              Karya Nyata Pengguna Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-zinc-900 dark:text-white">
              UMKM Nyata,{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">
                Hasil Nyata
              </span>
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Ribuan pebisnis UMKM sudah memulai perjalanan digitalnya bersama Storezy. Ini adalah kisah sukses mereka.
            </p>
          </div>
          <a
            href="/generate"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-2xl font-bold hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-0.5 transition-all shadow-lg shadow-zinc-200/60 dark:shadow-black/20 text-sm"
          >
            Lihat Semua Toko <ExternalLink size={16} />
          </a>
        </div>

        {/* ── Store cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {examples.map((item) => (
            <div
              key={item.name}
              className="group relative rounded-[28px] overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-2xl hover:shadow-zinc-200/60 dark:hover:shadow-black/40 hover:-translate-y-2 transition-all duration-400"
            >
              {/* Card header with gradient */}
              <div className={`relative h-48 bg-linear-to-br ${item.color} flex flex-col items-center justify-center p-6 overflow-hidden`}>
                {/* Background texture */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                />
                {/* Store avatar */}
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl mb-3 ring-2 ring-white/30 shadow-xl">
                  {item.emoji}
                </div>
                <h4 className="text-white font-black text-lg text-center leading-tight">{item.name}</h4>
                <p className="text-white/70 text-xs font-medium italic mt-1">{item.tagline}</p>
                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                  {item.category}
                </div>
                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                  <Star size={10} className="text-amber-300 fill-amber-300" />
                  <span className="text-white text-[10px] font-black">{item.stats.rating}</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-zinc-500 dark:text-zinc-400 mb-1">
                      <ShoppingBag size={12} />
                    </div>
                    <p className="text-sm font-black text-zinc-900 dark:text-white">{item.stats.orders}</p>
                    <p className="text-[10px] text-zinc-400 font-medium">Pesanan</p>
                  </div>
                  <div className="text-center border-x border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-center gap-1 text-zinc-500 dark:text-zinc-400 mb-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                    </div>
                    <p className="text-sm font-black text-zinc-900 dark:text-white">{item.stats.rating}</p>
                    <p className="text-[10px] text-zinc-400 font-medium">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-zinc-500 dark:text-zinc-400 mb-1">
                      <TrendingUp size={12} />
                    </div>
                    <p className="text-sm font-black text-zinc-900 dark:text-white">{item.stats.revenue}</p>
                    <p className="text-[10px] text-zinc-400 font-medium">Omzet</p>
                  </div>
                </div>

                {/* Products */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.products.map((p) => (
                    <span key={p} className={`px-2.5 py-1 ${item.bg} rounded-full text-[11px] font-bold text-zinc-700 dark:text-zinc-300`}>
                      {p}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-2">
                  Lihat Toko <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Testimonials ── */}
        <div className="mb-6">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-2">
              Apa Kata Mereka?
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Ribuan pelaku UMKM sudah merasakannya langsung</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 bg-white dark:bg-zinc-900 rounded-[24px] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-black text-zinc-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-zinc-400 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
