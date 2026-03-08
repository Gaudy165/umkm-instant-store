import React from 'react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-500/10 hover:-translate-y-1">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="aspect-square w-full bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 text-zinc-400 group-hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-100 dark:border-zinc-800">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a.75.75 0 01.75-.75H13.5a.75.75 0 010 1.5H9.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-500 text-sm line-clamp-2 min-h-[40px]">
            {product.description || "Tidak ada deskripsi produk."}
          </p>
        </div>
        
        <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-lg font-black text-blue-600 dark:text-blue-400">
            {formatPrice(product.price)}
          </span>
          <button className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-xl hover:opacity-90 transition-opacity">
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
