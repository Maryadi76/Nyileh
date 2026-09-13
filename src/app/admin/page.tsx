import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: productCount }, { count: testimonialCount }, { count: articleCount }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Selamat datang di panel admin Nyileh.id. Kelola katalog produk, testimoni, dan blog Anda di sini.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Katalog Produk</span>
              <span className="text-2xl">📦</span>
            </div>
            <div className="text-4xl font-extrabold text-slate-900 mt-4">
              {productCount ?? 0}
            </div>
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
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Testimoni</span>
              <span className="text-2xl">💬</span>
            </div>
            <div className="text-4xl font-extrabold text-slate-900 mt-4">
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
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Artikel Blog</span>
              <span className="text-2xl">📝</span>
            </div>
            <div className="text-4xl font-extrabold text-slate-900 mt-4">
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
  );
}
