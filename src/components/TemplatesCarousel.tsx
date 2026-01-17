import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { templates } from '@/config/templates';
import { useActiveSection } from '@/hooks/useActiveSection';

export const TemplatesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setActiveSection } = useActiveSection();

  const getItemClass = useCallback((index: number) => {
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
  }, [activeIndex]);

  const scrollPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
  };

  const scrollNext = () => {
    setActiveIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
  };

  const handleSelectTemplate = (templateId: number) => {
    localStorage.setItem('selectedTemplate', templateId.toString());
    setActiveSection('contato');
  };

  const activeTemplate = templates[activeIndex];

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-sm font-tech text-primary uppercase tracking-wider mb-4 block animate-fade-in">
            Templates Premium
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient animate-fade-in">
            Escolha seu Template
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Navegue pelos nossos templates profissionais e escolha o que mais combina com seu negócio
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="carousel-3d-container">
          {templates.map((template, index) => {
            const itemClass = getItemClass(index);
            const isVisible = ['active', 'prev', 'next', 'far-prev', 'far-next'].includes(itemClass);
            
            if (!isVisible) return null;
            
            return (
              <div
                key={template.id}
                className={`carousel-3d-item ${itemClass}`}
              >
                {/* Phone Mockup */}
                <div className={`mini-phone ${itemClass === 'active' ? 'active' : ''}`}>
                  <div className="mini-phone-notch" />
                  <div className="mini-phone-screen">
                    <iframe
                      src={`/templates/${template.file}`}
                      title={template.name}
                      className={`template-iframe ${itemClass === 'active' ? 'pointer-events-auto' : 'pointer-events-none'}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}

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
        <div className="text-center mt-6 space-y-3 animate-fade-in">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {activeTemplate.category}
          </div>
          <h3 className="text-xl md:text-2xl font-bold">{activeTemplate.name}</h3>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
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
            className="bg-gradient-to-r from-primary to-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all mt-4"
          >
            Escolher Este Template
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {templates.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Ir para template ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
