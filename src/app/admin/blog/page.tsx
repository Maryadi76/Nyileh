"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
  featured_image?: string;
  featured_image_alt?: string;
  author?: string;
  tags?: string[];
  meta_title?: string;
  canonical_url?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
}

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Article> | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "content" | "seo" | "publish">("info");
  const [tagsInput, setTagsInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingInline, setIsUploadingInline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);
  const inlineFileRef = useRef<HTMLInputElement>(null);

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

  const calculatedReadTime = useMemo(() => {
    const text = editingItem?.content || "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} menit baca`;
  }, [editingItem?.content]);

  const handleOpenNew = () => {
    setEditingItem({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Tips & Panduan",
      author: "Tim Nyileh.id",
      tags: [],
      cover_emoji_or_image: "📻",
      featured_image: "",
      featured_image_alt: "",
      meta_title: "",
      canonical_url: "",
      is_published: false,
    });
    setTagsInput("");
    setActiveTab("info");
  };

  const handleOpenEdit = (art: Article) => {
    setEditingItem(art);
    setTagsInput(art.tags ? art.tags.join(", ") : "");
    setActiveTab("info");
  };

  const handleTitleChange = (val: string) => {
    if (!editingItem) return;
    if (!editingItem.id) {
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

  const insertTextAtCursor = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = editingItem?.content || "";
    const selected = current.substring(start, end);
    const updated = current.substring(0, start) + before + selected + after + current.substring(end);

    setEditingItem((prev) => (prev ? { ...prev, content: updated } : null));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 50);
  };

  const uploadFileToSupabase = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const cleanFileName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^\w-]/g, "-");
    const filePath = `${Date.now()}-${cleanFileName}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("blog-images").getPublicUrl(filePath);

    return publicUrl;
  };

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingCover(true);
      setErrorMsg("");
      const publicUrl = await uploadFileToSupabase(file);
      setEditingItem((prev) => (prev ? { ...prev, featured_image: publicUrl } : null));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal upload gambar cover.";
      setErrorMsg(msg);
    } finally {
      setIsUploadingCover(false);
      if (coverFileRef.current) coverFileRef.current.value = "";
    }
  };

  const handleUploadInlineImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingInline(true);
      setErrorMsg("");
      const publicUrl = await uploadFileToSupabase(file);
      const alt = file.name.replace(/\.[^/.]+$/, "");
      insertTextAtCursor(`\n![${alt}](${publicUrl})\n`, "");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal upload gambar inline.";
      setErrorMsg(msg);
    } finally {
      setIsUploadingInline(false);
      if (inlineFileRef.current) inlineFileRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.slug) {
      setActiveTab("info");
      setErrorMsg("Judul dan Slug wajib diisi!");
      return;
    }
    setIsSaving(true);
    setErrorMsg("");

    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: editingItem.title,
      slug: editingItem.slug,
      excerpt: editingItem.excerpt || "",
      content: editingItem.content || "",
      category: editingItem.category || "Tips & Panduan",
      author: editingItem.author || "Tim Nyileh.id",
      tags: parsedTags,
      read_time: calculatedReadTime,
      cover_emoji_or_image: editingItem.cover_emoji_or_image || "📻",
      featured_image: editingItem.featured_image || null,
      featured_image_alt: editingItem.featured_image_alt || null,
      meta_title: editingItem.meta_title || null,
      canonical_url: editingItem.canonical_url || null,
      is_published: editingItem.is_published ?? false,
      published_at: editingItem.is_published
        ? editingItem.published_at || new Date().toISOString()
        : null,
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
    if (!errorMsg) {
      setEditingItem(null);
      loadData();
    }
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
            Tulis panduan, kelola metadata SEO, dan optimasi artikel event Nyileh.id.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
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

      {/* MODAL EDITOR WITH TABS */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl space-y-4 my-6 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex justify-between items-center shrink-0">
              <div>
                <h2 className="font-bold text-lg text-slate-900">
                  {editingItem.id ? "Edit Artikel" : "Tulis Artikel Baru"}
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Estimasi: <span className="font-semibold text-blue-600">{calculatedReadTime}</span>
                </div>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 px-5 gap-4 shrink-0 bg-slate-50/50 text-sm font-medium overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("info")}
                className={`py-2.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "info"
                    ? "border-blue-600 text-blue-600 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                1. Informasi Utama
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className={`py-2.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "content"
                    ? "border-blue-600 text-blue-600 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                2. Media & Konten
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("seo")}
                className={`py-2.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "seo"
                    ? "border-blue-600 text-blue-600 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                3. Metadata SEO
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("publish")}
                className={`py-2.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "publish"
                    ? "border-blue-600 text-blue-600 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                4. Status Publikasi
              </button>
            </div>

            {/* Modal Body / Tab Content */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* TAB 1: INFORMASI UTAMA */}
              {activeTab === "info" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Judul Artikel (H1) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ""}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Contoh: Berapa Unit HT yang Kamu Butuhkan untuk Event?"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Slug URL (SEO-friendly) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.slug || ""}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, slug: generateSlug(e.target.value) })
                        }
                        placeholder="berapa-unit-ht-untuk-event"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Rute: /blog/{editingItem.slug || "slug-anda"}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Kategori *
                      </label>
                      <select
                        value={editingItem.category || "Tips & Panduan"}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, category: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                      >
                        <option value="Tips & Panduan">Tips & Panduan</option>
                        <option value="Review Produk">Review Produk</option>
                        <option value="Inspirasi Event">Inspirasi Event</option>
                        <option value="Informasi Sewa">Informasi Sewa</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Penulis / Author (E-E-A-T)
                      </label>
                      <input
                        type="text"
                        value={editingItem.author || "Tim Nyileh.id"}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, author: e.target.value })
                        }
                        placeholder="Contoh: Tim Teknis Nyileh.id"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Tags / Topik (Pisahkan dengan koma)
                      </label>
                      <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="Contoh: HT Jogja, Wedding, Event Organizer"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MEDIA & KONTEN */}
              {activeTab === "content" && (
                <div className="space-y-4">
                  {/* Featured Cover Image with File Upload */}
                  <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Featured Image (Cover Utama)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          ref={coverFileRef}
                          type="file"
                          accept="image/*"
                          onChange={handleUploadCover}
                          className="hidden"
                          id="cover-upload-input"
                        />
                        <button
                          type="button"
                          disabled={isUploadingCover}
                          onClick={() => coverFileRef.current?.click()}
                          className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {isUploadingCover ? "Mengunggah..." : "📤 Upload Gambar ke Supabase"}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <input
                          type="url"
                          value={editingItem.featured_image || ""}
                          onChange={(e) =>
                            setEditingItem({ ...editingItem, featured_image: e.target.value })
                          }
                          placeholder="URL file (otomatis terisi saat upload atau paste URL)"
                          className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 bg-white"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={editingItem.cover_emoji_or_image || "📻"}
                          onChange={(e) =>
                            setEditingItem({ ...editingItem, cover_emoji_or_image: e.target.value })
                          }
                          placeholder="Emoji cadangan (📻)"
                          className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 text-center bg-white"
                        />
                      </div>
                    </div>

                    {/* Preview Thumbnail Cover */}
                    {editingItem.featured_image && (
                      <div className="relative mt-2 inline-block rounded-xl overflow-hidden border border-slate-300 shadow-sm max-h-36">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={editingItem.featured_image}
                          alt="Preview Cover"
                          className="h-36 w-auto object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setEditingItem((prev) => (prev ? { ...prev, featured_image: "" } : null))
                          }
                          className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 text-xs hover:bg-black"
                          title="Hapus Cover"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Alt Text Gambar Cover (Aksesibilitas & SEO Gambar)
                    </label>
                    <input
                      type="text"
                      value={editingItem.featured_image_alt || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, featured_image_alt: e.target.value })
                      }
                      placeholder="Deskripsi visual gambar cover untuk Google Image..."
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm text-slate-800"
                    />
                  </div>

                  {/* Formatting Toolbar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                        Konten Artikel (Markdown / HTML) *
                      </label>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor("## ", "")}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-semibold cursor-pointer"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor("### ", "")}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-semibold cursor-pointer"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor("**", "**")}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold cursor-pointer"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor("> ", "")}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded italic cursor-pointer"
                        >
                          Quote
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor("[", "](https://)")}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded cursor-pointer"
                        >
                          Link
                        </button>
                        <input
                          ref={inlineFileRef}
                          type="file"
                          accept="image/*"
                          onChange={handleUploadInlineImage}
                          className="hidden"
                          id="inline-upload-input"
                        />
                        <button
                          type="button"
                          disabled={isUploadingInline}
                          onClick={() => inlineFileRef.current?.click()}
                          className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded cursor-pointer disabled:opacity-50"
                          title="Upload & sisipkan gambar inline"
                        >
                          {isUploadingInline ? "..." : "+ Gambar"}
                        </button>
                        <button
                          type="button"
                          onClick={() => insertTextAtCursor("- ", "")}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded cursor-pointer"
                        >
                          List
                        </button>
                      </div>
                    </div>

                    <textarea
                      ref={textareaRef}
                      required
                      rows={10}
                      value={editingItem.content || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, content: e.target.value })
                      }
                      placeholder="Tulis artikel dengan heading Markdown (## Subjudul), paragraf, dan list..."
                      className="w-full p-3.5 border border-slate-300 rounded-xl font-mono text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: METADATA SEO */}
              {activeTab === "seo" && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                        Meta Title (SERP Title)
                      </label>
                      <span
                        className={`text-xs ${
                          (editingItem.meta_title || "").length > 60
                            ? "text-red-500 font-bold"
                            : "text-slate-400"
                        }`}
                      >
                        {(editingItem.meta_title || "").length} / 60 karakter
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={70}
                      value={editingItem.meta_title || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, meta_title: e.target.value })
                      }
                      placeholder={editingItem.title || "Kosongkan untuk otomatis pakai Judul Artikel"}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm text-slate-800"
                    />
                    <span className="text-[11px] text-slate-400 mt-0.5 block">
                      Jika kosong, otomatis menggunakan Judul Artikel.
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                        Meta Description / Excerpt (Snippet Google) *
                      </label>
                      <span
                        className={`text-xs ${
                          (editingItem.excerpt || "").length > 160
                            ? "text-red-500 font-bold"
                            : "text-slate-400"
                        }`}
                      >
                        {(editingItem.excerpt || "").length} / 160 karakter
                      </span>
                    </div>
                    <textarea
                      required
                      rows={3}
                      maxLength={200}
                      value={editingItem.excerpt || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, excerpt: e.target.value })
                      }
                      placeholder="Ringkasan 1-2 kalimat yang menarik calon pembaca saat mencari di Google..."
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Canonical URL (Opsional)
                    </label>
                    <input
                      type="url"
                      value={editingItem.canonical_url || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, canonical_url: e.target.value })
                      }
                      placeholder="Contoh: https://medium.com/@nyileh/..."
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm text-slate-800"
                    />
                    <span className="text-[11px] text-slate-400 mt-0.5 block">
                      Hanya isi jika artikel ini dipublikasikan ulang dari sumber luar.
                    </span>
                  </div>

                  {/* Google SERP Preview Box */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 mt-4">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Simulasi Tampilan Google (SERP Preview)
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
                      <div className="text-xs text-slate-700 flex items-center gap-1.5 truncate">
                        <span className="w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                          N
                        </span>
                        <span>nyileh.id</span>
                        <span className="text-slate-400">› blog › {editingItem.slug || "slug-artikel"}</span>
                      </div>
                      <div className="text-blue-700 text-base font-medium truncate hover:underline cursor-pointer">
                        {editingItem.meta_title || editingItem.title || "Judul Artikel Blog Anda"} | Nyileh.id
                      </div>
                      <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {editingItem.excerpt ||
                          "Ini adalah preview meta description yang akan muncul di bawah judul link pada hasil pencarian Google..."}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: STATUS PUBLIKASI */}
              {activeTab === "publish" && (
                <div className="space-y-6 py-2">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="text-sm font-bold text-slate-800">Pilih Status Penayangan:</div>

                    <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
                      <input
                        type="radio"
                        name="status"
                        checked={editingItem.is_published === false}
                        onChange={() => setEditingItem({ ...editingItem, is_published: false })}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-800">Draft</div>
                        <div className="text-xs text-slate-500">
                          Hanya tersimpan di panel admin, belum dapat dibaca oleh publik atau mesin pencari.
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-emerald-400 transition-colors">
                      <input
                        type="radio"
                        name="status"
                        checked={editingItem.is_published === true}
                        onChange={() => setEditingItem({ ...editingItem, is_published: true })}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-sm font-bold text-emerald-700">Published (Publikasikan)</div>
                        <div className="text-xs text-slate-500">
                          Artikel langsung tayang di katalog blog, landing page, dan dapat diindeks oleh Google.
                        </div>
                      </div>
                    </label>
                  </div>

                  {editingItem.published_at && (
                    <div className="text-xs text-slate-400">
                      Waktu publikasi: {new Date(editingItem.published_at).toLocaleString("id-ID")}
                    </div>
                  )}
                </div>
              )}

              {/* Modal Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>

                <div className="flex gap-2">
                  {activeTab !== "publish" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === "info") setActiveTab("content");
                        else if (activeTab === "content") setActiveTab("seo");
                        else if (activeTab === "seo") setActiveTab("publish");
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold cursor-pointer"
                    >
                      Lanjut →
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    {isSaving ? "Menyimpan..." : "Simpan Artikel"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABEL DAFTAR ARTIKEL */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Memuat daftar artikel...
          </div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Belum ada artikel. Klik tombol di atas untuk menulis artikel pertama.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Artikel & Penulis</th>
                  <th className="py-3.5 px-4">Kategori & Tags</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <span>{item.cover_emoji_or_image || "📝"}</span>
                        <span>{item.title}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <span>/blog/{item.slug}</span>
                        <span>•</span>
                        <span>✍️ {item.author || "Tim Nyileh.id"}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span className="inline-block text-xs px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md font-medium">
                          {item.category}
                        </span>
                        {item.tags && item.tags.length > 0 && (
                          <div className="text-[11px] text-slate-400 truncate max-w-xs">
                            #{item.tags.join(" #")}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
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
