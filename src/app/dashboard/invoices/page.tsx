"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/components/providers/AuthContext';
import { getInvoicesByOwner } from '@/lib/invoiceService';
import {
  Receipt,
  Mail,
  Phone,
  Search,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

/* ── Status config ── */
const STATUS_CONFIG: Record<string, { label: string; icon: React.ElementType; pill: string; dot: string }> = {
  paid: {
    label: 'Lunas',
    icon: CheckCircle2,
    pill: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border border-green-100 dark:border-green-800/40',
    dot: 'bg-green-500',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    pill: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/40',
    dot: 'bg-amber-400',
  },
  expired: {
    label: 'Expired',
    icon: XCircle,
    pill: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700',
    dot: 'bg-zinc-400',
  },
};

function StatusPill({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.expired;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${cfg.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

/* ── Tab filter pills ── */
const TABS = [
  { key: 'all',     label: 'Semua' },
  { key: 'paid',    label: 'Lunas' },
  { key: 'pending', label: 'Pending' },
  { key: 'expired', label: 'Expired' },
];

/* ── Main page ── */
export default function InvoicesPage() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const data = await getInvoicesByOwner(user.uid);
        setInvoices(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  /* ── Derived stats ── */
  const totalRevenue   = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + (i.amount || 0), 0);
  const pendingCount   = invoices.filter((i) => i.status === 'pending').length;
  const pendingRevenue = invoices.filter((i) => i.status === 'pending').reduce((s, i) => s + (i.amount || 0), 0);
  const paidCount      = invoices.filter((i) => i.status === 'paid').length;

  /* ── Filtered + sorted list ── */
  const filtered = useMemo(() => {
    let list = invoices;
    if (tab !== 'all') list = list.filter((i) => i.status === tab);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((i) =>
        i.customerName?.toLowerCase().includes(q) ||
        i.customerEmail?.toLowerCase().includes(q) ||
        i.id?.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => {
      const dateA = new Date(a.createdAt?.toDate?.() || a.createdAt).getTime();
      const dateB = new Date(b.createdAt?.toDate?.() || b.createdAt).getTime();
      return sortDir === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [invoices, tab, search, sortDir]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="space-y-4 w-full animate-pulse">
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3].map((i) => <div key={i} className="h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-800" />)}
        </div>
        <div className="h-10 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800" />
        {[1,2,3,4].map((i) => <div key={i} className="h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800" />)}
      </div>
    );
  }

  return (
    <div className="space-y-5 w-full">

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total revenue */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5 flex items-center gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Total Pendapatan</p>
            <p className="text-xl font-black text-zinc-900 dark:text-white">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </p>
            <p className="text-[11px] text-zinc-400">{paidCount} invoice lunas</p>
          </div>
        </div>

        {/* Pending revenue */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5 flex items-center gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Menunggu Pembayaran</p>
            <p className="text-xl font-black text-zinc-900 dark:text-white">
              Rp {pendingRevenue.toLocaleString('id-ID')}
            </p>
            <p className="text-[11px] text-zinc-400">{pendingCount} invoice pending</p>
          </div>
        </div>

        {/* Total invoices */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5 flex items-center gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Receipt size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Total Invoice</p>
            <p className="text-xl font-black text-zinc-900 dark:text-white">{invoices.length}</p>
            <p className="text-[11px] text-zinc-400">Semua transaksi</p>
          </div>
        </div>
      </div>

      {/* ── Toolbar: tabs + search + sort ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Status tabs */}
        <div className="flex gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl">
          {TABS.map((t) => {
            const count = t.key === 'all' ? invoices.length : invoices.filter((i) => i.status === t.key).length;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  tab === t.key
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                {t.label}
                {count > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    tab === t.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari nama atau ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 transition-all w-52"
          />
        </div>

        {/* Sort */}
        <button
          onClick={() => setSortDir((d) => d === 'desc' ? 'asc' : 'desc')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
        >
          <Filter size={13} />
          {sortDir === 'desc' ? 'Terbaru' : 'Terlama'}
          <ChevronDown size={13} className={`transition-transform ${sortDir === 'asc' ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <th className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">Invoice</th>
                  <th className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">Pelanggan</th>
                  <th className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">Total</th>
                  <th className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">Status</th>
                  <th className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">Tanggal</th>
                  <th className="px-5 py-3 text-right text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/60">
                {filtered.map((inv) => {
                  const dateStr = inv.createdAt
                    ? new Date(inv.createdAt?.toDate?.() || inv.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
                    : '—';

                  return (
                    <tr key={inv.id} className="group hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors">
                      {/* Invoice ID */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                            <Receipt size={15} />
                          </div>
                          <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            #{inv.id.substring(0, 8).toUpperCase()}
                          </span>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-zinc-900 dark:text-white leading-none mb-1">
                          {inv.customerName || '—'}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                          {inv.customerEmail && (
                            <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                              <Mail size={10} /> {inv.customerEmail}
                            </span>
                          )}
                          {inv.customerMobile && (
                            <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                              <Phone size={10} /> {inv.customerMobile}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-black text-zinc-900 dark:text-white">
                          Rp {(inv.amount || 0).toLocaleString('id-ID')}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusPill status={inv.status} />
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{dateStr}</span>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          {inv.paymentUrl ? (
                            <a
                              href={inv.paymentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 border border-blue-100 dark:border-blue-800/40 transition-all"
                            >
                              Lihat <ArrowUpRight size={12} />
                            </a>
                          ) : (
                            <span className="text-[11px] text-zinc-300 dark:text-zinc-700 opacity-0 group-hover:opacity-100">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
              <Receipt size={28} />
            </div>
            {search || tab !== 'all' ? (
              <>
                <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400 mb-1">Tidak ada invoice ditemukan</p>
                <p className="text-xs text-zinc-400 mb-4">Coba ubah filter atau kata kunci pencarian.</p>
                <button
                  onClick={() => { setSearch(''); setTab('all'); }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-blue-600 border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                >
                  Reset Filter
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400 mb-1">Belum ada riwayat invoice</p>
                <p className="text-xs text-zinc-400">Invoice akan muncul di sini setelah pelanggan melakukan pembelian di toko Anda.</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Row count footer */}
      {filtered.length > 0 && (
        <p className="text-xs text-zinc-400 text-right">
          Menampilkan <span className="font-bold text-zinc-600 dark:text-zinc-400">{filtered.length}</span> dari <span className="font-bold">{invoices.length}</span> invoice
        </p>
      )}
    </div>
  );
}
