"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/AuthContext';
import { getStoresByOwner } from '@/lib/storeService';
import { getInvoicesByOwner } from '@/lib/invoiceService';
import { 
  TrendingUp, 
  Package, 
  Receipt, 
  Store as StoreIcon,
  ArrowUpRight,
  Clock
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState({
    stores: [] as any[],
    invoices: [] as any[],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const [stores, invoices] = await Promise.all([
          getStoresByOwner(user.uid),
          getInvoicesByOwner(user.uid)
        ]);
        setData({ stores, invoices, loading: false });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, [user]);

  if (data.loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-40 bg-zinc-100 dark:bg-zinc-800 rounded-3xl" />
        ))}
      </div>
    );
  }

  const totalSales = data.invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + (inv.amount || 0), 0);
    
  const pendingInvoices = data.invoices.filter(inv => inv.status === 'pending').length;
  const totalProducts = data.stores.reduce((sum, s) => sum + (s.products?.length || 0), 0);

  const stats = [
    { name: 'Total Penjualan', value: `Rp ${totalSales.toLocaleString('id-ID')}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/10' },
    { name: 'Total Produk', value: totalProducts, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/10' },
    { name: 'Invoice Pending', value: pendingInvoices, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="text-zinc-400">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-1">{stat.name}</p>
              <h3 className="text-3xl font-black text-zinc-900 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Invoices */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-lg font-black">Invoice Terbaru</h3>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Lihat Semua</button>
          </div>
          <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
            {data.invoices.length > 0 ? (
              data.invoices.slice(0, 5).map((inv) => (
                <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                      <Receipt size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{inv.customerName}</p>
                      <p className="text-[10px] text-zinc-400 capitalize">{inv.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black">Rp {inv.amount.toLocaleString('id-ID')}</p>
                    <p className="text-[10px] text-zinc-400">{new Date(inv.createdAt?.toDate?.() || inv.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-zinc-500 text-sm italic">Belum ada transaksi.</div>
            )}
          </div>
        </div>

        {/* Your Stores */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="text-lg font-black">Toko Anda</h3>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Kelola</button>
          </div>
          <div className="p-6 grid grid-cols-1 gap-4">
            {data.stores.length > 0 ? (
              data.stores.map((store) => (
                <div key={store.id} className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-black">
                    {store.logoUrl ? <img src={store.logoUrl} className="w-full h-full object-cover rounded-xl" /> : store.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">{store.name}</h4>
                    <p className="text-xs text-zinc-500 truncate">{store.products?.length || 0} Produk</p>
                  </div>
                  <a href={`/store/${store.id}`} target="_blank" className="p-2 text-zinc-400 hover:text-blue-600 transition-colors">
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-zinc-500 mb-4">Anda belum memiliki toko.</p>
                <a href="/generate" className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-xl">Buat Toko Sekarang</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
