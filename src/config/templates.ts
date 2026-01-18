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
    description: 'Seus clientes vão encontrar serviços, promoções e contato direto. Ideal para oficinas que querem parecer profissionais no digital.',
    features: ['Catálogo de serviços', 'Botão WhatsApp', 'Destaque promoções']
  },
  {
    id: 2,
    name: 'Encanto Personalizado',
    file: 'template2.html',
    category: 'Papelaria',
    description: 'Mostre seu trabalho artesanal de forma organizada. Catálogo visual que vende enquanto você cria.',
    features: ['Galeria de produtos', 'Links de compra', 'Estilo delicado']
  },
  {
    id: 3,
    name: 'Mundo Animal',
    file: 'template3.html',
    category: 'Pet Shop',
    description: 'Banho, tosa, veterinário, rações — tudo em um lugar só. Seus clientes agendam com um clique.',
    features: ['Seções por serviço', 'Agendamento fácil', 'Visual amigável']
  },
  {
    id: 4,
    name: 'Flocos Mágicos',
    file: 'template4.html',
    category: 'Sorveteria',
    description: 'Cardápio visual que dá água na boca. Seu cliente escolhe o sabor antes de chegar na loja.',
    features: ['Cardápio interativo', 'Fotos dos produtos', 'Localização']
  },
  {
    id: 5,
    name: 'Barbearia Vintage',
    file: 'template5.html',
    category: 'Barbearia',
    description: 'Agenda, serviços e valores organizados. O cliente já sabe o que esperar antes de sentar na cadeira.',
    features: ['Lista de preços', 'Agenda online', 'Perfil do barbeiro']
  }
];