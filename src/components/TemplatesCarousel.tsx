import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useState, useEffect } from "react";

const templates = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

  return (
    <section id="templates" className="py-24 px-4 relative overflow-hidden">
      {/* Background Decoration */}
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
            Explore nossos templates profissionais. Cada design é otimizado para conversão
            e totalmente personalizável para o seu negócio.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {templates.map((template, index) => (
                <div
                  key={template.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_40%]"
                >
                  <div className="mx-3">
                    <div
                      className={`relative transition-all duration-300 ${
                        selectedIndex === index ? "scale-105" : "scale-95 opacity-70"
                      }`}
                    >
                      {/* Phone Mockup */}
                      <div className="relative mx-auto max-w-[320px]">
                        <div className="bg-muted/50 rounded-[3rem] p-4 shadow-2xl border-4 border-muted backdrop-blur-sm">
                          {/* Notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-background rounded-b-3xl z-10" />

                          {/* Screen */}
                          <div className="relative bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19] shadow-inner">
                            {/* Gradient Background */}
                            <div
                              className="absolute inset-0"
                              style={{
                                background: `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})`,
                                opacity: 0.15,
                              }}
                            />

                            {/* Content */}
                            <div className="relative h-full flex flex-col p-6">
                              {/* Header */}
                              <div className="text-center mb-6">
                                <div
                                  className="w-16 h-16 mx-auto rounded-2xl mb-3 flex items-center justify-center text-2xl font-bold shadow-lg"
                                  style={{
                                    background: `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})`,
                                    color: "white",
                                  }}
                                >
                                  {template.id}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-1">
                                  {template.preview.header}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {template.preview.subtitle}
                                </p>
                              </div>

                              {/* Links/Buttons */}
                              <div className="space-y-3 flex-1">
                                {template.preview.items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="h-12 bg-card rounded-xl border border-border flex items-center justify-center text-sm font-medium hover:border-primary transition-all shadow-sm"
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>

                              {/* Social Icons */}
                              <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-border">
                                {["instagram", "whatsapp", "facebook"].map((social) => (
                                  <div
                                    key={social}
                                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                                  >
                                    <div className="w-4 h-4 rounded-full bg-foreground/30" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Template Info Card */}
                      <div className="mt-6 text-center space-y-3">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-primary/30">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold text-primary">
                            {template.category}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        
                        <div className="flex flex-wrap justify-center gap-2 pt-2">
                          {template.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 md:left-4 top-1/3 -translate-y-1/2 z-10 rounded-full bg-card/80 backdrop-blur-sm border-primary hover:bg-primary hover:text-primary-foreground shadow-lg"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 md:right-4 top-1/3 -translate-y-1/2 z-10 rounded-full bg-card/80 backdrop-blur-sm border-primary hover:bg-primary hover:text-primary-foreground shadow-lg"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Todos os templates são 100% personalizáveis para o seu negócio
          </p>
          <Button
            onClick={() => {
              const element = document.getElementById("contato");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            size="lg"
            className="bg-gradient-neon hover:shadow-glow"
          >
            Solicitar Personalização
          </Button>
        </div>
      </div>
    </section>
  );
};
