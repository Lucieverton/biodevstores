import { Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export const TopNotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsVisible(true);
      return;
    }

    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down, show when at top
      if (currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div 
      className={`h-[var(--notification-height)] border-b border-border/30 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full h-0 overflow-hidden'
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-center gap-2 px-4">
        <Zap className="w-4 h-4 text-neon-yellow animate-pulse" />
        <span className="text-sm font-medium">
          <span className="text-neon-yellow">Agenda 85% preenchida</span>
          <span className="text-muted-foreground"> — Garanta sua vaga antes do fechamento!</span>
        </span>
      </div>
    </div>
  );
};
