"use client";

import React from 'react';
import StoreHero from './StoreHero';
import ProductCard from './ProductCard';
import { Store } from '@/types/store';

interface StoreClientViewProps {
  store: Store;
}

export default function StoreClientView({ store }: StoreClientViewProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-black pb-24">
      <StoreHero 
        name={store.name} 
        tagline={store.tagline} 
        description={store.description} 
        logoUrl={store.logoUrl}
      />
      
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black tracking-tight">Katalog Produk</h2>
          <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800 mx-8 hidden md:block" />
          <span className="text-zinc-500 font-medium">{store.products?.length || 0} Produk</span>
        </div>

        {store.products && store.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {store.products.map((product, index) => (
              <ProductCard key={product.id || index} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 text-lg">Belum ada produk yang tersedia di toko ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
