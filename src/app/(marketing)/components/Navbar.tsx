"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthContext';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Init dark mode state from DOM class
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl group-hover:scale-110 transition-transform">S</div>
          <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">Storezy</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-bold text-zinc-500 hover:text-blue-600 transition-colors">Fitur</Link>
          <Link href="#showcase" className="text-sm font-bold text-zinc-500 hover:text-blue-600 transition-colors">Contoh Toko</Link>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700" />

          {/* Improved Desktop Theme Toggle */}
          <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => !isDark && toggleDark()}
              className={`p-1.5 rounded-lg transition-all ${!isDark ? 'bg-white text-amber-500 shadow-xs' : 'text-zinc-500 hover:text-zinc-900'}`}
              title="Light Mode"
            >
              <Sun size={16} />
            </button>
            <button
              onClick={() => isDark && toggleDark()}
              className={`p-1.5 rounded-lg transition-all ${isDark ? 'bg-zinc-800 text-amber-400 shadow-xs' : 'text-zinc-500 hover:text-zinc-400'}`}
              title="Dark Mode"
            >
              <Moon size={16} />
            </button>
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700" />

          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-sm font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-zinc-500/10"
            >
              Dashboard <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold text-zinc-900 dark:text-white hover:text-blue-600 transition-colors">Masuk</Link>
              <Link
                href="/generate"
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-full text-sm font-black hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20"
              >
                Mulai Gratis
              </Link>
            </>
          )}
        </div>

        {/* Mobile: Hamburger */}
        <div className="md:hidden">
          <button
            className="p-2 text-zinc-900 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold">Fitur</Link>
          <Link href="#showcase" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold">Contoh Toko</Link>
          
          <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <span className="text-sm font-bold text-zinc-500">Tampilan</span>
            <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => !isDark && toggleDark()}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!isDark ? 'bg-white text-amber-500 shadow-sm' : 'text-zinc-500'}`}
              >
                <Sun size={14} /> Light
              </button>
              <button
                onClick={() => isDark && toggleDark()}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${isDark ? 'bg-zinc-700 text-amber-400 shadow-sm' : 'text-zinc-400'}`}
              >
                <Moon size={14} /> Dark
              </button>
            </div>
          </div>

          <hr className="border-zinc-100 dark:border-zinc-800" />
          {user ? (
            <Link href="/dashboard" className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-center rounded-2xl font-black transition-colors">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" className="text-lg font-bold text-center">Masuk</Link>
              <Link href="/generate" className="w-full py-4 bg-blue-600 text-white text-center rounded-2xl font-black">Mulai Gratis</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
