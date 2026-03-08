"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthContext';
import { logout } from '@/lib/authService';

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl group-hover:scale-110 transition-transform">S</div>
          <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white">Storezy</span>
        </Link>

        <div className="flex items-center gap-6">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-zinc-900 dark:text-white leading-none mb-0.5">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                      Penjual
                    </p>
                  </div>
                  <button 
                    onClick={() => logout()}
                    className="px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    Logout
                  </button>
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-bold">{user.displayName?.[0] || "U"}</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  href="/login"
                  className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Mulai Jualan
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
