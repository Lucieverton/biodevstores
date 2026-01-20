import { useState, useEffect } from 'react';
import { Code, Brain, Server, Sparkles, Crown, ArrowRight, Zap, Database, Globe, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExclusiveProjectModal } from '@/components/modals/ExclusiveProjectModal';
import sectionBg from "@/assets/section-bg.png";
import profileExpert from "@/assets/profile-expert.png";

const techStack = [
  { name: 'React/Next.js', icon: Code, color: 'text-cyan-400' },
  { name: 'Node.js', icon: Server, color: 'text-green-400' },
  { name: 'IA & LLMs', icon: Brain, color: 'text-purple-400' },
  { name: 'Python', icon: Cpu, color: 'text-yellow-400' },
  { name: 'Databases', icon: Database, color: 'text-blue-400' },
  { name: 'Cloud/DevOps', icon: Globe, color: 'text-orange-400' },
];

const stats = [
  { value: '+50', label: 'Projetos Entregues' },
  { value: '+5', label: 'Anos de Experiência' },
  { value: '100%', label: 'Foco em Resultados' },
];

export const ExpertSection = () => {
  const [showExclusiveModal, setShowExclusiveModal] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const fullText = 'Desenvolvedor Full Stack • Especialista em IA • Tech Lead';

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [sectionBg, profileExpert];
      
      await Promise.all(
        imageUrls.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = resolve;
              img.src = src;
            })
        )
      );
      
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('expert');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isVisible) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section id="expert" className="py-24 md:py-32 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          backgroundImage: `url(${sectionBg})`,
          willChange: 'opacity'
        }}
      />
      {!imagesLoaded && <div className="absolute inset-0 bg-background" />}
      <div className="absolute inset-0 bg-background/75" />
      
      {/* Animated Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-purple/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto relative z-10 max-w-4xl">
        
        {/* Badge - Slide in from top */}
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-tech uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            O Especialista por trás da DevStores
          </span>
        </div>

        {/* Profile Photo - Center focal point with animated ring */}
        <div className={`flex justify-center mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative group">
            {/* Animated Neon Ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-cyan-400 to-primary opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-cyan-400 opacity-50" />
            
            {/* Photo Container */}
            <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-primary/50 bg-background">
              <img 
                src={profileExpert} 
                alt="Lucieverton - Founder & Tech Lead" 
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                decoding="async"
              />
              {!imagesLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
            </div>

            {/* Status Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
              <span className="flex items-center gap-1.5 text-xs font-medium text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Disponível para projetos
              </span>
            </div>
          </div>
        </div>

        {/* Name with Glitch Effect */}
        <div className={`text-center mb-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-4xl md:text-6xl font-bold font-tech">
            <span className="glitch text-gradient" data-text="LUCIEVERTON">LUCIEVERTON</span>
          </h2>
        </div>

        {/* Typewriter Subtitle */}
        <div className={`text-center mb-10 h-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-base md:text-lg text-muted-foreground font-medium">
            {typedText}
            <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
          </p>
        </div>

        {/* Stats Row */}
        <div className={`flex justify-center gap-6 md:gap-12 mb-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center" style={{ transitionDelay: `${400 + index * 100}ms` }}>
              <div className="text-2xl md:text-3xl font-bold text-gradient font-tech">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bio Card */}
        <div className={`max-w-2xl mx-auto mb-10 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="glass rounded-2xl p-6 md:p-8 text-center border border-primary/10 hover:border-primary/30 transition-colors">
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Não sou apenas um desenvolvedor — sou o <span className="text-primary font-semibold">arquiteto de soluções</span> que 
              transformam negócios. De startups a empresas consolidadas, minha missão é criar 
              produtos digitais que <span className="text-primary font-semibold">geram resultados reais</span>: mais vendas, 
              mais conversões, mais crescimento. Cada linha de código é escrita pensando no 
              seu <span className="text-primary font-semibold">sucesso</span>.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className={`mb-12 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-6 font-tech">
            Stack de Tecnologias
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-full bg-card/50 border border-border/50 
                    hover:border-primary/50 hover:bg-card/80 transition-all duration-300 cursor-default
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${600 + index * 80}ms` }}
                >
                  <Icon className={`w-4 h-4 ${tech.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-medium text-foreground/90">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Card - Projetos Exclusivos */}
        <div className={`max-w-lg mx-auto transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative group">
            {/* Animated Border Gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-50 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-gradient-x" />
            
            <div className="relative glass rounded-2xl p-6 md:p-8 border border-accent/20 bg-background/80 overflow-hidden">
              {/* Circuit Background Effect */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Circuit Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  {/* Horizontal lines */}
                  <line x1="0" y1="20%" x2="30%" y2="20%" stroke="url(#circuitGradient)" strokeWidth="1" className="animate-pulse" />
                  <line x1="70%" y1="20%" x2="100%" y2="20%" stroke="url(#circuitGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <line x1="0" y1="50%" x2="20%" y2="50%" stroke="url(#circuitGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  <line x1="80%" y1="50%" x2="100%" y2="50%" stroke="url(#circuitGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <line x1="0" y1="80%" x2="25%" y2="80%" stroke="url(#circuitGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
                  <line x1="75%" y1="80%" x2="100%" y2="80%" stroke="url(#circuitGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
                  
                  {/* Vertical lines */}
                  <line x1="10%" y1="0" x2="10%" y2="30%" stroke="url(#circuitGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <line x1="90%" y1="70%" x2="90%" y2="100%" stroke="url(#circuitGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
                  
                  {/* Circuit nodes */}
                  <circle cx="10%" cy="20%" r="3" fill="hsl(var(--primary))" className="animate-ping" style={{ animationDuration: '2s' }} />
                  <circle cx="90%" cy="20%" r="3" fill="hsl(var(--accent))" className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                  <circle cx="10%" cy="80%" r="3" fill="hsl(var(--primary))" className="animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
                  <circle cx="90%" cy="80%" r="3" fill="hsl(var(--accent))" className="animate-ping" style={{ animationDuration: '2.2s', animationDelay: '0.3s' }} />
                  <circle cx="50%" cy="50%" r="2" fill="hsl(var(--primary))" className="animate-pulse" />
                </svg>
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-accent/30 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-accent/30 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
              </div>
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center animate-pulse">
                  <Crown className="w-6 h-6 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Projetos Exclusivos</h3>
                  <p className="text-sm text-muted-foreground">Para quem busca o extraordinário</p>
                </div>
              </div>

              {/* Benefits */}
              <ul className="space-y-3 mb-6 relative z-10">
                {[
                  'Desenvolvimento 100% personalizado',
                  'Suporte prioritário e dedicado',
                  'Tecnologias de ponta (IA, automações)',
                  'Consultoria estratégica incluída'
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground group/item hover:text-foreground transition-colors">
                    <div className="relative">
                      <Sparkles className="w-4 h-4 text-accent flex-shrink-0 drop-shadow-[0_0_6px_hsl(var(--accent))] group-hover/item:scale-125 transition-transform" />
                      <div className="absolute inset-0 w-4 h-4 bg-accent/30 rounded-full blur-md animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                size="lg"
                className="w-full relative z-10 bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all duration-300 font-semibold group/btn"
                onClick={() => setShowExclusiveModal(true)}
              >
                <Crown className="w-5 h-5 mr-2 drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
                Quero um Projeto Exclusivo
                <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>

              {/* Trust Badge */}
              <p className="text-center text-xs text-muted-foreground mt-4 relative z-10">
                ⚡ Resposta em até 24h • Orçamento sem compromisso
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Exclusive Project Modal */}
      <ExclusiveProjectModal 
        isOpen={showExclusiveModal} 
        onClose={() => setShowExclusiveModal(false)} 
      />
    </section>
  );
};
