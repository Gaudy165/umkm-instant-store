import React, { cache } from 'react';
import { Metadata } from 'next';
import { getStore } from '@/lib/storeService';
import { Store } from '@/types/store';
import StoreClientView from './components/StoreClientView';

// Cache data fetching to avoid multiple database calls
const getStoreCached = cache(async (id: string) => {
  return await getStore(id);
});

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const store = await getStoreCached(id) as Store;

  if (!store) {
    return {
      title: 'Toko Tidak Ditemukan - UMKM Instant Store',
    };
  }

  const title = `${store.name} | UMKM Instant Store`;
  const description = store.tagline || store.description || `Beli produk terbaik dari ${store.name} di UMKM Instant Store.`;
  const logoUrl = store.logoUrl || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: logoUrl ? [{ url: logoUrl, width: 800, height: 600, alt: store.name }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: logoUrl ? [logoUrl] : [],
    },
  };
}

export default async function StorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = await getStoreCached(id) as Store;

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

  return <StoreClientView store={store} />;
}
