import Link from "next/link";

export default function Hero() {
  const quickItems = [
    { icon: "📻", name: "HT / Handy Talky", price: "Mulai Rp 50.000/hari", available: true },
    { icon: "📽️", name: "Proyektor Full HD", price: "Mulai Rp 150.000/hari", available: true },
    { icon: "🔊", name: "Sound System", price: "Mulai Rp 200.000/hari", available: true },
    { icon: "💡", name: "Lighting Event", price: "Mulai Rp 100.000/hari", available: true },
  ];

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[#1a2744] via-[#223366] to-[#1e3a6e] text-white py-16 sm:py-24 px-4 sm:px-6">
      {/* Background glow circle */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 sm:w-[550px] sm:h-[550px] rounded-full bg-blue-500/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm shadow-inner">
            <span>⭐</span> #1 Rental Event di Jogja
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Sewa HT, Proyektor & Alat Event di Jogja <br className="hidden sm:inline" />
            <span className="text-blue-400">Mudah, Cepat,</span> Terpercaya
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed">
            HT, proyektor, sound system & perlengkapan event lainnya. Siap pakai, harga transparan, dan layanan antar-jemput tersedia di Yogyakarta & sekitarnya.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20saya%20mau%20tanya%20stok%20alat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              💬 Chat WhatsApp
            </a>
            <a
              href="#katalog"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-base border-2 border-white/30 hover:border-white hover:bg-white/10 text-white transition-all transform hover:-translate-y-0.5"
            >
              Lihat Katalog
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/15 max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">500+</div>
              <div className="text-xs sm:text-sm text-slate-300">Event terlayani</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">50+</div>
              <div className="text-xs sm:text-sm text-slate-300">Jenis alat</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">4.9★</div>
              <div className="text-xs sm:text-sm text-slate-300">Rating pelanggan</div>
            </div>
          </div>
        </div>

        {/* Hero Right Visual (Glassmorphism Card) */}
        <div className="lg:col-span-5" aria-hidden="true">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                Paling Sering Disewa
              </span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <ul className="space-y-3 list-none">
              {quickItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1e3a6e] flex items-center justify-center text-xl shrink-0 shadow">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-white truncate">{item.name}</div>
                    <div className="text-xs text-slate-300">{item.price}</div>
                  </div>
                  <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs px-2.5 py-1 rounded-full font-medium shrink-0">
                    Tersedia
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-2 text-center">
              <a
                href="#katalog"
                className="text-xs font-semibold text-blue-300 hover:text-blue-200 transition underline underline-offset-4"
              >
                Lihat semua katalog & spesifikasi →
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
