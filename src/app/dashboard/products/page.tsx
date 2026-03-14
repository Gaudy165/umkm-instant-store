"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/AuthContext';
import { getStoresByOwner, updateProductPrice } from '@/lib/storeService';
import {
  Edit2,
  Check,
  X,
  Package,
  ExternalLink,
  Sparkles,
  Search,
  Store as StoreIcon,
  Tag,
  ChevronDown,
  LayoutGrid,
  List,
} from 'lucide-react';

/* ── Price edit state shape ── */
type Editing = { storeId: string; productId: string; price: number } | null;

/* ── Product Card (grid view) ── */
function ProductCard({
  product,
  store,
  editing,
  saving,
  onStartEdit,
  onUpdatePrice,
  onCancelEdit,
  onPriceChange,
}: {
  product: any;
  store: any;
  editing: Editing;
  saving: boolean;
  onStartEdit: () => void;
  onUpdatePrice: () => void;
  onCancelEdit: () => void;
  onPriceChange: (v: number) => void;
}) {
  const isEditing = editing?.productId === product.id;

  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-200/60 dark:hover:shadow-black/30 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Product image */}
      <div className="relative h-40 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-zinc-300 dark:text-zinc-600">
            <Package size={32} />
            <span className="text-[10px] font-medium">Tanpa Gambar</span>
          </div>
        )}
        {/* Category badge */}
        {product.category && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-zinc-600 dark:text-zinc-400 border border-white/60 dark:border-zinc-700">
            {product.category}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-sm font-black text-zinc-900 dark:text-white leading-tight mb-1.5 line-clamp-2">
          {product.name}
        </h4>
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 flex-1">
          {product.description || 'Tidak ada deskripsi.'}
        </p>

        {/* Price row */}
        <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2 w-full">
              <span className="text-xs text-zinc-400 font-medium shrink-0">Rp</span>
              <input
                autoFocus
                type="number"
                value={editing!.price}
                onChange={(e) => onPriceChange(Number(e.target.value))}
                className="flex-1 min-w-0 px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-blue-400 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 text-zinc-900 dark:text-white"
              />
              <button
                onClick={onUpdatePrice}
                disabled={saving}
                className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors shrink-0"
              >
                <Check size={15} />
              </button>
              <button
                onClick={onCancelEdit}
                className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors shrink-0"
              >
                <X size={15} />
              </button>
            </div>
          ) : (
            <>
              <span className="text-base font-black text-blue-600 dark:text-blue-400">
                Rp {product.price?.toLocaleString('id-ID')}
              </span>
              <button
                onClick={onStartEdit}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 border border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all"
              >
                <Edit2 size={12} />
                Edit Harga
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Table Row (list view) ── */
function ProductRow({
  product,
  store,
  editing,
  saving,
  onStartEdit,
  onUpdatePrice,
  onCancelEdit,
  onPriceChange,
}: {
  product: any;
  store: any;
  editing: Editing;
  saving: boolean;
  onStartEdit: () => void;
  onUpdatePrice: () => void;
  onCancelEdit: () => void;
  onPriceChange: (v: number) => void;
}) {
  const isEditing = editing?.productId === product.id;

  return (
    <tr className="group hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors">
      {/* Product */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex items-center justify-center text-zinc-400">
            {product.imageUrl
              ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              : <Package size={18} />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{product.name}</p>
            {product.category && (
              <span className="text-[10px] font-medium text-zinc-400">{product.category}</span>
            )}
          </div>
        </div>
      </td>
      {/* Description */}
      <td className="px-5 py-3.5 max-w-xs">
        <p className="text-xs text-zinc-400 truncate">{product.description || '—'}</p>
      </td>
      {/* Price */}
      <td className="px-5 py-3.5">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 shrink-0">Rp</span>
            <input
              autoFocus
              type="number"
              value={editing!.price}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              className="w-28 px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-blue-400 rounded-lg text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20 text-zinc-900 dark:text-white"
            />
          </div>
        ) : (
          <span className="text-sm font-black text-blue-600 dark:text-blue-400">
            Rp {product.price?.toLocaleString('id-ID')}
          </span>
        )}
      </td>
      {/* Actions */}
      <td className="px-5 py-3.5">
        <div className="flex items-center justify-end gap-1">
          {isEditing ? (
            <>
              <button onClick={onUpdatePrice} disabled={saving}
                className="p-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
                <Check size={15} />
              </button>
              <button onClick={onCancelEdit}
                className="p-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                <X size={15} />
              </button>
            </>
          ) : (
            <button onClick={onStartEdit}
              className="p-2 rounded-xl text-zinc-400 opacity-0 group-hover:opacity-100 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all">
              <Edit2 size={15} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

/* ── Main Page ── */
export default function ProductsPage() {
  const { user } = useAuth();
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Editing>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [activeStore, setActiveStore] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const data = await getStoresByOwner(user.uid);
        setStores(data);
        if (data.length > 0) setActiveStore('all');
      } catch (e) {
        console.error(e);
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
      setStores((prev) =>
        prev.map((s) =>
          s.id === editing.storeId
            ? { ...s, products: s.products.map((p: any) => p.id === editing.productId ? { ...p, price: editing.price } : p) }
            : s
        )
      );
      setEditing(null);
    } catch {
      alert('Gagal memperbarui harga.');
    } finally {
      setSaving(false);
    }
  };

  /* ── Filtered data ── */
  const filteredStores = stores
    .filter((s) => activeStore === 'all' || s.id === activeStore)
    .map((s) => ({
      ...s,
      products: (s.products || []).filter((p: any) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((s) => s.products.length > 0);

  const totalProducts = stores.reduce((acc, s) => acc + (s.products?.length || 0), 0);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="space-y-4 max-w-5xl animate-pulse">
        <div className="h-10 w-64 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="h-56 rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
          ))}
        </div>
      </div>
    );
  }

  /* ── Empty state ── */
  if (stores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-5">
          <Package size={30} />
        </div>
        <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Belum Ada Produk</h3>
        <p className="text-sm text-zinc-500 mb-6">Buat toko Anda terlebih dahulu, AI akan otomatis mengisi produk-produk Anda.</p>
        <a
          href="/generate"
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
        >
          <Sparkles size={15} /> Buat Toko Sekarang
        </a>
      </div>
    );
  }

  /* ── Main ── */
  return (
    <div className="space-y-9 max-w-6xl">

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari produk…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 transition-all"
          />
        </div>

        {/* Store filter */}
        {stores.length > 1 && (
          <div className="relative">
            <StoreIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <select
              value={activeStore}
              onChange={(e) => setActiveStore(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-blue-400 appearance-none cursor-pointer transition-colors"
            >
              <option value="all">Semua Toko</option>
              {stores.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>
        )}

        {/* View toggle */}
        <div className="flex rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shrink-0">
          <button
            onClick={() => setView('list')}
            className={`px-3 py-2.5 transition-colors ${view === 'list' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`px-3 py-2.5 transition-colors ${view === 'grid' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>

        {/* Total badge */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shrink-0">
          <Tag size={14} className="text-zinc-400" />
          <span className="text-sm font-bold text-zinc-500">{totalProducts} produk</span>
        </div>
      </div>

      {/* ── No search results ── */}
      {filteredStores.length === 0 && search && (
        <div className="flex flex-col items-center py-16 text-zinc-400 gap-3">
          <Search size={28} className="opacity-40" />
          <p className="text-sm font-medium">Tidak ada produk yang cocok dengan "<span className="font-bold text-zinc-600 dark:text-zinc-400">{search}</span>"</p>
        </div>
      )}

      {/* ── Store sections ── */}
      {filteredStores.map((store) => (
        <div key={store.id} className="space-y-4">

          {/* Store header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-blue-500/20 overflow-hidden">
                {store.logoUrl
                  ? <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
                  : store.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-black text-zinc-900 dark:text-white leading-none">{store.name}</h3>
                {store.tagline && <p className="text-xs text-zinc-400 italic mt-0.5">{store.tagline}</p>}
              </div>
              <span className="ml-1 px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[11px] font-bold text-zinc-500">
                {store.products.length} produk
              </span>
            </div>
            <a
              href={`/store/${store.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Lihat Toko <ExternalLink size={13} />
            </a>
          </div>

          {/* ── GRID VIEW ── */}
          {view === 'grid' && (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {store.products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  store={store}
                  editing={editing}
                  saving={saving}
                  onStartEdit={() => setEditing({ storeId: store.id, productId: product.id, price: product.price })}
                  onUpdatePrice={handleUpdatePrice}
                  onCancelEdit={() => setEditing(null)}
                  onPriceChange={(v) => setEditing((prev) => prev ? { ...prev, price: v } : null)}
                />
              ))}
            </div>
          )}

          {/* ── LIST VIEW ── */}
          {view === 'list' && (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <th className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">Produk</th>
                      <th className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">Deskripsi</th>
                      <th className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">Harga</th>
                      <th className="px-5 py-3 text-right text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/60">
                    {store.products.map((product: any) => (
                      <ProductRow
                        key={product.id}
                        product={product}
                        store={store}
                        editing={editing}
                        saving={saving}
                        onStartEdit={() => setEditing({ storeId: store.id, productId: product.id, price: product.price })}
                        onUpdatePrice={handleUpdatePrice}
                        onCancelEdit={() => setEditing(null)}
                        onPriceChange={(v) => setEditing((prev) => prev ? { ...prev, price: v } : null)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
