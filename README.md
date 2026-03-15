# 🏪 Storezy - Solusi Toko Online Instan untuk UMKM

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

**Storezy** adalah platform *web builder* revolusioner yang dirancang khusus untuk membantu UMKM (Usaha Mikro, Kecil, dan Menengah) go-digital dalam hitungan menit. Tanpa perlu *coding*, tanpa perlu ribet.

---

## 📖 Project Overview

Di era digital saat ini, memiliki kehadiran online adalah sebuah keharusan. Namun, banyak pelaku UMKM yang terhambat oleh kompleksitas teknis dan biaya pembuatan website yang mahal. 

**Storezy hadir untuk mendemokrasi akses perdagangan digital.** Melalui antarmuka yang intuitif dan teknologi AI, Storezy memungkinkan siapa saja untuk membangun toko online yang elegan, menerima pembayaran otomatis, dan mulai berjualan secara profesional hanya dalam beberapa langkah mudah.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| **🚀 Instant Store Generator** | Buat halaman toko digital yang cantik hanya dengan mengisi profil singkat bisnis Anda. |
| **🤖 AI Magic** | Integrasi dengan AI untuk pembuatan deskripsi produk otomatis yang menarik dan menjual. |
| **📊 Dashboard Manajemen** | Kelola inventaris, harga, dan informasi toko melalui *back-office* yang *user-friendly*. |
| **💳 Online Payment** | Menerima berbagai jenis pembayaran otomatis melalui integrasi *Payment Gateway* terpercaya. |
| **📱 Responsive Design** | Toko Anda akan terlihat sempurna di semua perangkat, mulai dari smartphone hingga desktop. |
| **🔗 Public Storefront** | Link toko unik yang siap dibagikan ke media sosial atau pelanggan WhatsApp Anda. |

---

## 🧠 Teknologi yang Digunakan

Proyek ini dibangun menggunakan *stack* teknologi modern untuk memastikan performa maksimal dan skalabilitas:

- **Frontend**: [Next.js 15 (App Router)](https://nextjs.org/) - Framework React tercepat untuk performa web.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Memastikan keamanan tipe data dan kode yang bersih.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Desain UI yang modern, responsif, dan *premium-feel*.
- **Database**: [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) - Database real-time yang cepat dan fleksibel.
- **Auth**: [Firebase Authentication](https://firebase.google.com/docs/auth) - Sistem login yang aman untuk pemilik toko.
- **AI Engine**: [Google Generative AI](https://ai.google.dev/) (Gemini API) - Otomatisasi konten cerdas.
- **Payment**: Integrasi [Payment Gateway API] - Transaksi aman dan otomatis.

---

## 📸 Preview Storefront

![Storezy Preview](https://via.placeholder.com/800x450.png?text=Storezy+Modern+Boutique+Experience+Preview)
*Contoh tampilan halaman muka toko yang elegan dengan Storezy.*

---

## 🚀 Cara Menjalankan Project di Local

Ikuti langkah-langkah berikut untuk menjalankan Storezy di mesin lokal Anda:

### 1. Klon Repositori
```bash
git clone https://github.com/Username/umkm-instant-store.git
cd umkm-instant-store
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env.local` di direktori root dan masukkan kredensial yang diperlukan (lihat bagian [Environment Variables](#️-environment-variables-yang-diperlukan)).

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) pada browser Anda untuk melihat hasilnya.

---

## ⚙️ Environment Variables yang Diperlukan

Pastikan Anda telah mengisi variabel berikut agar aplikasi dapat berjalan dengan normal:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# AI API (Google Gemini)
GEMINI_API_KEY=your_gemini_api_key

# Payment Gateway (Optional/Production)
PAYMENT_GATEWAY_API_KEY=your_key
```

---

## 🌐 Cara Deploy ke Vercel

Deployment ke Vercel sangatlah mudah:

1. Push kode Anda ke repositori GitHub.
2. Masuk ke [Vercel Dashboard](https://vercel.com/dashboard).
3. Klik **New Project** dan pilih repositori Anda.
4. Masukkan semua **Environment Variables** yang ada di `.env.local`.
5. Klik **Deploy**.

---

## 🎯 Target Pengguna

Storezy dirancang khusus untuk:
- **Pelaku UMKM**: Penjual pakaian, makanan, kerajinan tangan, dsb.
- **Small Business Owners**: Pemilik usaha kecil yang ingin memiliki website tanpa biaya maintenance tinggi.
- **Solopreneur**: Individu yang baru memulai bisnis dan ingin terlihat profesional sejak hari pertama.

---

## 📈 Future Roadmap

Kami memiliki rencana besar untuk pengembangan Storezy di masa depan:
- [ ] 📈 Dashboard Analitik Penjualan terintegrasi.
- [ ] 📦 Integrasi dengan sistem logistik (kurir) otomatis.
- [ ] 💬 Chatbot layanan pelanggan berbasis AI.
- [ ] 🎨 Pilihan tema toko (Boutique, Electronic, Food, dsb).
- [ ] 🏪 Mobile App untuk manajemen toko yang lebih praktis.

---

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi! Jika Anda memiliki saran atau ingin memperbaiki bug:
1. Fork proyek ini.
2. Buat branch fitur baru (`git checkout -b feature/FiturKeren`).
3. Commit perubahan Anda (`git commit -m 'Menambah Fitur Keren'`).
4. Push ke branch (`git push origin feature/FiturKeren`).
5. Buat Pull Request.

---

<p align="center">
  Dibuat dengan ❤️ untuk kemajuan UMKM Indonesia oleh <b>Storezy Team</b>
</p>
