import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // 1. Ambil data count CMS dasar
  const [{ count: productCount }, { count: testimonialCount }, { count: articleCount }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
      supabase.from("articles").select("*", { count: "exact", head: true }),
    ]);

  // 2. Ambil data analitik pengunjung
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  let totalViews = 0;
  let todayViews = 0;
  let weekViews = 0;
  let topPages: { path: string; count: number }[] = [];
  let topReferrers: { referrer: string; count: number }[] = [];
  let mobileCount = 0;
  let desktopCount = 0;

  try {
    const [
      { count: totalCount },
      { count: todayCount },
      { count: weekCount },
      { data: recentViews },
    ] = await Promise.all([
      supabase.from("page_views").select("*", { count: "exact", head: true }),
      supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", startOfToday),
      supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
      supabase.from("page_views").select("path, referrer, device_type").limit(1000),
    ]);

    totalViews = totalCount ?? 0;
    todayViews = todayCount ?? 0;
    weekViews = weekCount ?? 0;

    if (recentViews && recentViews.length > 0) {
      // Hitung Top Halaman
      const pathMap: Record<string, number> = {};
      const refMap: Record<string, number> = {};

      for (const item of recentViews) {
        // Path
        pathMap[item.path] = (pathMap[item.path] || 0) + 1;

        // Referrer
        const ref = item.referrer || "Direct";
        refMap[ref] = (refMap[ref] || 0) + 1;

        // Device
        if (item.device_type === "Mobile") mobileCount++;
        else desktopCount++;
      }

      topPages = Object.entries(pathMap)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      topReferrers = Object.entries(refMap)
        .map(([referrer, count]) => ({ referrer, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    }
  } catch {
    // Graceful fallback jika tabel baru dibuat
  }

  const totalDevice = mobileCount + desktopCount || 1;
  const mobilePct = Math.round((mobileCount / totalDevice) * 100);
  const desktopPct = Math.round((desktopCount / totalDevice) * 100);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard & Statistik</h1>
        <p className="text-slate-500 text-sm mt-1">
          Pantau performa traffic pengunjung, katalog produk, testimoni, dan artikel blog Nyileh.id.
        </p>
      </div>

      {/* SECTION 1: STATISTIK PENGUNJUNG (ANALYTICS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wider text-slate-700 uppercase flex items-center gap-2">
            <span>📈</span> Statistik Pengunjung Website
          </h2>
          <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            Realtime via Supabase
          </span>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-md shadow-blue-600/10">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-100">
              Kunjungan Hari Ini
            </div>
            <div className="text-4xl font-extrabold mt-3">{todayViews}</div>
            <p className="text-xs text-blue-200 mt-2">Dihitung sejak pukul 00:00</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              7 Hari Terakhir
            </div>
            <div className="text-4xl font-extrabold text-slate-900 mt-3">{weekViews}</div>
            <p className="text-xs text-slate-400 mt-2">Total kunjungan seminggu ini</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Pageviews
            </div>
            <div className="text-4xl font-extrabold text-slate-900 mt-3">{totalViews}</div>
            <p className="text-xs text-slate-400 mt-2">Akumulasi kunjungan website</p>
          </div>
        </div>

        {/* Analytics Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Top Halaman */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <span>📄</span> Halaman Populer (Top Pages)
            </div>
            {topPages.length === 0 ? (
              <div className="text-xs text-slate-400 py-6 text-center">
                Belum ada data kunjungan yang tercatat.
              </div>
            ) : (
              <div className="space-y-2.5">
                {topPages.map((it) => (
                  <div key={it.path} className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-700 truncate max-w-[200px]" title={it.path}>
                      {it.path === "/" ? "/ (Beranda)" : it.path}
                    </span>
                    <span className="font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md">
                      {it.count} view
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Referrer */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <span>🔗</span> Sumber Trafik (Referrer)
            </div>
            {topReferrers.length === 0 ? (
              <div className="text-xs text-slate-400 py-6 text-center">
                Belum ada data sumber trafik.
              </div>
            ) : (
              <div className="space-y-2.5">
                {topReferrers.map((it) => (
                  <div key={it.referrer} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{it.referrer}</span>
                    <span className="font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md">
                      {it.count} visit
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Perangkat (Device Breakdown) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <span>📱</span> Perangkat Pengunjung
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                    <span>📱 Smartphone (Mobile)</span>
                    <span>{mobilePct}% ({mobileCount})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${mobilePct}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                    <span>💻 Laptop / PC (Desktop)</span>
                    <span>{desktopPct}% ({desktopCount})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${desktopPct}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-4">
              Data dikumpulkan secara aman dan anonim tanpa menyimpan IP pribadi pengunjung.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: KELOLA KONTEN (CMS COUNTERS) */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold tracking-wider text-slate-700 uppercase flex items-center gap-2">
          <span>⚙️</span> Ringkasan Konten & Katalog
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Katalog Produk
                </span>
                <span className="text-2xl">📦</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900 mt-3">{productCount ?? 0}</div>
              <p className="text-xs text-slate-400 mt-1">Alat event terdaftar</p>
            </div>
            <Link
              href="/admin/products"
              className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Kelola Produk →
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Testimoni
                </span>
                <span className="text-2xl">💬</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900 mt-3">
                {testimonialCount ?? 0}
              </div>
              <p className="text-xs text-slate-400 mt-1">Ulasan pelanggan tersimpan</p>
            </div>
            <Link
              href="/admin/testimonials"
              className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Kelola Testimoni →
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Artikel Blog
                </span>
                <span className="text-2xl">📝</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900 mt-3">
                {articleCount ?? 0}
              </div>
              <p className="text-xs text-slate-400 mt-1">Artikel blog terdaftar</p>
            </div>
            <Link
              href="/admin/blog"
              className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Kelola Blog →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
