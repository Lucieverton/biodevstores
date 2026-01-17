import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type SectionId = 'home' | 'templates' | 'nichos' | 'planos' | 'faq' | 'expert' | 'contato';

interface ActiveSectionContextType {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  goToNext: () => void;
  goToPrev: () => void;
}

const sectionOrder: SectionId[] = ['home', 'templates', 'nichos', 'planos', 'faq', 'expert', 'contato'];

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export const ActiveSectionProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSectionState] = useState<SectionId>('home');

  const setActiveSection = useCallback((section: SectionId) => {
    setActiveSectionState(section);
  }, []);

  const goToNext = useCallback(() => {
    const currentIndex = sectionOrder.indexOf(activeSection);
    if (currentIndex < sectionOrder.length - 1) {
      setActiveSectionState(sectionOrder[currentIndex + 1]);
    }
  }, [activeSection]);

  const goToPrev = useCallback(() => {
    const currentIndex = sectionOrder.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSectionState(sectionOrder[currentIndex - 1]);
    }
  }, [activeSection]);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection, goToNext, goToPrev }}>
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
