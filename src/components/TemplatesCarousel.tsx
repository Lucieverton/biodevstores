import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { templates } from '@/config/templates';

export const TemplatesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    skipSnaps: false,
    slidesToScroll: 1
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const handleSelectTemplate = (templateId: number) => {
    localStorage.setItem('selectedTemplate', templateId.toString());
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Escolha seu Template
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navegue pelos nossos templates profissionais e escolha o que mais combina com seu negócio
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8">
              {templates.map((template, index) => (
                <div
                  key={template.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-4"
                >
                  <div className="transition-all duration-300">
                    {/* Phone Mockup */}
                    <div className="mini-phone mx-auto mb-6">
                      <div className="mini-phone-notch" />
                      <div className="mini-phone-screen">
                        <iframe
                          src={`/templates/${template.file}`}
                          title={template.name}
                          className="template-iframe pointer-events-auto"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="text-center space-y-3">
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
                        {template.category}
                      </div>
                      <h3 className="text-xl font-bold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {template.features.map((feature, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-secondary/50 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleSelectTemplate(template.id)}
                        className="w-full max-w-xs"
                      >
                        Escolher Template
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/3 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-background transition-colors"
            aria-label="Template anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-background transition-colors"
            aria-label="Próximo template"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Solicitar Personalização
          </Button>
        </div>
      </div>

    </section>
  );
};
