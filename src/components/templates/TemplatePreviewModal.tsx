import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { templates } from '@/config/templates';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateId: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  onSelect: (templateId: number) => void;
}

export const TemplatePreviewModal = ({
  isOpen,
  onClose,
  templateId,
  onNavigate,
  onSelect,
}: TemplatePreviewModalProps) => {
  const template = templates.find(t => t.id === templateId);

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[95vh] p-0 bg-background/95 backdrop-blur-sm">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('prev')}
              aria-label="Template anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h3 className="font-bold text-lg">{template.name}</h3>
              <p className="text-sm text-muted-foreground">{template.category}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('next')}
              aria-label="Próximo template"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onSelect(templateId)}
              className="bg-gradient-primary"
            >
              Escolher Template
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Template Preview */}
        <div className="w-full h-full pt-20">
          <iframe
            src={`/templates/${template.file}`}
            title={`Preview completo - ${template.name}`}
            className="w-full h-full border-0"
            loading="eager"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
