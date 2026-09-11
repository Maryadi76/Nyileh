"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  stars: number;
  avatar?: string;
  is_active: boolean;
  order_index: number;
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const supabase = createClient();

  const loadData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name || !editingItem?.text) return;
    setIsSaving(true);
    setErrorMsg("");

    const payload = {
      name: editingItem.name,
      role: editingItem.role || "",
      text: editingItem.text,
      stars: editingItem.stars || 5,
      avatar: editingItem.avatar || editingItem.name.slice(0, 2).toUpperCase(),
      is_active: editingItem.is_active ?? true,
      order_index: Number(editingItem.order_index) || 0,
    };

    if (editingItem.id) {
      const { error } = await supabase
        .from("testimonials")
        .update(payload)
        .eq("id", editingItem.id);
      if (error) setErrorMsg(error.message);
    } else {
      const { error } = await supabase.from("testimonials").insert([payload]);
      if (error) setErrorMsg(error.message);
    }

    setIsSaving(false);
    setEditingItem(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
    } else {
      loadData();
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ is_active: !current })
      .eq("id", id);
    if (!error) {
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, is_active: !current } : it))
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Testimoni</h1>
          <p className="text-slate-500 text-sm">
            Atur testimoni pelanggan yang tampil di halaman utama.
          </p>
        </div>
        <button
          onClick={() =>
            setEditingItem({
              name: "",
              role: "",
              text: "",
              stars: 5,
              is_active: true,
              order_index: 0,
            })
          }
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors cursor-pointer"
        >
          + Tambah Testimoni
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Modal / Form Tambah/Edit */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="font-bold text-lg text-slate-900">
                {editingItem.id ? "Edit Testimoni" : "Tambah Testimoni Baru"}
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
                  Nama Klien *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  placeholder="Contoh: Ahmad Rasyid"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Role / Instansi
                </label>
                <input
                  type="text"
                  value={editingItem.role || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, role: e.target.value })
                  }
                  placeholder="Contoh: Panitia Wedding, Yogyakarta"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Isi Testimoni *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingItem.text || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, text: e.target.value })
                  }
                  placeholder="Ceritakan pengalaman memuaskan sewa di Nyileh.id..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Rating Bintang (1 - 5)
                  </label>
                  <select
                    value={editingItem.stars || 5}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        stars: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800"
                  >
                    {[5, 4, 3, 2, 1].map((s) => (
                      <option key={s} value={s}>
                        {s} Bintang ⭐
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    value={editingItem.order_index ?? 0}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        order_index: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingItem.is_active ?? true}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      is_active: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded text-blue-600"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-slate-700">
                  Tampilkan di website publik
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
                  {isSaving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabel Data */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Memuat data testimoni...
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Belum ada testimoni di Supabase. Klik tombol di atas untuk menambah.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Klien</th>
                  <th className="py-3 px-4">Ulasan</th>
                  <th className="py-3 px-4 text-center">Bintang</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-400">{item.role}</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-slate-600">
                      "{item.text}"
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-amber-500">
                      {"★".repeat(item.stars)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(item.id, item.is_active)}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold cursor-pointer ${
                          item.is_active
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {item.is_active ? "Aktif" : "Draft"}
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
