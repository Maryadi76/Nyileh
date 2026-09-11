import { createClient } from "@/lib/supabase/server";

interface ReviewItem {
  id?: string;
  stars: number;
  text: string;
  name: string;
  role: string;
  avatar?: string;
}

const defaultReviews: ReviewItem[] = [
  {
    stars: 5,
    text: "Sewa 20 unit HT untuk jaga keamanan acara pernikahan. Semua alat berfungsi sempurna, respon cepat, harga sangat terjangkau. Pasti akan sewa lagi!",
    name: "Ahmad Rasyid",
    role: "Panitia Wedding, Yogyakarta",
    avatar: "AR",
  },
  {
    stars: 5,
    text: "Proyektor dan sound system untuk seminar kampus. Pengiriman tepat waktu, teknisi bantu setup, hasil memuaskan. Recommended banget untuk EO dan organisasi kampus!",
    name: "Dinda Sari",
    role: "BEM Universitas, Yogyakarta",
    avatar: "DS",
  },
  {
    stars: 5,
    text: "Paket lengkap untuk acara olahraga, dari HT koordinator sampai sound system lapangan. Harga bersaing, pelayanan profesional. Sudah 3x sewa di sini.",
    name: "Budi Wibowo",
    role: "Penyelenggara Turnamen, Sleman",
    avatar: "BW",
  },
];

export default async function Testimonials() {
  let reviews: ReviewItem[] = defaultReviews;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      reviews = data;
    }
  } catch {
    // Gunakan fallback defaultReviews jika ada kendala koneksi
  }

  return (
    <section id="testimoni" className="py-20 px-4 sm:px-6 bg-slate-50" aria-labelledby="testi-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase">
            Testimoni
          </div>
          <h2 id="testi-heading" className="text-2xl sm:text-4xl font-extrabold text-[#1a2744]">
            Yang pelanggan bilang tentang kami
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Kepuasan dan kelancaran event Anda adalah prioritas utama layanan Nyileh.id.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((r, i) => (
            <div
              key={r.id || i}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-amber-400 mb-4 text-sm" aria-label={`${r.stars} dari 5 bintang`}>
                  {"★".repeat(r.stars)}
                </div>
                <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed mb-6">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#1a2744] text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {r.avatar || r.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1a2744]">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
