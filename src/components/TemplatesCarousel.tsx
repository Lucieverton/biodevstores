import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { templates } from '@/config/templates';

export const TemplatesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getItemClass = (index: number) => {
    const diff = index - activeIndex;
    const total = templates.length;
    
    // Handle wrapping for loop effect
    let normalizedDiff = diff;
    if (diff > total / 2) normalizedDiff = diff - total;
    if (diff < -total / 2) normalizedDiff = diff + total;

    if (normalizedDiff === 0) return 'active';
    if (normalizedDiff === -1) return 'prev';
    if (normalizedDiff === 1) return 'next';
    if (normalizedDiff === -2) return 'far-prev';
    if (normalizedDiff === 2) return 'far-next';
    return '';
  };

  const scrollPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
  };

  const scrollNext = () => {
    setActiveIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
  };

  const handleSelectTemplate = (templateId: number) => {
    localStorage.setItem('selectedTemplate', templateId.toString());
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeTemplate = templates[activeIndex];

  return (
    <section id="templates" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-sm font-tech text-primary uppercase tracking-wider mb-4 block">
            Templates Premium
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Escolha seu Template
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navegue pelos nossos templates profissionais e escolha o que mais combina com seu negócio
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="carousel-3d-container">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className={`carousel-3d-item ${getItemClass(index)}`}
            >
              {/* Phone Mockup */}
              <div className={`mini-phone ${getItemClass(index) === 'active' ? 'active' : ''}`}>
                <div className="mini-phone-notch" />
                <div className="mini-phone-screen">
                  <iframe
                    src={`/templates/${template.file}`}
                    title={template.name}
                    className={`template-iframe ${getItemClass(index) === 'active' ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="carousel-nav-btn prev"
            aria-label="Template anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="carousel-nav-btn next"
            aria-label="Próximo template"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Active Template Info */}
        <div className="text-center mt-8 space-y-4 animate-fade-in">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {activeTemplate.category}
          </div>
          <h3 className="text-2xl font-bold">{activeTemplate.name}</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {activeTemplate.description}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {activeTemplate.features.map((feature, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 bg-secondary/20 text-secondary rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
          <Button
            size="lg"
            onClick={() => handleSelectTemplate(activeTemplate.id)}
            className="bg-gradient-neon hover:shadow-glow-intense transition-all mt-4 glow-cyan"
          >
            Escolher Este Template
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {templates.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex 
                  ? 'w-8 bg-primary' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Ir para template ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
