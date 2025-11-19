import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Bio Link",
    price: "29,90",
    period: "único",
    features: [
      "Design profissional",
      "Links ilimitados",
      "Botão WhatsApp",
      "Redes sociais integradas",
      "Responsivo (mobile/desktop)",
      "Suporte por 30 dias",
    ],
    popular: false,
  },
  {
    name: "Site Completo",
    price: "299,90",
    period: "único",
    features: [
      "Tudo do plano Bio Link",
      "Até 5 páginas",
      "Formulário de contato",
      "Galeria de fotos",
      "SEO otimizado",
      "Google Analytics",
      "Suporte por 90 dias",
      "1 revisão grátis",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "599,90",
    period: "único",
    features: [
      "Tudo do plano Site Completo",
      "Páginas ilimitadas",
      "Blog/Notícias",
      "Integração com APIs",
      "Chat online",
      "Sistema de agendamento",
      "Suporte prioritário",
      "3 revisões grátis",
    ],
    popular: false,
  },
];

export const PricingSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="planos" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Planos que Cabem no Seu Bolso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Investimento único, resultado permanente. Escolha o plano ideal para o seu negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-8 border-2 transition-all hover:scale-105 ${
                plan.popular
                  ? "border-primary shadow-neon-cyan"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-neon text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">R$ {plan.price}</span>
                    <span className="text-muted-foreground">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToContact}
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-neon hover:shadow-glow"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  Contratar Agora
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
