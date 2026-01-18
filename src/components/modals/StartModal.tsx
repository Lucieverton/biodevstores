import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getWhatsAppUrl, validateWhatsApp } from '@/config/contact';
import { Link2, Globe, Send, User, Building2, Briefcase, Phone, CreditCard, Banknote, Calendar, Percent, Check, Sparkles, Star, Crown } from 'lucide-react';

interface StartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  projectType: 'link-bio' | 'site-profissional';
  plan: string;
  paymentMethod: string;
  budget: string;
  name: string;
  company: string;
  industry: string;
  whatsapp: string;
}

const plans = [
  { 
    id: 'start', 
    name: 'Start', 
    price: 35, 
    icon: Sparkles,
    features: ['3 itens no carrossel', 'Design personalizado', 'Suporte básico']
  },
  { 
    id: 'profissional', 
    name: 'Profissional', 
    price: 60, 
    icon: Star,
    features: ['6 itens no carrossel', 'Design premium', 'Suporte prioritário'],
    recommended: true
  },
  { 
    id: 'elite', 
    name: 'Elite', 
    price: 90, 
    icon: Crown,
    features: ['Itens ilimitados', 'Design VIP', 'Suporte 24/7']
  }
];

const paymentOptions = [
  { 
    group: 'PIX',
    options: [
      { value: 'pix-1ano', label: 'À Vista 1 Ano', discount: 20, description: 'Pague uma vez, use por 12 meses' },
      { value: 'pix-2anos', label: 'À Vista 2 Anos', discount: 30, description: 'Maior economia a longo prazo' },
      { value: 'pix-3anos', label: 'À Vista 3 Anos', discount: 40, description: 'Melhor custo-benefício' },
      { value: 'hibrido', label: 'Híbrido 50/50', discount: 10, description: '50% agora + 50% em 30 dias' },
    ]
  },
  {
    group: 'InfinitePlay',
    options: [
      { value: 'mensal', label: 'Mensal', discount: 0, description: 'Cancele quando quiser' },
      { value: 'parcelado', label: 'Parcelado 12x', discount: 0, description: 'No cartão de crédito' },
    ]
  }
];

const budgetOptions = [
  { value: '1000', label: 'R$ 1.000' },
  { value: '2000', label: 'R$ 2.000' },
  { value: '3000', label: 'R$ 3.000' },
  { value: '5000', label: 'Até R$ 5.000' },
  { value: '10000', label: 'Até R$ 10.000' },
];

interface FormErrors {
  name?: string;
  company?: string;
  industry?: string;
  whatsapp?: string;
  plan?: string;
  paymentMethod?: string;
  budget?: string;
}

const calculatePayment = (monthlyPrice: number, paymentMethod: string) => {
  switch (paymentMethod) {
    case 'pix-1ano':
      const yearly = monthlyPrice * 12;
      const yearlyWithDiscount = yearly * 0.8;
      return { total: yearlyWithDiscount, original: yearly, savings: yearly - yearlyWithDiscount, period: '1 ano' };
    case 'pix-2anos':
      const twoYears = monthlyPrice * 24;
      const twoYearsDiscount = twoYears * 0.7;
      return { total: twoYearsDiscount, original: twoYears, savings: twoYears - twoYearsDiscount, period: '2 anos' };
    case 'pix-3anos':
      const threeYears = monthlyPrice * 36;
      const threeYearsDiscount = threeYears * 0.6;
      return { total: threeYearsDiscount, original: threeYears, savings: threeYears - threeYearsDiscount, period: '3 anos' };
    case 'hibrido':
      const hybridTotal = monthlyPrice * 12 * 0.9;
      return { total: hybridTotal, original: monthlyPrice * 12, savings: monthlyPrice * 12 - hybridTotal, period: '1 ano', isHybrid: true };
    case 'mensal':
      return { total: monthlyPrice, original: monthlyPrice, savings: 0, period: 'mês' };
    case 'parcelado':
      return { total: monthlyPrice * 12, original: monthlyPrice * 12, savings: 0, period: '12x', installment: monthlyPrice };
    default:
      return { total: 0, original: 0, savings: 0, period: '' };
  }
};

export const StartModal = ({ isOpen, onClose }: StartModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    projectType: 'link-bio',
    plan: '',
    paymentMethod: '',
    budget: '',
    name: '',
    company: '',
    industry: '',
    whatsapp: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const selectedPlan = useMemo(() => plans.find(p => p.id === formData.plan), [formData.plan]);
  
  const paymentCalculation = useMemo(() => {
    if (!selectedPlan || !formData.paymentMethod) return null;
    return calculatePayment(selectedPlan.price, formData.paymentMethod);
  }, [selectedPlan, formData.paymentMethod]);

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

    // Validations for link-bio
    if (formData.projectType === 'link-bio') {
      if (!formData.plan) {
        newErrors.plan = 'Selecione um plano';
      }
      if (!formData.paymentMethod) {
        newErrors.paymentMethod = 'Selecione a forma de pagamento';
      }
    }

    // Budget is required only for site-profissional
    if (formData.projectType === 'site-profissional' && !formData.budget) {
      newErrors.budget = 'Selecione a faixa de investimento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const projectTypeLabel = formData.projectType === 'link-bio' 
      ? '🔗 Link na Bio' 
      : '🌐 Site Profissional';

    let message = `Olá! Me chamo *${formData.name.trim()}* da empresa *${formData.company.trim()}*.

📌 *Interesse:* ${projectTypeLabel}`;

    if (formData.projectType === 'link-bio' && selectedPlan && paymentCalculation) {
      const paymentOption = paymentOptions.flatMap(g => g.options).find(o => o.value === formData.paymentMethod);
      
      message += `

📦 *Plano:* ${selectedPlan.name} (R$ ${selectedPlan.price}/mês)
💳 *Pagamento:* ${paymentOption?.label}`;
      
      if (paymentCalculation.savings > 0) {
        message += `
💰 *Total:* R$ ${paymentCalculation.total.toFixed(2)} (economia de R$ ${paymentCalculation.savings.toFixed(2)})`;
      } else if (formData.paymentMethod === 'parcelado') {
        message += `
💰 *Total:* 12x de R$ ${selectedPlan.price.toFixed(2)}`;
      } else {
        message += `
💰 *Total:* R$ ${paymentCalculation.total.toFixed(2)}/${paymentCalculation.period}`;
      }
    }

    if (formData.projectType === 'site-profissional' && formData.budget) {
      const budgetLabel = budgetOptions.find(b => b.value === formData.budget)?.label;
      message += `
💰 *Faixa de Investimento:* ${budgetLabel}`;
    }

    message += `
🏢 *Ramo:* ${formData.industry.trim()}
📱 *WhatsApp:* ${formData.whatsapp.trim()}

Gostaria de mais informações sobre como começar!`;

    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      projectType: 'link-bio',
      plan: '',
      paymentMethod: '',
      budget: '',
      name: '',
      company: '',
      industry: '',
      whatsapp: '',
    });
    setErrors({});
    onClose();
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    // Reset related fields when switching project type
    if (field === 'projectType') {
      setFormData(prev => ({ 
        ...prev, 
        projectType: value as 'link-bio' | 'site-profissional',
        plan: '',
        paymentMethod: '',
        budget: '' 
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            <span className="text-gradient-purple">Começar Agora</span>
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Escolha o tipo de projeto e personalize sua experiência
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Project Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Tipo de Projeto</Label>
            <RadioGroup
              value={formData.projectType}
              onValueChange={(value) => handleChange('projectType', value)}
              className="grid grid-cols-2 gap-3"
            >
              <div className="relative">
                <RadioGroupItem
                  value="link-bio"
                  id="link-bio"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="link-bio"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-border bg-background cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <Link2 className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium">Link na Bio</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem
                  value="site-profissional"
                  id="site-profissional"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="site-profissional"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-border bg-background cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                >
                  <Globe className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium">Site Profissional</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Link na Bio - Plan Selection */}
          {formData.projectType === 'link-bio' && (
            <div className="space-y-3 animate-fade-in">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                Escolha seu Plano
              </Label>
              <RadioGroup
                value={formData.plan}
                onValueChange={(value) => handleChange('plan', value)}
                className="grid gap-3"
              >
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <div key={plan.id} className="relative">
                      <RadioGroupItem
                        value={plan.id}
                        id={`plan-${plan.id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`plan-${plan.id}`}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all 
                          ${plan.recommended 
                            ? 'border-primary/50 bg-primary/5' 
                            : 'border-border bg-background'
                          }
                          hover:border-primary/50 
                          peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10`}
                      >
                        <div className={`p-2 rounded-lg ${plan.recommended ? 'bg-primary/20' : 'bg-muted'}`}>
                          <Icon className={`w-5 h-5 ${plan.recommended ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{plan.name}</span>
                            {plan.recommended && (
                              <span className="text-xs px-2 py-0.5 bg-primary text-primary-foreground rounded-full">
                                Recomendado
                              </span>
                            )}
                          </div>
                          <div className="text-lg font-bold text-primary">
                            R$ {plan.price}<span className="text-sm text-muted-foreground font-normal">/mês</span>
                          </div>
                        </div>
                        <Check className={`w-5 h-5 ${formData.plan === plan.id ? 'text-primary' : 'text-transparent'}`} />
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
              {errors.plan && <p className="text-xs text-destructive">{errors.plan}</p>}
            </div>
          )}

          {/* Link na Bio - Payment Method Selection */}
          {formData.projectType === 'link-bio' && formData.plan && (
            <div className="space-y-3 animate-fade-in">
              <Label className="text-sm font-medium flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                Forma de Pagamento
              </Label>
              
              {paymentOptions.map((group) => (
                <div key={group.group} className="space-y-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    {group.group === 'PIX' ? <Banknote className="w-3 h-3" /> : <CreditCard className="w-3 h-3" />}
                    Via {group.group}
                  </span>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleChange('paymentMethod', value)}
                    className="grid gap-2"
                  >
                    {group.options.map((option) => (
                      <div key={option.value} className="relative">
                        <RadioGroupItem
                          value={option.value}
                          id={`payment-${option.value}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`payment-${option.value}`}
                          className="flex items-center justify-between p-3 rounded-lg border border-border bg-background cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                        >
                          <div>
                            <span className="text-sm font-medium">{option.label}</span>
                            <p className="text-xs text-muted-foreground">{option.description}</p>
                          </div>
                          {option.discount > 0 && (
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full flex items-center gap-1">
                              <Percent className="w-3 h-3" />
                              {option.discount}% OFF
                            </span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              {errors.paymentMethod && <p className="text-xs text-destructive">{errors.paymentMethod}</p>}
            </div>
          )}

          {/* Order Summary for Link na Bio */}
          {formData.projectType === 'link-bio' && selectedPlan && paymentCalculation && formData.paymentMethod && (
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2 animate-fade-in">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Resumo do Pedido
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plano {selectedPlan.name}</span>
                  <span>R$ {selectedPlan.price}/mês</span>
                </div>
                {paymentCalculation.savings > 0 && (
                  <>
                    <div className="flex justify-between text-muted-foreground line-through">
                      <span>Valor original</span>
                      <span>R$ {paymentCalculation.original.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-400">
                      <span>Economia</span>
                      <span>- R$ {paymentCalculation.savings.toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                  <span>Total</span>
                  {formData.paymentMethod === 'parcelado' ? (
                    <span className="text-primary">12x de R$ {selectedPlan.price.toFixed(2)}</span>
                  ) : (
                    <span className="text-primary">R$ {paymentCalculation.total.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Budget Selection - Only for Site Profissional */}
          {formData.projectType === 'site-profissional' && (
            <div className="space-y-2 animate-fade-in">
              <Label className="flex items-center gap-2 text-sm">
                <Banknote className="w-4 h-4 text-muted-foreground" />
                Faixa de Investimento
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleChange('budget', value)}
              >
                <SelectTrigger className={errors.budget ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Selecione o valor disponível" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budget && <p className="text-xs text-destructive">{errors.budget}</p>}
            </div>
          )}

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
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-purple hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};