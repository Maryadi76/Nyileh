import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("title, excerpt, meta_title, featured_image, canonical_url")
    .eq("slug", slug)
    .single();

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
      images: [{ url: pageImage, width: 1200, height: 630 }],
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
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

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
      name: article.author || "Tim Nyileh.id",
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

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6">
      {/* Article Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600 transition">
            Blog & Tips
          </Link>
          <span>/</span>
          <span className="text-blue-600 truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
            {article.tags &&
              article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-block px-2.5 py-0.5 bg-slate-200/80 text-slate-700 rounded-md text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a2744] leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 border-b pb-6">
            <span className="font-semibold text-slate-700">✍️ {article.author || "Tim Nyileh.id"}</span>
            <span>•</span>
            <span>⏱ {readTime}</span>
            <span>•</span>
            <span>
              📅{" "}
              {new Date(article.published_at || article.created_at).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </span>
          </div>
        </div>

        {/* Featured Image jika tersedia */}
        {article.featured_image ? (
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.featured_image}
              alt={article.featured_image_alt || article.title}
              className="w-full h-auto max-h-[420px] object-cover"
            />
          </div>
        ) : null}

        {/* Excerpt Lead */}
        <p className="text-lg text-slate-700 font-medium leading-relaxed bg-white p-6 rounded-2xl border border-slate-200">
          {article.excerpt}
        </p>

        {/* Main Content Body */}
        <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed space-y-4 whitespace-pre-line text-base sm:text-lg">
          {article.content}
        </div>

        {/* CTA Contact */}
        <div className="p-8 rounded-2xl bg-[#1a2744] text-white space-y-4 text-center mt-12">
          <h3 className="text-xl font-bold">Butuh Konsultasi Alat Event Anda?</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Hubungi tim Nyileh.id sekarang untuk cek ketersediaan unit HT, sound system, proyektor & paket event terbaik di Yogyakarta.
          </p>
          <a
            href={`https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20saya%20tertarik%20setelah%20membaca%20artikel%3A%20${encodeURIComponent(
              article.title
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors"
          >
            💬 Konsultasi via WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-20">
        <CTASection />
      </div>
    </div>
  );
}
