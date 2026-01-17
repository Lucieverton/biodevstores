import { Scale, Scissors, Stethoscope, Home, Hash, ShoppingBag } from 'lucide-react';

const niches = [
  {
    icon: Scale,
    title: 'Jurídico & Escritórios',
    description: 'Advocacia, contabilidade e consultoria',
  },
  {
    icon: Scissors,
    title: 'Beleza & Estética',
    description: 'Salões, barbearias e clínicas de estética',
  },
  {
    icon: Stethoscope,
    title: 'Saúde & Clínicas',
    description: 'Médicos, dentistas e terapeutas',
  },
  {
    icon: Home,
    title: 'Imobiliária',
    description: 'Corretores e imobiliárias',
  },
  {
    icon: Hash,
    title: 'Creators',
    description: 'Influenciadores e produtores de conteúdo',
  },
  {
    icon: ShoppingBag,
    title: 'Lojas & Varejo',
    description: 'E-commerce e lojas físicas',
  },
];

export const NichesSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Funciona pra qualquer área
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Não importa seu nicho. Nossos templates são adaptáveis para qualquer segmento de mercado.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {niches.map((niche) => {
            const Icon = niche.icon;
            return (
              <div
                key={niche.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-neon-cyan"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{niche.title}</h3>
                <p className="text-sm text-muted-foreground">{niche.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
