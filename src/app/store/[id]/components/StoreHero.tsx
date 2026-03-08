import React from 'react';

interface StoreHeroProps {
  name: string;
  tagline?: string;
  description?: string;
  logoUrl?: string;
}

export default function StoreHero({ name, tagline, description, logoUrl }: StoreHeroProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 bg-zinc-50 dark:bg-black -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-400/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-indigo-400/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        {logoUrl && (
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl shadow-blue-500/20">
            <img src={logoUrl} alt={name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full animate-fade-in">
          Selamat Datang di
        </div>
        <h1 className="text-5xl md:text-7xl font-black bg-linear-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent mb-6 tracking-tight">
          {name}
        </h1>
        {tagline && (
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto font-medium">
            "{tagline}"
          </p>
        )}
        {description && (
          <p className="text-zinc-500 dark:text-zinc-500 max-w-3xl mx-auto leading-relaxed text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
