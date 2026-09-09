export default function TrustBar() {
  const trustPoints = [
    "Harga transparan, tanpa biaya tersembunyi",
    "Respon cepat via WhatsApp",
    "Alat terawat & siap pakai",
    "Antar-jemput ke lokasi event",
  ];

  return (
    <div className="bg-slate-50 border-b border-slate-200 py-3.5 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
        {trustPoints.map((point, i) => (
          <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600">
            <svg
              className="w-4 h-4 text-blue-600 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
