"use client";

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Star, ArrowRight, ShoppingBag, TrendingUp } from 'lucide-react';

const examples = [
  {
    name: 'Warisan Rasa Bunda',
    tagline: 'Kelezatannya Melegenda',
    category: 'Kuliner',
    image: '/images/showcase/kuliner.png',
    color: 'from-red-500 to-orange-500',
    bg: 'bg-red-50 dark:bg-red-950/20',
    stats: { orders: '1.2K', rating: '4.9', revenue: 'Rp 18 Jt' },
    products: ['Rendang Spesial', 'Gulai Ayam', 'Nasi Padang'],
  },
  {
    name: 'Langkah Nyaman',
    tagline: 'Sneaker Lokal Kualitas Global',
    category: 'Fashion',
    image: '/images/showcase/fashion.png',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    stats: { orders: '876', rating: '4.8', revenue: 'Rp 24 Jt' },
    products: ['Running Series', 'Casual Low', 'Limited Ed'],
  },
  {
    name: 'Glow Nature',
    tagline: 'Kecantikan Alami Setiap Hari',
    category: 'Skincare',
    image: '/images/showcase/skincare.png',
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
    avatar: '/images/testimonials/rina.png',
    rating: 5,
  },
  {
    name: 'Budi Santoso',
    role: 'Owner Langkah Nyaman',
    text: 'Dulu butuh developer dan bayar jutaan untuk buat toko online. Sekarang pakai Storezy cuma 5 menit dan hasilnya jauh lebih profesional.',
    avatar: '/images/testimonials/budi.png',
    rating: 5,
  },
  {
    name: 'Sari Dewi',
    role: 'Founder Glow Nature',
    text: 'Omzet naik 3x lipat setelah pakai Storezy. Payment-nya lancar, tampilan tokonya cantik, dan pelanggan makin percaya sama brand saya.',
    avatar: '/images/testimonials/sari.png',
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
      </div>

      {/* ── Store cards ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examples.map((item) => (
            <div
              key={item.name}
              className="group relative bg-white dark:bg-zinc-900 rounded-[24px] border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
            >
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Subtle gradient overlay for better contrast on badges if needed, but keeping it light */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200 border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">{item.stats.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 line-clamp-1">
                  {item.tagline}
                </p>

                {/* Subtler Products list */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.products.slice(0, 2).map((p) => (
                    <span key={p} className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tight">
                      • {p}
                    </span>
                  ))}
                  {item.products.length > 2 && (
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tight">
                      + {item.products.length - 2} more
                    </span>
                  )}
                </div>

                {/* Subtle CTA */}
                <div className="pt-4 border-t border-zinc-50 dark:border-zinc-800/50 flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 group-hover:text-blue-500 transition-colors">
                    Kunjungi Toko
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
              
              {/* Invisible Link Overlay */}
              <a href="#" className="absolute inset-0 z-10" aria-label={`Buka ${item.name}`}></a>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* ── Testimonials ── */}
        <div className="mb-6 mt-20">
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
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 shadow-sm shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-zinc-900 dark:text-white truncate">{t.name}</p>
                    <p className="text-xs text-zinc-400 font-medium truncate">{t.role}</p>
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
