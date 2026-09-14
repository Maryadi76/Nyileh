import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

// Revalidasi otomatis setiap 12 jam (43200 detik) atau saat request masuk
export const revalidate = 43200;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nyileh.id";
  const now = new Date();

  // 1. Rute Statis Utama
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // 2. Rute Dinamis Artikel Blog dari Supabase
  try {
    const supabase = await createClient();
    const { data: articles } = await supabase
      .from("articles")
      .select("slug, published_at, created_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (articles && articles.length > 0) {
      const blogRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: article.published_at ? new Date(article.published_at) : new Date(article.created_at || now),
        changeFrequency: "weekly",
        priority: 0.7,
      }));

      return [...staticRoutes, ...blogRoutes];
    }
  } catch {
    // Fallback jika koneksi database gagal
  }

  return staticRoutes;
}
