export default function WhyUs() {
  const perks = [
    {
      icon: "⚡",
      title: "Respon Kilat via WhatsApp",
      desc: "Fast response 7 hari seminggu. Cek ketersediaan alat dan konsultasi paket dijawab dalam hitungan menit.",
    },
    {
      icon: "🛡️",
      title: "Unit 100% Ditest Sebelum Kirim",
      desc: "Baterai HT full, kabel lengkap & dites, lensa proyektor bersih. Nggak ada drama alat rusak saat hari-H.",
    },
    {
      icon: "💰",
      title: "Harga Transparan & Hemat",
      desc: "Tarif sewa jelas tanpa biaya tersembunyi. Tersedia potongan harga untuk sewa multi-hari atau paket bundling.",
    },
    {
      icon: "🚚",
      title: "Layanan Antar-Jemput Venue",
      desc: "Nggak perlu repot ambil barang berat. Tim kami siap antar ke venue (kampus, hotel, gedung) di Sleman, Bantul, dan Kota Jogja.",
    },
    {
      icon: "🎯",
      title: "Bisa Sewa Dadakan",
      desc: "Butuh tambahan HT atau proyektor H-1 bahkan di hari yang sama? Chat kami langsung untuk cek stok instan.",
    },
    {
      icon: "📋",
      title: "Nota & Administrasi Jelas",
      desc: "Mendukung kebutuhan LPJ kepanitiaan kampus, EO, maupun corporate dengan invoice dan nota resmi.",
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
            Kenapa Ratusan Panitia Memilih Nyileh.id?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Kami bukan sekadar tempat sewa. Kami adalah partner teknis yang memastikan acaramu berjalan tanpa kendala alat.
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
