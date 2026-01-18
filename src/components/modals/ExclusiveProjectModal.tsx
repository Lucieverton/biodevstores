import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getWhatsAppUrl, validateWhatsApp } from '@/config/contact';
import { Crown, Send, User, Building2, Briefcase, Phone, Wallet } from 'lucide-react';

interface ExclusiveProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  company: string;
  industry: string;
  whatsapp: string;
  budget: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  industry?: string;
  whatsapp?: string;
  budget?: string;
}

const budgetOptions = [
  { value: '1000', label: 'R$ 1.000' },
  { value: '2000', label: 'R$ 2.000' },
  { value: '3000', label: 'R$ 3.000' },
  { value: '5000', label: 'Até R$ 5.000' },
  { value: '10000', label: 'Até R$ 10.000' },
];

export const ExclusiveProjectModal = ({ isOpen, onClose }: ExclusiveProjectModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    industry: '',
    whatsapp: '',
    budget: '',
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

    if (!formData.budget) {
      newErrors.budget = 'Selecione uma faixa de investimento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const selectedBudget = budgetOptions.find(b => b.value === formData.budget);

    const message = `Olá! Me chamo *${formData.name.trim()}* da empresa *${formData.company.trim()}*.

👑 *PROJETO EXCLUSIVO*
🏢 *Ramo:* ${formData.industry.trim()}
💰 *Orçamento:* ${selectedBudget?.label}
📱 *WhatsApp:* ${formData.whatsapp.trim()}

Gostaria de um orçamento para meu projeto exclusivo!`;

    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      company: '',
      industry: '',
      whatsapp: '',
      budget: '',
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
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="w-6 h-6 text-accent" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            <span className="text-gradient-gold">Projeto Exclusivo</span>
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Site profissional com domínio e hospedagem dedicados
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
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

            {/* Budget Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm">
                <Wallet className="w-4 h-4 text-muted-foreground" />
                Faixa de Investimento
              </Label>
              <RadioGroup
                value={formData.budget}
                onValueChange={(value) => handleChange('budget', value)}
                className="grid grid-cols-2 gap-2"
              >
                {budgetOptions.map((option) => (
                  <div key={option.value} className="relative">
                    <RadioGroupItem
                      value={option.value}
                      id={`budget-${option.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`budget-${option.value}`}
                      className="flex items-center justify-center p-3 rounded-lg border-2 border-border bg-background cursor-pointer transition-all hover:border-accent/50 peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 text-sm font-medium"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.budget && <p className="text-xs text-destructive">{errors.budget}</p>}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-gold hover:opacity-90 transition-opacity text-background font-semibold"
          >
            <Send className="w-4 h-4 mr-2" />
            Solicitar Orçamento
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
