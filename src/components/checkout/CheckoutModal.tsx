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
import { Lock, MessageCircle } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  isAnnual: boolean;
}

const WHATSAPP_NUMBER = "5511999999999"; // Substitua pelo número real

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
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }
    if (!formData.empresa.trim()) {
      newErrors.empresa = "Nome da empresa é obrigatório";
    }
    if (!formData.ramo.trim()) {
      newErrors.ramo = "Ramo de atuação é obrigatório";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (formData.whatsapp.replace(/\D/g, "").length < 10) {
      newErrors.whatsapp = "WhatsApp inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const periodo = isAnnual ? "Anual" : "Mensal";
    const message = encodeURIComponent(
      `Olá! Me chamo ${formData.nome.trim()} da empresa ${formData.empresa.trim()} (Ramo: ${formData.ramo.trim()}). Quero contratar o Plano ${planName} (${periodo} - ${planPrice}) e finalizar o pagamento.`
    );

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    
    // Reset form and close modal
    setFormData({ nome: "", empresa: "", ramo: "", whatsapp: "" });
    setErrors({});
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-2 border-primary/50 max-w-md mx-4 sm:mx-auto">
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

          {/* Price Display */}
          <div className="p-4 bg-primary/10 rounded-xl border border-primary/30 text-center">
            <p className="text-sm text-muted-foreground">Valor selecionado:</p>
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
