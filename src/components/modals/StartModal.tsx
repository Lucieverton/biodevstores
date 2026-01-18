import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getWhatsAppUrl, validateWhatsApp } from '@/config/contact';
import { Link2, Globe, Send, User, Building2, Briefcase, Phone } from 'lucide-react';

interface StartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  projectType: 'link-bio' | 'site-profissional';
  name: string;
  company: string;
  industry: string;
  whatsapp: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  industry?: string;
  whatsapp?: string;
}

export const StartModal = ({ isOpen, onClose }: StartModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    projectType: 'link-bio',
    name: '',
    company: '',
    industry: '',
    whatsapp: '',
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const projectTypeLabel = formData.projectType === 'link-bio' 
      ? '🔗 Link na Bio' 
      : '🌐 Site Profissional';

    const message = `Olá! Me chamo *${formData.name.trim()}* da empresa *${formData.company.trim()}*.

📌 *Interesse:* ${projectTypeLabel}
🏢 *Ramo:* ${formData.industry.trim()}
📱 *WhatsApp:* ${formData.whatsapp.trim()}

Gostaria de mais informações sobre como começar!`;

    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      projectType: 'link-bio',
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
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            <span className="text-gradient-purple">Começar Agora</span>
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Escolha o tipo de projeto e preencha seus dados
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
