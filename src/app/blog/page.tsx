import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Blog & Tips Rental Event | Nyileh.id Yogyakarta",
  description:
    "Kumpulan artikel, tips teknis perlengkapan event, panduan memilih HT, proyektor, sound system, dan info sewa alat di Yogyakarta.",
};

export default function BlogPage() {
  const allArticles = [
    {
      id: "hitung-ht",
      icon: "📻",
      thumbBg: "bg-blue-50",
      category: "Tips & Panduan",
      title: "Berapa Unit HT yang Kamu Butuhkan untuk Event? Ini Rumus Hitungnya",
      excerpt:
        "Banyak panitia salah hitung jumlah HT dan akhirnya komunikasi kacau saat acara berlangsung. Simak cara tepat menentukan kebutuhan HT berdasarkan jenis dan skala event.",
      date: "12 Jun 2025",
      readTime: "5 menit baca",
      link: "https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20mau%20konsultasi%20hitung%20kebutuhan%20unit%20HT",
      actionText: "Konsultasi via WA →",
    },
    {
      id: "proyektor-lumens",
      icon: "📽️",
      thumbBg: "bg-emerald-50",
      category: "Review Produk",
      title: "Proyektor 3000 vs 5000 Lumens: Mana yang Cocok untuk Seminar Indoor?",
      excerpt:
        "Cahaya proyektor terlalu redup bikin presentasi tidak terlihat jelas. Pahami perbedaan lumens dan pilih spesifikasi yang tepat sesuai ukuran ruangan eventmu.",
      date: "5 Jun 2025",
      readTime: "4 menit baca",
      link: "https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20mau%20tanya%20spesifikasi%20proyektor%20untuk%20seminar",
      actionText: "Tanya Spesifikasi →",
    },
    {
      id: "checklist-wedding-outdoor",
      icon: "🎪",
      thumbBg: "bg-amber-50",
      category: "Inspirasi Event",
      title: "Checklist Lengkap Perlengkapan Teknis untuk Pernikahan Outdoor di Yogyakarta",
      excerpt:
        "Wedding outdoor punya tantangan teknis tersendiri: angin, cahaya matahari, dan listrik terbatas. Checklist ini memastikan tidak ada alat yang terlupa di hari H.",
      date: "28 Mei 2025",
      readTime: "7 menit baca",
      link: "https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20mau%20paket%20wedding%20outdoor",
      actionText: "Paket Wedding →",
    },
    {
      id: "sound-system-feedback",
      icon: "🔊",
      thumbBg: "bg-purple-50",
      category: "Tips & Panduan",
      title: "Sound System Feedback & Dengung: Penyebab dan Cara Mengatasinya",
      excerpt:
        "Suara feedback 'nging' yang mengganggu sering terjadi saat acara. Kenali penyebabnya dan pelajari cara setting yang benar agar suara bersih sepanjang event.",
      date: "20 Mei 2025",
      readTime: "6 menit baca",
      link: "https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20tanya%20paket%20sound%20system",
      actionText: "Konsultasi Sound →",
    },
    {
      id: "tata-lighting-panggung",
      icon: "💡",
      thumbBg: "bg-orange-50",
      category: "Inspirasi Event",
      title: "5 Ide Tata Lighting yang Bikin Panggung Event Terlihat Profesional",
      excerpt:
        "Dengan anggaran terbatas pun, tata cahaya yang tepat bisa membuat panggung terlihat megah. Ini 5 setup lighting populer yang bisa kamu tiru untuk eventmu di Yogyakarta.",
      date: "14 Mei 2025",
      readTime: "5 menit baca",
      link: "https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20mau%20tanya%20sewa%20lighting%20panggung",
      actionText: "Pesan Lighting →",
    },
    {
      id: "sewa-alat-aman",
      icon: "📋",
      thumbBg: "bg-sky-50",
      category: "Informasi Sewa",
      title: "Cara Sewa Alat Event yang Aman: Hal yang Harus Dicek Sebelum Tanda Tangan",
      excerpt:
        "Jangan sampai menyesal karena tidak membaca kontrak sewa dengan teliti. Ini poin-poin penting yang wajib kamu cermati sebelum menyewa alat dari manapun.",
      date: "7 Mei 2025",
      readTime: "4 menit baca",
      link: "/#cara-sewa",
      actionText: "Info Sewa →",
    },
  ];

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb & Header */}
        <div className="space-y-4">
          <nav className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-blue-600">Blog & Tips</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1a2744]">
            Blog, Panduan & Edukasi Event
          </h1>
          <p className="text-slate-600 max-w-2xl text-base sm:text-lg">
            Temukan panduan praktis, checklist event, tips memilih perlengkapan teknis, dan insight seputar sewa alat di Yogyakarta.
          </p>
        </div>

        {/* Grid Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`h-44 flex items-center justify-center text-5xl ${item.thumbBg}`}>
                  {item.icon}
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
                    {item.category}
                  </div>
                  <h2 className="text-lg font-bold text-[#1a2744] mb-3 leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span>📅 {item.date}</span>
                  <span>•</span>
                  <span>⏱ {item.readTime}</span>
                </div>
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-bold text-blue-600 hover:text-blue-800 transition"
                >
                  {item.actionText}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <CTASection />
      </div>
    </div>
  );
}
