import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { getWhatsAppUrl, validateWhatsApp } from '@/config/contact';
import { Send, User, Building2, Briefcase, Phone, CreditCard, Layout } from 'lucide-react';

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  templateCategory: string;
}

interface FormData {
  name: string;
  company: string;
  industry: string;
  whatsapp: string;
  paymentMethod: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  industry?: string;
  whatsapp?: string;
  paymentMethod?: string;
}

const paymentOptions = [
  // Pagamentos via PIX
  { value: 'pix-1ano', label: 'À Vista (1 ano)', description: '20% OFF', group: 'pix' },
  { value: 'pix-2anos', label: 'À Vista (2 anos)', description: '25% OFF', group: 'pix' },
  { value: 'pix-3anos', label: 'À Vista (3 anos)', description: '30% OFF', group: 'pix' },
  { value: 'hibrido', label: 'Híbrido (50% + 50%)', description: '50% início, 50% entrega', group: 'pix' },
  // Pagamentos via InfinitePlay
  { value: 'mensal', label: 'Assinatura Mensal', description: 'Recorrente', group: 'infiniteplay' },
  { value: 'parcelado', label: 'Parcelado em até 12x', description: 'Link de pagamento', group: 'infiniteplay' },
];

export const TemplateSelectionModal = ({ 
  isOpen, 
  onClose, 
  templateName, 
  templateCategory 
}: TemplateSelectionModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    industry: '',
    whatsapp: '',
    paymentMethod: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Nome deve ter no máximo 100 caracteres';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Empresa/Marca é obrigatória';
    } else if (formData.company.trim().length > 100) {
      newErrors.company = 'Empresa deve ter no máximo 100 caracteres';
    }
    
    if (!formData.industry.trim()) {
      newErrors.industry = 'Ramo é obrigatório';
    } else if (formData.industry.trim().length > 100) {
      newErrors.industry = 'Ramo deve ter no máximo 100 caracteres';
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    } else if (!validateWhatsApp(formData.whatsapp)) {
      newErrors.whatsapp = 'WhatsApp inválido';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Selecione uma forma de pagamento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const selectedPayment = paymentOptions.find(p => p.value === formData.paymentMethod);
    const paymentType = selectedPayment?.group === 'pix' ? 'Via PIX' : 'Via InfinitePlay';

    const message = `Olá! Me chamo *${formData.name.trim()}* da empresa *${formData.company.trim()}*.

📱 *TEMPLATE SELECIONADO:*
🎨 *Nome:* ${templateName}
📁 *Categoria:* ${templateCategory}

🏢 *Ramo:* ${formData.industry.trim()}

💳 *FORMA DE PAGAMENTO:*
📌 *Método:* ${selectedPayment?.label}
🏷️ *Tipo:* ${paymentType}

📱 *WhatsApp:* ${formData.whatsapp.trim()}

Quero contratar este template!`;

    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      company: '',
      industry: '',
      whatsapp: '',
      paymentMethod: '',
    });
    setErrors({});
    onClose();
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            <span className="text-gradient-purple">Escolher Template</span>
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Preencha seus dados para contratar este template
          </DialogDescription>
        </DialogHeader>

        {/* Selected Template Badge */}
        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20">
          <Layout className="w-5 h-5 text-primary" />
          <div className="text-center">
            <p className="font-semibold text-foreground">{templateName}</p>
            <Badge variant="secondary" className="text-xs mt-1">
              {templateCategory}
            </Badge>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                Nome Completo
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Seu nome completo"
                maxLength={100}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                Empresa/Marca
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Nome da sua empresa ou marca"
                maxLength={100}
                className={errors.company ? 'border-destructive' : ''}
              />
              {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry" className="flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                Ramo de Atuação
              </Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                placeholder="Ex: Gastronomia, Beleza, Saúde..."
                maxLength={100}
                className={errors.industry ? 'border-destructive' : ''}
              />
              {errors.industry && <p className="text-xs text-destructive">{errors.industry}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                placeholder="(00) 00000-0000"
                maxLength={15}
                className={errors.whatsapp ? 'border-destructive' : ''}
              />
              {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp}</p>}
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                Forma de Pagamento
              </Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => handleChange('paymentMethod', value)}
                className="space-y-3"
              >
                {/* PIX Options */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-emerald-400">📌 Pagamento via PIX</p>
                  <div className="space-y-2 pl-2">
                    {paymentOptions.filter(p => p.group === 'pix').map((option) => (
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
                  <p className="text-sm font-semibold text-primary">💳 Pagamento via InfinitePlay</p>
                  <div className="space-y-2 pl-2">
                    {paymentOptions.filter(p => p.group === 'infiniteplay').map((option) => (
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
              {errors.paymentMethod && <p className="text-xs text-destructive">{errors.paymentMethod}</p>}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-purple hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4 mr-2" />
            Contratar via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
