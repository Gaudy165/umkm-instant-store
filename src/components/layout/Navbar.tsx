"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthContext';
import { logout } from '@/lib/authService';
import {
  ArrowRight,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  Zap,
  ChevronDown,
  User,
} from 'lucide-react';

const marketingLinks = [
  { label: 'Fitur', href: '/#features' },
  { label: 'Contoh Toko', href: '/#showcase' },
];

export default function Navbar() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Dashboard has its own layout (sidebar + header) — global Navbar not needed there
  if (pathname?.startsWith('/dashboard')) return null;

  const isMarketing = pathname === '/';

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  /* Mount flag — prevents SSR/client hydration mismatch */
  useEffect(() => { setMounted(true); }, []);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close user dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Derive values — safe to compute always, only used after mounted
  const navBase =
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
  const navScrolled =
    'bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-sm';
  // Before mounting: always use the opaque style (matches SSR which has no scroll/path info)
  const resolvedNavBg = !mounted
    ? navScrolled
    : (scrolled || !isMarketing ? navScrolled : 'bg-transparent');

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Pengguna';
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <>
      <nav className={`${navBase} ${resolvedNavBg}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg group-hover:scale-110 group-hover:rotate-[-4deg] transition-all duration-200 shadow-lg shadow-blue-500/30">
              S
            </div>
            <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white">
              Store<span className="text-blue-600">zy</span>
            </span>
          </Link>

          {/* ── Desktop center nav (marketing only, no user) — only after mount ── */}
          {mounted && isMarketing && !user && !loading && (
            <div className="hidden md:flex items-center gap-1">
              {marketingLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-all duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* ── Right side ── */}
          <div className="flex items-center gap-3">
            {/* Before mount: render a neutral skeleton so SSR & initial client match */}
            {!mounted ? (
              <div className="h-9 w-28 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
            ) : loading ? (
              /* Auth loading skeleton */
              <div className="h-9 w-28 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
            ) : user ? (
              /* ── Logged-in state ── */
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-all"
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>

                {/* User dropdown */}
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all group"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 p-[2px]">
                      <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[11px] font-black text-blue-600">{initials}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 max-w-[100px] truncate hidden sm:block">
                      {displayName}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-zinc-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown panel */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-zinc-300/30 dark:shadow-black/40 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                      {/* User info */}
                      <div className="p-3 border-b border-zinc-100 dark:border-zinc-800">
                        <p className="text-xs font-black text-zinc-900 dark:text-white truncate">{displayName}</p>
                        <p className="text-[10px] text-zinc-400 font-medium truncate">{user.email}</p>
                      </div>
                      {/* Links */}
                      <div className="p-1.5">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                          <LayoutDashboard size={15} className="text-zinc-400" />
                          Dashboard
                        </Link>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        >
                          <LogOut size={15} />
                          Keluar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* ── Guest state ── */
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/generate"
                  className="group flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200"
                >
                  <Zap size={14} className="shrink-0" />
                  Mulai Gratis
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu drawer — only rendered client-side ── */}
      {mounted && mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed top-16 left-0 right-0 z-50 md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">

              {/* Marketing nav links (guest only) */}
              {isMarketing && !user && !loading && marketingLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />

              {!loading && (
                user ? (
                  <>
                    {/* User info header */}
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 p-[2px] shrink-0">
                        <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-sm font-black text-blue-600">{initials}</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-black text-zinc-900 dark:text-white">{displayName}</p>
                        <p className="text-xs text-zinc-400 truncate max-w-[200px]">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <LayoutDashboard size={18} className="text-zinc-400" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full text-left"
                    >
                      <LogOut size={18} />
                      Keluar
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 pt-2 pb-1">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="py-3 text-center rounded-xl text-sm font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/generate"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                    >
                      <Zap size={16} />
                      Mulai Gratis — Sekarang
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
