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

  // Only render content if active to improve performance
  if (!isActive) {
    return null;
  }

  return (
    <section
      id={id}
      className={cn(
        'section-page section-active',
        className
      )}
    >
      {children}
    </section>
  );
};
