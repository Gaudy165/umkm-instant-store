"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthContext';
import { getStoresByOwner } from '@/lib/storeService';
import { getInvoicesByOwner } from '@/lib/invoiceService';
import {
  TrendingUp,
  Package,
  Receipt,
  Clock,
  ArrowUpRight,
  Store as StoreIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ShoppingBag,
  Zap,
} from 'lucide-react';

/* ── Helpers ── */
function formatRupiah(val: number) {
  if (val >= 1_000_000) return `Rp ${(val / 1_000_000).toFixed(1)}Jt`;
  if (val >= 1_000) return `Rp ${(val / 1_000).toFixed(0)}K`;
  return `Rp ${val.toLocaleString('id-ID')}`;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    paid:    { label: 'Lunas',   cls: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' },
    pending: { label: 'Pending', cls: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' },
    expired: { label: 'Expired', cls: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400' },
  };
  const { label, cls } = map[status] ?? map.expired;
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${cls}`}>{label}</span>
  );
}

/* ── Skeleton ── */
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-5">
        <div className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
        <div className="w-16 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800" />
      </div>
      <div className="w-24 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-2" />
      <div className="w-32 h-3 rounded-full bg-zinc-100 dark:bg-zinc-800" />
    </div>
  );
}

/* ── Main Component ── */
export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState({ stores: [] as any[], invoices: [] as any[], loading: true });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const [stores, invoices] = await Promise.all([
          getStoresByOwner(user.uid),
          getInvoicesByOwner(user.uid),
        ]);
        setData({ stores, invoices, loading: false });
      } catch (e) {
        console.error(e);
        setData((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, [user]);

  /* ── Derived stats ── */
  const totalSales    = data.invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + (i.amount || 0), 0);
  const pendingCount  = data.invoices.filter((i) => i.status === 'pending').length;
  const totalProducts = data.stores.reduce((s, st) => s + (st.products?.length || 0), 0);
  const totalStores   = data.stores.length;
  const paidCount     = data.invoices.filter((i) => i.status === 'paid').length;

  const stats = [
    {
      key: 'sales',
      label: 'Total Penjualan',
      value: formatRupiah(totalSales),
      sub: `${paidCount} transaksi lunas`,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-green-500',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      ring: 'ring-emerald-100 dark:ring-emerald-800/30',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      key: 'products',
      label: 'Total Produk',
      value: totalProducts,
      sub: `Dari ${totalStores} toko aktif`,
      icon: Package,
      gradient: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      ring: 'ring-blue-100 dark:ring-blue-800/30',
      text: 'text-blue-600 dark:text-blue-400',
    },
    {
      key: 'pending',
      label: 'Invoice Pending',
      value: pendingCount,
      sub: pendingCount > 0 ? 'Perlu konfirmasi' : 'Semua beres 🎉',
      icon: pendingCount > 0 ? AlertCircle : CheckCircle2,
      gradient: pendingCount > 0 ? 'from-amber-500 to-orange-500' : 'from-zinc-400 to-zinc-500',
      bg: pendingCount > 0 ? 'bg-amber-50 dark:bg-amber-950/20' : 'bg-zinc-50 dark:bg-zinc-800/50',
      ring: pendingCount > 0 ? 'ring-amber-100 dark:ring-amber-800/30' : 'ring-zinc-100 dark:ring-zinc-700/30',
      text: pendingCount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-500 dark:text-zinc-400',
    },
    {
      key: 'stores',
      label: 'Toko Aktif',
      value: totalStores,
      sub: 'Toko online Anda',
      icon: ShoppingBag,
      gradient: 'from-violet-500 to-purple-500',
      bg: 'bg-violet-50 dark:bg-violet-950/20',
      ring: 'ring-violet-100 dark:ring-violet-800/30',
      text: 'text-violet-600 dark:text-violet-400',
    },
  ];

  /* ── Loading state ── */
  if (data.loading) {
    return (
      <div className="space-y-8 max-w-6xl">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => <SkeletonCard key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 animate-pulse" />
          <div className="h-72 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 animate-pulse" />
        </div>
      </div>
    );
  }

  /* ── Content ── */
  return (
    <div className="space-y-6 max-w-6xl">

      {/* ── Welcome banner (only if no stores yet) ── */}
      {totalStores === 0 && (
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 text-white">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
              <Sparkles size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black mb-1">Mulai perjalanan digital Anda! 🚀</h2>
              <p className="text-blue-100/80 text-sm">Buat toko pertama Anda dengan AI — gratis, dalam hitungan detik.</p>
            </div>
            <Link href="/generate" className="shrink-0 flex items-center gap-2 px-5 py-3 bg-white text-blue-700 rounded-2xl text-sm font-black hover:bg-blue-50 transition-colors shadow-xl shadow-black/10">
              <Zap size={15} />
              Buat Toko Sekarang
            </Link>
          </div>
        </div>
      )}

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.key}
            className={`relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-5 sm:p-6 hover:shadow-lg hover:shadow-zinc-200/60 dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-300 ring-1 ${s.ring} overflow-hidden group`}
          >
            {/* Decorative gradient blob */}
            <div className={`absolute -top-6 -right-6 w-20 h-20 bg-linear-to-br ${s.gradient} opacity-[0.06] rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl ${s.bg} flex items-center justify-center ${s.text}`}>
                  <s.icon size={22} />
                </div>
                <ArrowUpRight size={16} className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors" />
              </div>

              <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mb-1 tracking-tight">
                {s.value}
              </div>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{s.label}</div>
              <div className="text-[11px] text-zinc-400 mt-1.5">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom grid: Invoices + Stores ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Recent Invoices — wider column */}
        <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h3 className="text-sm font-black text-zinc-900 dark:text-white">Invoice Terbaru</h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">{data.invoices.length} total transaksi</p>
            </div>
            <Link
              href="/dashboard/invoices"
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Lihat Semua <ChevronRight size={14} />
            </Link>
          </div>

          {data.invoices.length > 0 ? (
            <div className="divide-y divide-zinc-50 dark:divide-zinc-800/60">
              {data.invoices.slice(0, 6).map((inv) => (
                <div key={inv.id} className="flex items-center gap-3 px-6 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  {/* Avatar */}
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                    <Receipt size={17} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate leading-none mb-0.5">
                      {inv.customerName || 'Pelanggan'}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {inv.createdAt
                        ? new Date(inv.createdAt?.toDate?.() || inv.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—'}
                    </p>
                  </div>

                  {/* Amount + status */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-zinc-900 dark:text-white mb-1">
                      Rp {(inv.amount || 0).toLocaleString('id-ID')}
                    </p>
                    <StatusBadge status={inv.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
                <Receipt size={26} />
              </div>
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-1">Belum ada transaksi</p>
              <p className="text-xs text-zinc-400">Invoice akan muncul di sini saat pelanggan mulai berbelanja</p>
            </div>
          )}
        </div>

        {/* Stores — narrower column */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h3 className="text-sm font-black text-zinc-900 dark:text-white">Toko Anda</h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">{totalStores} toko aktif</p>
            </div>
            <Link
              href="/generate"
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              + Baru <ChevronRight size={14} />
            </Link>
          </div>

          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {data.stores.length > 0 ? (
              <>
                {data.stores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-800/50 hover:bg-blue-50/30 dark:hover:bg-blue-950/10 transition-all group"
                  >
                    {/* Logo */}
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-base overflow-hidden shadow-sm shadow-blue-500/20">
                      {store.logoUrl
                        ? <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
                        : store.name?.[0]?.toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-zinc-900 dark:text-white truncate leading-none mb-0.5">{store.name}</p>
                      <p className="text-[11px] text-zinc-400">
                        {store.products?.length || 0} produk
                      </p>
                    </div>

                    {/* Visit link */}
                    <a
                      href={`/store/${store.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl text-zinc-300 dark:text-zinc-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                ))}

                {/* Add more CTA */}
                <Link
                  href="/generate"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-400 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-950/10 transition-all mt-1"
                >
                  <Sparkles size={13} />
                  Buat toko baru
                </Link>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
                  <StoreIcon size={26} />
                </div>
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-3">Belum ada toko</p>
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20"
                >
                  <Sparkles size={13} /> Buat Toko Pertama
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
