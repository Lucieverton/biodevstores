import { Store, Tag, HelpCircle, User, Zap } from 'lucide-react';
import { SectionId, useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';

const navItems: { id: SectionId; icon: React.ElementType; label: string }[] = [
  { id: 'templates', icon: Store, label: 'Vitrine' },
  { id: 'planos', icon: Tag, label: 'Planos' },
  { id: 'home', icon: Zap, label: 'Início' }, // CTA central
  { id: 'faq', icon: HelpCircle, label: 'FAQ' },
  { id: 'expert', icon: User, label: 'Expert' },
];

export const MobileBottomNav = () => {
  const { activeSection, setActiveSection } = useActiveSection();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-card/95 backdrop-blur-xl border-t border-border/50" />
      
      {/* Navigation items */}
      <div className="relative grid grid-cols-5 items-end h-[70px] px-2 safe-area-pb">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isCenter = index === 2;
          const isActive = activeSection === item.id;

          if (isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="flex flex-col items-center justify-center -mt-6 group"
              >
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
                  "bg-gradient-to-br from-primary via-cyan-400 to-primary",
                  isActive 
                    ? "shadow-[0_0_30px_rgba(0,255,255,0.6)] scale-110" 
                    : "shadow-[0_0_20px_rgba(0,255,255,0.4)] group-hover:scale-105"
                )}>
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className={cn(
                  "text-[10px] mt-1 font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="flex flex-col items-center justify-center py-2 group relative"
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-primary/20 text-primary" 
                  : "text-muted-foreground group-hover:text-foreground"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[10px] mt-0.5 font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* Safe area spacer for iPhone */}
      <style>{`
        .safe-area-pb {
          padding-bottom: max(8px, env(safe-area-inset-bottom));
        }
      `}</style>
    </nav>
  );
};
