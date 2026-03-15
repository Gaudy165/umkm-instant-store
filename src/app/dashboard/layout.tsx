"use client";

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthContext';
import { logout } from '@/lib/authService';
import {
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Bell,
  User,
  CheckCheck,
  ShoppingBag,
  Zap,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

/* ── Nav items ── */
const navItems = [
  { name: 'Overview',  href: '/dashboard',           icon: LayoutDashboard },
  { name: 'Produk',    href: '/dashboard/products',  icon: Package },
  { name: 'Invoice',   href: '/dashboard/invoices',  icon: Receipt },
];

const bottomItems = [
  { name: 'Profil',     href: '/dashboard/profile',  icon: User },
  { name: 'Pengaturan', href: '/dashboard/settings', icon: Settings },
];

/* ── Demo notifications ── */
const DEMO_NOTIFS = [
  { id: '1', icon: ShoppingBag, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30',  title: 'Toko berhasil dibuat',        body: 'Toko Anda sudah aktif dan bisa diakses.',              time: '2 jam lalu', read: false },
  { id: '2', icon: Receipt,     color: 'text-green-500 bg-green-50 dark:bg-green-950/30', title: 'Invoice baru masuk',          body: 'Pelanggan baru saja melakukan pembayaran.',           time: '5 jam lalu', read: false },
  { id: '3', icon: Zap,         color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30', title: 'Tip: Tambah lebih banyak produk', body: 'Toko dengan 5+ produk mendapat 3x lebih banyak kunjungan.', time: 'Kemarin', read: true },
];

/* ── Notification dropdown ── */
function NotificationDropdown({ onClose }: { onClose: () => void }) {
  const [notifs, setNotifs] = useState(DEMO_NOTIFS);
  const unread = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, read: true })));
  const markRead    = (id: string) => setNotifs((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl shadow-black/10 z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <p className="text-sm font-black text-zinc-900 dark:text-white">Notifikasi</p>
          {unread > 0 && <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded-full">{unread}</span>}
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
            <CheckCheck size={12} /> Tandai semua dibaca
          </button>
        )}
      </div>

      <div className="divide-y divide-zinc-50 dark:divide-zinc-800/60 max-h-72 overflow-y-auto">
        {notifs.map((n) => {
          const Icon = n.icon;
          return (
            <button
              key={n.id}
              onClick={() => { markRead(n.id); onClose(); }}
              className={`w-full text-left flex items-start gap-3 px-4 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${!n.read ? 'bg-blue-50/30 dark:bg-blue-950/10' : ''}`}
            >
              <div className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${n.color}`}><Icon size={16} /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm leading-none mb-0.5 truncate ${!n.read ? 'font-bold text-zinc-900 dark:text-white' : 'font-medium text-zinc-700 dark:text-zinc-300'}`}>{n.title}</p>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />}
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed truncate">{n.body}</p>
                <p className="text-[10px] text-zinc-400 mt-1 font-medium">{n.time}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
        <p className="text-[11px] text-zinc-400 text-center">Notifikasi hanya tampil di sesi ini.</p>
      </div>
    </div>
  );
}

/* ── Sidebar ── */
function Sidebar({
  pathname,
  user,
  onClose,
  collapsed,
}: {
  pathname: string;
  user: any;
  onClose?: () => void;
  collapsed?: boolean;
}) {
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Vendor';
  const initials = displayName.slice(0, 2).toUpperCase();

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        onClick={onClose}
        title={collapsed ? item.name : undefined}
        className={`flex items-center gap-3 rounded-xl text-sm font-semibold transition-all duration-150 group ${
          isActive
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
            : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
        } ${collapsed ? 'justify-center w-10 h-10 mx-auto' : 'px-4 py-2.5'}`}
      >
        <item.icon size={17} className={`shrink-0 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors'}`} />
        {!collapsed && (
          <>
            <span className="truncate">{item.name}</span>
            {isActive && <ChevronRight size={14} className="ml-auto opacity-60 shrink-0" />}
          </>
        )}
      </Link>
    );
  };

  return (
    <aside className={`${collapsed ? 'w-[72px]' : 'w-60'} shrink-0 flex flex-col h-full bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 transition-all duration-300 ease-in-out overflow-hidden`}>
      {/* Logo */}
      <div className={`py-5 flex items-center shrink-0 ${collapsed ? 'justify-center' : 'px-5 gap-2'}`}>
        <Link href="/" className="flex items-center gap-2 group w-fit" onClick={onClose} title="Beranda">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg group-hover:scale-110 transition-transform shadow-md shadow-blue-500/30 shrink-0">S</div>
          {!collapsed && <span className="text-lg font-black tracking-tighter text-zinc-900 dark:text-white whitespace-nowrap">Store<span className="text-blue-600">zy</span></span>}
        </Link>
      </div>

      {/* Main nav */}
      <div className={`mb-1 ${collapsed ? 'px-2' : 'px-3'}`}>
        {!collapsed && <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em] px-1 mb-1.5">Menu Utama</p>}
        <nav className="space-y-0.5">
          {navItems.map((item) => <NavLink key={item.name} item={item} />)}
        </nav>
      </div>

      {/* Buat Toko CTA */}
      <div className={`mt-2 ${collapsed ? 'px-2' : 'px-3'}`}>
        <Link
          href="/generate"
          onClick={onClose}
          title={collapsed ? 'Buat Toko Baru' : undefined}
          className={`flex items-center rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors group ${
            collapsed ? 'justify-center w-10 h-10 mx-auto' : 'px-4 py-2.5 gap-2.5'
          }`}
        >
          <Sparkles size={15} className="shrink-0" />
          {!collapsed && (
            <>
              <span>Buat Toko Baru</span>
              <ChevronRight size={13} className="ml-auto group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </Link>
      </div>

      <div className="flex-1" />

      {/* Bottom nav */}
      <div className={`mb-2 ${collapsed ? 'px-2' : 'px-3'}`}>
        {!collapsed && <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em] px-1 mb-1.5">Akun</p>}
        <nav className="space-y-0.5">
          {bottomItems.map((item) => <NavLink key={item.name} item={item} />)}
        </nav>
      </div>

      {/* User card */}
      <div className={`border-t border-zinc-100 dark:border-zinc-800 ${collapsed ? 'p-2 flex justify-center' : 'p-3'}`}>
        {collapsed ? (
          <div title={displayName} className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 p-[2px] cursor-pointer">
            <div className="w-full h-full rounded-[10px] bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
              {user?.photoURL
                ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                : <span className="text-xs font-black text-blue-600">{initials}</span>}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 p-[2px] shrink-0">
              <div className="w-full h-full rounded-[10px] bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
                {user?.photoURL
                  ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                  : <span className="text-xs font-black text-blue-600">{initials}</span>}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate leading-none mb-0.5">{displayName}</p>
              <p className="text-[10px] text-zinc-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={() => logout()}
              title="Logout"
              className="p-1.5 rounded-lg text-zinc-300 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all opacity-0 group-hover:opacity-100"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

/* ── Dashboard Layout ── */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileNavOpen, setMobileNavOpen]   = useState(false);
  const [notifOpen, setNotifOpen]           = useState(false);
  const [isDark, setIsDark]                 = useState(false);
  const [collapsed, setCollapsed]           = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  /* ── Init from localStorage ── */
  useEffect(() => {
    // Dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);

    // Sidebar collapse
    setCollapsed(localStorage.getItem('sidebar_collapsed') === 'true');
  }, []);

  /* ── Handlers ── */
  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sidebar_collapsed', String(next));
  };

  /* ── Close notif on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── Auth guard ── */
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-zinc-400 font-medium">Memuat dashboard…</p>
        </div>
      </div>
    );
  }

  const allItems   = [...navItems, ...bottomItems];
  const currentPage = allItems.find((i) => i.href === pathname)?.name || 'Dashboard';
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Vendor';
  const unreadNotifs = DEMO_NOTIFS.filter((n) => !n.read).length;

  return (
    /*
     * fixed inset-0: full-viewport app shell.
     * The global Navbar is hidden for /dashboard/* (see Navbar.tsx),
     * so we don't need to account for the 64px body padding-top.
     */
    <div className="fixed inset-0 flex bg-zinc-50 dark:bg-zinc-950 overflow-hidden">

      {/* ── Desktop Sidebar ── */}
      <div className="hidden lg:flex h-full">
        <Sidebar pathname={pathname} user={user} collapsed={collapsed} />
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileNavOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-64 z-50 lg:hidden shadow-2xl">
            <Sidebar pathname={pathname} user={user} onClose={() => setMobileNavOpen(false)} collapsed={false} />
            <button
              onClick={() => setMobileNavOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              <X size={18} />
            </button>
          </div>
        </>
      )}

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header className="shrink-0 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 z-30">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6">

            {/* Left side */}
            <div className="flex items-center gap-2">
              {/* Mobile: open drawer */}
              <button
                onClick={() => setMobileNavOpen(true)}
                className="lg:hidden p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="Buka Navigasi"
              >
                <Menu size={20} />
              </button>

              {/* Desktop: collapse/expand sidebar */}
              <button
                onClick={toggleSidebar}
                className="hidden lg:flex p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title={collapsed ? 'Buka Sidebar' : 'Tutup Sidebar'}
              >
                {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
              </button>

              {/* Page title */}
              <div className="flex items-center gap-2.5 ml-1">
                <h1 className="text-sm font-black text-zinc-900 dark:text-white leading-none whitespace-nowrap">{currentPage}</h1>
                <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 hidden sm:block" />
                <p className="text-xs text-zinc-400 hidden sm:block whitespace-nowrap">
                  Halo, <span className="font-semibold text-zinc-600 dark:text-zinc-300">{displayName}</span> 👋
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDark}
                title={isDark ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
                className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Notification bell */}
              <div ref={notifRef} className="relative">
                <button
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                >
                  <Bell size={18} />
                  {unreadNotifs > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white dark:border-zinc-900" />
                  )}
                </button>
                {notifOpen && <NotificationDropdown onClose={() => setNotifOpen(false)} />}
              </div>

              {/* Settings */}
              <Link
                href="/dashboard/settings"
                className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                title="Pengaturan"
              >
                <Settings size={18} />
              </Link>

              {/* Buat Toko CTA */}
              <Link
                href="/generate"
                className="hidden sm:flex items-center gap-2 ml-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all"
              >
                <Sparkles size={13} /> Buat Toko
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {children}
        </div>
      </main>
    </div>
  );
}
