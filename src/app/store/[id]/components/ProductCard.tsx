"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Product } from '@/types/product';
import {
  ShoppingCart, X, User, Mail, Phone,
  Loader2, Shield, ArrowRight, Package, Tag, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

/* Shared input class */
const inputBase =
  'w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 border rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800';

/* Field wrapper */
function Field({
  icon: Icon, label, error, children,
}: {
  icon: React.ElementType;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] sm:text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1 sm:mb-1.5 leading-none">
        {label}
      </label>
      <div className="relative">
        <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
        {children}
      </div>
      {error && (
        <p className="text-red-500 text-[11px] font-semibold mt-1.5 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />{error}
        </p>
      )}
    </div>
  );
}

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [customerData, setCustomerData] = useState({ name: '', email: '', mobile: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', mobile: '' });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isList = layout === 'list';

  const set = (k: keyof typeof customerData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData(p => ({ ...p, [k]: e.target.value }));
    if (formErrors[k]) setFormErrors(p => ({ ...p, [k]: '' }));
  };

  const validate = () => {
    const err = { name: '', email: '', mobile: '' };
    let ok = true;
    if (customerData.name.trim().length < 3) { err.name = 'Nama minimal 3 karakter'; ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) { err.email = 'Format email tidak valid'; ok = false; }
    if (!/^\d{10,15}$/.test(customerData.mobile.replace(/\D/g, ''))) { err.mobile = 'Nomor HP minimal 10 digit'; ok = false; }
    setFormErrors(err);
    return ok;
  };

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/payment/create-invoice', {
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
      const data = await res.json();
      const link = data.link || data.url || data.paymentUrl || data.payment_url;
      if (link) { window.location.href = link; }
      else throw new Error('No payment link');
    } catch {
      alert('Terjadi kesalahan saat memproses pembayaran.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCustomerData({ name: '', email: '', mobile: '' });
    setFormErrors({ name: '', email: '', mobile: '' });
  };

  return (
    <>
      {/* ── Card ── */}
    <article
      className={`
        group relative bg-white dark:bg-zinc-900
        border border-stone-200 dark:border-zinc-800/80
        overflow-hidden flex transition-all duration-700
        hover:shadow-[0_32px_80px_-16px_rgba(45,35,25,0.1)]
        dark:hover:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.4)]
        ${isList
          ? 'flex-row rounded-[24px] hover:-translate-y-0.5'
          : 'flex-col rounded-[24px] sm:rounded-[32px] hover:-translate-y-1.5'}
      `}
    >

      {/* Image container */}
      <div className={`relative overflow-hidden bg-stone-50 dark:bg-zinc-800 ${isList ? 'w-32 h-32 sm:w-44 sm:h-44 shrink-0' : 'aspect-square sm:aspect-4/3 w-full'}`}>

        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover relative z-1 transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="relative z-1 w-full h-full flex flex-col items-center justify-center text-stone-200 dark:text-zinc-700 bg-stone-50 dark:bg-zinc-900">
            <Package size={20} className="sm:size-[28]" strokeWidth={1} />
            <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mt-1.5 sm:mt-2.5">No Preview</span>
          </div>
        )}

        {/* Category tag */}
        {(product as Product & { category?: string }).category && (
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-full border border-stone-100 dark:border-zinc-700/50 shadow-sm">
            <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-stone-500 dark:text-zinc-400">
              {(product as Product & { category?: string }).category}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className={`flex flex-col flex-1 ${isList ? 'p-3 sm:p-6' : 'p-3 sm:p-6'}`}>
        <h3 className={`font-serif ${isList ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'} font-bold text-stone-900 dark:text-white line-clamp-1 mb-1 sm:mb-2 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors duration-500`}>
          {product.name}
        </h3>
        <p className="text-[11px] sm:text-sm text-stone-400 dark:text-zinc-500 line-clamp-1 sm:line-clamp-2 leading-relaxed flex-1 mb-3 sm:mb-5">
          {product.description || 'Koleksi terpilih untuk kenyamanan dan keanggunan harian Anda.'}
        </p>

        {/* Bottom row — Elegant pricing */}
        <div className={`flex items-center gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-stone-50 dark:border-zinc-800/50 ${isList ? 'mt-auto' : ''}`}>
          <div className="flex-1 flex flex-col">
            <span className="text-[8px] sm:text-[10px] font-bold text-stone-300 dark:text-zinc-600 uppercase tracking-widest mb-0.5">Price</span>
            <span className={`${isList ? 'text-lg sm:text-xl' : 'text-sm sm:text-lg'} font-serif text-stone-900 dark:text-white`}>
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="group/btn flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-stone-900/10 cursor-pointer"
          >
            <ShoppingCart size={14} className="sm:size-[18] transition-transform group-hover/btn:scale-110" />
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest leading-none">Beli</span>
          </button>
        </div>
      </div>
    </article>

      {/* ── Checkout Sheet / Modal ── */}
      {showModal && mounted && createPortal(
        <div
          className="fixed inset-0 z-9999 flex items-end sm:items-center justify-center sm:p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)' }}
          onClick={e => e.target === e.currentTarget && closeModal()}
        >
          <div className="w-full sm:max-w-[440px] bg-white dark:bg-zinc-900 sm:rounded-[40px] rounded-t-[32px] shadow-2xl border border-stone-100 dark:border-zinc-800 overflow-hidden animate-scaleIn">

            {/* Header */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-stone-50/50 dark:bg-zinc-800/20" />
              <div className="relative flex items-center justify-between px-5 sm:px-8 pt-4 sm:pt-7 pb-3 sm:pb-6 border-b border-stone-100 dark:border-zinc-800">
                <div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                      <Sparkles className="size-[13px] sm:size-[14px] text-amber-600 dark:text-amber-500" />
                    </div>
                    <h2 className="text-sm sm:text-xl font-serif text-stone-900 dark:text-white leading-none">Checkout</h2>
                  </div>
                  <p className="text-[9px] sm:text-[11px] font-bold text-stone-400 dark:text-zinc-500 mt-1.5 ml-7.5 sm:ml-11 uppercase tracking-widest leading-none">Complete selection</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 sm:p-2.5 rounded-2xl hover:bg-stone-100 dark:hover:bg-zinc-800 text-stone-400 hover:text-stone-600 dark:hover:text-zinc-200 transition-colors border border-transparent hover:border-stone-200 dark:hover:border-zinc-700"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Product preview */}
            <div className="mx-5 mt-3 sm:mt-4 flex items-center gap-3 p-2.5 sm:p-4 bg-stone-50/50 dark:bg-zinc-800/40 rounded-[18px] sm:rounded-[24px] border border-stone-100 dark:border-zinc-700/40">
              <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-2xl overflow-hidden shrink-0 bg-stone-100 dark:bg-zinc-800 shadow-sm">
                {product.imageUrl
                  ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><Package className="size-[18px] sm:size-[22px] text-stone-300" /></div>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-base font-serif text-stone-900 dark:text-white truncate leading-none">{product.name}</p>
                <p className="text-[8px] sm:text-[10px] font-bold text-stone-300 dark:text-zinc-600 mt-1 uppercase tracking-widest leading-none">1 item</p>
              </div>
              <p className="text-[14px] sm:text-lg font-serif text-stone-900 dark:text-white shrink-0 leading-none">{formatPrice(product.price)}</p>
            </div>

            {/* Form — Clean & Friendly */}
            <form onSubmit={handleBuy} className="px-7 py-4 sm:py-6 space-y-3 sm:space-y-4">
              <Field icon={User} label="Nama Lengkap" error={formErrors.name}>
                <input type="text" placeholder="Budi Santoso" value={customerData.name} onChange={set('name')}
                  className={`${inputBase} ${formErrors.name ? 'border-amber-400 bg-amber-50/10' : 'border-stone-100 dark:border-zinc-800 focus:border-stone-300 bg-stone-50/30'} rounded-[14px] h-11 sm:h-12 text-sm transition-all`} />
              </Field>

              <Field icon={Mail} label="Email" error={formErrors.email}>
                <input type="email" placeholder="nama@email.com" value={customerData.email} onChange={set('email')}
                  className={`${inputBase} ${formErrors.email ? 'border-amber-400 bg-amber-50/10' : 'border-stone-100 dark:border-zinc-800 focus:border-stone-300 bg-stone-50/30'} rounded-[14px] h-11 sm:h-12 text-sm transition-all`} />
              </Field>

              <Field icon={Phone} label="WhatsApp" error={formErrors.mobile}>
                <input type="tel" placeholder="08xxxxxxxxxx" value={customerData.mobile} onChange={set('mobile')}
                  className={`${inputBase} ${formErrors.mobile ? 'border-amber-400 bg-amber-50/10' : 'border-stone-100 dark:border-zinc-800 focus:border-stone-300 bg-stone-50/30'} rounded-[14px] h-11 sm:h-12 text-sm transition-all`} />
              </Field>

              {/* Total Summary */}
              <div className="flex items-center justify-between py-2 sm:py-4 px-4 sm:px-5 bg-stone-900 dark:bg-white rounded-xl sm:rounded-[24px] shadow-xl shadow-stone-900/10 mb-1 sm:mb-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1 sm:p-1.5 rounded-lg bg-white/10 dark:bg-stone-900/10">
                    <Tag className="size-[12px] sm:size-[14px] text-white dark:text-stone-900" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-stone-300/80 dark:text-stone-500 uppercase tracking-widest leading-none">Total Pembayaran</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-base sm:text-xl font-serif text-white dark:text-stone-900 leading-none">{formatPrice(product.price)}</span>
                </div>
              </div>

              <div className="">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 sm:py-4 bg-stone-900 dark:bg-zinc-50 text-white dark:text-stone-950 font-bold rounded-xl sm:rounded-[24px] transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-60 text-[13px] sm:text-base h-auto border-0 shadow-lg"
                >
                  {loading
                    ? <><Loader2 size={16} className="animate-spin" /> ...</>
                    : <>Konfirmasi Pembayaran <ArrowRight size={16} /></>}
                </Button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
