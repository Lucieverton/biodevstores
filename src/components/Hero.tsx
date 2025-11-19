import { Button } from "@/components/ui/button";

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
      className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-neon bg-clip-text text-transparent leading-tight">
              Sua Bio, Agora Profissional
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Chega de links genéricos. Transforme sua bio em um{" "}
              <span className="text-primary font-semibold">mini-site estratégico</span>{" "}
              que converte visitantes em clientes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-200">
            <Button
              size="lg"
              onClick={() => scrollToSection("templates")}
              className="bg-gradient-neon hover:shadow-glow transition-all text-lg px-8"
            >
              Ver Templates
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("planos")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all text-lg px-8"
            >
              Ver Planos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 animate-fade-in delay-400">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Clientes Ativos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-secondary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfação</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">24h</div>
              <div className="text-sm text-muted-foreground">Entrega</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
