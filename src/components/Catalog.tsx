export default function Catalog() {
  const products = [
    {
      id: "ht",
      featured: true,
      badge: "Paling Diminati",
      icon: "📻",
      name: "HT / Handy Talky",
      desc: "Motorola, Kenwood, dan Hytera. Komunikasi tim yang clear tanpa gangguan untuk kepanitiaan event.",
      price: "Rp 50.000",
      unit: "/ unit / hari",
      actionText: "Pesan HT →",
      waText: "Halo, saya mau sewa HT di Nyileh.id",
    },
    {
      id: "proyektor",
      featured: false,
      icon: "📽️",
      name: "Proyektor Full HD",
      desc: "Proyektor Full HD & 4K untuk presentasi, screening film, dan backdrop event. Termasuk kabel & layar.",
      price: "Rp 150.000",
      unit: "/ unit / hari",
      actionText: "Pesan Proyektor →",
      waText: "Halo, saya mau sewa proyektor di Nyileh.id",
    },
    {
      id: "sound",
      featured: false,
      icon: "🔊",
      name: "Sound System",
      desc: "Speaker aktif, subwoofer, mixer, dan microphone. Paket lengkap untuk konser, seminar, dan resepsi.",
      price: "Rp 200.000",
      unit: "/ paket / hari",
      actionText: "Pesan Sound →",
      waText: "Halo, saya mau sewa sound system di Nyileh.id",
    },
    {
      id: "lighting",
      featured: false,
      icon: "💡",
      name: "Lighting / Lampu Panggung",
      desc: "LED par, moving head, spotlight, dan laser untuk mempercantik panggung dan venue eventmu.",
      price: "Rp 100.000",
      unit: "/ unit / hari",
      actionText: "Pesan Lighting →",
      waText: "Halo, saya mau sewa lighting di Nyileh.id",
    },
    {
      id: "mic",
      featured: false,
      icon: "🎤",
      name: "Microphone Wireless",
      desc: "Mic wireless, clip-on, dan condenser. Untuk MC, narasumber, penyanyi, dan moderator seminar.",
      price: "Rp 75.000",
      unit: "/ unit / hari",
      actionText: "Pesan Mic →",
      waText: "Halo, saya mau sewa microphone di Nyileh.id",
    },
    {
      id: "led",
      featured: false,
      icon: "🖥️",
      name: "Layar & LED Display",
      desc: "Layar proyektor portable, LED screen modular untuk backdrop, dan videotron outdoor indoor.",
      price: "Rp 125.000",
      unit: "/ unit / hari",
      actionText: "Pesan Layar →",
      waText: "Halo, saya mau sewa layar & LED display di Nyileh.id",
    },
  ];

  return (
    <section id="katalog" className="py-20 px-4 sm:px-6 bg-white" aria-labelledby="katalog-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase">
            Katalog Produk
          </div>
          <h2 id="katalog-heading" className="text-2xl sm:text-4xl font-extrabold text-[#1a2744]">
            Semua yang kamu butuhkan untuk event
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Dari acara kecil keluarga sampai konser akbar, kami siap melengkapi kebutuhan teknis eventmu dengan harga bersahabat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((p) => (
            <article
              key={p.id}
              className={`relative bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                p.featured
                  ? "border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500"
                  : "border-slate-200 hover:border-blue-400"
              }`}
            >
              {p.featured && p.badge && (
                <span className="absolute -top-3 left-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {p.badge}
                </span>
              )}

              <div>
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-lg font-bold text-[#1a2744] mb-2">{p.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{p.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-blue-600">{p.price}</span>
                  <span className="text-xs text-slate-500 ml-1">{p.unit}</span>
                </div>

                <a
                  href={`https://wa.me/6285179972448?text=${encodeURIComponent(p.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                >
                  {p.actionText}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
