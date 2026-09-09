export default function WhyUs() {
  const perks = [
    {
      icon: "⚡",
      title: "Respon Kilat",
      desc: "WhatsApp kami aktif 7 hari seminggu. Pertanyaan dijawab dalam hitungan menit, bukan jam.",
    },
    {
      icon: "🛡️",
      title: "Alat Bergaransi",
      desc: "Setiap alat dicek dan ditest sebelum pengiriman. Jika ada masalah teknis, kami ganti atau perbaiki di tempat.",
    },
    {
      icon: "💰",
      title: "Harga Terbaik",
      desc: "Harga kompetitif dan transparan. Ada diskon untuk sewa lebih dari 3 hari atau paket bundling alat.",
    },
    {
      icon: "🚚",
      title: "Antar-Jemput Sendiri",
      desc: "Tidak perlu repot transport alat berat. Tim kami antar ke venue dan jemput kembali setelah event selesai.",
    },
    {
      icon: "🎯",
      title: "Konsultasi Gratis",
      desc: "Bingung butuh alat apa? Ceritakan jenis eventmu dan kami rekomendasikan paket perlengkapan yang pas.",
    },
    {
      icon: "📋",
      title: "Kontrak Jelas",
      desc: "Setiap transaksi ada nota dan perjanjian sewa yang jelas. Hak dan kewajiban kedua pihak terlindungi.",
    },
  ];

  return (
    <section id="kenapa-kami" className="py-20 px-4 sm:px-6 bg-[#1a2744] text-white" aria-labelledby="kenapa-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-blue-400 uppercase">
            Keunggulan
          </div>
          <h2 id="kenapa-heading" className="text-2xl sm:text-4xl font-extrabold text-white">
            Kenapa pilih Nyileh.id?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Kami bukan sekedar tempat sewa. Kami adalah partner teknis suksesnya eventmu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {perks.map((perk, idx) => (
            <div
              key={idx}
              className="bg-white/5 hover:bg-white/10 border border-white/10 p-6 sm:p-7 rounded-2xl transition-colors duration-200"
            >
              <div className="text-3xl mb-4">{perk.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{perk.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
