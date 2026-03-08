"use client";

import React, { useEffect, useState, use } from 'react';
import StoreHero from './components/StoreHero';
import ProductCard from './components/ProductCard';
import { getStore } from '@/lib/storeService';
import { Store } from '@/types/store';

export default function StorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const data = await getStore(id);
        setStore(data as Store);
      } catch (error) {
        console.error("Error fetching store:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black p-6 text-center">
        <h1 className="text-4xl font-black mb-4">Toko Tidak Ditemukan</h1>
        <p className="text-zinc-500 mb-8 text-lg">Maaf, toko yang Anda cari tidak tersedia atau mungkin telah dihapus.</p>
        <a href="/" className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-2xl">
          Kembali ke Beranda
        </a>
      </div>
    );
  }

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
