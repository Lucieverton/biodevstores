import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Zap, HeadphonesIcon, Users, TrendingUp, Clock, Sparkles } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ExclusiveProjectModal } from "@/components/modals/ExclusiveProjectModal";
import heroBgDesktop from "@/assets/hero-bg-desktop.png";
import heroBgMobile from "@/assets/hero-bg-mobile-optimized.png";

const trustBadges = [
  { icon: Shield, text: "Site Seguro" },
  { icon: Zap, text: "Alta Performance" },
  { icon: HeadphonesIcon, text: "Suporte Humano" },
];

const benefits = [
  {
    icon: Users,
    title: "Converte Visitantes",
    description: "Transforme curiosos em clientes com CTAs estratégicos"
  },
  {
    icon: TrendingUp,
    title: "Profissionaliza sua Marca",
    description: "Deixe de usar links genéricos e tenha presença digital de elite"
  },
  {
    icon: Clock,
    title: "Disponível 24/7",
    description: "Seu mini-site trabalha por você enquanto você dorme"
  },
  {
    icon: Sparkles,
    title: "100% Personalizável",
    description: "Adaptamos cores, fontes e layout para seu negócio"
  }
];

export const Hero = () => {
  const { setActiveSection } = useActiveSection();
  const [showExclusiveModal, setShowExclusiveModal] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [heroBgDesktop, heroBgMobile];
      
      await Promise.all(
        imageUrls.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = resolve; // Don't block on error
              img.src = src;
            })
        )
      );
      
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-120px)] flex items-center pt-14 pb-24 lg:pb-8 px-4 relative overflow-hidden"
    >
      {/* Loading skeleton */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-background animate-pulse" />
      )}

      {/* Hero Image Background - Mobile - Single Layer Clean */}
      <div 
        className={`absolute inset-0 lg:hidden transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: 'hsl(var(--background))' }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-[center_60%] bg-no-repeat"
          style={{ backgroundImage: `url(${heroBgMobile})` }}
        />
        
        {/* Overlay gradient - Sutil para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />
      </div>
      
      {/* Hero Image Background - Desktop */}
      <div 
        className={`absolute inset-0 hidden lg:block bg-cover bg-[70%_center] bg-no-repeat transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          backgroundImage: `url(${heroBgDesktop})`,
          backgroundColor: 'hsl(var(--background))',
          willChange: 'opacity'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl lg:max-w-2xl mx-auto lg:mx-0 lg:ml-4 xl:ml-12 space-y-8 pt-32 lg:pt-0">
          {/* Main Content - Centered on mobile, left on desktop */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            <span className="inline-block text-sm font-tech text-primary uppercase tracking-widest mb-2">
              Mini-Sites Estratégicos
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="text-foreground">Seu negócio merece uma </span>
              <span className="text-gradient">Presença Digital</span>
              <span className="text-foreground"> de </span>
              <span className="text-gradient-purple">Elite</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              De Bios profissionais a Sistemas com IA: criamos a tecnologia que{" "}
              <span className="text-primary font-semibold">vende por você</span>{" "}
              enquanto você dorme.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 animate-fade-in delay-100">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.text}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/50 backdrop-blur-sm ${index === 2 ? 'hidden sm:flex' : ''}`}
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{badge.text}</span>
                </div>
              );
            })}
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 animate-fade-in delay-200">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="group p-4 rounded-xl bg-card/60 border border-border/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-1">{benefit.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in delay-300">
            <Button
              size="lg"
              onClick={() => setActiveSection('templates')}
              className="bg-gradient-neon hover:shadow-glow-intense transition-all text-base md:text-lg px-8 h-12 md:h-14 glow-cyan"
            >
              VER TEMPLATES
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowExclusiveModal(true)}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all text-base md:text-lg px-8 h-12 md:h-14"
            >
              SITE EXCLUSIVO
            </Button>
          </div>

          {/* Modals */}
          <ExclusiveProjectModal isOpen={showExclusiveModal} onClose={() => setShowExclusiveModal(false)} />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-4 animate-fade-in delay-400">
            <div className="text-center lg:text-left space-y-1">
              <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-gradient font-tech">500+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Clientes Ativos</div>
            </div>
            <div className="text-center lg:text-left space-y-1">
              <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-gradient-purple font-tech">98%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Satisfação</div>
            </div>
            <div className="text-center lg:text-left space-y-1">
              <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-gradient-fire font-tech">24h</div>
              <div className="text-xs md:text-sm text-muted-foreground">Entrega</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
