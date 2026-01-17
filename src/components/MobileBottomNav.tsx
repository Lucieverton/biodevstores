import { Store, Tag, HelpCircle, User, Zap } from 'lucide-react';

export const MobileBottomNav = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { icon: Store, label: 'Vitrine', section: 'templates' },
    { icon: Tag, label: 'Planos', section: 'planos' },
    { icon: null, label: 'CTA', section: 'contato' }, // Central CTA
    { icon: HelpCircle, label: 'FAQ', section: 'faq' },
    { icon: User, label: 'Expert', section: 'expert' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass border-t border-border/50">
      <div className="grid grid-cols-5 h-[70px] items-end pb-2 px-2 safe-area-pb">
        {navItems.map((item, index) => {
          // Central CTA button
          if (index === 2) {
            return (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.section)}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-neon flex items-center justify-center shadow-glow animate-pulse-glow">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-[10px] mt-1 text-primary font-medium">Começar</span>
              </button>
            );
          }

          const Icon = item.icon!;
          return (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.section)}
              className="flex flex-col items-center justify-center gap-1 py-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
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
