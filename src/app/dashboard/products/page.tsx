"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/AuthContext';
import { getStoresByOwner, updateProductPrice } from '@/lib/storeService';
import { Edit2, Check, X, Package, ExternalLink } from 'lucide-react';

export default function ProductsPage() {
  const { user } = useAuth();
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ storeId: string, productId: string, price: number } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const data = await getStoresByOwner(user.uid);
        setStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleUpdatePrice = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await updateProductPrice(editing.storeId, editing.productId, editing.price);
      
      // Update local state
      setStores(prev => prev.map(s => {
        if (s.id === editing.storeId) {
          return {
            ...s,
            products: s.products.map((p: any) => 
              p.id === editing.productId ? { ...p, price: editing.price } : p
            )
          };
        }
        return s;
      }));
      setEditing(null);
    } catch (error) {
      console.error("Error updating price:", error);
      alert("Gagal memperbarui harga.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map(i => <div key={i} className="h-20 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />)}
    </div>;
  }

  return (
    <div className="space-y-12">
      {stores.length > 0 ? (
        stores.map((store) => (
          <div key={store.id} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl">
                  {store.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{store.name}</h3>
                  <p className="text-xs text-zinc-500 italic">{store.tagline}</p>
                </div>
              </div>
              <a 
                href={`/store/${store.id}`} 
                target="_blank" 
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                Lihat Toko <ExternalLink size={14} />
              </a>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 text-[10px] font-bold uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800">
                      <th className="px-6 py-4">Produk</th>
                      <th className="px-6 py-4">Deskripsi</th>
                      <th className="px-6 py-4">Harga (IDR)</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                    {store.products?.map((product: any) => (
                      <tr key={product.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center text-zinc-400">
                              {product.imageUrl ? (
                                <img src={product.imageUrl} className="w-full h-full object-cover" />
                              ) : (
                                <Package size={20} />
                              )}
                            </div>
                            <span className="text-sm font-bold text-zinc-900 dark:text-white">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-zinc-500 max-w-xs truncate">{product.description || '-'}</p>
                        </td>
                        <td className="px-6 py-4">
                          {editing && editing.productId === product.id ? (
                            <input 
                              autoFocus
                              type="number" 
                              value={editing.price} 
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setEditing(prev => prev ? { ...prev, price: val } : null);
                              }}
                              className="w-24 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border border-blue-500 rounded text-sm font-bold outline-none"
                            />
                          ) : (
                            <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                              Rp {product.price.toLocaleString('id-ID')}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {editing?.productId === product.id ? (
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={handleUpdatePrice}
                                disabled={saving}
                                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/10 rounded-lg transition-colors"
                              >
                                <Check size={18} />
                              </button>
                              <button 
                                onClick={() => setEditing(null)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => setEditing({ storeId: store.id, productId: product.id, price: product.price })}
                              className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors"
                            >
                              <Edit2 size={18} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-20 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 font-medium">Belum ada produk untuk dikelola.</p>
        </div>
      )}
    </div>
  );
}
