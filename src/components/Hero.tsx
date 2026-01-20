import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Zap, HeadphonesIcon, Users, TrendingUp, Clock, Sparkles, Instagram, CheckCircle2, ExternalLink } from "lucide-react";
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

const socialProof = [
  {
    instagram: "@belladata",
    instagramUrl: "https://instagram.com/belladata",
    siteUrl: "https://belladata.devstores.com.br",
    plan: "Plano Elite",
    years: 3,
    testimonial: "Minha bio ficou incrível! Clientes elogiam toda hora ✨"
  },
  {
    instagram: "@barbeariabrutos",
    instagramUrl: "https://instagram.com/barbeariabrutos",
    siteUrl: "https://barbeariabrutos.com.br",
    plan: "Site Exclusivo",
    years: 4,
    testimonial: "Profissionalismo que faz diferença no nosso atendimento 💈"
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
      className="min-h-screen lg:min-h-[calc(100vh-120px)] flex items-start lg:items-center pt-12 pb-4 lg:pb-8 px-4 relative overflow-hidden"
    >
      {/* Loading skeleton */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-background animate-pulse" />
      )}

      {/* Hero Image Background - Mobile - Fixed Effect */}
      <div 
        className={`absolute inset-0 lg:hidden transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          backgroundImage: `url(${heroBgMobile})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          backgroundColor: 'hsl(var(--background))'
        }}
      >
        {/* Overlay gradient - Para legibilidade sobre a imagem */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </div>
      
      {/* Hero Image Background - Desktop */}
      <div 
        className={`absolute inset-0 hidden lg:block bg-cover bg-no-repeat transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          backgroundImage: `url(${heroBgDesktop})`,
          backgroundColor: 'hsl(var(--background))',
          backgroundPosition: '70% center',
          willChange: 'opacity'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl lg:max-w-2xl mx-auto lg:mx-0 lg:ml-4 xl:ml-12 space-y-4 pt-16 lg:pt-0">
          {/* Main Content - Centered on mobile, left on desktop */}
          <div className="text-center lg:text-left space-y-3 sm:space-y-4 lg:space-y-5">
            {/* Badge de Identificação - Fade In elegante */}
            <div className="hero-badge flex items-center justify-center lg:justify-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
              <span className="text-sm sm:text-base lg:text-lg font-medium text-primary/90 tracking-wide">
                Se você está aqui, já sabe que precisa de uma bio melhor
              </span>
            </div>

            {/* Título Principal - Quebras inteligentes */}
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
              <span className="text-foreground">A </span>
              <span className="text-gradient">Bio que Vende</span>
              <br className="sm:hidden" />
              <span className="text-foreground"> por </span>
              <span className="text-gradient-purple">Você</span>
            </h1>

            {/* Subtítulo - Fade in suave */}
            <p className="hero-subtitle text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Enquanto você usa <span className="strike-through">Linktree</span>, seus concorrentes estão{" "}
              <span className="text-primary font-semibold">convertendo visitantes em clientes</span>{" "}
              com uma bio profissional.
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
          <div className="grid grid-cols-2 gap-2 md:gap-4 animate-fade-in delay-200">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="group p-4 rounded-xl bg-card/40 border border-border/20 backdrop-blur-md hover:border-primary/30 transition-all duration-300"
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

          {/* Urgency Banner */}
          <div className="flex justify-center lg:justify-start animate-fade-in delay-350">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-yellow/10 to-orange-500/10 border border-neon-yellow/30 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-neon-yellow animate-pulse" />
              <span className="text-sm font-medium">
                <span className="text-neon-yellow font-bold">Agenda 85% preenchida</span>
                <span className="text-muted-foreground"> — Garanta sua vaga!</span>
              </span>
              <Zap className="w-4 h-4 text-neon-yellow animate-pulse" />
            </div>
          </div>

          {/* Modals */}
          <ExclusiveProjectModal isOpen={showExclusiveModal} onClose={() => setShowExclusiveModal(false)} />

          {/* Social Proof Section */}
          <div className="space-y-4 animate-fade-in delay-400">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Clientes que confiam há anos
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socialProof.map((client) => (
                <div
                  key={client.instagram}
                  className="group relative p-4 rounded-xl bg-card/60 border border-border/30 backdrop-blur-md hover:border-primary/40 transition-all duration-300"
                >
                  {/* Badge de tempo */}
                  <div className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">
                    ✓ Cliente há {client.years} anos
                  </div>
                  
                  <div className="flex items-start gap-3 mt-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <a 
                        href={client.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {client.instagram}
                      </a>
                      <div className="text-xs text-primary font-medium mt-0.5">{client.plan}</div>
                      <a 
                        href={client.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mt-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="truncate">{client.siteUrl.replace('https://', '')}</span>
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    "{client.testimonial}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-2 animate-fade-in delay-500">
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
