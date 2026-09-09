export default function ServiceArea() {
  const primaryAreas = ["📍 Kota Yogyakarta (Jogja)", "📍 Kabupaten Sleman"];
  const otherAreas = [
    "Bantul",
    "Kulon Progo",
    "Wonosari / Gunungkidul",
    "Kalasan",
    "Prambanan",
    "Godean",
    "Mlati",
    "Depok",
    "Kasihan",
    "Sewon",
    "Area DIY lainnya (hubungi kami)",
  ];

  return (
    <section id="area" className="py-20 px-4 sm:px-6 bg-white" aria-labelledby="area-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase">
            Area Layanan
          </div>
          <h2 id="area-heading" className="text-2xl sm:text-4xl font-extrabold text-[#1a2744]">
            Melayani Yogyakarta & Sekitarnya
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Kami beroperasi di seluruh wilayah Daerah Istimewa Yogyakarta dan siap mengantar perlengkapan langsung ke lokasi eventmu.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {primaryAreas.map((area, i) => (
            <span
              key={i}
              className="bg-blue-600 text-white font-semibold text-sm sm:text-base px-5 py-2.5 rounded-full shadow-sm"
            >
              {area}
            </span>
          ))}

          {otherAreas.map((area, i) => (
            <span
              key={i}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm sm:text-base px-4 py-2.5 rounded-full border border-slate-200 transition-colors"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
