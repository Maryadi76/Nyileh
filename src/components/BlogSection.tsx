import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface ArticleItem {
  id?: string;
  slug: string;
  cover_emoji_or_image?: string;
  featured_image?: string;
  featured_image_alt?: string;
  category: string;
  title: string;
  excerpt: string;
  read_time: string;
  tags?: string[];
  published_at?: string;
}

const defaultArticles: ArticleItem[] = [
  {
    id: "hitung-ht",
    slug: "hitung-ht",
    cover_emoji_or_image: "📻",
    category: "Tips & Panduan",
    title: "Berapa Unit HT yang Kamu Butuhkan untuk Event? Ini Rumus Hitungnya",
    excerpt: "Banyak panitia salah hitung jumlah HT dan akhirnya komunikasi kacau saat acara berlangsung. Simak cara tepat menentukan kebutuhan HT berdasarkan jenis dan skala event.",
    read_time: "5 menit baca",
  },
  {
    id: "proyektor-lumens",
    slug: "proyektor-lumens",
    cover_emoji_or_image: "📽️",
    category: "Review Produk",
    title: "Proyektor 3000 vs 5000 Lumens: Mana yang Cocok untuk Seminar Indoor?",
    excerpt: "Cahaya proyektor terlalu redup bikin presentasi tidak terlihat jelas. Pahami perbedaan lumens dan pilih spesifikasi yang tepat sesuai ukuran ruangan eventmu.",
    read_time: "4 menit baca",
  },
  {
    id: "checklist-wedding-outdoor",
    slug: "checklist-wedding-outdoor",
    cover_emoji_or_image: "🎪",
    category: "Inspirasi Event",
    title: "Checklist Lengkap Perlengkapan Teknis untuk Pernikahan Outdoor di Yogyakarta",
    excerpt: "Wedding outdoor punya tantangan teknis tersendiri: angin, cahaya matahari, dan listrik terbatas. Checklist ini memastikan tidak ada alat yang terlupa di hari H.",
    read_time: "7 menit baca",
  },
];

export default async function BlogSection() {
  let articles = defaultArticles;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(6);

    if (data && data.length > 0) {
      articles = data;
    }
  } catch {
    // fallback defaultArticles
  }

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 bg-slate-50" aria-labelledby="blog-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase">
            Blog & Tips
          </div>
          <h2 id="blog-heading" className="text-2xl sm:text-4xl font-extrabold text-[#1a2744]">
            Panduan & inspirasi untuk eventmu
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Artikel praktis seputar perencanaan event, tips teknis, dan informasi sewa alat terbaru.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((item) => (
            <article
              key={item.id || item.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {item.featured_image ? (
                  <div className="h-40 overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.featured_image}
                      alt={item.featured_image_alt || item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center text-5xl bg-blue-50">
                    {item.cover_emoji_or_image || "📝"}
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                      {item.category}
                    </span>
                    {item.tags && item.tags.length > 0 && (
                      <span className="text-[11px] text-slate-400">
                        #{item.tags[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#1a2744] mb-2.5 leading-snug line-clamp-2">
                    <Link href={`/blog/${item.slug}`} className="hover:text-blue-600 transition">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
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

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 bg-white font-semibold text-sm text-slate-700 hover:border-blue-500 hover:text-blue-600 transition shadow-sm"
          >
            Lihat Semua Artikel Blog →
          </Link>
        </div>
      </div>
    </section>
  );
}
