import { Metadata } from "next";

export interface ArticleData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  cover_emoji_or_image?: string;
  featured_image?: string;
  featured_image_alt?: string;
  author?: string;
  tags?: string[];
  meta_title?: string;
  canonical_url?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
}

export const staticArticles: ArticleData[] = [
  {
    id: "panduan-lengkap-sewa-ht-jogja",
    slug: "panduan-lengkap-sewa-ht-jogja",
    title: "Panduan Lengkap Sewa HT Jogja: Cara Pilih Frekuensi, Jangkauan & Estimasi Biaya Event",
    excerpt:
      "Panduan praktis memilih HT (Handy Talky) untuk kepanitiaan event di Yogyakarta. Pahami perbedaan UHF vs VHF, jarak jangkau gedung vs outdoor, dan estimasi biaya sewa.",
    category: "Tips & Panduan",
    read_time: "6 menit baca",
    cover_emoji_or_image: "📻",
    featured_image: "https://minio.rasitech.id/nyileh/cover-sewa-ht-jogja.png",
    featured_image_alt: "Panduan Lengkap Sewa HT Jogja Nyileh.id",
    author: "Tim Teknis Nyileh.id",
    tags: ["sewa ht jogja", "rental handy talky yogyakarta", "tips event jogja", "kepanitiaan event"],
    meta_title: "Sewa HT Jogja: Panduan Frekuensi, Jangkauan & Harga | Nyileh.id",
    canonical_url: "https://nyileh.id/blog/panduan-lengkap-sewa-ht-jogja",
    is_published: true,
    published_at: "2026-09-10T08:00:00.000Z",
    created_at: "2026-09-10T08:00:00.000Z",
    content: `Komunikasi panitia yang macet di tengah acara adalah mimpi buruk setiap penanggung jawab lapangan (LO, Koordinator Keamanan, dan Sie Acara). Di tengah keramaian ribuan penonton, sinyal seluler sering kali drop drastis, atau pesan WhatsApp baru terbaca 10 menit setelah instruksi dikirim. Di sinilah **Handy Talky (HT)** menjadi tulang punggung koordinasi yang tidak bisa digantikan oleh smartphone.

Bagi kamu yang sedang mempersiapkan festival musik, seminar kampus, gathering komunitas, expo, hingga pernikahan di Yogyakarta, berikut panduan lengkap memilih dan menyewa HT agar koordinasi hari-H lancar tanpa hambatan.

---

## Ringkasan Kebutuhan HT Berdasarkan Jenis Event (Quick Guide)

| Skala Event | Contoh Acara | Rekomendasi Frekuensi | Estimasi Jumlah HT |
|---|---|---|---|
| **Kecil (10–50 orang)** | Workshop, Lamaran, Rapat Kerja, Outbound | UHF / VHF | 4 – 8 Unit |
| **Menengah (50–300 orang)** | Seminar Gedung, Pameran Seni, Wedding | UHF (tembus sekat dinding) | 8 – 15 Unit |
| **Besar (300+ orang)** | Konser Musik, Festival Kampus, Lari/Maraton | Dual Band / UHF High Power | 15 – 30+ Unit |

---

## 1. Pilih Frekuensi yang Tepat: UHF vs VHF

Salah satu kesalahan paling umum saat menyewa HT adalah tidak mencocokkan tipe frekuensi dengan karakteristik venue acara:

### Frekuensi UHF (Ultra High Frequency)
* **Karakteristik:** Gelombang sinyal lebih rapat dan pendek. Sangat kuat menembus partisi kaca, dinding beton, dan lantai bertingkat.
* **Cocok untuk:** Event indoor di hotel Jogja, auditorium kampus bertingkat, mall, atau gedung pernikahan.
* **Tipe Populer:** Motorola CP1660, Baofeng BF-888s / UV-82 (UHF band).

### Frekuensi VHF (Very High Frequency)
* **Karakteristik:** Gelombang lebih panjang dengan jangkauan horizontal yang luas di ruang terbuka tanpa banyak halangan fisik.
* **Cocok untuk:** Kegiatan outdoor, festival lapangan terbuka, outbound di kawasan Kaliurang, atau susur pantai Bantul/Gunungkidul.

---

## 2. Berapa Estimasi Harga Sewa HT di Yogyakarta?

Tarif sewa HT di area Jogja, Sleman, dan Bantul umumnya dihitung per 24 jam (per hari):

* **Sewa Satuan:** Mulai dari **Rp 40.000 – Rp 50.000 / unit / hari**. Biaya ini umumnya sudah termasuk dock charger dan headset/earpiece spiral.
* **Paket Kuantitas (10+ unit):** Rata-rata vendor memberikan potongan harga 10% – 20% untuk kepanitiaan mahasiswa dan event skala besar.
* **Sewa Multi-Hari (3 hari+):** Tarif harian menjadi jauh lebih hemat dibandingkan sewa harian lepas.

> **💡 Tips Praktis Nyileh.id:** Semua unit HT di [Nyileh.id](https://nyileh.id/#katalog) sudah melalui proses pengecekan baterai (kapasitas 100%), uji kejernihan modulasi audio, dan disiapkan channel terpisah per divisi (Acara, Konsumsi, Medis/Keamanan) sebelum unit dikirim ke lokasi.

---

## 3. Checklist Penting Sebelum Menerima Unit HT dari Vendor

Sebelum menandatangani serah terima barang di lokasi, pastikan tim logistik mengecek 5 poin krusial berikut:

1. **Kondisi & Daya Baterai:** Pastikan semua baterai terisi penuh (indikator charger hijau). Jika event berlangsung lebih dari 12 jam nonstop, minta dock charger tambahan atau baterai cadangan.
2. **Kesesuaian Channel:** Pastikan semua HT berada di frekuensi yang sama untuk tiap divisi agar tidak ada miss-komunikasi antar seksi acara.
3. **Fungsi Earpiece / PTT:** Colok earpiece dan tes tombol Push-to-Talk (PTT). Pastikan suara terdengar bulat, jernih, dan tidak ada suara dengung/kresek.
4. **Kondisi Antena:** Pastikan antena kokoh dan tidak longgar. Antena yang bengkok atau retak dapat memangkas jangkauan transmisi hingga 70%.
5. **Layanan Antar-Jemput:** Konfirmasikan apakah vendor bersedia mengantar unit langsung ke venue (Sleman, Bantul, Kota Jogja) pada saat jam loading-in panitia.

---

## Sewa HT Siap Pakai di Jogja Bersama Nyileh.id

Tidak perlu panik mencari tambahan alat komunikasi di H-1 acara. Tim **Nyileh.id** siap menyediakan unit HT bersih, baterai bergaransi awet, lengkap dengan earpiece dan layanan antar-jemput ke venue seluruh DIY.

👉 **[Lihat Katalog & Booking HT di Nyileh.id](https://nyileh.id/#katalog)** atau hubungi tim support via WhatsApp untuk konsultasi frekuensi yang tepat bagi eventmu.`,
  },
  {
    id: "panduan-sewa-proyektor-jogja-lumens",
    slug: "panduan-sewa-proyektor-jogja-lumens",
    title: "Sewa Proyektor Jogja: Panduan Memilih Lumens Sesuai Kapasitas Ruangan & Pencahayaan",
    excerpt:
      "Jangan sampai presentasi atau screening film di eventmu buram. Simak panduan memilih proyektor 3.000 vs 5.000+ Lumens berdasarkan ukuran ruangan dan kondisi cahaya venue di Jogja.",
    category: "Review Produk",
    read_time: "5 menit baca",
    cover_emoji_or_image: "📽️",
    featured_image: "https://minio.rasitech.id/nyileh/cover-sewa-proyektor-jogja.png",
    featured_image_alt: "Panduan Memilih Lumens Sewa Proyektor Jogja Nyileh.id",
    author: "Tim Teknis Nyileh.id",
    tags: ["sewa proyektor jogja", "rental proyektor yogyakarta", "proyektor lumens", "sound system jogja"],
    meta_title: "Sewa Proyektor Jogja: Panduan Memilih Lumens & Ukuran Ruangan | Nyileh.id",
    canonical_url: "https://nyileh.id/blog/panduan-sewa-proyektor-jogja-lumens",
    is_published: true,
    published_at: "2026-09-08T10:00:00.000Z",
    created_at: "2026-09-08T10:00:00.000Z",
    content: `Pernahkah kamu menghadiri seminar atau pemutaran film di mana materi presentasi di layar terlihat pudar dan tidak terbaca karena proyektor kalah terang dengan lampu ruangan? Masalah ini kerap terjadi akibat salah menentukan tingkat kecerahan (**Lumens**) proyektor.

Dalam industri audio visual, tingkat keterangan proyektor diukur dalam satuan *ANSI Lumens*. Semakin tinggi angkanya, semakin terang proyeksi gambar yang dihasilkan. Berikut panduan praktis memilih spesifikasi proyektor yang tepat untuk event di Yogyakarta.

---

## Panduan Cepat: Ukuran Ruangan, Audiens & Kebutuhan Lumens

| Kapasitas Audiens | Ukuran Layar (Screen) | Kondisi Ruangan | Rekomendasi Lumens |
|---|---|---|---|
| **10 – 30 Orang** | 70 inch (1.8m x 1.8m) | Ruang rapat, lampu redup | **2.800 – 3.200 Lumens** |
| **30 – 100 Orang** | 84 – 96 inch (2m x 2m) | Kelas kampus, seminar indoor standar | **3.500 – 4.000 Lumens** |
| **100 – 300 Orang** | Layar Fastfold 2x3m / 3x4m | Ballroom hotel, aula besar, lampu menyala | **5.000 – 6.000 Lumens** |
| **Outdoor / Panggung** | Layar Raksasa / Backdrop | Malam hari / semi outdoor | **6.000 – 10.000+ Lumens** |

---

## 1. Kapan Cukup Menggunakan Proyektor 3.000 Lumens?

Proyektor kelas **3.000 – 3.500 Lumens** adalah pilihan paling ekonomis dan ideal untuk:
* Presentasi sidang skripsi, rapat internal kantor, atau workshop mini.
* Nonton bareng (nobar) di malam hari dalam kondisi cahaya terkontrol (lampu dimatikan).
* Ruang pertemuan dengan jarak tembak (throw distance) 2 hingga 4 meter.

**Kelebihan:** Ukuran unit kompak, hemat daya, dan tarif sewa sangat terjangkau (mulai Rp 150.000/hari di [Nyileh.id](https://nyileh.id/#katalog)).

---

## 2. Kapan Wajib Menggunakan Proyektor 5.000 Lumens ke Atas?

Jika eventmu memiliki salah satu kondisi berikut, jangan memaksakan proyektor 3.000 Lumens:
1. **Lampu Ruangan Tidak Boleh Dimatikan:** Peserta seminar butuh mencatat materi atau membaca handout.
2. **Jarak Layar ke Penonton Lebih dari 10 Meter:** Gambar butuh ukuran proyeksi minimal 3x4 meter agar teks terbaca dari baris belakang.
3. **Banyak Grafik Halus atau Angka Spreadsheet:** Resolusi Full HD (1080p) / WUXGA dengan 5.000 Lumens memastikan ketajaman teks tetap prima.

---

## 3. Aksesori Wajib yang Sering Terlupakan Panitia

Selain unit proyektor dan layar (tripod screen / fastfold screen), pastikan paket sewa mencakup:
* **Kabel HDMI Panjang (10m – 20m):** Posisi proyektor dan laptop operator sering kali berjauhan.
* **Adapter / Converter Display:** USB-C to HDMI atau Mini DisplayPort to HDMI untuk panitia/pembicara yang menggunakan MacBook atau ultrabook modern.
* **Laser Pointer / Wireless Presenter:** Memudahkan narasumber mengganti slide tanpa harus berdiri di samping laptop.
* **Kabel Power Extension (Rol Kabel):** Mencegah ketergantungan pada stopkontak dinding venue yang jauh.

---

## Sewa Proyektor Full HD di Jogja Tanpa Ribet

Di **Nyileh.id**, seluruh paket rental proyektor sudah dilengkapi kabel HDMI panjang, kabel power, remote, dan tas pelindung. Kami juga menyediakan layar tripod portabel serta teknisi siap bantu instalasi di venue se-Jogja.

👉 **[Pesan Proyektor Siap Pakai di Nyileh.id](https://nyileh.id/#katalog)** untuk kelancaran presentasi dan eventmu.`,
  },
  {
    id: "checklist-teknis-event-outdoor-wedding-jogja",
    slug: "checklist-teknis-event-outdoor-wedding-jogja",
    title: "Checklist Perlengkapan Teknis Event Outdoor & Wedding di Jogja (Bebas Panik H-1)",
    excerpt:
      "Mengadakan event outdoor atau pernikahan di Jogja punya tantangan teknis tersendiri: listrik, angin, hingga kabel cadangan. Gunakan checklist ini agar koordinasi hari-H lancar tanpa kendala.",
    category: "Inspirasi Event",
    read_time: "7 menit baca",
    cover_emoji_or_image: "🎪",
    featured_image: "https://minio.rasitech.id/nyileh/cover-checklist-event-jogja.png",
    featured_image_alt: "Checklist Teknis Event Outdoor Wedding Jogja Nyileh.id",
    author: "Tim Teknis Nyileh.id",
    tags: ["checklist event outdoor", "sewa alat wedding jogja", "rental sound system jogja", "tips eo jogja"],
    meta_title: "Checklist Perlengkapan Teknis Event Outdoor & Wedding Jogja | Nyileh.id",
    canonical_url: "https://nyileh.id/blog/checklist-teknis-event-outdoor-wedding-jogja",
    is_published: true,
    published_at: "2026-09-05T14:00:00.000Z",
    created_at: "2026-09-05T14:00:00.000Z",
    content: `Menyelenggarakan event di ruang terbuka (outdoor) atau venue semi-outdoor di Jogja—seperti kawasan Kaliurang, perbukitan Bantul, area heritage Kotagede, hingga halaman resto wedding—memiliki daya tarik estetika yang luar biasa. Namun di balik keindahannya, event outdoor menyimpan tantangan teknis yang membutuhkan antisipasi matang.

Mulai dari fluktuasi daya listrik, angin kencang yang menggoyangkan backdrop, hingga distorsi suara akibat ruang terbuka tanpa akustik. Agar tidak panik di hari H, gunakan checklist teknis berikut sebagai panduan koordinasi tim logistik dan panitia.

---

## 📋 Master Checklist Teknis Event Outdoor

### 1. Manajemen Daya & Kelistrikan (Pondasi Utama)
* **Hitung Total Wattage:** Jumlahkan konsumsi watt seluruh alat (Sound system, lighting panggung, proyektor/LED screen, booth makanan, dan kipas blower/mist fan).
* **Genset Cadangan (Silent Genset):** Untuk outdoor tanpa daya PLN yang memadai, sediakan genset kapasitas minimal 1.5x dari total kebutuhan beban puncak.
* **Jalur Distribusi Aman:** Gunakan kabel outdoor berpelindung tebal dan tutup kabel yang melintasi jalur lalu-lalang tamu dengan *cable protector / rubber ramp*.
* **Antisipasi Hujan:** Bungkus sambungan colokan listrik outdoor dengan plastik wrap tahan air atau taruh di atas peninggi kayu.

---

### 2. Audio & Tata Suara (Sound System)
* **Karakter Sound Outdoor:** Suara di ruang terbuka tidak memantul seperti di dalam gedung. Butuh daya speaker (RMS) lebih besar dan penempatan speaker satelit yang menyebar agar volume merata.
* **Windscreen untuk Microphone:** Angin Jogja di sore hari bisa menimbulkan suara gemuruh (*wind noise*) di mic. Pasang busa peredam angin (windscreen) di semua mic wireless.
* **Mic Wireless Bebas Interferensi:** Gunakan mic wireless dengan modulasi UHF digital dan pastikan baterai cadangan (AA/9V) tersedia minimal 2 set per mic.

---

### 3. Komunikasi Panitia Lapangan
* **HT dengan Jangkauan Luas:** Pastikan HT terdistribusi ke seluruh sie krusial (Koordinator Utama, LO Tamu/VIP, Sound Engineer, Keamanan & Parkir, Konsumsi).
* **Headset Spiral:** Di dekat panggung atau sound system, suara speaker sangat keras. Earpiece spiral memastikan instruksi terdengar jelas tanpa harus mendekatkan HT ke telinga.

---

### 4. Tata Cahaya & Visual (Lighting & Screen)
* **Lighting Ambience Sore-Malam:** Sediakan lampu Par LED RGB untuk mewarnai pohon/dinding venue, moving head untuk sorotan panggung, dan spotlight untuk area pelaminan / podium.
* **Kestabilan Layar Proyektor / Screen:** Angin outdoor bisa meniup layar proyektor biasa. Gunakan rangka layar tipe *Fastfold Truss* dengan pemberat karung pasir di kakinya, atau gunakan LED videotron modular.

---

## Hubungi Nyileh.id untuk Partner Perlengkapan Event di Jogja

Menyiapkan seluruh alat teknis sendirian tentu melelahkan. **Nyileh.id** siap menjadi partner persewaan alat event di Yogyakarta:
* HT & Alat Komunikasi
* Sound System & Mic Wireless
* Proyektor, Layar & LED Display
* Lighting Panggung & Event Ambience

Layanan antar-jemput langsung ke lokasi event, tepat waktu, dengan kondisi alat prima.

👉 **[Konsultasikan Kebutuhan Event Outdoor Kamu via WhatsApp Nyileh.id](https://nyileh.id/#katalog)**`,
  },
];
