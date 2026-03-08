# Storezy - UMKM Instant Store Builder

Storezy adalah platform inovatif yang memungkinkan pelaku UMKM untuk membuat toko online profesional secara instan hanya dengan mengisi formulir sederhana.

## Fitur Utama

- **Generasi Toko Instan**: Buat katalog produk dan halaman toko dalam hitungan detik.
- **Desain Premium**: Tampilan toko yang modern, responsif, dan terlihat profesional.
- **Manajemen Produk Dinamis**: Tambah, hapus, dan kelola produk dengan mudah.
- **Integrasi Firestore**: Penyimpanan data yang aman dan scalable menggunakan Firebase.

## Memulai

1. Instal dependensi:

   ```bash
   npm install
   ```

2. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

3. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Arsitektur

- **Frontend**: Next.js 15 (App Router)
- **Database**: Firebase Firestore (menampung koleksi `stores` dan sub-koleksi `products`)
- **Styling**: Tailwind CSS
