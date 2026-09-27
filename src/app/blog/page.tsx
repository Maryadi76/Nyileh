import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import type { Metadata } from "next";
import { staticArticles, ArticleData } from "@/data/articles";

export const metadata: Metadata = {
  title: "Blog & Panduan Rental Event Jogja | Nyileh.id",
  description:
    "Kumpulan artikel teknis, tips memilih HT, kalkulasi lumens proyektor, panduan sound system, dan checklist sewa alat event di Yogyakarta.",
  alternates: {
    canonical: "https://nyileh.id/blog",
  },
};

export default async function BlogPage() {
  let articles: ArticleData[] = staticArticles;

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
    // fallback staticArticles
  }

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Blog Header */}
      <section className="bg-gradient-to-br from-[#1a2744] via-[#223366] to-[#1e3a6e] text-white py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm">
            <span>📚</span> Pusat Panduan & Tips Event
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Blog & Inspirasi Event Jogja
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Panduan teknis memilih alat, estimasi kapasitas sound & proyektor, serta tips manajemen acara bebas ribet di Yogyakarta.
          </p>
        </div>
      </section>

      {/* Main Articles Grid */}
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 space-y-12">
        {/* Category Pills */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
              Kategori:
            </span>
            <span className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm">
              Semua Artikel
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-blue-400 cursor-pointer transition"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => (
            <article
              key={item.id || item.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {item.featured_image ? (
                  <div className="h-48 overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.featured_image}
                      alt={item.featured_image_alt || item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center text-6xl bg-blue-50">
                    {item.cover_emoji_or_image || "📝"}
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                    <span>{item.read_time}</span>
                  </div>

                  <h2 className="text-xl font-bold text-[#1a2744] hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </h2>

                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
                    {item.excerpt}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {item.author || "Tim Nyileh.id"}
                </span>
                <Link
                  href={`/blog/${item.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 gap-1 hover:underline"
                >
                  Baca Panduan &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
