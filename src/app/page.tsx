import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Catalog from "@/components/Catalog";
import HowItWorks from "@/components/HowItWorks";
import WhyUs from "@/components/WhyUs";
import ServiceArea from "@/components/ServiceArea";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Catalog />
      <HowItWorks />
      <WhyUs />
      <ServiceArea />
      <Testimonials />
      <FAQ />
      <BlogSection />
      <CTASection />
    </>
  );
}
