import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Bio DevStores",
    price: "35",
    period: "mês",
    anualPrice: "360",
    anualEquivalent: "30",
    dailyCost: "1,00",
    savings: "60",
    features: [
      "Design moderno",
      "Logo principal",
      "3 itens na vitrine em destaque",
      "Até 5 links/seções",
      "3 FAQs interativos",
      "Suporte via WhatsApp",
    ],
    popular: false,
  },
  {
    name: "Bio DevStores PRO",
    price: "60",
    period: "mês",
    anualPrice: "600",
    anualEquivalent: "50",
    dailyCost: "1,65",
    savings: "120",
    features: [
      "Tudo do plano básico +",
      "Até 8 links/seções",
      "6 imagens na vitrine",
      "5 FAQs interativos",
      "Suporte prioritário",
    ],
    popular: true,
  },
  {
    name: "Bio DevStores ULTRA",
    price: "90",
    period: "mês via Pix",
    anualPrice: "960",
    anualEquivalent: "80",
    dailyCost: "2,63",
    savings: "120",
    features: [
      "Tudo do plano PRO +",
      "Links/seções ilimitados",
      "Até 10 imagens na vitrine",
      "FAQs ilimitados",
      "Design 100% personalizado",
      "Integração com ferramentas externas",
      "Suporte VIP",
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
                    <span className="text-muted-foreground text-sm">/ {plan.period}</span>
                  </div>
                  
                  <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="text-xs text-accent font-semibold mb-2">
                      ECONOMIZE R$ {plan.savings}!
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      R$ {plan.anualPrice}/ano
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Equivale a R$ {plan.anualEquivalent}/mês
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Apenas R$ {plan.dailyCost} por dia!
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
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
