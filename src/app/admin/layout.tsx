import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Jika belum login, render children saja (agar /admin/login bisa tampil tanpa loop redirect)
  if (!user) {
    return <>{children}</>;
  }

  async function handleLogout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 p-6">
        <div className="space-y-8">
          <div>
            <Link href="/admin" className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span>⚡</span> Nyileh<span className="text-blue-500">.id</span> Admin
            </Link>
            <p className="text-xs text-slate-400 mt-1 truncate">{user.email}</p>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors text-slate-200"
            >
              📊 Overview
            </Link>
            <Link
              href="/admin/testimonials"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors text-slate-200"
            >
              💬 Testimoni
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors text-slate-200"
            >
              📝 Artikel Blog
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
            >
              🌐 Lihat Website ↗
            </a>
          </nav>
        </div>

        <form action={handleLogout} className="pt-6 border-t border-slate-800">
          <button
            type="submit"
            className="w-full text-left flex items-center gap-2 text-sm text-red-400 hover:text-red-300 py-2 transition-colors cursor-pointer"
          >
            🚪 Keluar (Logout)
          </button>
        </form>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
