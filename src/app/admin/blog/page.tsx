"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  cover_emoji_or_image?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
}

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Article> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const supabase = createClient();

  const loadData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (val: string) => {
    if (!editingItem) return;
    if (!editingItem.id) {
      // Auto generate slug untuk artikel baru
      setEditingItem({
        ...editingItem,
        title: val,
        slug: generateSlug(val),
      });
    } else {
      setEditingItem({
        ...editingItem,
        title: val,
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.slug) return;
    setIsSaving(true);
    setErrorMsg("");

    const payload = {
      title: editingItem.title,
      slug: editingItem.slug,
      excerpt: editingItem.excerpt || "",
      content: editingItem.content || "",
      category: editingItem.category || "Tips & Panduan",
      read_time: editingItem.read_time || "5 menit baca",
      cover_emoji_or_image: editingItem.cover_emoji_or_image || "📝",
      is_published: editingItem.is_published ?? false,
      published_at: editingItem.is_published ? new Date().toISOString() : null,
    };

    if (editingItem.id) {
      const { error } = await supabase
        .from("articles")
        .update(payload)
        .eq("id", editingItem.id);
      if (error) setErrorMsg(error.message);
    } else {
      const { error } = await supabase.from("articles").insert([payload]);
      if (error) setErrorMsg(error.message);
    }

    setIsSaving(false);
    setEditingItem(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus artikel ini secara permanen?")) return;
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
    } else {
      loadData();
    }
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("articles")
      .update({
        is_published: !current,
        published_at: !current ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (!error) {
      setArticles((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, is_published: !current } : it
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Artikel Blog</h1>
          <p className="text-slate-500 text-sm">
            Tulis, edit, dan atur artikel SEO untuk blog Nyileh.id.
          </p>
        </div>
        <button
          onClick={() =>
            setEditingItem({
              title: "",
              slug: "",
              excerpt: "",
              content: "",
              category: "Tips & Panduan",
              read_time: "5 menit baca",
              cover_emoji_or_image: "📻",
              is_published: true,
            })
          }
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors cursor-pointer"
        >
          + Tulis Artikel Baru
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Editor Modal / Full Form */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="font-bold text-lg text-slate-900">
                {editingItem.id ? "Edit Artikel" : "Tulis Artikel Baru"}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Judul Artikel *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ""}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Contoh: Berapa Unit HT yang Kamu Butuhkan untuk Event?"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Slug URL (SEO friendly) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.slug || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, slug: e.target.value })
                    }
                    placeholder="berapa-unit-ht-untuk-event"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Kategori
                  </label>
                  <select
                    value={editingItem.category || "Tips & Panduan"}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800"
                  >
                    <option value="Tips & Panduan">Tips & Panduan</option>
                    <option value="Review Produk">Review Produk</option>
                    <option value="Inspirasi Event">Inspirasi Event</option>
                    <option value="Informasi Sewa">Informasi Sewa</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Cover Icon / Emoji
                  </label>
                  <input
                    type="text"
                    value={editingItem.cover_emoji_or_image || "📻"}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        cover_emoji_or_image: e.target.value,
                      })
                    }
                    placeholder="📻 atau URL gambar"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Estimasi Waktu Baca
                  </label>
                  <input
                    type="text"
                    value={editingItem.read_time || "5 menit baca"}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        read_time: e.target.value,
                      })
                    }
                    placeholder="Contoh: 5 menit baca"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Ringkasan / Excerpt *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editingItem.excerpt || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, excerpt: e.target.value })
                  }
                  placeholder="Ringkasan singkat artikel yang muncul di feed atau Google Snippet..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Konten Artikel (Markdown / Teks Lengkap) *
                </label>
                <textarea
                  required
                  rows={7}
                  value={editingItem.content || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, content: e.target.value })
                  }
                  placeholder="Tulis konten lengkap artikel di sini..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono text-slate-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={editingItem.is_published ?? false}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      is_published: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded text-blue-600"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-slate-700">
                  Publikasikan langsung (Publish)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Artikel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabel Artikel */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Memuat daftar artikel...
          </div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Belum ada artikel. Mulai tulis artikel pertama dengan klik tombol di atas.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Artikel</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <span>{item.cover_emoji_or_image || "📝"}</span>
                        <span>{item.title}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        /blog/{item.slug}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(item.id, item.is_published)}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold cursor-pointer ${
                          item.is_published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {item.is_published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-semibold cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
