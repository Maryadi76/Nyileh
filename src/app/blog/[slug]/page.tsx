import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { staticArticles, ArticleData } from "@/data/articles";

export async function generateStaticParams() {
  return staticArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let article: ArticleData | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles")
      .select("title, excerpt, meta_title, featured_image, canonical_url")
      .eq("slug", slug)
      .single();
    if (data) article = data as ArticleData;
  } catch {
    // fallback
  }

  if (!article) {
    article = staticArticles.find((a) => a.slug === slug) || null;
  }

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | Nyileh.id",
    };
  }

  const pageTitle = article.meta_title || `${article.title} | Nyileh.id`;
  const pageImage = article.featured_image || "/og-image.jpg";

  return {
    title: pageTitle,
    description: article.excerpt,
    alternates: {
      canonical: article.canonical_url || `https://nyileh.id/blog/${slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: article.excerpt,
      type: "article",
      images: [{ url: pageImage, width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: article.excerpt,
      images: [pageImage],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let article: ArticleData | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();
    if (data) article = data as ArticleData;
  } catch {
    // fallback
  }

  if (!article) {
    article = staticArticles.find((a) => a.slug === slug) || null;
  }

  if (!article) {
    notFound();
  }

  // Hitung Read Time dinamis jika kolom read_time belum akurat
  const words = (article.content || "").trim().split(/\s+/).filter(Boolean).length;
  const calculatedMinutes = Math.max(1, Math.ceil(words / 200));
  const readTime = article.read_time || `${calculatedMinutes} menit baca`;

  // Schema Markup JSON-LD (Article & BreadcrumbList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.meta_title || article.title,
    description: article.excerpt,
    image: article.featured_image ? [article.featured_image] : ["https://nyileh.id/og-image.jpg"],
    datePublished: article.published_at || article.created_at,
    dateModified: article.published_at || article.created_at,
    author: {
      "@type": "Person",
      name: article.author || "Tim Teknis Nyileh.id",
    },
    publisher: {
      "@type": "Organization",
      name: "Nyileh.id",
      logo: {
        "@type": "ImageObject",
        url: "https://nyileh.id/og-image.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nyileh.id/blog/${article.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: "https://nyileh.id",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://nyileh.id/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://nyileh.id/blog/${article.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Visual */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-blue-600 transition">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600 transition">
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-medium truncate">{article.title}</span>
          </nav>

          {/* Header Konten */}
          <header className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-lg text-xs tracking-wide uppercase">
                {article.category}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-semibold text-slate-500">{readTime}</span>
              {article.published_at && (
                <>
                  <span className="text-xs text-slate-400">·</span>
                  <time className="text-xs text-slate-500">
                    {new Date(article.published_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-[#1a2744] tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed border-l-4 border-blue-500 pl-4 py-1 italic bg-blue-50/40 rounded-r-lg">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                NY
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">
                  {article.author || "Tim Teknis Nyileh.id"}
                </div>
                <div className="text-xs text-slate-500">Spesialis Rental Audio Visual Jogja</div>
              </div>
            </div>

            {/* Featured Image */}
            {article.featured_image ? (
              <div className="rounded-2xl overflow-hidden mt-6 border border-slate-200 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.featured_image}
                  alt={article.featured_image_alt || article.title}
                  className="w-full h-auto object-cover max-h-[480px]"
                />
              </div>
            ) : article.cover_emoji_or_image ? (
              <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-7xl border border-blue-100 shadow-inner mt-6">
                {article.cover_emoji_or_image}
              </div>
            ) : null}
          </header>

          {/* Body Konten Markdown */}
          <main className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-12">
            <div className="prose prose-slate prose-blue max-w-none prose-headings:font-bold prose-headings:text-[#1a2744] prose-a:text-blue-600 prose-a:font-semibold hover:prose-a:underline prose-img:rounded-2xl prose-table:border-collapse prose-th:bg-slate-100 prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-slate-100">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ src, alt }) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={alt || "Gambar artikel"} className="w-full h-auto object-cover rounded-xl my-4" />
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* Tags Footer */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-slate-100">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Tag Terkait:
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 text-slate-700 font-medium px-3 py-1 rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>

        <CTASection />
      </article>
    </>
  );
}
