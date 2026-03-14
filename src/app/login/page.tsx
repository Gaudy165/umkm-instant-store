"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithGoogle, loginWithEmail, registerWithEmail } from '@/lib/authService';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Zap,
  ShieldCheck,
  Star,
  Lock,
  Mail,
  User,
  AlertCircle,
  Loader2,
} from 'lucide-react';

/* ── Google SVG icon ── */
function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ── Input field component ── */
function Field({
  label, id, type = 'text', value, onChange, placeholder, icon: Icon, required,
}: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  icon: React.ElementType; required?: boolean;
}) {
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === 'password';
  const resolvedType = isPassword ? (showPwd ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
        <input
          id={id}
          type={resolvedType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-11 py-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15 dark:focus:border-blue-500 transition-all"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            tabIndex={-1}
          >
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Left branding panel ── */
function BrandPanel() {
  const features = [
    { icon: Zap,         text: 'Toko siap dalam < 60 detik' },
    { icon: ShieldCheck, text: 'Pembayaran aman via Mayar.id' },
    { icon: Star,        text: 'Dipercaya 500+ pelaku UMKM' },
  ];

  const testimonials = [
    { name: 'Dewi R.', role: 'Pemilik Snack Mania', text: 'Dalam 1 menit toko saya sudah online!' },
    { name: 'Budi S.', role: 'Fashion Store Owner', text: 'Penjualan naik 3x sejak pakai Storezy.' },
  ];

  return (
    <div className="hidden lg:flex flex-col justify-between p-12 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Glowing blob */}
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/40 rounded-full blur-3xl" />
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
            S
          </div>
          <span className="text-2xl font-black tracking-tighter">Storezy</span>
        </Link>

        {/* Headline */}
        <div className="mt-14 mb-10">
          <h2 className="text-4xl font-black leading-tight mb-4">
            Bangun Toko Online<br />
            <span className="text-blue-200">Dalam Hitungan Detik.</span>
          </h2>
          <p className="text-blue-100/80 text-base leading-relaxed">
            Platform UMKM Indonesia dengan AI Generator, pembayaran terintegrasi, dan tampilan toko yang profesional.
          </p>
        </div>

        {/* Feature list */}
        <ul className="space-y-3 mb-10">
          {features.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Icon size={16} />
              </div>
              <span className="text-sm font-medium text-blue-50">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 space-y-3">
        {testimonials.map((t) => (
          <div key={t.name} className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <div className="flex mb-2 gap-0.5">
              {[1,2,3,4,5].map((s) => <Star key={s} size={11} className="fill-yellow-300 text-yellow-300" />)}
            </div>
            <p className="text-sm text-blue-50 italic mb-2">"{t.text}"</p>
            <p className="text-xs font-bold text-blue-200">{t.name} <span className="font-normal text-blue-300/70">· {t.role}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Firebase error → pesan Indonesia ── */
function getAuthErrorMessage(code: string): string {
  const map: Record<string, string> = {
    'auth/invalid-credential':      'Email atau password yang Anda masukkan salah.',
    'auth/wrong-password':          'Password salah. Silakan coba lagi atau reset password Anda.',
    'auth/user-not-found':          'Tidak ada akun dengan email ini. Coba daftar terlebih dahulu.',
    'auth/invalid-email':           'Format email tidak valid. Periksa kembali email Anda.',
    'auth/email-already-in-use':    'Email ini sudah terdaftar. Silakan masuk atau gunakan email lain.',
    'auth/weak-password':           'Password terlalu lemah. Gunakan minimal 8 karakter.',
    'auth/too-many-requests':       'Terlalu banyak percobaan gagal. Akun sementara dikunci. Coba lagi nanti.',
    'auth/user-disabled':           'Akun ini telah dinonaktifkan. Hubungi dukungan kami.',
    'auth/network-request-failed':  'Koneksi bermasalah. Periksa internet Anda dan coba lagi.',
    'auth/popup-closed-by-user':    'Login dengan Google dibatalkan. Silakan coba lagi.',
    'auth/cancelled-popup-request': 'Login dengan Google dibatalkan. Silakan coba lagi.',
    'auth/account-exists-with-different-credential': 'Email ini sudah terdaftar dengan metode login lain.',
  };
  return map[code] ?? 'Terjadi kesalahan. Silakan coba lagi.';
}

/* ── Main page ── */
export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true); setError(null);
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (err: any) { setError(getAuthErrorMessage(err.code)); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Manual validation — replaces browser-native "Please fill out this field"
    if (isRegister && !name.trim()) {
      setError('Nama lengkap wajib diisi.');
      return;
    }
    if (!email.trim()) {
      setError('Email wajib diisi.');
      return;
    }
    if (!password) {
      setError('Password wajib diisi.');
      return;
    }
    if (password.length < 8) {
      setError('Password minimal 8 karakter.');
      return;
    }

    setLoading(true);
    try {
      if (isRegister) await registerWithEmail(email, password, name);
      else await loginWithEmail(email, password);
      router.push('/dashboard');
    } catch (err: any) { setError(getAuthErrorMessage(err.code)); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white dark:bg-zinc-950">
      {/* Left branding panel */}
      <BrandPanel />

      {/* Right form panel */}
      <div className="flex flex-col justify-center items-center px-6 py-12 sm:px-10 bg-white dark:bg-zinc-950">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10 flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl">S</div>
          <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white">
            Store<span className="text-blue-600">zy</span>
          </span>
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-zinc-900 dark:text-white mb-1.5">
              {isRegister ? 'Buat akun gratis 🎉' : 'Selamat datang kembali 👋'}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {isRegister
                ? 'Bergabung dengan 500+ pelaku UMKM yang sudah digital.'
                : 'Masuk untuk mengelola toko dan transaksi Anda.'}
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <GoogleIcon />}
            Lanjutkan dengan Google
          </button>

          {/* Divider */}
          <div className="relative my-6 flex items-center">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="mx-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">atau</span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <Field
                label="Nama Lengkap" id="name" type="text"
                value={name} onChange={setName}
                placeholder="Budi Santoso"
                icon={User} required
              />
            )}
            <Field
              label="Email" id="email" type="email"
              value={email} onChange={setEmail}
              placeholder="nama@bisnis.com"
              icon={Mail} required
            />
            <Field
              label="Password" id="password" type="password"
              value={password} onChange={setPassword}
              placeholder="Min. 8 karakter"
              icon={Lock} required
            />

            {/* Error message */}
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-800/30 rounded-xl">
                <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-600 dark:text-red-400 font-medium leading-relaxed">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-black transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none mt-2"
            >
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Memproses…</>
                : <>{isRegister ? 'Buat Akun Sekarang' : 'Masuk ke Dashboard'} <ArrowRight size={16} /></>
              }
            </button>
          </form>

          {/* Toggle register / login */}
          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}
            {' '}
            <button
              onClick={() => { setIsRegister(!isRegister); setError(null); }}
              className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
            >
              {isRegister ? 'Masuk di sini' : 'Daftar gratis'}
            </button>
          </p>

          {/* Trust signals */}
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1"><Lock size={11} /> Data aman & terenkripsi</span>
            <span className="w-px h-3 bg-zinc-200 dark:bg-zinc-700" />
            <span className="flex items-center gap-1"><ShieldCheck size={11} /> Gratis selamanya</span>
          </div>
        </div>
      </div>
    </div>
  );
}
