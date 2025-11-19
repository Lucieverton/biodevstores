import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TemplateContent } from "./TemplateContent";

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateId: string;
  onNavigate: (direction: 'prev' | 'next') => void;
  onSelect: () => void;
}

export const TemplatePreviewModal = ({ 
  isOpen, 
  onClose, 
  templateId, 
  onNavigate,
  onSelect 
}: TemplatePreviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] h-[95vh] w-full p-0 overflow-hidden bg-background">
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigate('prev')}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  onSelect();
                  onClose();
                }}
                className="bg-gradient-neon"
              >
                Escolher Este Template
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onNavigate('next')}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <DialogClose asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>

          {/* Template Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-md mx-auto">
              <TemplateContent templateId={templateId} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
