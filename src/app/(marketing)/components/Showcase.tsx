"use client";

import React from 'react';
import { ExternalLink, Star } from 'lucide-react';

export default function Showcase() {
  const examples = [
    {
      name: "Warisan Rasa Bunda",
      tagline: "Kelezatannya Melegenda",
      category: "Kuliner",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2052&auto=format&fit=crop",
      color: "bg-red-500"
    },
    {
      name: "Langkah Nyaman",
      tagline: "Sneaker Lokal Kualitas Global",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      color: "bg-blue-500"
    },
    {
      name: "Glow Nature",
      tagline: "Kecantikan Alami Setiap Hari",
      category: "Skincare",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2070&auto=format&fit=crop",
      color: "bg-green-500"
    }
  ];

  return (
    <section id="showcase" className="py-24 bg-zinc-50 dark:bg-black/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Eksplorasi Karya UMKM</h2>
            <p className="text-lg text-zinc-500 font-medium">Ribuan brand telah memulai langkah digitalnya bersama Storezy. Lihat bagaimana AI kami mengubah ide sederhana menjadi brand yang kuat.</p>
          </div>
          <button className="px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-zinc-50 active:scale-95 transition-all shadow-xl shadow-zinc-500/5">
            Lihat Lebih Banyak <ExternalLink size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {examples.map((item, index) => (
            <div key={index} className="group relative rounded-[40px] overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="aspect-4/5 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />
                
                <div className="absolute top-6 left-6">
                   <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                      {item.category}
                   </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <h4 className="text-2xl font-black mb-1">{item.name}</h4>
                  <p className="text-sm font-medium text-white/70 italic">{item.tagline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
