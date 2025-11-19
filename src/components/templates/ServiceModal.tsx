import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ServiceModalProps {
  service: {
    title: string;
    description: string;
    icon: string;
    details?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  theme: string;
}

export const ServiceModal = ({ service, isOpen, onClose, theme }: ServiceModalProps) => {
  const handleContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{service.title}</span>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div 
            className={`service-icon-large text-6xl flex justify-center ${theme}-icon`}
            dangerouslySetInnerHTML={{ __html: service.icon }}
          />
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{service.title}</h3>
            <p className="text-muted-foreground">{service.description}</p>
            {service.details && (
              <p className="text-sm mt-2">{service.details}</p>
            )}
          </div>

          <Button 
            onClick={handleContact}
            className="w-full bg-gradient-neon"
          >
            Solicitar Orçamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
