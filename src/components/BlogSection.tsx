import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { staticArticles, ArticleData } from "@/data/articles";

export default async function BlogSection() {
  let articles: ArticleData[] = staticArticles;

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
    // fallback staticArticles
  }

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 bg-slate-50" aria-labelledby="blog-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase">
            Blog & Tips Event
          </div>
          <h2 id="blog-heading" className="text-2xl sm:text-4xl font-extrabold text-[#1a2744]">
            Panduan & Tips Teknis Event Jogja
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Artikel praktis seputar perencanaan acara, tips memilih HT, kalkulasi lumens proyektor, dan checklist bebas panik di hari H.
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
                  <div className="h-44 overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.featured_image}
                      alt={item.featured_image_alt || item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-44 flex items-center justify-center text-5xl bg-blue-50">
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

                  <h3 className="text-lg font-bold text-[#1a2744] hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </h3>

                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/blog/${item.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline gap-1"
                >
                  Baca Selengkapnya
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 hover:border-blue-600 text-sm font-semibold rounded-xl text-slate-700 hover:text-blue-600 bg-white shadow-sm transition-all"
          >
            Lihat Semua Artikel & Panduan &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
