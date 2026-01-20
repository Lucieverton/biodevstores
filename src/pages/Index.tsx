import { HeaderWrapper } from "@/components/HeaderWrapper";
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
import { SectionContainer } from "@/components/SectionContainer";
import { ActiveSectionProvider, useActiveSection, SectionId } from "@/hooks/useActiveSection";
import { CircuitTransition } from "@/components/CircuitTransition";

const IndexContent = () => {
  const { isTransitioning, setActiveSection } = useActiveSection();

  const handleNavigate = (section: string) => {
    setActiveSection(section as SectionId);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <HeaderWrapper />
      
      <CircuitTransition isTransitioning={isTransitioning} />
      
      <main className="relative pt-[var(--header-height)] pb-[var(--bottom-nav-height)] lg:pb-0">
        <SectionContainer id="home">
          <Hero />
        </SectionContainer>

        <SectionContainer id="templates">
          <TemplatesCarousel onNavigate={handleNavigate} />
        </SectionContainer>

        <SectionContainer id="nichos">
          <NichesSection />
        </SectionContainer>

        <SectionContainer id="planos">
          <PricingSection />
        </SectionContainer>

        <SectionContainer id="faq">
          <FAQSection />
        </SectionContainer>

        <SectionContainer id="expert">
          <ExpertSection />
        </SectionContainer>

        <SectionContainer id="contato">
          <ContactSection />
          <Footer />
        </SectionContainer>
      </main>

      <MobileBottomNav />
      <FloatingWhatsApp />
    </div>
  );
};

const Index = () => {
  return (
    <ActiveSectionProvider>
      <IndexContent />
    </ActiveSectionProvider>
  );
};

export default Index;
