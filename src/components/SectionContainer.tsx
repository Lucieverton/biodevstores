import { ReactNode } from 'react';
import { SectionId, useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  id: SectionId;
  children: ReactNode;
  className?: string;
}

export const SectionContainer = ({ id, children, className }: SectionContainerProps) => {
  const { activeSection } = useActiveSection();
  const isActive = activeSection === id;

  return (
    <section
      id={id}
      className={cn(
        'section-page transition-all duration-500 ease-in-out',
        isActive ? 'section-active' : 'section-hidden',
        className
      )}
      aria-hidden={!isActive}
    >
      {children}
    </section>
  );
};
