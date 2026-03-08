import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGenerateStore } from '@/hooks/useGenerateStore';
import { useAuth } from '@/components/providers/AuthContext';
import { Store } from '@/types/store';
import { Product } from '@/types/product';
import Link from 'next/link';
import { uploadImage } from '@/lib/cloudinaryService';

export default function BusinessForm() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { loading, error: generateError, generateStore } = useGenerateStore();
  
  const [formData, setFormData] = useState<Omit<Store, 'id' | 'createdAt'>>({
    name: '',
    tagline: '',
    description: '',
    products: [{ name: '', price: 0, description: '' }],
  });
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [productImageFiles, setProductImageFiles] = useState<(File | null)[]>([null]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setUploading(true);
    setSuccess(false);
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

      const finalData = {
        ...formData,
        logoUrl,
        products: updatedProducts
      };

      const storeId = await generateStore(finalData as Store, user.uid);
      setSuccess(true);
      
      setTimeout(() => {
        router.push(`/store/${storeId}`);
      }, 1500);
      
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat membuat toko.");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
    const updatedProducts = [...(formData.products || [])];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setFormData(prev => ({ ...prev, products: updatedProducts }));
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

  // Skip rendering the full form if auth is still loading
  if (authLoading) return (
    <div className="max-w-2xl mx-auto p-12 flex justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // Show login CTA if not authenticated
  if (!user) return (
    <div className="max-w-2xl mx-auto p-12 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-8">
      <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
          <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
        </svg>
      </div>
      <div>
        <h2 className="text-3xl font-black mb-4">Siap Memulai Bisnis?</h2>
        <p className="text-zinc-500 max-w-sm mx-auto">
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

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-zinc-500/10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl">S</div>
          <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white">Storezy</span>
        </div>
        <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Bangun Toko Impianmu
        </h2>
        <p className="text-zinc-500 mt-2">Isi detail bisnis dan produk Anda untuk memulai generasi otomatis dengan Storezy.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Detail Bisnis Section */}
        <div className="space-y-6">
          <div className="flex gap-6 items-start">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                  Nama Bisnis
                </label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Kedai Kopi Senja"
                  className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-400 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                  Tagline Bisnis
                </label>
                <input
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="Contoh: Rasa Otentik di Setiap Tetes"
                  className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1 block">
                Logo Toko
              </label>
              <div className="relative w-32 h-32 group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="w-full h-full bg-zinc-50 dark:bg-zinc-800/50 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-2xl flex flex-col items-center justify-center overflow-hidden group-hover:border-blue-500 transition-colors">
                  {logoFile ? (
                    <img 
                      src={URL.createObjectURL(logoFile)} 
                      alt="Logo Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-zinc-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v12.75a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-widest text-center px-2">Unggah Logo</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
              Deskripsi Bisnis
            </label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Ceritakan sedikit tentang bisnis Anda..."
              className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-400 resize-none"
            />
          </div>
        </div>

        {/* Produk Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Daftar Produk
            </label>
            <button
              type="button"
              onClick={addProduct}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Tambah Produk
            </button>
          </div>

          <div className="space-y-4">
            {formData.products?.map((product, index) => (
              <div key={index} className="p-5 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 relative group">
                <div className="flex gap-4">
                  <div className="w-24 h-24 relative shrink-0 group/img">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const newFiles = [...productImageFiles];
                        newFiles[index] = e.target.files?.[0] || null;
                        setProductImageFiles(newFiles);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl flex flex-col items-center justify-center overflow-hidden group-hover/img:border-blue-500 transition-colors">
                      {productImageFiles[index] ? (
                        <img 
                          src={URL.createObjectURL(productImageFiles[index]!)} 
                          alt="Product Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-3">
                        <input
                          required
                          placeholder="Nama Produk"
                          value={product.name}
                          onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
                        />
                      </div>
                      <div className="flex-2">
                        <input
                          required
                          type="number"
                          placeholder="Harga"
                          value={product.price || ''}
                          onChange={(e) => handleProductChange(index, 'price', Number(e.target.value))}
                          className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                        />
                      </div>
                      {formData.products && formData.products.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProduct(index)}
                          className="p-2 text-zinc-400 hover:text-red-500 transition-colors self-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div>
                      <input
                        placeholder="Deskripsi singkat produk (opsional)"
                        value={product.description || ''}
                        onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {(error || generateError) && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 text-sm animate-pulse">
            {error || generateError}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl text-green-600 text-sm transition-all duration-500">
            Toko Anda dengan produk berhasil dibuat!
          </div>
        )}

        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group mt-4"
        >
          {loading || uploading ? (
            <div className="w-5 h-5 border-2 border-white dark:border-zinc-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Generate Toko Sekarang
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              >
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
