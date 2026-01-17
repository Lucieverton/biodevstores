import { Button } from "@/components/ui/button";
import { Check, Gift } from "lucide-react";

const plans = [
  {
    name: "Start",
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
    tag: null,
  },
  {
    name: "Profissional",
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
    tag: "RECOMENDADO",
  },
  {
    name: "Elite",
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
    tag: "VIP",
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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center space-y-4 mb-16">
          <span className="text-sm font-tech text-primary uppercase tracking-wider">
            Planos & Preços
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Planos que Cabem no Seu Bolso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Investimento único, resultado permanente. Escolha o plano ideal para o seu negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-6 lg:p-8 border-2 transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                plan.popular
                  ? "border-primary glow-cyan"
                  : plan.tag === "VIP"
                  ? "border-accent glow-purple"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {/* Tags */}
              {plan.tag && (
                <div 
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                    plan.tag === "VIP" 
                      ? "bg-gradient-purple text-white" 
                      : "bg-gradient-neon text-primary-foreground"
                  }`}
                >
                  {plan.tag}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 font-tech">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gradient">R$ {plan.price}</span>
                    <span className="text-muted-foreground text-sm">/ {plan.period}</span>
                  </div>
                  
                  {/* Annual Promotion */}
                  <div className="mt-4 p-4 bg-accent/5 rounded-xl border border-accent/20">
                    <div className="flex items-center gap-2 text-accent font-semibold text-sm mb-2">
                      <Gift className="w-4 h-4" />
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
                  className={`w-full h-12 font-semibold ${
                    plan.popular
                      ? "bg-gradient-neon hover:shadow-glow-intense glow-cyan"
                      : plan.tag === "VIP"
                      ? "bg-gradient-purple hover:shadow-neon-purple"
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
