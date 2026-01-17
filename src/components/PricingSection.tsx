import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, CreditCard, Percent, Smartphone, Lock } from "lucide-react";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";

const plans = [
  {
    name: "Start",
    monthlyPrice: 35,
    color: "cyan",
    features: [
      "Links Ilimitados",
      "Design Otimizado",
      "Botão WhatsApp",
      "Foto + Bio",
      "Hospedagem Inclusa",
      "Suporte Humano",
    ],
    popular: false,
    tag: null,
  },
  {
    name: "Profissional",
    monthlyPrice: 60,
    color: "green",
    features: [
      "Tudo do Start +",
      "Vitrine de Produtos (Carrossel)",
      "FAQ Interativo",
      "V-Card Inteligente",
      "Pixel de Rastreamento",
      "2 Atualizações/mês",
    ],
    popular: true,
    tag: "RECOMENDADO",
  },
  {
    name: "Elite",
    monthlyPrice: 90,
    color: "purple",
    features: [
      "Tudo do Profissional +",
      "Design 100% Personalizado",
      "Domínio Próprio Grátis",
      "Seções Ilimitadas",
      "Prioridade Total",
      "Integrações CRM",
    ],
    popular: false,
    tag: "VIP",
  },
];

const paymentMethods = [
  {
    icon: CreditCard,
    title: "Assinatura Recorrente",
    description: "Cobrança mensal automática sem travar limite.",
  },
  {
    icon: Percent,
    title: "Desconto Anual",
    description: "20% OFF para garantir 1 ano de site.",
  },
  {
    icon: Smartphone,
    title: "Modelo Híbrido (Pix)",
    description: "Pague 50% no início e 50% na entrega.",
  },
];

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnual) {
      const annualPrice = monthlyPrice * 12 * 0.8; // 20% OFF
      const monthlyEquivalent = annualPrice / 12;
      return {
        display: `R$ ${monthlyEquivalent.toFixed(0)}`,
        period: "/mês",
        total: `R$ ${annualPrice.toFixed(0)}/ano`,
        priceString: `R$ ${annualPrice.toFixed(0)}/ano`,
      };
    }
    return {
      display: `R$ ${monthlyPrice}`,
      period: "/mês",
      total: null,
      priceString: `R$ ${monthlyPrice}/mês`,
    };
  };

  const handleContractClick = (planName: string, monthlyPrice: number) => {
    const priceInfo = calculatePrice(monthlyPrice);
    setSelectedPlan({
      name: planName,
      price: priceInfo.priceString,
    });
    setIsModalOpen(true);
  };

  const getCardStyles = (color: string, isPopular: boolean, tag: string | null) => {
    const baseStyles = "relative bg-card rounded-2xl p-6 lg:p-8 border-2 transition-all duration-300 hover:scale-105 hover:-translate-y-2";
    
    if (color === "cyan") {
      return `${baseStyles} border-primary/50 hover:border-primary hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]`;
    }
    if (color === "green") {
      return `${baseStyles} border-secondary glow-green hover:shadow-[0_0_40px_rgba(0,255,136,0.4)]`;
    }
    if (color === "purple") {
      return `${baseStyles} border-accent glow-purple hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]`;
    }
    return `${baseStyles} border-border hover:border-primary/50`;
  };

  const getButtonStyles = (color: string) => {
    if (color === "cyan") {
      return "bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]";
    }
    if (color === "green") {
      return "bg-secondary hover:bg-secondary/90 hover:shadow-[0_0_20px_rgba(0,255,136,0.5)]";
    }
    if (color === "purple") {
      return "bg-accent hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]";
    }
    return "bg-primary hover:bg-primary/90";
  };

  const getTagStyles = (tag: string | null) => {
    if (tag === "VIP") {
      return "bg-gradient-purple text-white";
    }
    if (tag === "RECOMENDADO") {
      return "bg-gradient-to-r from-secondary to-emerald-400 text-primary-foreground";
    }
    return "";
  };

  const getCheckColor = (color: string) => {
    if (color === "cyan") return "text-primary";
    if (color === "green") return "text-secondary";
    if (color === "purple") return "text-accent";
    return "text-secondary";
  };

  return (
    <section id="planos" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-sm font-tech text-primary uppercase tracking-wider">
            Planos & Preços
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Planos que Cabem no Seu Bolso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Investimento acessível, resultado profissional. Escolha o plano ideal para o seu negócio.
          </p>
        </div>

        {/* Toggle Mensal/Anual */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-primary" : "text-muted-foreground"}`}>
            Mensal
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-secondary"
          />
          <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-secondary" : "text-muted-foreground"}`}>
            Anual
            <span className="ml-2 px-2 py-0.5 bg-secondary/20 text-secondary text-xs rounded-full font-bold">
              20% OFF
            </span>
          </span>
        </div>

        {/* Cards de Preços */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => {
            const priceInfo = calculatePrice(plan.monthlyPrice);

            return (
              <div
                key={plan.name}
                className={getCardStyles(plan.color, plan.popular, plan.tag)}
              >
                {/* Tags */}
                {plan.tag && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${getTagStyles(plan.tag)}`}
                  >
                    {plan.tag}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 font-tech">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gradient">
                        {priceInfo.display}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {priceInfo.period}
                      </span>
                    </div>

                    {/* Annual info */}
                    {isAnnual && priceInfo.total && (
                      <div className="mt-2 p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                        <p className="text-sm text-secondary font-semibold">
                          Total: {priceInfo.total}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Economia de R$ {(plan.monthlyPrice * 12 * 0.2).toFixed(0)}
                        </p>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${getCheckColor(plan.color)}`} />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleContractClick(plan.name, plan.monthlyPrice)}
                    className={`w-full h-12 font-semibold transition-all duration-300 ${getButtonStyles(plan.color)}`}
                  >
                    Contratar {plan.name}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Seção de Métodos de Pagamento */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 rounded-2xl p-8 border border-border">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Lock className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-center font-tech">
                Contratação Segura via InfinitePlay
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {paymentMethods.map((method, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{method.title}</h4>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedPlan && (
        <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          isAnnual={isAnnual}
        />
      )}
    </section>
  );
};
