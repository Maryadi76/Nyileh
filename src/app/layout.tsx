import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteLayoutWrapper from "@/components/SiteLayoutWrapper";
import JsonLd from "@/components/JsonLd";
import PageViewTracker from "@/components/PageViewTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyileh.id"),
  title: "Sewa HT & Proyektor Jogja – Antar Jemput Siap Pakai | Nyileh.id",
  description:
    "Rental HT, proyektor, sound system & lighting di Yogyakarta. Unit dicek sebelum kirim, baterai full, kabel lengkap, bisa antar-jemput ke venue seluruh Jogja.",
  keywords: [
    "sewa HT Jogja",
    "rental handy talky Yogyakarta",
    "sewa proyektor Jogja",
    "sewa sound system Yogyakarta",
    "rental alat event Sleman Bantul",
    "sewa proyektor murah Jogja",
    "persewaan alat event Yogyakarta",
    "nyileh id",
  ],
  authors: [{ name: "Nyileh.id", url: "https://nyileh.id" }],
  creator: "Nyileh.id",
  publisher: "Nyileh.id",
  alternates: {
    canonical: "https://nyileh.id/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://nyileh.id/",
    title: "Sewa HT & Proyektor Jogja – Antar Jemput Siap Pakai | Nyileh.id",
    description:
      "Rental HT, proyektor, sound system & lighting di Yogyakarta. Unit dicek sebelum kirim, baterai full, bisa antar-jemput ke venue seluruh Jogja.",
    siteName: "Nyileh.id",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nyileh.id - Rental Perlengkapan Event Jogja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sewa HT & Proyektor Jogja – Antar Jemput Siap Pakai | Nyileh.id",
    description:
      "Rental HT, proyektor, sound system & lighting di Yogyakarta. Siap antar-jemput ke venue.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-white text-slate-900">
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7G0NT12PJC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7G0NT12PJC');
          `}
        </Script>
        <PageViewTracker />
        <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
      </body>
    </html>
  );
}
