import { Navbar } from "@/components/Navbar";
import { TopNotificationBar } from "@/components/TopNotificationBar";
import { Hero } from "@/components/Hero";
import { TemplatesCarousel } from "@/components/TemplatesCarousel";
import { NichesSection } from "@/components/NichesSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { ExpertSection } from "@/components/ExpertSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen pb-[70px] lg:pb-0">
      <TopNotificationBar />
      <Navbar />
      <Hero />
      <TemplatesCarousel />
      <NichesSection />
      <PricingSection />
      <FAQSection />
      <ExpertSection />
      <ContactSection />
      <Footer />
      <MobileBottomNav />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
