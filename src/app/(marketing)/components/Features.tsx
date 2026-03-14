"use client";

import React, { useState } from 'react';
import { BrainCircuit, CreditCard, LayoutTemplate, Zap, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

const features = [
  {
    id: 'ai',
    icon: BrainCircuit,
    label: 'AI Generator',
    title: 'Biarkan AI Bekerja untuk Anda',
    description:
      'Cukup masukkan nama bisnis Anda. AI Storezy akan secara otomatis merancang tagline, deskripsi produk yang persuasif, dan identitas brand yang kuat — siap pakai dalam hitungan detik.',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-100 dark:border-violet-800/50',
    accent: 'text-violet-600 dark:text-violet-400',
    checks: ['Deskripsi produk otomatis', 'Tagline brand yang kuat', 'Nama toko dari kata kuncimu'],
    visual: (
      <div className="relative w-full h-full flex flex-col gap-3 p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-black shrink-0">AI</div>
          <div className="flex-1 bg-white dark:bg-zinc-800 rounded-2xl rounded-tl-sm p-3 shadow-sm">
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">Saya telah membuat tagline untuk <span className="font-bold text-violet-600">"Kedai Kopi Senja"</span>: <br/><span className="italic">"Rasa Otentik di Setiap Tetes"</span> ☕</p>
          </div>
        </div>
        <div className="flex items-start gap-3 flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 text-xs font-black shrink-0">U</div>
          <div className="flex-1 bg-violet-500 rounded-2xl rounded-tr-sm p-3">
            <p className="text-xs text-white leading-relaxed">Bagus! Sekarang buat deskripsi 3 produk ya</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-black shrink-0">AI</div>
          <div className="flex-1 bg-white dark:bg-zinc-800 rounded-2xl rounded-tl-sm p-3 shadow-sm">
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">Siap! Deskripsi 3 produk sudah dibuat dan langsung dipasang di tokomu ✅</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'payment',
    icon: CreditCard,
    label: 'Payment Gateway',
    title: 'Terima Pembayaran Tanpa Kerumitan',
    description:
      'Storezy terintegrasi penuh dengan Mayar.id. Pelanggan dapat membayar lewat QRIS, e-wallet, atau transfer bank — semua langsung masuk ke rekening Anda, tanpa setup manual.',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-100 dark:border-blue-800/50',
    accent: 'text-blue-600 dark:text-blue-400',
    checks: ['QRIS & E-Wallet support', 'Transfer bank otomatis', 'Riwayat transaksi real-time'],
    visual: (
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 p-4">
        <div className="w-32 h-32 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg flex items-center justify-center relative">
          <div className="grid grid-cols-5 grid-rows-5 gap-0.5">
            {Array.from({length:25}).map((_,i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${[0,4,1,2,3,5,9,10,14,15,19,20,24,21,22,23,6,12,18].includes(i) ? 'bg-blue-600' : 'bg-white dark:bg-zinc-700'}`} />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">S</div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {['QRIS','GoPay','OVO','Dana','BCA'].map(m => (
            <span key={m} className="px-2.5 py-1 bg-white dark:bg-zinc-800 rounded-full text-[10px] font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-700 shadow-sm">{m}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'design',
    icon: LayoutTemplate,
    label: 'Layout Premium',
    title: 'Tampilan yang Memanjakan Pelanggan',
    description:
      'Setiap toko yang dibuat lewat Storezy tampil profesional di semua perangkat. Mobile-first design, cepat loading, dan dirancang khusus agar konversi penjualan Anda maksimal.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-100 dark:border-amber-800/50',
    accent: 'text-amber-600 dark:text-amber-400',
    checks: ['Responsif di semua device', 'Loading cepat & SEO-friendly', 'Desain mengutamakan konversi'],
    visual: (
      <div className="relative w-full h-full flex items-center justify-center gap-3 p-4">
        {/* Mobile */}
        <div className="w-20 h-36 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-gray-200 dark:border-zinc-700 shadow-lg overflow-hidden flex flex-col">
          <div className="h-1.5 bg-amber-500 rounded-full mx-2 mt-2" />
          <div className="flex-1 p-1.5 space-y-1">
            <div className="h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg" />
            <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded w-3/4" />
            <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded w-1/2" />
            <div className="h-5 bg-amber-500 rounded-md" />
          </div>
        </div>
        {/* Desktop */}
        <div className="w-40 h-28 bg-white dark:bg-zinc-800 rounded-xl border-2 border-gray-200 dark:border-zinc-700 shadow-lg overflow-hidden flex flex-col">
          <div className="h-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-700 flex items-center px-2 gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 p-2 grid grid-cols-2 gap-1.5">
            <div className="col-span-2 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-md" />
            <div className="h-6 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
            <div className="h-6 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'instant',
    icon: Zap,
    label: 'Instan & Zero Code',
    title: 'Dari Ide ke Toko dalam 60 Detik',
    description:
      'Tidak perlu keahlian teknis. Tidak perlu sewa developer. Cukup isi formulir, AI akan membangun seluruh infrastruktur digital bisnis Anda — dan Anda bisa langsung berjualan.',
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-100 dark:border-green-800/50',
    accent: 'text-green-600 dark:text-green-400',
    checks: ['Setup < 60 detik', 'Tanpa koding sama sekali', 'Langsung live & siap jualan'],
    visual: (
      <div className="relative w-full h-full flex flex-col justify-center gap-2 p-4">
        {[
          { step: '1', label: 'Isi nama bisnis', done: true },
          { step: '2', label: 'AI generate konten', done: true },
          { step: '3', label: 'Review & publish', done: true },
          { step: '4', label: 'Toko live & siap!', done: true, highlight: true },
        ].map((s) => (
          <div key={s.step} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${s.highlight ? 'bg-green-500 text-white' : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'} shadow-sm`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${s.highlight ? 'bg-white text-green-600' : 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400'}`}>
              {s.done ? '✓' : s.step}
            </div>
            <span className="text-xs font-bold">{s.label}</span>
            {s.highlight && <span className="ml-auto text-[10px] font-black opacity-80">60 detik</span>}
          </div>
        ))}
      </div>
    ),
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const f = features[active];

  return (
    <section id="features" className="py-28 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-[11px] font-black uppercase tracking-widest mb-5">
            Semua yang Anda Butuhkan
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 text-zinc-900 dark:text-white">
            Kekuatan AI di{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">
              Tangan UMKM
            </span>
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Dari ide ke toko online yang profesional — Storezy menangani semuanya. Fokus Anda hanya pada produk dan pelanggan.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {features.map((feat, i) => (
            <button
              key={feat.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border ${
                active === i
                  ? `bg-linear-to-r ${feat.color} text-white border-transparent shadow-lg`
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <feat.icon size={15} />
              {feat.label}
            </button>
          ))}
        </div>

        {/* Active Feature Detail */}
        <div className={`rounded-[36px] border ${f.border} ${f.bg} overflow-hidden transition-all duration-300`}>
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Left: Text */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className={`inline-flex items-center gap-2.5 w-fit px-4 py-1.5 rounded-full bg-white/70 dark:bg-white/10 border border-zinc-200/80 dark:border-white/10 ${f.accent} text-[11px] font-black uppercase tracking-widest mb-6`}>
                <f.icon size={13} />
                {f.label}
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-5 leading-tight">
                {f.title}
              </h3>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                {f.description}
              </p>
              <ul className="space-y-3 mb-10">
                {f.checks.map((c) => (
                  <li key={c} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className={`${f.accent} shrink-0`} />
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{c}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/generate"
                className={`w-fit inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black text-white bg-linear-to-r ${f.color} hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg`}
              >
                Coba Sekarang <ArrowRight size={16} />
              </a>
            </div>

            {/* Right: Visual */}
            <div className="relative min-h-[320px] lg:min-h-0 flex items-center justify-center p-8">
              <div className="w-full max-w-sm aspect-video rounded-2xl border border-white/60 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden">
                {f.visual}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom row — mini stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: '500+', sub: 'UMKM Aktif' },
            { label: '< 60 dtk', sub: 'Waktu Setup' },
            { label: '99%', sub: 'Kepuasan Pengguna' },
            { label: 'Gratis', sub: 'Untuk Memulai' },
          ].map((s) => (
            <div
              key={s.label}
              className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-center"
            >
              <div className="text-2xl font-black text-zinc-900 dark:text-white">{s.label}</div>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
