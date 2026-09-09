# Plan to Rewrite Nyileh.id to Next.js & Deploy to Vercel

## Status: ✅ Selesai Di-rewrite ke Next.js (App Router + Tailwind CSS)

### 1. Preparation & Setup (✅ Done)
- [x] Inisialisasi Next.js 16 (App Router, TypeScript, Tailwind CSS, ESLint).
- [x] Konfigurasi base style, smooth scroll, font Inter, dan utilities di `src/app/globals.css`.
- [x] Ekstraksi asset logo Nyileh.id ke `public/logo.jpg`.

### 2. Componentization (✅ Done)
File monolitik `index.html` (~935 baris) telah dipecah menjadi komponen modular React & Tailwind di `src/components/`:
- [x] `Navbar.tsx`: Navigasi responsif dengan menu drawer mobile dan tombol direct WhatsApp.
- [x] `Hero.tsx`: Hero banner modern, heading, statistik (500+ event, 50+ alat, 4.9★ rating), dan glassmorphic quick-availability preview card.
- [x] `TrustBar.tsx`: Baris keunggulan dan transparansi harga.
- [x] `Catalog.tsx`: Katalog sewa alat (HT, Proyektor, Sound, Lighting, Mic, Layar LED) dengan tombol pemesanan WhatsApp pre-filled.
- [x] `HowItWorks.tsx`: 4 langkah mudah cara rental alat.
- [x] `WhyUs.tsx`: 6 poin keunggulan memilih Nyileh.id dengan dark aesthetic.
- [x] `ServiceArea.tsx`: Cakupan area layanan Yogyakarta, Sleman, Bantul, dll.
- [x] `Testimonials.tsx`: Ulasan dan rating dari pelanggan (wedding, kampus BEM, turnamen).
- [x] `FAQ.tsx`: Accordion interaktif yang accessible dengan keyboard & screen reader.
- [x] `BlogSection.tsx`: 6 artikel & tips panduan event.
- [x] `CTASection.tsx`: Banner ajakan konsultasi WhatsApp gratis.
- [x] `Footer.tsx`: Informasi lengkap, kontak, daftar produk, navigasi, dan link sosial media.
- [x] `WhatsAppFloat.tsx`: Tombol chat WhatsApp melayang dengan animasi pulse.

### 3. Halaman & Routing (✅ Done)
- [x] `src/app/page.tsx`: Halaman landing utama terintegrasi.
- [x] `src/app/blog/page.tsx`: Halaman katalog artikel & panduan seputar rental event.

### 4. SEO & Structured Data (✅ Done)
- [x] Metadata komprehensif di `src/app/layout.tsx` (Title, Description, Keywords, Canonical, Open Graph, Twitter Cards).
- [x] Schema.org Structured Data (`LocalBusiness` & `FAQPage`) di `src/components/JsonLd.tsx`.
- [x] `public/robots.txt` & `public/sitemap.xml` statis terpasang.
- [x] Build verifikasi: `npm run build` sukses 100% tanpa error.

---

## 🚀 Panduan Deploy ke Vercel

1. **Commit & Push ke GitHub**:
   ```bash
   git add .
   git commit -m "Rewrite website to Next.js App Router & Tailwind CSS"
   git push origin main
   ```

2. **Import Project di Vercel**:
   - Buka [vercel.com](https://vercel.com) dan login ke akun Anda.
   - Klik **"Add New..."** > **"Project"**.
   - Pilih repositori GitHub `nyileh-website` lalu klik **Import**.

3. **Deploy**:
   - Framework Preset akan otomatis terdeteksi sebagai **Next.js**.
   - Klik **Deploy**. Vercel akan otomatis melakukan build dan memberikan URL deployment `.vercel.app`.

4. **Set Custom Domain (`nyileh.id`)**:
   - Di dashboard project Vercel, buka tab **Settings** > **Domains**.
   - Masukkan domain `nyileh.id` dan `www.nyileh.id`.
   - Update DNS records di registrar domain Anda sesuai petunjuk Vercel (A Record / CNAME).
