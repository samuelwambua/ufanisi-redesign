import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import QuoteFormSection from "../components/home/QuoteFormSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <QuoteFormSection />
      <Footer />
    </main>
  );
}