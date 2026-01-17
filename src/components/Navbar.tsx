import { useState, useEffect } from 'react';
import { SectionId, useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';

const navLinks: { id: SectionId; label: string }[] = [
  { id: 'templates', label: 'Showcase' },
  { id: 'planos', label: 'Planos Bio' },
  { id: 'faq', label: 'Dúvidas' },
  { id: 'expert', label: 'Expert' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { activeSection, setActiveSection } = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-[var(--notification-height)] left-0 right-0 z-40 transition-all duration-300',
        scrolled ? 'bg-card/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-[var(--header-height)] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setActiveSection('home')}
          className="flex items-center gap-3 group"
        >
          {/* 3D Rotating Logo */}
          <div className="relative w-10 h-10 perspective-1000">
            <div className="w-full h-full relative preserve-3d animate-spin-slow">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-cyan-400 rounded-lg opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary text-lg font-bold font-tech">DS</span>
              </div>
            </div>
          </div>
          <span className="text-xl font-bold text-gradient font-tech hidden sm:block">
            DevStores
          </span>
        </button>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveSection(link.id)}
              className={cn(
                'relative font-medium transition-colors duration-300 py-2',
                activeSection === link.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop CTA - Hidden on mobile */}
        <button
          onClick={() => setActiveSection('contato')}
          className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-cyan-400 text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] hover:scale-105"
        >
          <i className="fas fa-bolt"></i>
          Começar Agora
        </button>
      </div>
    </header>
  );
};
