"use client";

import React from 'react';
import { BrainCircuit, CreditCard, LayoutTemplate, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: "Generasi AI Cerdas",
      description: "Hanya butuh nama bisnis. AI kami akan merancang deskripsi, tagline, dan katalog produk yang super persuasif untuk Anda.",
      icon: BrainCircuit,
      color: "bg-purple-500",
      shadow: "shadow-purple-500/20"
    },
    {
      title: "Payment Gateway",
      description: "Terintegrasi dengan Mayar.id. Pelanggan bisa bayar lewat QRIS, E-wallet, atau Bank Transfer tanpa integrasi manual.",
      icon: CreditCard,
      color: "bg-blue-500",
      shadow: "shadow-blue-500/20"
    },
    {
      title: "Layout Premium",
      description: "Toko online Anda akan terlihat sangat profesional di semua perangkat. Mobile-first design yang memanjakan mata.",
      icon: LayoutTemplate,
      color: "bg-amber-500",
      shadow: "shadow-amber-500/20"
    },
    {
      title: "Instan & Tanpa Kode",
      description: "Lupakan ribetnya koding. Fokus pada kualitas produk Anda, biarkan Storezy menangani seluruh infrastruktur digitalnya.",
      icon: Zap,
      color: "bg-green-500",
      shadow: "shadow-green-500/20"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Kekuatan AI di Tangan UMKM</h2>
          <p className="text-lg text-zinc-500 font-medium">Beralih ke digital tidak pernah semudah ini. Fitur-fitur kami dirancang khusus untuk mempercepat pertumbuhan bisnis Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[32px] hover:shadow-2xl hover:shadow-zinc-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl ${feature.shadow} group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
