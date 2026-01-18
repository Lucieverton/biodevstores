import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { templates } from '@/config/templates';
import sectionBg from "@/assets/section-bg.png";
import { TemplateSelectionModal } from './modals/TemplateSelectionModal';

export const TemplatesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplateData, setSelectedTemplateData] = useState({ name: '', category: '' });
  const [loadedIframes, setLoadedIframes] = useState<Set<number>>(new Set());
  const [bgLoaded, setBgLoaded] = useState(false);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setBgLoaded(true);
    img.src = sectionBg;
  }, []);

  // Get visible template indices (only load active + neighbors)
  const visibleIndices = useMemo(() => {
    const total = templates.length;
    const indices = new Set<number>();
    
    // Add active and 2 neighbors on each side
    for (let i = -2; i <= 2; i++) {
      let idx = activeIndex + i;
      if (idx < 0) idx = total + idx;
      if (idx >= total) idx = idx - total;
      indices.add(idx);
    }
    
    return indices;
  }, [activeIndex]);

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
    return 'hidden';
  }, [activeIndex]);

  const scrollPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
  }, []);

  const scrollNext = useCallback(() => {
    setActiveIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
  }, []);

  const handleSelectTemplate = (template: typeof templates[0]) => {
    setSelectedTemplateData({ name: template.name, category: template.category });
    setShowTemplateModal(true);
  };

  const handleIframeLoad = useCallback((index: number) => {
    setLoadedIframes(prev => new Set(prev).add(index));
  }, []);

  const activeTemplate = templates[activeIndex];

  const swipeState = useRef<{ startX: number; pointerId: number | null; locked: boolean }>({
    startX: 0,
    pointerId: null,
    locked: false,
  });

  const SWIPE_THRESHOLD = 40;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only start swipe on primary button/touch
    if ((e as any).button != null && (e as any).button !== 0) return;

    swipeState.current.startX = e.clientX;
    swipeState.current.pointerId = e.pointerId;
    swipeState.current.locked = false;

    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (swipeState.current.pointerId !== e.pointerId) return;
      if (swipeState.current.locked) return;

      const dx = e.clientX - swipeState.current.startX;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;

      swipeState.current.locked = true;

      if (dx > 0) scrollPrev();
      else scrollNext();

      // unlock after small delay to avoid multiple triggers in one swipe
      window.setTimeout(() => {
        swipeState.current.locked = false;
      }, 220);
    },
    [scrollPrev, scrollNext]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (swipeState.current.pointerId !== e.pointerId) return;
    swipeState.current.pointerId = null;
    swipeState.current.locked = false;

    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollPrev();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollNext();
    }
  }, [scrollPrev, scrollNext]);

  // Handle click on carousel items - use the original index from templates array
  const handleItemClick = useCallback((itemClass: string, originalIndex: number) => {
    if (itemClass === 'active') return; // Already selected
    setActiveIndex(originalIndex);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 relative overflow-hidden">
      {/* Background */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          backgroundImage: `url(${sectionBg})`,
          willChange: 'opacity'
        }}
      />
      {!bgLoaded && <div className="absolute inset-0 bg-background" />}
      <div className="absolute inset-0 bg-background/70" />
      
      <div className="container mx-auto relative z-10 carousel-section">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-sm font-tech text-primary uppercase tracking-wider mb-4 block animate-fade-in">
            Sua Vitrine Digital
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient animate-fade-in">
            Veja Como Seu Negócio Vai Ficar
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Cada template foi criado pensando no seu nicho. Escolha um modelo e nós personalizamos com sua marca, cores e conteúdo em até 48h.
          </p>
        </div>

        {/* 3D Carousel */}
        <div
          className="carousel-3d-container"
          role="region"
          aria-label="Carrossel de templates"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {templates.map((template, index) => {
            const itemClass = getItemClass(index);
            
            // Don't render hidden items
            if (itemClass === 'hidden') return null;

            // Check if this iframe should be loaded
            const shouldLoadIframe = visibleIndices.has(index);
            const isLoaded = loadedIframes.has(index);
            
            return (
              <div
                key={template.id}
                className={`carousel-3d-item ${itemClass}`}
                onClick={() => handleItemClick(itemClass, index)}
                role="button"
                tabIndex={-1}
                aria-label={`Selecionar template: ${template.name}`}
              >
                {/* Phone Mockup */}
                <div className={`mini-phone ${itemClass === 'active' ? 'active' : ''}`}>
                  <div className="mini-phone-notch" />
                  <div className="mini-phone-screen">
                    {/* Loading indicator */}
                    {shouldLoadIframe && !isLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      </div>
                    )}
                    
                    {/* Only load iframe if visible */}
                    {shouldLoadIframe && (
                      <iframe
                        src={`/templates/${template.file}`}
                        title={template.name}
                        className={`template-iframe ${itemClass === 'active' ? 'pointer-events-auto' : 'pointer-events-none'} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        loading="lazy"
                        onLoad={() => handleIframeLoad(index)}
                        style={{ transition: 'opacity 0.3s ease' }}
                      />
                    )}
                    
                    {/* Placeholder for non-visible items */}
                    {!shouldLoadIframe && (
                      <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">{template.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Navigation Buttons - Outside the pointer events container */}
        <div className="carousel-nav-wrapper">
          <button
            onClick={(e) => {
              e.stopPropagation();
              scrollPrev();
            }}
            className="carousel-nav-btn prev"
            aria-label="Template anterior"
            type="button"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              scrollNext();
            }}
            className="carousel-nav-btn next"
            aria-label="Próximo template"
            type="button"
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
            onClick={() => handleSelectTemplate(activeTemplate)}
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

      <TemplateSelectionModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        templateName={selectedTemplateData.name}
        templateCategory={selectedTemplateData.category}
      />
    </div>
  );
};
