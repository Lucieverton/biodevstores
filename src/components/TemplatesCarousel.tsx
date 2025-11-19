import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useState, useEffect } from "react";
import { TemplatePreviewModal } from "./templates/TemplatePreviewModal";

const templates = [
  {
    id: "template1",
    name: "AutoTech Solutions",
    category: "Automotivo",
    description: "Perfeito para oficinas e lojas de peças",
    colors: ["#B0B0B0", "#D90429"],
    features: ["Design Metálico", "Tema Racing", "WhatsApp Integrado"],
    preview: {
      header: "AutoTech",
      subtitle: "Peças e Manutenção",
      items: ["Peças Originais", "Manutenção", "Acessórios", "Contato"],
    },
  },
  {
    id: "template2",
    name: "Encanto Personalizado",
    category: "Papelaria",
    description: "Ideal para produtos personalizados",
    colors: ["#C8A2C8", "#800080"],
    features: ["Design Delicado", "Tons Pastéis", "Vitrine de Produtos"],
    preview: {
      header: "Encanto",
      subtitle: "Papelaria Personalizada",
      items: ["Convites", "Lembrancinhas", "Decoração", "Orçamento"],
    },
  },
  {
    id: "template3",
    name: "Mundo Animal",
    category: "Pet Shop",
    description: "Veterinários e pet shops",
    colors: ["#009B90", "#F9A826"],
    features: ["Design Amigável", "Tema Pet", "Agendamento Online"],
    preview: {
      header: "Mundo Animal",
      subtitle: "Pet Shop & Veterinária",
      items: ["Serviços", "Produtos", "Agendar", "Emergência"],
    },
  },
  {
    id: "template4",
    name: "Flocos Mágicos",
    category: "Sorveteria",
    description: "Sorveterias e docerias",
    colors: ["#E91E63", "#00BCD4"],
    features: ["Design Colorido", "Tema Doce", "Cardápio Digital"],
    preview: {
      header: "Flocos",
      subtitle: "A Magia do Sorvete",
      items: ["Sabores", "Promoções", "Delivery", "Localização"],
    },
  },
  {
    id: "template5",
    name: "Barbearia Vintage",
    category: "Barbearia",
    description: "Barbearias e salões masculinos",
    colors: ["#8B4513", "#DAA520"],
    features: ["Design Vintage", "Estilo Luxo", "Sistema de Agendamento"],
    preview: {
      header: "Vintage",
      subtitle: "Barbearia Clássica",
      items: ["Serviços", "Agendar", "Galeria", "Contato"],
    },
  },
];

export const TemplatesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleContactClick = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePreviewNavigate = (direction: 'prev' | 'next') => {
    const currentIndex = templates.findIndex(t => t.id === previewTemplate);
    const newIndex = direction === 'prev' 
      ? (currentIndex > 0 ? currentIndex - 1 : templates.length - 1)
      : (currentIndex < templates.length - 1 ? currentIndex + 1 : 0);
    setPreviewTemplate(templates[newIndex].id);
  };

  const handleSelectTemplate = () => {
    if (previewTemplate) {
      const template = templates.find(t => t.id === previewTemplate);
      if (template) localStorage.setItem('selectedTemplate', template.name);
    }
    handleContactClick();
  };

  return (
    <section id="templates" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-neon-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-purple rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Uma Vitrine Digital à Altura da Sua Marca
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore nossos templates profissionais. Cada design é otimizado para conversão e totalmente personalizável.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {templates.map((template, index) => (
                <div key={template.id} className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
                  <div className={`relative group cursor-pointer bg-card rounded-2xl overflow-hidden border-2 transition-all duration-300 ${selectedIndex === index ? 'border-primary shadow-neon-cyan scale-105' : 'border-border hover:border-primary/50'}`}>
                    <div className="relative bg-gradient-to-br from-card to-muted p-8 aspect-[9/16]">
                      <div className="relative h-full bg-background rounded-3xl border-8 border-foreground/20 shadow-2xl overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-foreground/20 rounded-b-2xl z-10" />
                        <div className="h-full w-full overflow-y-auto p-4" style={{ backgroundColor: template.colors[0], backgroundImage: `linear-gradient(135deg, ${template.colors[0]}20, ${template.colors[1]}20)` }}>
                          <div className="text-center mb-4 pb-3 border-b" style={{ borderColor: `${template.colors[1]}40` }}>
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: template.colors[1] }}>
                              <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-bold text-sm" style={{ color: template.colors[1] }}>{template.preview.header}</h3>
                            <p className="text-xs opacity-80">{template.preview.subtitle}</p>
                          </div>
                          <div className="space-y-2">
                            {template.preview.items.map((item, idx) => (
                              <div key={idx} className="rounded-lg p-3 text-center text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: template.colors[1], border: `1px solid ${template.colors[1]}40` }}>{item}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-xl">{template.name}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">{template.category}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {template.features.map((feature, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">{feature}</span>
                        ))}
                      </div>
                      <Button onClick={() => setPreviewTemplate(template.id)} variant="outline" size="sm" className="w-full gap-2">
                        <Eye className="h-4 w-4" />
                        Ver Preview Completo
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={scrollPrev} variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full shadow-lg z-10">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button onClick={scrollNext} variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full shadow-lg z-10">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="text-center mt-16">
          <Button onClick={handleContactClick} size="lg" className="bg-gradient-neon text-lg px-8 py-6 hover:scale-105 transition-transform">
            Solicitar Personalização
          </Button>
        </div>
      </div>

      <TemplatePreviewModal isOpen={!!previewTemplate} onClose={() => setPreviewTemplate(null)} templateId={previewTemplate || "template1"} onNavigate={handlePreviewNavigate} onSelect={handleSelectTemplate} />
    </section>
  );
};
