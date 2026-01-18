import { useState } from "react";
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
import { Lock, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/config/contact";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  isAnnual: boolean;
}

const paymentOptions = [
  // Pagamentos via PIX
  { 
    value: 'pix-1ano', 
    label: 'À Vista (1 ano)', 
    description: '20% OFF', 
    group: 'pix',
    groupLabel: '📌 Pagamento via PIX'
  },
  { 
    value: 'pix-2anos', 
    label: 'À Vista (2 anos)', 
    description: '25% OFF', 
    group: 'pix',
    groupLabel: '📌 Pagamento via PIX'
  },
  { 
    value: 'pix-3anos', 
    label: 'À Vista (3 anos)', 
    description: '30% OFF', 
    group: 'pix',
    groupLabel: '📌 Pagamento via PIX'
  },
  { 
    value: 'hibrido', 
    label: 'Híbrido (50% + 50%)', 
    description: '50% início, 50% entrega', 
    group: 'pix',
    groupLabel: '📌 Pagamento via PIX'
  },
  // Pagamentos via InfinitePlay
  { 
    value: 'mensal', 
    label: 'Assinatura Mensal', 
    description: 'Recorrente', 
    group: 'infiniteplay',
    groupLabel: '💳 Pagamento via InfinitePlay'
  },
  { 
    value: 'parcelado', 
    label: 'Parcelado em até 12x', 
    description: 'Link de pagamento', 
    group: 'infiniteplay',
    groupLabel: '💳 Pagamento via InfinitePlay'
  },
];

export const CheckoutModal = ({
  isOpen,
  onClose,
  planName,
  planPrice,
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
    if (!validateForm()) return;

    const selectedPayment = paymentOptions.find(p => p.value === formData.paymentMethod);
    const paymentType = selectedPayment?.group === 'pix' ? 'Via PIX' : 'Via InfinitePlay';
    const periodo = isAnnual ? "Anual" : "Mensal";
    
    const message = encodeURIComponent(
      `Olá! Me chamo *${formData.nome.trim()}* da empresa *${formData.empresa.trim()}*.

📋 *PLANO SELECIONADO:*
🎯 *Plano:* ${planName}
📅 *Período:* ${periodo}
💰 *Valor Base:* ${planPrice}

💳 *FORMA DE PAGAMENTO:*
📌 *Método:* ${selectedPayment?.label}
🏷️ *Tipo:* ${paymentType}

🏢 *Ramo:* ${formData.ramo.trim()}
📱 *WhatsApp:* ${formData.whatsapp.trim()}

Quero finalizar a contratação!`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    
    // Reset form and close modal
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

  // Group payment options
  const pixOptions = paymentOptions.filter(p => p.group === 'pix');
  const infiniteplayOptions = paymentOptions.filter(p => p.group === 'infiniteplay');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-2 border-primary/50 max-w-md mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient font-tech flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Contratar Plano {planName}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha seus dados para prosseguir com a contratação segura.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Nome Completo */}
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-foreground">
              Nome Completo *
            </Label>
            <Input
              id="nome"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              maxLength={100}
              className={`bg-background border-border focus:border-primary ${
                errors.nome ? "border-red-500" : ""
              }`}
            />
            {errors.nome && (
              <span className="text-red-500 text-xs">{errors.nome}</span>
            )}
          </div>

          {/* Nome da Empresa */}
          <div className="space-y-2">
            <Label htmlFor="empresa" className="text-foreground">
              Nome da Empresa/Marca *
            </Label>
            <Input
              id="empresa"
              placeholder="Para a logo do seu site"
              value={formData.empresa}
              onChange={(e) => handleChange("empresa", e.target.value)}
              maxLength={100}
              className={`bg-background border-border focus:border-primary ${
                errors.empresa ? "border-red-500" : ""
              }`}
            />
            {errors.empresa && (
              <span className="text-red-500 text-xs">{errors.empresa}</span>
            )}
          </div>

          {/* Ramo de Atuação */}
          <div className="space-y-2">
            <Label htmlFor="ramo" className="text-foreground">
              Ramo de Atuação *
            </Label>
            <Input
              id="ramo"
              placeholder="Ex: Advogado, Delivery, Influencer"
              value={formData.ramo}
              onChange={(e) => handleChange("ramo", e.target.value)}
              maxLength={100}
              className={`bg-background border-border focus:border-primary ${
                errors.ramo ? "border-red-500" : ""
              }`}
            />
            {errors.ramo && (
              <span className="text-red-500 text-xs">{errors.ramo}</span>
            )}
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-foreground">
              WhatsApp com DDD *
            </Label>
            <Input
              id="whatsapp"
              placeholder="(11) 99999-9999"
              value={formData.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className={`bg-background border-border focus:border-primary ${
                errors.whatsapp ? "border-red-500" : ""
              }`}
            />
            {errors.whatsapp && (
              <span className="text-red-500 text-xs">{errors.whatsapp}</span>
            )}
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label className="text-foreground font-semibold">
              💳 Forma de Pagamento *
            </Label>
            
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => handleChange("paymentMethod", value)}
              className="space-y-3"
            >
              {/* PIX Options */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                  📌 Pagamento via PIX
                </p>
                <div className="space-y-2 pl-2">
                  {pixOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={`payment-${option.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`payment-${option.value}`}
                        className="flex items-center justify-between p-3 rounded-lg border-2 border-border bg-background cursor-pointer transition-all hover:border-emerald-500/50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500/10"
                      >
                        <span className="font-medium text-sm">{option.label}</span>
                        <span className="text-xs text-emerald-400 font-semibold">{option.description}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* InfinitePlay Options */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary flex items-center gap-2">
                  💳 Pagamento via InfinitePlay
                </p>
                <div className="space-y-2 pl-2">
                  {infiniteplayOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={`payment-${option.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`payment-${option.value}`}
                        className="flex items-center justify-between p-3 rounded-lg border-2 border-border bg-background cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        <span className="font-medium text-sm">{option.label}</span>
                        <span className="text-xs text-primary font-semibold">{option.description}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </RadioGroup>
            
            {errors.paymentMethod && (
              <span className="text-red-500 text-xs">{errors.paymentMethod}</span>
            )}
          </div>

          {/* Price Display */}
          <div className="p-4 bg-primary/10 rounded-xl border border-primary/30 text-center">
            <p className="text-sm text-muted-foreground">Valor base selecionado:</p>
            <p className="text-2xl font-bold text-gradient">{planPrice}</p>
            <p className="text-xs text-muted-foreground">
              {isAnnual ? "Pagamento anual com 20% OFF" : "Pagamento mensal"}
            </p>
          </div>

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