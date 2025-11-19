export interface Template {
  id: number;
  name: string;
  file: string;
  category: string;
  description: string;
  features: string[];
}

export const templates: Template[] = [
  {
    id: 1,
    name: 'AutoTech Solutions',
    file: 'template1.html',
    category: 'Automotivo',
    description: 'Design moderno com tema automotivo, perfeito para oficinas e lojas de peças.',
    features: ['Paleta cinza metálico', 'Efeitos glow', 'Animações pulse']
  },
  {
    id: 2,
    name: 'Encanto Nail Designer',
    file: 'template2.html',
    category: 'Beleza',
    description: 'Template delicado com cores suaves, ideal para salões e profissionais de beleza.',
    features: ['Rosa e lilás', 'Design elegante', 'Animações suaves']
  },
  {
    id: 3,
    name: 'Mundo Animal',
    file: 'template3.html',
    category: 'Pet Shop',
    description: 'Visual amigável e colorido para pet shops e clínicas veterinárias.',
    features: ['Verde e amarelo', 'Fundo de patinhas', 'Design alegre']
  },
  {
    id: 4,
    name: 'Flocos Mágicos',
    file: 'template4.html',
    category: 'Sorveteria',
    description: 'Template vibrante e divertido para sorveterias e confeitarias.',
    features: ['Cores vibrantes', 'Borda casquinha', 'Efeito granulado']
  },
  {
    id: 5,
    name: 'Barbearia Vintage',
    file: 'template5.html',
    category: 'Barbearia',
    description: 'Design sofisticado com tema vintage, perfeito para barbearias premium.',
    features: ['Dourado e cobre', 'Backdrop blur', 'Estilo luxuoso']
  }
];
