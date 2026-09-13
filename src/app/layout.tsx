import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  title: "Nyileh.id – Sewa HT, Proyektor & Perlengkapan Event | Yogyakarta",
  description:
    "Nyileh.id – Jasa sewa perlengkapan event terpercaya: HT, proyektor, sound system, dan lainnya. Harga terjangkau, pengiriman cepat, layanan profesional di Yogyakarta & sekitarnya.",
  keywords: [
    "sewa HT Yogyakarta",
    "sewa proyektor Yogyakarta",
    "sewa perlengkapan event Yogyakarta",
    "rental HT DI Yogyakarta",
    "nyileh id",
    "sewa alat event murah Jogja",
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
    title: "Nyileh.id – Sewa HT, Proyektor & Perlengkapan Event | Yogyakarta",
    description:
      "Sewa HT, proyektor, sound system & perlengkapan event lainnya. Harga terjangkau, pengiriman cepat di Yogyakarta & sekitarnya.",
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
    title: "Nyileh.id – Sewa HT, Proyektor & Perlengkapan Event | Yogyakarta",
    description:
      "Sewa HT, proyektor, sound system & perlengkapan event lainnya di Yogyakarta.",
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
        <PageViewTracker />
        <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
      </body>
    </html>
  );
}
