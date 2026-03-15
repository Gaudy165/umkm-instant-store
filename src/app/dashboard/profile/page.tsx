"use client";

import React, { useState, useRef } from 'react';
import { useAuth } from '@/components/providers/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { uploadImage } from '@/lib/cloudinaryService';
import {
  User,
  Mail,
  Camera,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const inputCls =
  'w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 transition-all';

export default function ProfilePage() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initials = (user?.displayName || user?.email || 'U')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      let photoURL = user.photoURL || '';
      if (avatarFile) {
        setUploadingAvatar(true);
        photoURL = await uploadImage(avatarFile);
        setUploadingAvatar(false);
      }
      await updateProfile(auth.currentUser!, {
        displayName: displayName.trim() || user.displayName,
        photoURL,
      });
      setSuccess(true);
      setAvatarFile(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan profil.');
    } finally {
      setSaving(false);
      setUploadingAvatar(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-zinc-900 dark:text-white">Profil Saya</h2>
        <p className="text-sm text-zinc-500 mt-0.5">Kelola informasi profil akun Anda.</p>
      </div>

      {/* Alert */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-800/30 rounded-2xl">
          <AlertCircle size={16} className="text-red-500 shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-800/30 rounded-2xl">
          <CheckCircle2 size={16} className="text-green-500 shrink-0" />
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">Profil berhasil disimpan!</p>
        </div>
      )}

      {/* Two-column grid for large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6">
        <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-5">Foto Profil</h3>
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="relative group shrink-0">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-md">
              {avatarPreview || user?.photoURL ? (
                <img
                  src={avatarPreview || user?.photoURL!}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-900 dark:text-white mb-1">
              {user?.displayName || 'Vendor'}
            </p>
            <p className="text-xs text-zinc-400 mb-3">{user?.email}</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {uploadingAvatar ? 'Mengupload…' : 'Ganti foto'}
            </button>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 space-y-5">
        <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Informasi Akun</h3>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Nama Tampilan
          </label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Nama Anda"
              className={`${inputCls} pl-9`}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Email
          </label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className={`${inputCls} pl-9 opacity-60 cursor-not-allowed`}
            />
          </div>
          <p className="text-[11px] text-zinc-400">Email tidak dapat diubah.</p>
        </div>

        {/* Provider badge */}
        <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
          <div className="w-6 h-6 rounded-lg bg-white dark:bg-zinc-700 flex items-center justify-center shadow-sm">
            {user?.providerData[0]?.providerId === 'google.com' ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            ) : (
              <Mail size={14} className="text-zinc-500" />
            )}
          </div>
          <span className="text-xs font-medium text-zinc-500">
            Login via{' '}
            <span className="font-bold text-zinc-700 dark:text-zinc-300">
              {user?.providerData[0]?.providerId === 'google.com' ? 'Google' : 'Email & Password'}
            </span>
          </span>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Menyimpan…' : 'Simpan Perubahan'}
        </button>
      </div>{/* end info card */}
      </div>{/* end two-col grid */}
    </div>
  );
}
