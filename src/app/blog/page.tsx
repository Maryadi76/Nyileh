import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Tips Rental Event | Nyileh.id Yogyakarta",
  description:
    "Kumpulan artikel, tips teknis perlengkapan event, panduan memilih HT, proyektor, sound system, dan info sewa alat di Yogyakarta.",
};

const defaultArticles = [
  {
    id: "hitung-ht",
    slug: "hitung-ht",
    cover_emoji_or_image: "📻",
    category: "Tips & Panduan",
    title: "Berapa Unit HT yang Kamu Butuhkan untuk Event? Ini Rumus Hitungnya",
    excerpt:
      "Banyak panitia salah hitung jumlah HT dan akhirnya komunikasi kacau saat acara berlangsung. Simak cara tepat menentukan kebutuhan HT berdasarkan jenis dan skala event.",
    read_time: "5 menit baca",
    published_at: "2025-06-12",
  },
  {
    id: "proyektor-lumens",
    slug: "proyektor-lumens",
    cover_emoji_or_image: "📽️",
    category: "Review Produk",
    title: "Proyektor 3000 vs 5000 Lumens: Mana yang Cocok untuk Seminar Indoor?",
    excerpt:
      "Cahaya proyektor terlalu redup bikin presentasi tidak terlihat jelas. Pahami perbedaan lumens dan pilih spesifikasi yang tepat sesuai ukuran ruangan eventmu.",
    read_time: "4 menit baca",
    published_at: "2025-06-05",
  },
  {
    id: "checklist-wedding-outdoor",
    slug: "checklist-wedding-outdoor",
    cover_emoji_or_image: "🎪",
    category: "Inspirasi Event",
    title: "Checklist Lengkap Perlengkapan Teknis untuk Pernikahan Outdoor di Yogyakarta",
    excerpt:
      "Wedding outdoor punya tantangan teknis tersendiri: angin, cahaya matahari, dan listrik terbatas. Checklist ini memastikan tidak ada alat yang terlupa di hari H.",
    read_time: "7 menit baca",
    published_at: "2025-05-28",
  },
  {
    id: "sound-system-feedback",
    slug: "sound-system-feedback",
    cover_emoji_or_image: "🔊",
    category: "Tips & Panduan",
    title: "Sound System Feedback & Dengung: Penyebab dan Cara Mengatasinya",
    excerpt:
      "Suara feedback 'nging' yang mengganggu sering terjadi saat acara. Kenali penyebabnya dan pelajari cara setting yang benar agar suara bersih sepanjang event.",
    read_time: "6 menit baca",
    published_at: "2025-05-20",
  },
  {
    id: "tata-lighting-panggung",
    slug: "tata-lighting-panggung",
    cover_emoji_or_image: "💡",
    category: "Inspirasi Event",
    title: "5 Ide Tata Lighting yang Bikin Panggung Event Terlihat Profesional",
    excerpt:
      "Dengan anggaran terbatas pun, tata cahaya yang tepat bisa membuat panggung terlihat megah. Ini 5 setup lighting populer yang bisa kamu tiru untuk eventmu di Yogyakarta.",
    read_time: "5 menit baca",
    published_at: "2025-05-14",
  },
  {
    id: "sewa-alat-aman",
    slug: "sewa-alat-aman",
    cover_emoji_or_image: "📋",
    category: "Informasi Sewa",
    title: "Cara Sewa Alat Event yang Aman: Hal yang Harus Dicek Sebelum Tanda Tangan",
    excerpt:
      "Jangan sampai menyesal karena tidak membaca kontrak sewa dengan teliti. Ini poin-poin penting yang wajib kamu cermati sebelum menyewa alat dari manapun.",
    read_time: "4 menit baca",
    published_at: "2025-05-07",
  },
];

export default async function BlogPage() {
  let articles = defaultArticles;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      articles = data;
    }
  } catch {
    // fallback
  }

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
          {articles.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-44 flex items-center justify-center text-5xl bg-blue-50">
                  {item.cover_emoji_or_image || "📝"}
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
                    {item.category}
                  </div>
                  <h2 className="text-lg font-bold text-[#1a2744] mb-3 leading-snug">
                    <Link href={`/blog/${item.slug}`} className="hover:text-blue-600 transition">
                      {item.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span>⏱ {item.read_time}</span>
                </div>
                <Link
                  href={`/blog/${item.slug}`}
                  className="font-bold text-blue-600 hover:text-blue-800 transition"
                >
                  Baca Selengkapnya →
                </Link>
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
