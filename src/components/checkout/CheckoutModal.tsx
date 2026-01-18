import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, MessageCircle, Smartphone, Percent, CreditCard, User, Building, Briefcase, Phone, Tag, Receipt, Sparkles } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/config/contact";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  monthlyPrice: number;
  isAnnual: boolean;
}

interface PaymentCalculation {
  total: number;
  displayValue: string;
  originalValue: number;
  savings: number;
  savingsPercent: number;
  description: string;
}

const calculatePaymentValue = (monthlyPrice: number, paymentMethod: string): PaymentCalculation => {
  const yearlyBase = monthlyPrice * 12;

  switch (paymentMethod) {
    case 'pix-1ano': {
      const total = yearlyBase * 0.8;
      return {
        total,
        displayValue: `R$ ${total.toFixed(0)}`,
        originalValue: yearlyBase,
        savings: yearlyBase - total,
        savingsPercent: 20,
        description: 'Pagamento único à vista'
      };
    }
    case 'pix-2anos': {
      const base = monthlyPrice * 24;
      const total = base * 0.75;
      return {
        total,
        displayValue: `R$ ${total.toFixed(0)}`,
        originalValue: base,
        savings: base - total,
        savingsPercent: 25,
        description: 'Pagamento único à vista (2 anos)'
      };
    }
    case 'pix-3anos': {
      const base = monthlyPrice * 36;
      const total = base * 0.7;
      return {
        total,
        displayValue: `R$ ${total.toFixed(0)}`,
        originalValue: base,
        savings: base - total,
        savingsPercent: 30,
        description: 'Pagamento único à vista (3 anos)'
      };
    }
    case 'hibrido': {
      const total = yearlyBase;
      const half = total / 2;
      return {
        total,
        displayValue: `R$ ${half.toFixed(0)} + R$ ${half.toFixed(0)}`,
        originalValue: yearlyBase,
        savings: 0,
        savingsPercent: 0,
        description: '50% agora + 50% na entrega'
      };
    }
    case 'mensal': {
      return {
        total: monthlyPrice,
        displayValue: `R$ ${monthlyPrice}/mês`,
        originalValue: monthlyPrice,
        savings: 0,
        savingsPercent: 0,
        description: 'Cobrança mensal recorrente'
      };
    }
    case 'parcelado': {
      const total = yearlyBase;
      return {
        total,
        displayValue: `12x R$ ${monthlyPrice.toFixed(0)}`,
        originalValue: yearlyBase,
        savings: 0,
        savingsPercent: 0,
        description: `Total: R$ ${total.toFixed(0)}`
      };
    }
    default:
      return {
        total: monthlyPrice,
        displayValue: `R$ ${monthlyPrice}`,
        originalValue: monthlyPrice,
        savings: 0,
        savingsPercent: 0,
        description: ''
      };
  }
};

const paymentOptions = [
  // Via PIX
  {
    value: 'pix-1ano',
    icon: Smartphone,
    title: 'À Vista (1 Ano)',
    subtitle: 'Pagamento único via PIX',
    discount: 20,
    group: 'pix'
  },
  {
    value: 'pix-2anos',
    icon: Smartphone,
    title: 'À Vista (2 Anos)',
    subtitle: 'Pagamento único via PIX',
    discount: 25,
    group: 'pix'
  },
  {
    value: 'pix-3anos',
    icon: Smartphone,
    title: 'À Vista (3 Anos)',
    subtitle: 'Pagamento único via PIX',
    discount: 30,
    group: 'pix'
  },
  {
    value: 'hibrido',
    icon: Percent,
    title: 'Híbrido',
    subtitle: '50% início + 50% entrega',
    discount: 0,
    group: 'pix'
  },
  // Via InfinitePlay
  {
    value: 'mensal',
    icon: CreditCard,
    title: 'Assinatura Mensal',
    subtitle: 'Cobrança recorrente automática',
    discount: 0,
    group: 'infiniteplay'
  },
  {
    value: 'parcelado',
    icon: CreditCard,
    title: 'Parcelado 12x',
    subtitle: 'Link de pagamento no cartão',
    discount: 0,
    group: 'infiniteplay'
  },
];

export const CheckoutModal = ({
  isOpen,
  onClose,
  planName,
  monthlyPrice,
  isAnnual,
}: CheckoutModalProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    ramo: "",
    whatsapp: "",
    paymentMethod: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedPaymentOption = useMemo(() => 
    paymentOptions.find(p => p.value === formData.paymentMethod),
    [formData.paymentMethod]
  );

  const paymentCalculation = useMemo(() => 
    formData.paymentMethod ? calculatePaymentValue(monthlyPrice, formData.paymentMethod) : null,
    [monthlyPrice, formData.paymentMethod]
  );

  const pixOptions = paymentOptions.filter(p => p.group === 'pix');
  const infiniteplayOptions = paymentOptions.filter(p => p.group === 'infiniteplay');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    } else if (formData.nome.trim().length > 100) {
      newErrors.nome = "Nome deve ter no máximo 100 caracteres";
    }
    if (!formData.empresa.trim()) {
      newErrors.empresa = "Nome da empresa é obrigatório";
    } else if (formData.empresa.trim().length > 100) {
      newErrors.empresa = "Empresa deve ter no máximo 100 caracteres";
    }
    if (!formData.ramo.trim()) {
      newErrors.ramo = "Ramo de atuação é obrigatório";
    } else if (formData.ramo.trim().length > 100) {
      newErrors.ramo = "Ramo deve ter no máximo 100 caracteres";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (formData.whatsapp.replace(/\D/g, "").length < 10) {
      newErrors.whatsapp = "WhatsApp inválido";
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Selecione uma forma de pagamento";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm() || !paymentCalculation || !selectedPaymentOption) return;

    const paymentType = selectedPaymentOption.group === 'pix' ? 'Via PIX' : 'Via InfinitePlay';
    
    const message = encodeURIComponent(
      `Olá! Me chamo *${formData.nome.trim()}* da empresa *${formData.empresa.trim()}*.

📋 *RESUMO DO PEDIDO:*
🎯 *Plano:* ${planName}
💳 *Pagamento:* ${selectedPaymentOption.title}
🏷️ *Método:* ${paymentType}

💰 *VALORES:*
${paymentCalculation.savings > 0 ? `📊 *Original:* R$ ${paymentCalculation.originalValue.toFixed(0)}\n✨ *Desconto:* ${paymentCalculation.savingsPercent}% (-R$ ${paymentCalculation.savings.toFixed(0)})\n` : ''}💵 *Total:* ${paymentCalculation.displayValue}
📝 ${paymentCalculation.description}

🏢 *Ramo:* ${formData.ramo.trim()}
📱 *WhatsApp:* ${formData.whatsapp.trim()}

Quero finalizar a contratação!`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    
    setFormData({ nome: "", empresa: "", ramo: "", whatsapp: "", paymentMethod: "" });
    setErrors({});
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleWhatsAppChange = (value: string) => {
    const formatted = formatWhatsApp(value);
    handleChange("whatsapp", formatted);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-2 border-primary/50 max-w-lg mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient font-tech flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Contratar Plano {planName}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha seus dados e escolha a forma de pagamento.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Dados do Cliente */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Seus Dados
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="nome" className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="w-3 h-3" /> Nome Completo *
                </Label>
                <Input
                  id="nome"
                  placeholder="João Silva"
                  value={formData.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  maxLength={100}
                  className={`bg-background border-border focus:border-primary h-10 ${errors.nome ? "border-red-500" : ""}`}
                />
                {errors.nome && <span className="text-red-500 text-xs">{errors.nome}</span>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="empresa" className="text-xs text-muted-foreground flex items-center gap-1">
                  <Building className="w-3 h-3" /> Empresa/Marca *
                </Label>
                <Input
                  id="empresa"
                  placeholder="Minha Empresa"
                  value={formData.empresa}
                  onChange={(e) => handleChange("empresa", e.target.value)}
                  maxLength={100}
                  className={`bg-background border-border focus:border-primary h-10 ${errors.empresa ? "border-red-500" : ""}`}
                />
                {errors.empresa && <span className="text-red-500 text-xs">{errors.empresa}</span>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ramo" className="text-xs text-muted-foreground flex items-center gap-1">
                  <Briefcase className="w-3 h-3" /> Ramo de Atuação *
                </Label>
                <Input
                  id="ramo"
                  placeholder="Ex: Advogado, Delivery"
                  value={formData.ramo}
                  onChange={(e) => handleChange("ramo", e.target.value)}
                  maxLength={100}
                  className={`bg-background border-border focus:border-primary h-10 ${errors.ramo ? "border-red-500" : ""}`}
                />
                {errors.ramo && <span className="text-red-500 text-xs">{errors.ramo}</span>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="whatsapp" className="text-xs text-muted-foreground flex items-center gap-1">
                  <Phone className="w-3 h-3" /> WhatsApp *
                </Label>
                <Input
                  id="whatsapp"
                  placeholder="(82) 99999-9999"
                  value={formData.whatsapp}
                  onChange={(e) => handleWhatsAppChange(e.target.value)}
                  maxLength={16}
                  className={`bg-background border-border focus:border-primary h-10 ${errors.whatsapp ? "border-red-500" : ""}`}
                />
                {errors.whatsapp && <span className="text-red-500 text-xs">{errors.whatsapp}</span>}
              </div>
            </div>
          </div>

          {/* Formas de Pagamento */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Forma de Pagamento
            </h3>

            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => handleChange("paymentMethod", value)}
              className="space-y-4"
            >
              {/* PIX Options */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-emerald-400 flex items-center gap-2 px-1">
                  <Smartphone className="w-3 h-3" /> VIA PIX
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {pixOptions.map((option) => {
                    const calc = calculatePaymentValue(monthlyPrice, option.value);
                    return (
                      <div key={option.value} className="relative">
                        <RadioGroupItem
                          value={option.value}
                          id={`payment-${option.value}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`payment-${option.value}`}
                          className="flex flex-col p-3 rounded-xl border-2 border-border bg-background cursor-pointer transition-all hover:border-emerald-500/50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500/10 h-full"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <option.icon className="w-4 h-4 text-emerald-400" />
                            {option.discount > 0 && (
                              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
                                {option.discount}% OFF
                              </span>
                            )}
                          </div>
                          <span className="font-semibold text-sm text-foreground">{option.title}</span>
                          <span className="text-[10px] text-muted-foreground mb-2">{option.subtitle}</span>
                          <div className="mt-auto pt-2 border-t border-border/50">
                            <span className="text-base font-bold text-emerald-400">{calc.displayValue}</span>
                            {calc.savings > 0 && (
                              <p className="text-[10px] text-muted-foreground">
                                Economia: R$ {calc.savings.toFixed(0)}
                              </p>
                            )}
                          </div>
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* InfinitePlay Options */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-primary flex items-center gap-2 px-1">
                  <CreditCard className="w-3 h-3" /> VIA INFINITEPLAY
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {infiniteplayOptions.map((option) => {
                    const calc = calculatePaymentValue(monthlyPrice, option.value);
                    return (
                      <div key={option.value} className="relative">
                        <RadioGroupItem
                          value={option.value}
                          id={`payment-${option.value}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`payment-${option.value}`}
                          className="flex flex-col p-3 rounded-xl border-2 border-border bg-background cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 h-full"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <option.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-semibold text-sm text-foreground">{option.title}</span>
                          <span className="text-[10px] text-muted-foreground mb-2">{option.subtitle}</span>
                          <div className="mt-auto pt-2 border-t border-border/50">
                            <span className="text-base font-bold text-primary">{calc.displayValue}</span>
                            <p className="text-[10px] text-muted-foreground">{calc.description}</p>
                          </div>
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </RadioGroup>
            
            {errors.paymentMethod && (
              <span className="text-red-500 text-xs">{errors.paymentMethod}</span>
            )}
          </div>

          {/* Order Summary */}
          {paymentCalculation && selectedPaymentOption && (
            <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Receipt className="w-4 h-4 text-primary" />
                Resumo do Pedido
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plano</span>
                  <span className="font-medium">{planName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pagamento</span>
                  <span className="font-medium">{selectedPaymentOption.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Método</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    selectedPaymentOption.group === 'pix' 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {selectedPaymentOption.group === 'pix' ? 'Via PIX' : 'Via InfinitePlay'}
                  </span>
                </div>
                
                {paymentCalculation.savings > 0 && (
                  <>
                    <div className="border-t border-border/50 pt-2 mt-2" />
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Valor Original</span>
                      <span className="line-through">R$ {paymentCalculation.originalValue.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-400">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" /> Desconto {paymentCalculation.savingsPercent}%
                      </span>
                      <span>-R$ {paymentCalculation.savings.toFixed(0)}</span>
                    </div>
                  </>
                )}
                
                <div className="border-t border-primary/30 pt-2 mt-2" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-gradient">{paymentCalculation.displayValue}</span>
                </div>
                
                {paymentCalculation.savings > 0 && (
                  <div className="flex items-center justify-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 rounded-lg py-1.5">
                    <Sparkles className="w-3 h-3" />
                    Você economiza R$ {paymentCalculation.savings.toFixed(0)}!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full h-12 bg-gradient-neon hover:shadow-glow-intense font-semibold text-base flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Ir para Pagamento Seguro
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            🔒 Seus dados estão seguros e serão usados apenas para contato.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
