import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Check, CreditCard, Percent, Smartphone, Lock, Globe, Link2 } from "lucide-react";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import sectionBg from "@/assets/section-bg.png";
const plans = [
  {
    name: "Start",
    monthlyPrice: 35,
    color: "cyan",
    features: [
      "Até 5 Links na Bio",
      "3 Itens no Carrossel",
      "3 FAQs Interativos",
      "5 Imagens (3 Vitrine + Logo + Perfil)",
      "Design Personalizado",
      "Botão WhatsApp",
      "Bio Profissional",
      "1 Atualização/mês",
      "Suporte via WhatsApp",
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
      "Até 10 Links na Bio",
      "6 Itens no Carrossel",
      "6 FAQs Interativos",
      "12 Imagens (10 Vitrine + Logo + Perfil)",
      "Design Premium",
      "V-Card Inteligente",
      "Pixel de Rastreamento",
      "2 Atualizações/mês",
      "Suporte Prioritário",
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
      "Links Ilimitados",
      "Carrossel Ilimitado",
      "10 FAQs Interativos",
      "22 Imagens (20 Vitrine + Logo + Perfil)",
      "Design 100% Exclusivo",
      "Seções Ilimitadas",
      "Atualizações Ilimitadas",
      "Integrações CRM",
      "Suporte VIP 24h",
    ],
    popular: false,
    tag: "VIP",
  },
];

const paymentMethods = [
  {
    icon: Smartphone,
    title: "À Vista (PIX)",
    description: "Pague o valor total de 1, 2 ou 3 anos com desconto especial.",
    badge: "Via PIX",
    badgeColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    icon: Percent,
    title: "Modelo Híbrido",
    description: "50% no início + 50% na entrega do projeto.",
    badge: "Via PIX",
    badgeColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    icon: CreditCard,
    title: "Parcelamento 12x",
    description: "Link de pagamento com parcelamento no cartão.",
    badge: "Via InfinitePlay",
    badgeColor: "bg-primary/20 text-primary",
  },
  {
    icon: CreditCard,
    title: "Assinatura Recorrente",
    description: "Cobrança mensal automática sem travar limite.",
    badge: "Via InfinitePlay",
    badgeColor: "bg-primary/20 text-primary",
  },
];

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    monthlyPrice: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandName, setBrandName] = useState("");

  const formatBrandName = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 20);
  };

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
    setSelectedPlan({
      name: planName,
      monthlyPrice: monthlyPrice,
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
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sectionBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />

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

        {/* Simulador de Link */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-card/80 rounded-2xl p-8 border border-primary/30 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold font-tech text-foreground">
                  Seu Link Exclusivo
                </h3>
                <p className="text-sm text-muted-foreground">
                  Todos os planos incluem hospedagem gratuita
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Digite o nome da sua marca..."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  maxLength={20}
                  className="h-14 text-lg bg-background/50 border-border focus:border-primary pl-12"
                />
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>

              <div className="bg-background/80 rounded-xl p-4 border border-border overflow-hidden">
                <p className="text-xs text-muted-foreground mb-2 text-center">
                  Seu link ficará assim:
                </p>
                <div className="flex items-center justify-center gap-0.5 text-xs sm:text-sm md:text-base font-mono flex-wrap max-w-full">
                  <span className="text-primary font-bold break-all">
                    {formatBrandName(brandName) || "suamarca"}
                  </span>
                  <span className="text-muted-foreground break-all">.devstores.com.br</span>
                </div>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                💡 Dica: Use o nome do seu negócio ou Instagram para facilitar a divulgação
              </p>
            </div>
          </div>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {paymentMethods.map((method, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-colors"
                >
                  <span className={`text-xs font-bold px-2 py-1 rounded-full mb-3 ${method.badgeColor}`}>
                    {method.badge}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
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
          monthlyPrice={selectedPlan.monthlyPrice}
          isAnnual={isAnnual}
        />
      )}
    </section>
  );
};
