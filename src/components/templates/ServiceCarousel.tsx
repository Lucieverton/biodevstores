import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceModal } from "./ServiceModal";

interface Service {
  title: string;
  description: string;
  icon: string;
  details?: string;
}

interface ServiceCarouselProps {
  services: Service[];
  theme: string;
}

export const ServiceCarousel = ({ services, theme }: ServiceCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="services-section mb-6">
      <h2 className="text-center text-xl font-bold mb-4 px-4">Nossos Serviços</h2>
      
      <div className="relative px-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3">
            {services.map((service, index) => (
              <div 
                key={index}
                className="flex-[0_0_85%] min-w-0"
              >
                <div 
                  className={`service-card ${theme}-card rounded-lg p-4 h-full cursor-pointer transition-transform hover:scale-105`}
                  onClick={() => setSelectedService(service)}
                >
                  <div 
                    className="service-icon text-4xl mb-3 flex justify-center"
                    dangerouslySetInnerHTML={{ __html: service.icon }}
                  />
                  <h3 className="font-semibold text-center mb-2">{service.title}</h3>
                  <p className="text-sm text-center opacity-80 mb-3">{service.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 z-10"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 z-10"
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          theme={theme}
        />
      )}
    </div>
  );
};
