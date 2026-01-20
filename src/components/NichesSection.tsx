import { Scale, Scissors, Stethoscope, Home, Hash, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useActiveSection } from '@/hooks/useActiveSection';
import sectionBg from "@/assets/section-bg.png";

const niches = [
  {
    icon: Scale,
    title: 'Jurídico & Escritórios',
    description: 'Advocacia, contabilidade e consultoria',
    details: 'Layout sóbrio, agendamento de consultas e integração com WhatsApp para captação de leads qualificados.',
  },
  {
    icon: Scissors,
    title: 'Beleza & Estética',
    description: 'Salões, barbearias e clínicas de estética',
    details: 'Galeria de fotos dos seus trabalhos, horários disponíveis e botão de reserva direto no WhatsApp.',
  },
  {
    icon: Stethoscope,
    title: 'Saúde & Clínicas',
    description: 'Médicos, dentistas e terapeutas',
    details: 'Destaque para especialidades, convênios aceitos, localização e formulário de agendamento.',
  },
  {
    icon: Home,
    title: 'Imobiliária',
    description: 'Corretores e imobiliárias',
    details: 'Catálogo de imóveis com fotos, tour virtual integrado e captação de leads interessados.',
  },
  {
    icon: Hash,
    title: 'Creators & Influencers',
    description: 'Influenciadores e produtores de conteúdo',
    details: 'Mídia kit profissional, parcerias comerciais e links organizados para todas as redes sociais.',
  },
  {
    icon: ShoppingBag,
    title: 'Lojas & Varejo',
    description: 'E-commerce e lojas físicas',
    details: 'Vitrine de produtos destacados, ofertas relâmpago e botão de compra com link direto.',
  },
];

export const NichesSection = () => {
  const { setActiveSection } = useActiveSection();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sectionBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />
      
      <div className="flex-1 flex items-center py-12 px-4 pb-24 lg:pb-12">
        <div className="container mx-auto relative z-10">
          <div className="text-center space-y-4 mb-10">
            <span className="text-sm font-tech text-primary uppercase tracking-wider">
              Versátil & Adaptável
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
              Funciona pra qualquer área
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Não importa seu nicho. Nossos templates são 100% adaptáveis para qualquer segmento de mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {niches.map((niche) => {
              const Icon = niche.icon;
              return (
                <div
                  key={niche.title}
                  className="group p-5 md:p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-neon-cyan"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{niche.title}</h3>
                  <p className="text-sm text-primary/80 mb-3">{niche.description}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {niche.details}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footer Section */}
          <div className="mt-10 text-center space-y-4">
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              Cada projeto recebe toques exclusivos: <span className="text-primary">tipografia personalizada</span>, 
              <span className="text-primary"> paleta de cores</span> do seu negócio e <span className="text-primary">microanimações</span> que encantam.
            </p>
            <Button
              size="lg"
              onClick={() => setActiveSection('templates')}
              className="bg-gradient-neon hover:shadow-glow-intense transition-all group"
            >
              Ver Templates para Meu Nicho
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
