"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGenerateStore } from '@/hooks/useGenerateStore';
import { useAuth } from '@/components/providers/AuthContext';
import { Store } from '@/types/store';
import { Product } from '@/types/product';
import Link from 'next/link';
import { uploadImage } from '@/lib/cloudinaryService';
import { generateStoreAI, generateProductsAI } from '@/lib/aiClient';
import {
  Building2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Store as StoreIcon,
  Image as ImageIcon,
  Upload,
  Loader2,
  AlertCircle,
  Edit3,
} from 'lucide-react';

/* ── Shared field skeleton ── */
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-xl ${className}`} />
);

/* ── Label + input wrapper ── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 transition-all';

/* ── Main component ── */
export default function BusinessForm() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { generateStore } = useGenerateStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Omit<Store, 'id' | 'createdAt'>>({
    name: '',
    tagline: '',
    description: '',
    products: [{ name: '', price: 0, description: '' }],
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [productImageFiles, setProductImageFiles] = useState<(File | null)[]>([null]);
  const [submitting, setSubmitting] = useState(false);
  const [generatingInfo, setGeneratingInfo] = useState(false);
  const [generatingProducts, setGeneratingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiStage, setAiStage] = useState(0);

  const infoStages = ['Menganalisis Industri…', 'Mencari Kata Kunci Populer…', 'Menyusun Tagline…', 'Menghaluskan Deskripsi…'];
  const productStages = ['Memetakan Kebutuhan Pasar…', 'Kurasi Produk Terbaik…', 'Menentukan Harga Kompetitif…', 'Membuat Deskripsi Produk…'];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (generatingInfo || generatingProducts) {
      setAiStage(0);
      interval = setInterval(() => setAiStage((p) => (p + 1) % 4), 2000);
    }
    return () => clearInterval(interval);
  }, [generatingInfo, generatingProducts]);

  const handleGenerateStoreAI = async () => {
    if (!formData.name && !formData.description) {
      setError('Masukkan minimal nama atau deskripsi bisnis agar AI punya konteks.');
      return;
    }
    setGeneratingInfo(true);
    setError(null);
    try {
      const data = await generateStoreAI(formData.description || formData.name);
      setFormData((prev) => ({
        ...prev,
        name: data.name || prev.name,
        tagline: data.tagline || prev.tagline,
        description: data.description || prev.description,
      }));
    } catch (err: any) {
      setError('AI Gagal: ' + err.message);
    } finally {
      setGeneratingInfo(false);
    }
  };

  const handleGenerateProductsAI = async () => {
    if (!formData.name) {
      setError('Masukkan nama bisnis terlebih dahulu agar AI bisa menyarankan produk yang relevan.');
      return;
    }
    setGeneratingProducts(true);
    setError(null);
    try {
      const data = await generateProductsAI(`${formData.name} - ${formData.description || formData.tagline}`);
      if (data.products?.length > 0) {
        setFormData((prev) => ({ ...prev, products: data.products }));
        setProductImageFiles(new Array(data.products.length).fill(null));
      }
    } catch (err: any) {
      setError('AI Gagal: ' + err.message);
    } finally {
      setGeneratingProducts(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSubmitting(true);
    setError(null);
    try {
      let logoUrl = '';
      if (logoFile) logoUrl = await uploadImage(logoFile);
      const updatedProducts = [...formData.products!];
      for (let i = 0; i < productImageFiles.length; i++) {
        if (productImageFiles[i]) {
          updatedProducts[i].imageUrl = await uploadImage(productImageFiles[i]!);
        }
      }
      const storeId = await generateStore({ ...formData, logoUrl, products: updatedProducts } as Store, user.uid);
      router.push(`/store/${storeId}`);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat membuat toko.');
    } finally {
      setSubmitting(false);
    }
  };

  const addProduct = () => {
    setFormData((prev) => ({ ...prev, products: [...(prev.products || []), { name: '', price: 0, description: '' }] }));
    setProductImageFiles((prev) => [...prev, null]);
  };

  const removeProduct = (index: number) => {
    const updated = (formData.products || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, products: updated.length > 0 ? updated : [{ name: '', price: 0, description: '' }] }));
    setProductImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
    const updated = [...(formData.products || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, products: updated }));
  };

  /* ── Auth loading ── */
  if (authLoading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 size={28} className="animate-spin text-blue-600" />
    </div>
  );

  /* ── Not signed in ── */
  if (!user) return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/30 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
          <StoreIcon size={30} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">Siap Mulai Berjualan?</h2>
          <p className="text-base text-zinc-500 leading-relaxed">
            Masuk atau daftar terlebih dahulu untuk membangun toko online Anda secara gratis.
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
        >
          Lanjutkan ke Login <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );

  /* ── Step config ── */
  const steps = [
    { id: 1, label: 'Info Bisnis', icon: Building2 },
    { id: 2, label: 'Produk',     icon: ShoppingBag },
    { id: 3, label: 'Konfirmasi', icon: CheckCircle2 },
  ];

  const isGenerating = generatingInfo || generatingProducts;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ── Page header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800/40 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 mb-4">
            <Sparkles size={12} /> AI Store Builder
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
            Buat Toko Anda Sekarang
          </h1>
          <p className="text-sm text-zinc-500">Ikuti 3 langkah mudah — selesai dalam hitungan menit.</p>
        </div>

        {/* ── Step indicator ── */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {steps.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  step === s.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-110'
                    : step > s.id
                    ? 'bg-green-500 text-white'
                    : 'bg-white dark:bg-zinc-900 text-zinc-400 border border-zinc-200 dark:border-zinc-800'
                }`}>
                  {step > s.id ? <CheckCircle2 size={18} /> : <s.icon size={18} />}
                </div>
                <span className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${
                  step >= s.id ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400'
                }`}>{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-px flex-1 max-w-[80px] mx-3 mb-5 transition-colors duration-500 ${step > s.id ? 'bg-green-300 dark:bg-green-700' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── AI progress bar ── */}
        {isGenerating && (
          <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${(aiStage + 1) * 25}%` }}
            />
          </div>
        )}

        {/* ── Error banner ── */}
        {error && (
          <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-800/30 rounded-2xl">
            <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
          </div>
        )}

        {/* ── Card ── */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">

          {/* ═══════════════════════ STEP 1 ═══════════════════════ */}
          {step === 1 && (
            <div className="p-6 sm:p-8 space-y-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Header */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white">Identitas Bisnis</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {generatingInfo
                      ? <span className="text-blue-500 font-semibold animate-pulse">{infoStages[aiStage]}</span>
                      : 'Berikan nama dan karakter unik untuk brand Anda.'}
                  </p>
                </div>
                <button
                  onClick={handleGenerateStoreAI}
                  disabled={generatingInfo}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                    generatingInfo
                      ? 'bg-blue-600 text-white opacity-80 cursor-not-allowed'
                      : 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/40 hover:bg-blue-100 dark:hover:bg-blue-950/50'
                  }`}
                >
                  {generatingInfo ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  {generatingInfo ? 'Memproses…' : 'Bantu AI'}
                </button>
              </div>

              {/* Logo + fields side by side */}
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Logo upload */}
                <div className="shrink-0">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400 mb-1.5">Logo</label>
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/70 border-2 border-dashed border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors group cursor-pointer">
                    <input
                      type="file" accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    {logoFile ? (
                      <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-cover" alt="logo" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 group-hover:text-blue-500 transition-colors">
                        <Upload size={20} strokeWidth={1.5} />
                        <span className="mt-1 text-[9px] font-bold uppercase">Upload</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name + Tagline */}
                <div className="flex-1 space-y-4">
                  <Field label="Nama Bisnis">
                    {generatingInfo
                      ? <Skeleton className="h-11 w-full" />
                      : <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Kedai Kopi Senja" className={inputCls} />}
                  </Field>
                  <Field label="Tagline">
                    {generatingInfo
                      ? <Skeleton className="h-11 w-full" />
                      : <input type="text" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} placeholder="Rasa Otentik di Setiap Tetes" className={inputCls} />}
                  </Field>
                </div>
              </div>

              {/* Description */}
              <Field label="Deskripsi Bisnis">
                {generatingInfo
                  ? <Skeleton className="h-24 w-full" />
                  : <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Ceritakan singkat tentang brand dan keunggulan Anda…" className={`${inputCls} resize-none`} />}
              </Field>

              {/* Footer */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => { setError(null); setStep(2); }}
                  disabled={!formData.name}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  Lanjut ke Produk <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════ STEP 2 ═══════════════════════ */}
          {step === 2 && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Header */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white">Daftar Produk</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {generatingProducts
                      ? <span className="text-blue-500 font-semibold animate-pulse">{productStages[aiStage]}</span>
                      : 'Tambahkan produk yang akan dijual di toko Anda.'}
                  </p>
                </div>
                <button
                  onClick={handleGenerateProductsAI}
                  disabled={generatingProducts}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                    generatingProducts
                      ? 'bg-blue-600 text-white opacity-80 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20'
                  }`}
                >
                  {generatingProducts ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  {generatingProducts ? 'Memproses…' : 'Generate AI'}
                </button>
              </div>

              {/* Product list */}
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {generatingProducts ? (
                  [1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                      <Skeleton className="w-16 h-16 shrink-0 rounded-xl" />
                      <div className="flex-1 space-y-3">
                        <div className="flex gap-3">
                          <Skeleton className="h-9 flex-1" />
                          <Skeleton className="h-9 w-28" />
                        </div>
                        <Skeleton className="h-9 w-full" />
                      </div>
                    </div>
                  ))
                ) : (
                  formData.products?.map((product, index) => (
                    <div key={index} className="group flex gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors">
                      {/* Product image */}
                      <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-300 cursor-pointer hover:border-blue-400 transition-colors">
                        <input
                          type="file" accept="image/*"
                          onChange={(e) => {
                            const files = [...productImageFiles];
                            files[index] = e.target.files?.[0] || null;
                            setProductImageFiles(files);
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        {productImageFiles[index]
                          ? <img src={URL.createObjectURL(productImageFiles[index]!)} className="w-full h-full object-cover" alt="" />
                          : <ImageIcon size={20} strokeWidth={1.5} />}
                      </div>

                      {/* Fields */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Nama produk"
                            value={product.name}
                            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                            className={`${inputCls} flex-1`}
                          />
                          <div className="relative w-32 shrink-0">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">Rp</span>
                            <input
                              type="number"
                              placeholder="Harga"
                              value={product.price || ''}
                              onChange={(e) => handleProductChange(index, 'price', Number(e.target.value))}
                              className={`${inputCls} pl-9`}
                            />
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder="Deskripsi singkat produk…"
                          value={product.description || ''}
                          onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                          className={inputCls}
                        />
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeProduct(index)}
                        className="shrink-0 self-start p-2 rounded-xl text-zinc-300 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add product */}
              <button
                onClick={addProduct}
                className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-2xl text-sm font-bold text-zinc-400 flex items-center justify-center gap-2 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-all"
              >
                <Plus size={16} /> Tambah Produk
              </button>

              {/* Nav */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={() => { setError(null); setStep(1); }}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                  <ArrowLeft size={15} /> Kembali
                </button>
                <button
                  onClick={() => { setError(null); setStep(3); }}
                  disabled={formData.products?.some((p) => !p.name)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  Review <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════ STEP 3 ═══════════════════════ */}
          {step === 3 && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white">Cek & Konfirmasi</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Pastikan semua data sudah sesuai sebelum toko dibuat.</p>
                </div>
              </div>

              {/* Store preview */}
              <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 shadow-sm">
                    {logoFile
                      ? <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-cover" alt="logo" />
                      : <StoreIcon size={24} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-black text-zinc-900 dark:text-white truncate">{formData.name}</h3>
                    {formData.tagline && <p className="text-xs text-blue-600 dark:text-blue-400 italic truncate">{formData.tagline}</p>}
                    {formData.description && <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{formData.description}</p>}
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="shrink-0 p-2 rounded-xl text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                    title="Edit info bisnis"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                  <p className="text-2xl font-black text-zinc-900 dark:text-white">{formData.products?.length}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-0.5">Produk</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-800/30 text-center">
                  <p className="text-xs font-black text-blue-600 dark:text-blue-400">PREMIUM</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-0.5">Status</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-100 dark:border-green-800/30 text-center">
                  <p className="text-xs font-black text-green-600 dark:text-green-400">GRATIS</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-0.5">Biaya</p>
                </div>
              </div>

              {/* Product quick list */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Produk Anda</p>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-800/30">
                  {formData.products?.slice(0, 4).map((p, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">{p.name || '—'}</span>
                      <span className="text-sm font-black text-blue-600 dark:text-blue-400 shrink-0 ml-4">Rp {(p.price || 0).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                  {(formData.products?.length || 0) > 4 && (
                    <div className="px-4 py-2 text-xs text-zinc-400 text-center">
                      +{(formData.products?.length || 0) - 4} produk lainnya
                    </div>
                  )}
                </div>
              </div>

              {/* Nav */}
              <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-2xl font-black text-base hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {submitting
                    ? <><Loader2 size={18} className="animate-spin" /> Membangun Toko…</>
                    : <><StoreIcon size={18} /> Buat Toko Sekarang!</>
                  }
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={submitting}
                  className="w-full py-2.5 text-sm font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  ← Kembali ubah produk
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
