"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  unit: string;
  icon?: string;
  image_url?: string;
  badge?: string;
  featured: boolean;
  is_available: boolean;
  order_index: number;
  wa_text?: string;
  action_text?: string;
  created_at?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Product> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  const loadData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenNew = () => {
    setEditingItem({
      name: "",
      category: "Audio Visual",
      description: "",
      price: "Rp 50.000",
      unit: "/ unit / hari",
      icon: "📦",
      image_url: "",
      badge: "",
      featured: false,
      is_available: true,
      order_index: products.length,
      action_text: "Pesan Sekarang →",
      wa_text: "Halo Nyileh.id, saya mau sewa alat ini",
    });
    setErrorMsg("");
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingItem(prod);
    setErrorMsg("");
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorMsg("");
      const fileExt = file.name.split(".").pop();
      const cleanFileName = file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^\w-]/g, "-");
      const filePath = `product-${Date.now()}-${cleanFileName}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(filePath);

      setEditingItem((prev) => (prev ? { ...prev, image_url: publicUrl } : null));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal upload gambar produk.";
      setErrorMsg(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name || !editingItem?.price) {
      setErrorMsg("Nama produk dan harga wajib diisi!");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");

    const payload = {
      name: editingItem.name,
      category: editingItem.category || "Audio Visual",
      description: editingItem.description || "",
      price: editingItem.price,
      unit: editingItem.unit || "/ unit / hari",
      icon: editingItem.icon || "📦",
      image_url: editingItem.image_url || null,
      badge: editingItem.badge || null,
      featured: editingItem.featured ?? false,
      is_available: editingItem.is_available ?? true,
      order_index: editingItem.order_index ?? 0,
      action_text: editingItem.action_text || "Pesan Sekarang →",
      wa_text:
        editingItem.wa_text ||
        `Halo Nyileh.id, saya mau sewa ${editingItem.name}`,
    };

    if (editingItem.id) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingItem.id);
      if (error) setErrorMsg(error.message);
    } else {
      const { error } = await supabase.from("products").insert([payload]);
      if (error) setErrorMsg(error.message);
    }

    setIsSaving(false);
    if (!errorMsg) {
      setEditingItem(null);
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus produk ini dari katalog?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
    } else {
      loadData();
    }
  };

  const handleToggleAvailable = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ is_available: !current })
      .eq("id", id);

    if (!error) {
      setProducts((prev) =>
        prev.map((it) => (it.id === id ? { ...it, is_available: !current } : it))
      );
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ featured: !current })
      .eq("id", id);

    if (!error) {
      setProducts((prev) =>
        prev.map((it) => (it.id === id ? { ...it, featured: !current } : it))
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Katalog Produk</h1>
          <p className="text-slate-500 text-sm">
            Atur harga sewa, ketersediaan unit, status unggulan (featured), dan deskripsi alat event.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors cursor-pointer"
        >
          + Tambah Produk Baru
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {errorMsg}
        </div>
      )}

      {/* MODAL FORM TAMBAH / EDIT PRODUK */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl space-y-4 my-6 flex flex-col max-h-[92vh]">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center shrink-0">
              <h2 className="font-bold text-lg text-slate-900">
                {editingItem.id ? "Edit Produk Event" : "Tambah Produk Baru"}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Nama Alat / Produk *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="Contoh: HT / Handy Talky"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Icon / Emoji
                  </label>
                  <input
                    type="text"
                    value={editingItem.icon || "📻"}
                    onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                    placeholder="📻 atau 📽️"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-center text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Harga Sewa *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.price || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    placeholder="Rp 50.000"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Satuan Sewa *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.unit || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, unit: e.target.value })}
                    placeholder="/ unit / hari"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    value={editingItem.order_index ?? 0}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, order_index: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    value={editingItem.category || "Audio Visual"}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                    placeholder="Audio Visual, Komunikasi, dll"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Badge Khusus (Opsional)
                  </label>
                  <input
                    type="text"
                    value={editingItem.badge || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                    placeholder="Contoh: Paling Diminati / Best Seller"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Deskripsi & Spesifikasi Singkat *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingItem.description || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  placeholder="Merk (Motorola, Kenwood), kelengkapan kabel, atau kegunaan untuk panitia..."
                  className="w-full p-3.5 border border-slate-300 rounded-xl text-sm text-slate-800"
                />
              </div>

              {/* Upload Foto Produk */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Foto Produk (Opsional)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer disabled:opacity-50"
                  >
                    {isUploading ? "Mengunggah..." : "📤 Upload Foto"}
                  </button>
                </div>
                <input
                  type="url"
                  value={editingItem.image_url || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
                  placeholder="URL Foto (otomatis terisi saat upload)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
                {editingItem.image_url && (
                  <div className="relative inline-block mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingItem.image_url}
                      alt="Foto produk"
                      className="h-20 w-auto object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => setEditingItem({ ...editingItem, image_url: "" })}
                      className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Status & Options */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={editingItem.featured ?? false}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, featured: e.target.checked })
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Produk Unggulan (Featured Card di Landing Page)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={editingItem.is_available ?? true}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, is_available: e.target.checked })
                    }
                    className="rounded text-emerald-600"
                  />
                  <span>Unit Tersedia (Ready Disewa)</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABEL LIST PRODUK */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Memuat katalog produk...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Belum ada produk di database. Klik tombol di atas untuk menambah produk atau sinkronkan data awal.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Produk</th>
                  <th className="py-3.5 px-4">Harga Sewa</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <span className="text-xl">{item.icon || "📦"}</span>
                        <div>
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className="ml-2 text-[10px] uppercase font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-sm">
                        {item.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900">{item.price}</span>
                      <span className="text-xs text-slate-400 block">{item.unit}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(item.id, item.featured)}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold cursor-pointer ${
                          item.featured
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.featured ? "★ Featured" : "Biasa"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleAvailable(item.id, item.is_available)}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold cursor-pointer ${
                          item.is_available
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-600 border border-red-200"
                        }`}
                      >
                        {item.is_available ? "Ready" : "Habis / Disewa"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
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
