import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 px-4 sm:px-6" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block" aria-label="Nyileh.id - Beranda">
              <span className="font-extrabold text-2xl tracking-tight text-white">
                nyileh<span className="text-blue-500">.id</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Penyedia jasa sewa perlengkapan event profesional di Yogyakarta. Rent. Connect. Support.
            </p>
            <div className="text-sm space-y-2 pt-2">
              <p className="flex items-center gap-2">
                <span>📍</span> Yogyakarta, Indonesia
              </p>
              <p className="flex items-center gap-2">
                <span>📱</span>
                <a
                  href="https://wa.me/6285179972448"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +62 851-7997-2448
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <a
                  href="mailto:nyilehid@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  nyilehid@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Produk */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Produk</h3>
            <ul className="space-y-2.5 text-sm list-none">
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Sewa HT / Handy Talky
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Sewa Proyektor
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Sewa Sound System
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Sewa Lighting
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Sewa Microphone
                </a>
              </li>
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Informasi</h3>
            <ul className="space-y-2.5 text-sm list-none">
              <li>
                <a href="#cara-sewa" className="hover:text-white transition-colors">
                  Cara Sewa
                </a>
              </li>
              <li>
                <a href="#area" className="hover:text-white transition-colors">
                  Area Layanan
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#testimoni" className="hover:text-white transition-colors">
                  Testimoni
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">
                  Blog & Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Media Sosial */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Ikuti Kami</h3>
            <ul className="space-y-2.5 text-sm list-none">
              <li>
                <a
                  href="https://instagram.com/nyileh.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6285179972448"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@nyileh.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/nyileh.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} Nyileh.id. Semua hak dilindungi.</div>
          <div>Sewa Alat Event Yogyakarta · Jogja · DI Yogyakarta · Indonesia</div>
        </div>
      </div>
    </footer>
  );
}
