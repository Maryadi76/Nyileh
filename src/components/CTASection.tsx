export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 text-center" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 id="cta-heading" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Siap untuk event berikutnya?
        </h2>
        <p className="text-blue-100 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Konsultasikan kebutuhan alatmu gratis. Kami bantu pilihkan paket perlengkapan yang paling pas dan hemat anggaran.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <a
            href="https://wa.me/6285179972448?text=Halo%20Nyileh.id%2C%20saya%20mau%20konsultasi%20kebutuhan%20alat%20event"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-slate-100 text-blue-700 font-bold px-8 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            💬 Chat WhatsApp Sekarang
          </a>
          <a
            href="#katalog"
            className="border-2 border-white/50 hover:border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:-translate-y-0.5"
          >
            Lihat Semua Katalog
          </a>
        </div>
      </div>
    </section>
  );
}
