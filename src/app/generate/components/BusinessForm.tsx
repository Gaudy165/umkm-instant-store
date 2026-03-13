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
  Upload
} from 'lucide-react';

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

  const handleGenerateStoreAI = async () => {
    if (!formData.name && !formData.description) {
      setError("Masukkan minimal nama atau deskripsi singkat agar AI punya konteks.");
      return;
    }
    setGeneratingInfo(true);
    setError(null);
    try {
      const context = formData.description || formData.name;
      const data = await generateStoreAI(context);
      setFormData(prev => ({
        ...prev,
        name: data.name || prev.name,
        tagline: data.tagline || prev.tagline,
        description: data.description || prev.description
      }));
    } catch (err: any) {
      setError("AI Gagal: " + err.message);
    } finally {
      setGeneratingInfo(false);
    }
  };

  const handleGenerateProductsAI = async () => {
    if (!formData.name) {
      setError("Masukkan nama bisnis terlebih dahulu agar AI bisa menyarankan produk yang relevan.");
      return;
    }
    setGeneratingProducts(true);
    setError(null);
    try {
      const context = `${formData.name} - ${formData.description || formData.tagline}`;
      const data = await generateProductsAI(context);
      if (data.products && data.products.length > 0) {
        setFormData(prev => ({ ...prev, products: data.products }));
        setProductImageFiles(new Array(data.products.length).fill(null));
      }
    } catch (err: any) {
      setError("AI Gagal: " + err.message);
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
      if (logoFile) {
        logoUrl = await uploadImage(logoFile);
      }
      const updatedProducts = [...formData.products!];
      for (let i = 0; i < productImageFiles.length; i++) {
        if (productImageFiles[i]) {
          updatedProducts[i].imageUrl = await uploadImage(productImageFiles[i]!);
        }
      }
      const finalData = { ...formData, logoUrl, products: updatedProducts };
      const storeId = await generateStore(finalData as Store, user.uid);
      router.push(`/store/${storeId}`);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat membuat toko.");
    } finally {
      setSubmitting(false);
    }
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...(prev.products || []), { name: '', price: 0, description: '' }]
    }));
    setProductImageFiles(prev => [...prev, null]);
  };

  const removeProduct = (index: number) => {
    const updatedProducts = (formData.products || []).filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      products: updatedProducts.length > 0 ? updatedProducts : [{ name: '', price: 0, description: '' }]
    }));
    setProductImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
    const updatedProducts = [...(formData.products || [])];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setFormData(prev => ({ ...prev, products: updatedProducts }));
  };

  if (authLoading) return (
    <div className="max-w-4xl mx-auto p-12 flex justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return (
    <div className="max-w-2xl mx-auto p-12 bg-white dark:bg-zinc-900 rounded-[40px] shadow-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-8">
      <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
        <StoreIcon size={40} />
      </div>
      <div>
        <h2 className="text-3xl font-black mb-4">Siap Memulai Bisnis?</h2>
        <p className="text-zinc-500 max-w-sm mx-auto font-medium">
          Silakan masuk atau daftar terlebih dahulu untuk mulai membangun toko online premium Anda sendiri.
        </p>
      </div>
      <Link 
        href="/login"
        className="inline-block px-12 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-zinc-500/10"
      >
        Lanjutkan ke Login
      </Link>
    </div>
  );

  const steps = [
    { id: 1, title: 'Detail Bisnis', icon: Building2 },
    { id: 2, title: 'Kelola Produk', icon: ShoppingBag },
    { id: 3, title: 'Konfirmasi', icon: CheckCircle2 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      {/* Progress Indicator */}
      <div className="mb-12 flex items-center justify-between relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 dark:bg-zinc-800 -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${
              step === s.id ? 'bg-blue-600 text-white scale-110 shadow-blue-500/30' :
              step > s.id ? 'bg-green-500 text-white' : 'bg-white dark:bg-zinc-900 text-zinc-400 border border-zinc-200 dark:border-zinc-800'
            }`}>
              <s.icon size={20} />
            </div>
            <span className={`mt-3 text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[48px] p-8 md:p-12 shadow-2xl shadow-zinc-500/5">
        
        {/* Step 1: Business Details */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-2">Info Bisnis</h2>
                <p className="text-zinc-500 font-medium italic">Berikan identitas unik untuk brand Anda.</p>
              </div>
              <button onClick={handleGenerateStoreAI} disabled={generatingInfo} className="flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl text-sm font-black hover:bg-blue-100 transition-all disabled:opacity-50">
                <Sparkles size={16} /> {generatingInfo ? 'Menyusun...' : 'Bantu dengan AI'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Nama Bisnis</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Contoh: Kedai Kopi Senja" className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all placeholder:text-zinc-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Tagline</label>
                  <input type="text" value={formData.tagline} onChange={(e) => setFormData({...formData, tagline: e.target.value})} placeholder="Contoh: Rasa Otentik di Setiap Tetes" className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all placeholder:text-zinc-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Logo Toko</label>
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 border-2 border-dashed border-zinc-200 dark:border-zinc-800 group hover:border-blue-500 transition-colors">
                  <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  {logoFile ? (
                    <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400">
                      <Upload size={32} strokeWidth={1.5} />
                      <span className="mt-2 text-[10px] font-black uppercase tracking-tighter">Pilih Logo</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Deskripsi Bisnis</label>
              <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Ceritakan sedikit tentang brand Anda..." className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all resize-none placeholder:text-zinc-400" />
            </div>

            <div className="flex justify-end pt-4">
              <button onClick={() => setStep(2)} disabled={!formData.name} className="px-12 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-3xl font-black hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50">
                Lanjut ke Produk <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Products */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-2">Daftar Produk</h2>
                <p className="text-zinc-500 font-medium italic">Katalog produk untuk dipajang di toko.</p>
              </div>
              <button onClick={handleGenerateProductsAI} disabled={generatingProducts} className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50">
                <Sparkles size={18} /> {generatingProducts ? 'Eksplorasi Ide...' : 'Otomatiskan dengan AI'}
              </button>
            </div>

            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {formData.products?.map((product, index) => (
                <div key={index} className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[32px] relative group">
                  <button onClick={() => removeProduct(index)} className="absolute -top-2 -right-2 p-2 bg-white dark:bg-zinc-800 shadow-lg text-red-500 rounded-full hover:scale-110 opacity-0 group-hover:opacity-100 transition-all z-20">
                    <Trash2 size={16} />
                  </button>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-32 aspect-square relative shrink-0">
                      <input type="file" accept="image/*" onChange={(e) => {
                        const newFiles = [...productImageFiles];
                        newFiles[index] = e.target.files?.[0] || null;
                        setProductImageFiles(newFiles);
                      }} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      <div className="w-full h-full bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-300 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                        {productImageFiles[index] ? (
                          <img src={URL.createObjectURL(productImageFiles[index]!)} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={28} strokeWidth={1.5} />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Nama Produk" value={product.name} onChange={(e) => handleProductChange(index, 'name', e.target.value)} className="w-full px-5 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl font-bold outline-none" />
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-sm">Rp</span>
                           <input type="number" placeholder="Harga" value={product.price || ''} onChange={(e) => handleProductChange(index, 'price', Number(e.target.value))} className="w-full pl-12 pr-5 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl font-bold outline-none" />
                        </div>
                      </div>
                      <input type="text" placeholder="Deskripsi pendek produk..." value={product.description || ''} onChange={(e) => handleProductChange(index, 'description', e.target.value)} className="w-full px-5 py-3 bg-white dark:bg-zinc-800 border-none rounded-xl font-medium text-sm outline-none placeholder:italic" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={addProduct} className="w-full py-5 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-zinc-400 font-black flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-500 transition-all">
              <Plus size={20} /> Tambah Produk Manual
            </button>

            <div className="flex items-center justify-between pt-8 border-t border-zinc-100 dark:border-zinc-800">
               <button onClick={() => setStep(1)} className="px-8 py-4 text-zinc-500 font-bold flex items-center gap-2 hover:text-zinc-900 transition-colors">
                  <ArrowLeft size={18} /> Kembali
               </button>
               <button onClick={() => setStep(3)} disabled={formData.products?.some(p => !p.name)} className="px-12 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-3xl font-black shadow-xl flex items-center gap-3 disabled:opacity-50">
                  Ringkasan & Review <ArrowRight size={20} />
               </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4">
               <div className="w-24 h-24 bg-green-500 text-white rounded-[40px] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20">
                  <CheckCircle2 size={48} />
               </div>
               <h2 className="text-4xl font-black tracking-tight">Cek Terakhir!</h2>
               <p className="text-zinc-500 font-medium italic">Pastikan semua data sudah sesuai dengan keinginan Anda.</p>
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[40px] border border-zinc-100 dark:border-zinc-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rotate-45 translate-x-12 -translate-y-12" />
                <div className="flex items-center gap-6 relative z-10">
                   <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-3xl shadow-lg flex items-center justify-center overflow-hidden border border-zinc-100 dark:border-zinc-700">
                      {logoFile ? <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-cover" /> : <StoreIcon size={32} className="text-zinc-300" />}
                   </div>
                   <div className="flex-1">
                      <h4 className="text-2xl font-black">{formData.name}</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-bold text-sm italic">{formData.tagline || 'Tanpa tagline'}</p>
                   </div>
                   <button onClick={() => setStep(1)} className="p-3 bg-white dark:bg-zinc-800 rounded-full shadow-md text-zinc-400 hover:text-blue-600">
                      <Upload size={18} />
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Total Produk</p>
                    <p className="text-2xl font-black">{formData.products?.length}</p>
                 </div>
                 <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Status</p>
                    <p className="text-2xl font-black text-blue-600">PREMIUM</p>
                 </div>
                 <div className="col-span-2 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Deskripsi</p>
                    <p className="text-sm font-medium text-zinc-500 line-clamp-2 italic leading-relaxed">"{formData.description}"</p>
                 </div>
              </div>
            </div>

            {error && (
              <div className="p-5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-3xl text-red-600 text-sm font-bold animate-pulse text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
               <button onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-blue-600 text-white rounded-[40px] text-2xl font-black hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-4 disabled:opacity-50">
                  {submitting ? 'Membangun Toko...' : 'Mulai Jualan Sekarang!'} <StoreIcon size={28} />
               </button>
               <button onClick={() => setStep(2)} disabled={submitting} className="w-full py-4 text-zinc-400 font-bold hover:text-zinc-600 transition-colors">
                  Mau ubah data produk? Kembali
               </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; }
      `}</style>
    </div>
  );
}
