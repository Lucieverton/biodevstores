import { useState } from 'react';
import { Code, Brain, Server, Sparkles, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExclusiveProjectModal } from '@/components/modals/ExclusiveProjectModal';

const techStack = [
  { name: 'React', icon: Code },
  { name: 'Node.js', icon: Server },
  { name: 'IA/LLMs', icon: Brain },
  { name: 'Python', icon: Sparkles },
];

export const ExpertSection = () => {
  const [showExclusiveModal, setShowExclusiveModal] = useState(false);

  return (
    <section id="expert" className="py-24 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-background to-card" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="text-center space-y-4 mb-16">
          <span className="text-sm font-tech text-primary uppercase tracking-wider">
            Founder & Tech Lead
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="glitch" data-text="LUCIEVERTON">LUCIEVERTON</span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Profile Card */}
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-purple p-1 ring-pulse">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-gradient-purple font-tech">L</span>
              </div>
            </div>
          </div>

          {/* Typewriter Title */}
          <div className="text-center">
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              Full Stack Developer | AI Specialist | Tech Lead
            </p>
          </div>

          {/* Bio */}
          <div className="glass rounded-2xl p-6 md:p-8 max-w-2xl text-center">
            <p className="text-muted-foreground leading-relaxed">
              +5 anos transformando ideias em produtos digitais de alta performance. 
              Especializado em criar soluções que combinam design premium com tecnologia de ponta. 
              Da concepção ao deploy, cada projeto é tratado como único.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              );
            })}
          </div>

          {/* High Ticket Card */}
          <div className="w-full max-w-md mt-8">
            <div className="glass-light rounded-2xl p-6 border border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-accent">Projetos Exclusivos</h3>
                  <p className="text-sm text-muted-foreground">Alta performance garantida</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Para empresas que buscam resultados extraordinários. 
                Desenvolvimento personalizado com suporte dedicado e tecnologias premium.
              </p>
              <Button 
                className="w-full bg-gradient-gold hover:opacity-90 text-background font-semibold group"
                onClick={() => setShowExclusiveModal(true)}
              >
                <Crown className="w-4 h-4 mr-2" />
                Solicitar Orçamento
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
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
