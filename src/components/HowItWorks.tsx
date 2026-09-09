export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Hubungi Kami",
      desc: "Chat via WhatsApp atau DM Instagram. Ceritakan kebutuhan alat, tanggal, dan lokasi eventmu.",
    },
    {
      num: "2",
      title: "Cek Ketersediaan",
      desc: "Kami cek stok dan konfirmasi ketersediaan alat sesuai tanggal eventmu. Proses cepat, biasanya kurang dari 30 menit.",
    },
    {
      num: "3",
      title: "Bayar DP & Konfirmasi",
      desc: "DP 50% untuk konfirmasi booking. Transfer ke rekening kami, kirim bukti, dan pesanan terkunci.",
    },
    {
      num: "4",
      title: "Terima Alat di Lokasi",
      desc: "Kami antar ke lokasi eventmu sesuai jadwal. Pelunasan saat pengiriman atau bisa di-transfer sebelumnya.",
    },
  ];

  return (
    <section id="cara-sewa" className="py-20 px-4 sm:px-6 bg-slate-50" aria-labelledby="cara-sewa-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase">
            Cara Sewa
          </div>
          <h2 id="cara-sewa-heading" className="text-2xl sm:text-4xl font-extrabold text-[#1a2744]">
            Pesan dalam 4 langkah mudah
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Proses sewa yang simpel tanpa ribet. Hubungi kami dan alat siap di lokasi eventmu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1a2744] text-white font-extrabold text-xl flex items-center justify-center mb-5 shadow">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-[#1a2744] mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
