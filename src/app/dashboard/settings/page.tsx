"use client";

import React, { useState } from 'react';
import { useAuth } from '@/components/providers/AuthContext';
import { logout } from '@/lib/authService';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Moon,
  Shield,
  LogOut,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Loader2,
  Globe,
} from 'lucide-react';

/* ── Toggle switch ── */
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${value ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${value ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
}

/* ── Setting row ── */
function SettingRow({
  icon: Icon,
  label,
  description,
  right,
  danger,
}: {
  icon: React.ElementType;
  label: string;
  description?: string;
  right: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${danger ? 'bg-red-50 dark:bg-red-950/20 text-red-500' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
          <Icon size={17} />
        </div>
        <div>
          <p className={`text-sm font-semibold ${danger ? 'text-red-600 dark:text-red-400' : 'text-zinc-800 dark:text-zinc-200'}`}>{label}</p>
          {description && <p className="text-xs text-zinc-400 mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

/* ── Section wrapper ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-zinc-400">{title}</p>
      </div>
      <div className="px-5 divide-y divide-zinc-100 dark:divide-zinc-800/60">
        {children}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Notification preferences (stored in localStorage for now)
  const [notifInvoice, setNotifInvoice] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('notif_invoice') !== 'false' : true
  );
  const [notifPromo, setNotifPromo] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('notif_promo') === 'true' : false
  );
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const saveNotifPref = (key: string, val: boolean) => {
    localStorage.setItem(key, String(val));
    setSuccess('Pengaturan disimpan!');
    setTimeout(() => setSuccess(null), 2000);
  };

  const handleToggleDark = (val: boolean) => {
    setDarkMode(val);
    if (val) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setSuccess('Tema diperbarui!');
    setTimeout(() => setSuccess(null), 2000);
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      router.push('/login');
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-zinc-900 dark:text-white">Pengaturan</h2>
        <p className="text-sm text-zinc-500 mt-0.5">Kelola preferensi dan keamanan akun Anda.</p>
      </div>

      {/* Success toast */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-800/30 rounded-2xl">
          <CheckCircle2 size={15} className="text-green-500 shrink-0" />
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">{success}</p>
        </div>
      )}

      {/* Account info */}
      <Section title="Akun">
        <SettingRow
          icon={Globe}
          label="Email"
          description={user?.email || '—'}
          right={<span className="text-xs font-bold text-zinc-400">Tidak dapat diubah</span>}
        />
        <button
          onClick={() => router.push('/dashboard/profile')}
          className="flex items-center justify-between gap-4 py-4 w-full group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center">
              <Shield size={17} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Edit Profil</p>
              <p className="text-xs text-zinc-400">Nama, foto profil</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </Section>

      {/* Notifications */}
      <Section title="Notifikasi">
        <SettingRow
          icon={Bell}
          label="Invoice Baru"
          description="Notifikasi saat ada pembayaran masuk"
          right={
            <Toggle
              value={notifInvoice}
              onChange={(v) => { setNotifInvoice(v); saveNotifPref('notif_invoice', v); }}
            />
          }
        />
        <SettingRow
          icon={Bell}
          label="Promo & Update"
          description="Tips dan fitur baru dari Storezy"
          right={
            <Toggle
              value={notifPromo}
              onChange={(v) => { setNotifPromo(v); saveNotifPref('notif_promo', v); }}
            />
          }
        />
      </Section>

      {/* Appearance */}
      <Section title="Tampilan">
        <SettingRow
          icon={Moon}
          label="Mode Gelap"
          description="Menggunakan tema dark pada dashboard"
          right={<Toggle value={darkMode} onChange={handleToggleDark} />}
        />
      </Section>

      {/* Danger zone */}
      <Section title="Zona Berbahaya">
        <SettingRow
          icon={LogOut}
          label="Keluar"
          description="Logout dari akun Storezy Anda"
          danger
          right={
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/30 bg-red-50/50 dark:bg-red-950/10 hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors disabled:opacity-60"
            >
              {logoutLoading ? <Loader2 size={13} className="animate-spin" /> : <LogOut size={13} />}
              {logoutLoading ? 'Keluar…' : 'Keluar'}
            </button>
          }
        />
        <SettingRow
          icon={Trash2}
          label="Hapus Akun"
          description="Tindakan ini tidak dapat dibatalkan"
          danger
          right={
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/30 bg-red-50/50 dark:bg-red-950/10 hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors"
            >
              Hapus Akun
            </button>
          }
        />
      </Section>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-500 shrink-0">
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-zinc-900 dark:text-white">Hapus Akun?</h3>
                <p className="text-xs text-zinc-500">Tindakan ini permanen dan tidak bisa dibatalkan.</p>
              </div>
            </div>
            <p className="text-sm text-zinc-500">
              Semua data toko, produk, dan invoice Anda akan ikut terhapus. Untuk menghapus akun, silakan hubungi tim dukungan kami.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Batal
              </button>
              <a
                href="mailto:support@storezy.id?subject=Hapus Akun"
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold text-center hover:bg-red-500 transition-colors"
              >
                Hubungi Support
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
