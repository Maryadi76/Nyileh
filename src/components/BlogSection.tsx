import Link from "next/link";

export default function BlogSection() {
  const articles = [
    {
      id: "hitung-ht",
      icon: "📻",
      thumbBg: "bg-blue-50",
      category: "Tips & Panduan",
      title: "Berapa Unit HT yang Kamu Butuhkan untuk Event? Ini Rumus Hitungnya",
      excerpt: "Banyak panitia salah hitung jumlah HT dan akhirnya komunikasi kacau saat acara berlangsung. Simak cara tepat menentukan kebutuhan HT berdasarkan jenis dan skala event.",
      date: "12 Jun 2025",
      readTime: "5 menit baca",
      link: "https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20mau%20konsultasi%20hitung%20kebutuhan%20unit%20HT",
      actionText: "Konsultasi →",
    },
    {
      id: "proyektor-lumens",
      icon: "📽️",
      thumbBg: "bg-emerald-50",
      category: "Review Produk",
      title: "Proyektor 3000 vs 5000 Lumens: Mana yang Cocok untuk Seminar Indoor?",
      excerpt: "Cahaya proyektor terlalu redup bikin presentasi tidak terlihat jelas. Pahami perbedaan lumens dan pilih spesifikasi yang tepat sesuai ukuran ruangan eventmu.",
      date: "5 Jun 2025",
      readTime: "4 menit baca",
      link: "https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20mau%20tanya%20spesifikasi%20proyektor%20untuk%20seminar",
      actionText: "Tanya Kami →",
    },
    {
      id: "checklist-wedding-outdoor",
      icon: "🎪",
      thumbBg: "bg-amber-50",
      category: "Inspirasi Event",
      title: "Checklist Lengkap Perlengkapan Teknis untuk Pernikahan Outdoor di Yogyakarta",
      excerpt: "Wedding outdoor punya tantangan teknis tersendiri: angin, cahaya matahari, dan listrik terbatas. Checklist ini memastikan tidak ada alat yang terlupa di hari H.",
      date: "28 Mei 2025",
      readTime: "7 menit baca",
      link: "https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20mau%20paket%20wedding%20outdoor",
      actionText: "Paket Wedding →",
    },
    {
      id: "sound-system-feedback",
      icon: "🔊",
      thumbBg: "bg-purple-50",
      category: "Tips & Panduan",
      title: "Sound System Feedback & Dengung: Penyebab dan Cara Mengatasinya",
      excerpt: "Suara feedback 'nging' yang mengganggu sering terjadi saat acara. Kenali penyebabnya dan pelajari cara setting yang benar agar suara bersih sepanjang event.",
      date: "20 Mei 2025",
      readTime: "6 menit baca",
      link: "https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20tanya%20paket%20sound%20system",
      actionText: "Konsultasi →",
    },
    {
      id: "tata-lighting-panggung",
      icon: "💡",
      thumbBg: "bg-orange-50",
      category: "Inspirasi Event",
      title: "5 Ide Tata Lighting yang Bikin Panggung Event Terlihat Profesional",
      excerpt: "Dengan anggaran terbatas pun, tata cahaya yang tepat bisa membuat panggung terlihat megah. Ini 5 setup lighting populer yang bisa kamu tiru untuk eventmu di Yogyakarta.",
      date: "14 Mei 2025",
      readTime: "5 menit baca",
      link: "https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20mau%20tanya%20sewa%20lighting%20panggung",
      actionText: "Pesan Lighting →",
    },
    {
      id: "sewa-alat-aman",
      icon: "📋",
      thumbBg: "bg-sky-50",
      category: "Informasi Sewa",
      title: "Cara Sewa Alat Event yang Aman: Hal yang Harus Dicek Sebelum Tanda Tangan",
      excerpt: "Jangan sampai menyesal karena tidak membaca kontrak sewa dengan teliti. Ini poin-poin penting yang wajib kamu cermati sebelum menyewa alat dari manapun.",
      date: "7 Mei 2025",
      readTime: "4 menit baca",
      link: "#cara-sewa",
      actionText: "Info Sewa →",
    },
  ];

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 bg-slate-50" aria-labelledby="blog-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase">
            Blog & Tips
          </div>
          <h2 id="blog-heading" className="text-2xl sm:text-4xl font-extrabold text-[#1a2744]">
            Panduan & inspirasi untuk eventmu
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Artikel praktis seputar perencanaan event, tips teknis, dan informasi sewa alat terbaru.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`h-40 flex items-center justify-center text-5xl ${item.thumbBg}`}>
                  {item.icon}
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-base font-bold text-[#1a2744] mb-2.5 leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span>📅 {item.date}</span>
                  <span>•</span>
                  <span>⏱ {item.readTime}</span>
                </div>
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-bold text-blue-600 hover:text-blue-800 transition whitespace-nowrap"
                >
                  {item.actionText}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
