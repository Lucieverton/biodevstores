import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

export type SectionId = 'home' | 'templates' | 'nichos' | 'planos' | 'faq' | 'expert' | 'contato';

interface ActiveSectionContextType {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  isTransitioning: boolean;
  goToNext: () => void;
  goToPrev: () => void;
}

const sectionOrder: SectionId[] = ['home', 'templates', 'nichos', 'planos', 'faq', 'expert', 'contato'];

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export const ActiveSectionProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSectionState] = useState<SectionId>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Force scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const setActiveSection = useCallback((section: SectionId) => {
    if (section === activeSection || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // After animation starts, change section
    setTimeout(() => {
      setActiveSectionState(section);
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Fade out delay
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 350);
  }, [activeSection, isTransitioning]);

  const goToNext = useCallback(() => {
    const currentIndex = sectionOrder.indexOf(activeSection);
    if (currentIndex < sectionOrder.length - 1) {
      setActiveSection(sectionOrder[currentIndex + 1]);
    }
  }, [activeSection, setActiveSection]);

  const goToPrev = useCallback(() => {
    const currentIndex = sectionOrder.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sectionOrder[currentIndex - 1]);
    }
  }, [activeSection, setActiveSection]);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection, isTransitioning, goToNext, goToPrev }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSection = () => {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error('useActiveSection must be used within ActiveSectionProvider');
  }
  return context;
};
