"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthContext';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-bold text-zinc-500 hover:text-blue-600 transition-colors">Fitur</Link>
          <Link href="#showcase" className="text-sm font-bold text-zinc-500 hover:text-blue-600 transition-colors">Contoh Toko</Link>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
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

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-zinc-900 dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold">Fitur</Link>
          <Link href="#showcase" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold">Contoh Toko</Link>
          <hr className="border-zinc-100 dark:border-zinc-800" />
          {user ? (
            <Link href="/dashboard" className="w-full py-4 bg-zinc-900 text-white text-center rounded-2xl font-black">Dashboard</Link>
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
