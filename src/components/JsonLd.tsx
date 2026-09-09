import { faqList } from "@/data/faq";

export default function JsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nyileh.id - Rental Perlengkapan Event Jogja",
    image: "https://nyileh.id/og-image.jpg",
    description: "Jasa sewa perlengkapan event profesional: HT, proyektor, sound system di Yogyakarta",
    url: "https://nyileh.id",
    telephone: "+6285179972448",
    email: "nyilehid@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yogyakarta",
      addressLocality: "Yogyakarta",
      addressRegion: "DI Yogyakarta",
      postalCode: "55000",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -7.7956,
      longitude: 110.3695,
    },
    openingHours: "Mo-Su 08:00-20:00",
    priceRange: "Rp",
    sameAs: [
      "https://www.instagram.com/nyileh.id",
      "https://wa.me/6285179972448",
      "https://tiktok.com/@nyileh.id",
      "https://www.facebook.com/nyileh.id",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Katalog Sewa Perlengkapan Event",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sewa HT / Handy Talky" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sewa Proyektor" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sewa Sound System" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sewa Lighting Panggung" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sewa Microphone Wireless" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sewa Layar & LED Display" } },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
