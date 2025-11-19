import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

const templates = [
  {
    id: 1,
    name: "AutoTech",
    category: "Automotivo",
    color: "from-gray-500 to-red-600",
    preview: "Peças e Manutenção",
  },
  {
    id: 2,
    name: "Encanto",
    category: "Papelaria",
    color: "from-purple-400 to-pink-400",
    preview: "Produtos Personalizados",
  },
  {
    id: 3,
    name: "Mundo Animal",
    category: "Pet Shop",
    color: "from-teal-400 to-yellow-400",
    preview: "Pet Shop & Veterinária",
  },
  {
    id: 4,
    name: "Flocos Mágicos",
    category: "Sorveteria",
    color: "from-pink-400 to-cyan-400",
    preview: "A Magia do Sorvete",
  },
  {
    id: 5,
    name: "Vintage",
    category: "Barbearia",
    color: "from-amber-600 to-amber-800",
    preview: "Estilo Clássico",
  },
];

export const TemplatesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
            Arraste e sinta o poder de um design profissional. Veja como sua marca pode
            (e deve) se apresentar.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <div className="mx-3">
                    {/* Phone Mockup */}
                    <div className="relative mx-auto max-w-[280px]">
                      <div className="bg-card rounded-[2.5rem] p-3 shadow-2xl border-4 border-muted">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-background rounded-b-3xl z-10" />
                        
                        {/* Screen */}
                        <div className="relative bg-background rounded-[2rem] overflow-hidden aspect-[9/19]">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-90`}
                          />
                          <div className="relative h-full flex flex-col items-center justify-center p-6 text-center text-white">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4 flex items-center justify-center text-3xl">
                              {template.id}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                            <p className="text-sm opacity-90 mb-4">{template.preview}</p>
                            <div className="space-y-2 w-full">
                              <div className="h-10 bg-white/20 backdrop-blur-sm rounded-lg" />
                              <div className="h-10 bg-white/20 backdrop-blur-sm rounded-lg" />
                              <div className="h-10 bg-white/20 backdrop-blur-sm rounded-lg" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Template Label */}
                      <div className="text-center mt-4">
                        <div className="inline-block px-4 py-2 bg-card rounded-full border border-border">
                          <span className="text-sm font-semibold">{template.category}</span>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-card/80 backdrop-blur-sm border-primary hover:bg-primary hover:text-primary-foreground"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-card/80 backdrop-blur-sm border-primary hover:bg-primary hover:text-primary-foreground"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};
