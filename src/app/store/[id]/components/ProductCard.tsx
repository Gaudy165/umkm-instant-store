import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState({ name: '', email: '', mobile: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', mobile: '' });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const validateForm = () => {
    const errors = { name: '', email: '', mobile: '' };
    let isValid = true;

    if (customerData.name.trim().length < 3) {
      errors.name = 'Nama minimal 3 karakter';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerData.email)) {
      errors.email = 'Format email tidak valid';
      isValid = false;
    }

    // Basic mobile validation (minimal 10 digits for ID numbers)
    if (!/^\d{10,15}$/.test(customerData.mobile.replace(/\D/g, ''))) {
      errors.mobile = 'Nomor HP tidak valid (min. 10 digit angka)';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/payment/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: product.price,
          name: customerData.name,
          email: customerData.email,
          mobile: customerData.mobile,
          description: `Pembelian ${product.name}`,
          productId: product.id,
          redirect_url: window.location.origin,
        }),
      });

      const data = await response.json();
      console.log('Payment API Response:', data);

      const paymentLink = data.link || data.url || data.paymentUrl || data.payment_url;

      if (paymentLink) {
        window.location.href = paymentLink;
      } else {
        console.error('Payment link not found in response:', data);
        throw new Error('Gagal mendapatkan link pembayaran');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Maaf, terjadi kesalahan saat memproses pembayaran.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-500/10 hover:-translate-y-1">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <div className="aspect-square w-full bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 text-zinc-400 group-hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-100 dark:border-zinc-800 relative">
              {product.imageUrl ? (
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                  <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a.75.75 0 01.75-.75H13.5a.75.75 0 010 1.5H9.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 text-sm line-clamp-2 min-h-[40px]">
              {product.description || "Tidak ada deskripsi produk."}
            </p>
          </div>
          
          <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-lg font-black text-blue-600 dark:text-blue-400">
              {formatPrice(product.price)}
            </span>
            <button 
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black tracking-tight">Data Pembeli</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleBuy} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Nama Lengkap</label>
                <input
                  required
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={customerData.name}
                  onChange={(e) => {
                    setCustomerData({ ...customerData, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                  }}
                  className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    formErrors.name 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{formErrors.name}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email</label>
                <input
                  required
                  type="email"
                  placeholder="nama@email.com"
                  value={customerData.email}
                  onChange={(e) => {
                    setCustomerData({ ...customerData, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                  }}
                  className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    formErrors.email 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{formErrors.email}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Nomor WhatsApp / HP</label>
                <input
                  required
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={customerData.mobile}
                  onChange={(e) => {
                    setCustomerData({ ...customerData, mobile: e.target.value });
                    if (formErrors.mobile) setFormErrors({ ...formErrors, mobile: '' });
                  }}
                  className={`w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    formErrors.mobile 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'
                  }`}
                />
                {formErrors.mobile && (
                  <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{formErrors.mobile}</p>
                )}
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <div className="flex justify-between items-center text-blue-900 dark:text-blue-100 italic">
                  <span className="text-sm font-medium">Total Pembayaran:</span>
                  <span className="font-black">{formatPrice(product.price)}</span>
                </div>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Konfirmasi & Bayar'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
