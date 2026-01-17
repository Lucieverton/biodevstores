import { Button } from "@/components/ui/button";
import { Shield, Zap, HeadphonesIcon } from "lucide-react";

const trustBadges = [
  { icon: Shield, text: "Site Seguro" },
  { icon: Zap, text: "Alta Performance" },
  { icon: HeadphonesIcon, text: "Suporte Humano" },
];

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-32 pb-24 lg:pb-8 px-4 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-neon-cyan rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-neon-purple rounded-full blur-[100px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon-green rounded-full blur-[80px] opacity-50" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl lg:max-w-4xl space-y-8">
          {/* Main Content - Left Aligned */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient">Sua Bio,</span>
              <br />
              <span className="text-foreground">Agora </span>
              <span className="text-gradient-purple">Profissional</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl">
              Chega de links genéricos. Transforme sua bio em um{" "}
              <span className="text-primary font-semibold">mini-site estratégico</span>{" "}
              que converte visitantes em clientes.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 animate-fade-in delay-200">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/50 backdrop-blur-sm"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{badge.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
            <Button
              size="lg"
              onClick={() => scrollToSection("contato")}
              className="bg-gradient-neon hover:shadow-glow-intense transition-all text-lg px-8 h-14 glow-cyan"
            >
              QUERO MINHA BIO
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contato")}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all text-lg px-8 h-14"
            >
              SITE EXCLUSIVO
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-8 pt-8 animate-fade-in delay-400">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient font-tech">500+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Clientes Ativos</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-purple font-tech">98%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Satisfação</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-fire font-tech">24h</div>
              <div className="text-xs md:text-sm text-muted-foreground">Entrega</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
