export const templateData: Record<string, any> = {
  template1: {
    className: "autotech-theme",
    theme: "autotech",
    title: "AutoTech Solutions",
    subtitle: "Peças e Manutenção Automotiva",
    logo: `<svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#D90429" stroke="#B0B0B0" stroke-width="3"/>
      <path d="M 30 50 L 45 35 L 55 35 L 70 50 L 55 65 L 45 65 Z" fill="#F5F5F5"/>
    </svg>`,
    styles: {
      backgroundColor: '#2c2c2e',
      color: '#E0E0E0',
      border: '2px solid #B0B0B0',
      borderRadius: '10px',
      padding: '1rem',
    },
    services: [
      {
        title: "Troca de Óleo",
        description: "Óleo premium para máximo desempenho",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#D90429"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/></svg>`,
        details: "Utilizamos óleos sintéticos de alta qualidade para garantir a máxima proteção do seu motor."
      },
      {
        title: "Alinhamento",
        description: "Precisão milimétrica garantida",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#D90429"><circle cx="12" cy="12" r="10"/></svg>`,
        details: "Equipamento digital de última geração para alinhamento perfeito das rodas."
      },
      {
        title: "Revisão Completa",
        description: "Check-up de 30 pontos",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#D90429"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>`,
        details: "Inspeção detalhada de todos os sistemas do veículo com relatório completo."
      },
      {
        title: "Diagnóstico",
        description: "Scanner automotivo profissional",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#D90429"><path d="M3 3h18v18H3z"/></svg>`,
        details: "Identificação precisa de problemas eletrônicos e mecânicos."
      }
    ],
    faqs: [
      {
        question: "Qual o prazo de garantia dos serviços?",
        answer: "Todos os nossos serviços têm garantia de 90 dias ou 5.000 km."
      },
      {
        question: "Vocês trabalham com todas as marcas?",
        answer: "Sim, atendemos todas as marcas nacionais e importadas."
      },
      {
        question: "Preciso agendar horário?",
        answer: "Recomendamos agendamento, mas também atendemos por ordem de chegada."
      },
      {
        question: "Quais formas de pagamento?",
        answer: "Aceitamos dinheiro, cartão (débito/crédito) e PIX."
      }
    ]
  },
  template2: {
    className: "encanto-theme",
    theme: "encanto",
    title: "Encanto Personalizado",
    subtitle: "Papelaria Criativa & Exclusiva",
    logo: `<svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 10 L 60 40 L 90 40 L 65 60 L 75 90 L 50 70 L 25 90 L 35 60 L 10 40 L 40 40 Z" fill="#800080" stroke="#C8A2C8" stroke-width="2"/>
    </svg>`,
    styles: {
      backgroundColor: '#F5F5F9',
      color: '#4A2C4A',
      border: '2px solid #C8A2C8',
      borderRadius: '12px',
      padding: '1rem',
    },
    services: [
      {
        title: "Convites Personalizados",
        description: "Design único para seu evento",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#800080"><rect x="3" y="5" width="18" height="14" rx="2"/></svg>`,
        details: "Convites exclusivos com arte personalizada para casamentos, aniversários e eventos corporativos."
      },
      {
        title: "Kits Festa",
        description: "Tudo para sua celebração",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#800080"><circle cx="12" cy="8" r="5"/><path d="M12 14l-8 8h16z"/></svg>`,
        details: "Kits completos com toppers, tags, rótulos e decorações personalizadas."
      },
      {
        title: "Lembrancinhas",
        description: "Presentes inesquecíveis",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#800080"><path d="M20 12v10H4V12M2 7h20v5H2z"/></svg>`,
        details: "Caixinhas, saquinhos e embalagens personalizadas com doces ou mimos."
      },
      {
        title: "Papelaria Corporativa",
        description: "Identidade visual profissional",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#800080"><rect x="5" y="2" width="14" height="20" rx="1"/></svg>`,
        details: "Cartões de visita, papel timbrado, envelopes e materiais institucionais."
      }
    ],
    faqs: [
      {
        question: "Qual o prazo de produção?",
        answer: "Em média 7 a 10 dias úteis, dependendo da complexidade do pedido."
      },
      {
        question: "Tem pedido mínimo?",
        answer: "Não! Fazemos desde 1 unidade até grandes quantidades."
      },
      {
        question: "Posso personalizar as cores?",
        answer: "Sim! Trabalhamos com a paleta de cores que você preferir."
      },
      {
        question: "Como funciona o orçamento?",
        answer: "Envie sua ideia pelo WhatsApp e fazemos um orçamento sem compromisso."
      }
    ]
  },
  template3: {
    className: "mundo-animal-theme",
    theme: "mundo-animal",
    title: "Mundo Animal",
    subtitle: "Pet Shop & Clínica Veterinária",
    logo: `<svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="60" r="20" fill="#009B90"/>
      <circle cx="30" cy="30" r="10" fill="#F9A826"/>
      <circle cx="70" cy="30" r="10" fill="#F9A826"/>
      <circle cx="20" cy="50" r="8" fill="#F9A826"/>
      <circle cx="80" cy="50" r="8" fill="#F9A826"/>
    </svg>`,
    styles: {
      backgroundColor: '#FFFFFF',
      color: '#4A3F35',
      border: '2px solid #009B90',
      borderRadius: '10px',
      padding: '1rem',
      backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNSIgY3k9IjMwIiByPSI1IiBmaWxsPSJyZ2JhKDAsMTU1LDE0NCwwLjA1KSIvPjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjMiIGZpbGw9InJnYmEoMjQ5LDE2OCwzOCwwLjA1KSIvPjxjaXJjbGUgY3g9IjM1IiBjeT0iMTUiIHI9IjMiIGZpbGw9InJnYmEoMjQ5LDE2OCwzOCwwLjA1KSIvPjwvc3ZnPg==')`,
    },
    services: [
      {
        title: "Banho & Tosa",
        description: "Seu pet limpinho e cheiroso",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#009B90"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/></svg>`,
        details: "Banho completo com shampoo premium, tosa higiênica ou completa, corte de unhas e limpeza de ouvidos."
      },
      {
        title: "Consulta Veterinária",
        description: "Cuidado profissional",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#009B90"><path d="M12 2L2 7v10c0 5.5 7.8 9.7 10 10 2.2-.3 10-4.5 10-10V7l-10-5z"/></svg>`,
        details: "Atendimento veterinário completo com médicos especializados e equipamentos modernos."
      },
      {
        title: "Vacinação",
        description: "Proteção e saúde",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#009B90"><rect x="6" y="2" width="12" height="20" rx="2"/></svg>`,
        details: "Vacinas importadas e nacionais, carteira de vacinação completa e orientação preventiva."
      },
      {
        title: "Pet Shop",
        description: "Tudo para seu amigo",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#009B90"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.17 14.75l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/></svg>`,
        details: "Ração premium, petiscos, brinquedos, caminhas, coleiras e tudo para o bem-estar do seu pet."
      }
    ],
    faqs: [
      {
        question: "Preciso agendar banho e tosa?",
        answer: "Sim, recomendamos agendamento para garantir o melhor horário para você."
      },
      {
        question: "Atendem emergências?",
        answer: "Sim, temos plantão 24h para emergências veterinárias."
      },
      {
        question: "Quais animais atendem?",
        answer: "Cães, gatos, aves, roedores e animais exóticos."
      },
      {
        question: "Fazem delivery de ração?",
        answer: "Sim! Entregamos gratuitamente em um raio de 5km."
      }
    ]
  },
  template4: {
    className: "flocos-theme",
    theme: "flocos",
    title: "Flocos Mágicos",
    subtitle: "A Magia do Sorvete Artesanal",
    logo: `<svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="20" fill="#E91E63"/>
      <circle cx="40" cy="50" r="15" fill="#00BCD4"/>
      <circle cx="60" cy="50" r="15" fill="#FFC107"/>
      <path d="M 40 60 L 50 85 L 60 60 Z" fill="#D2B48C"/>
    </svg>`,
    styles: {
      backgroundColor: '#FFFFFF',
      color: '#6D4C41',
      border: '10px solid transparent',
      borderRadius: '12px',
      padding: '1rem',
      borderImageSlice: '10',
      borderImageRepeat: 'repeat',
    },
    services: [
      {
        title: "Sorvetes Artesanais",
        description: "40+ sabores cremosos",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#E91E63"><circle cx="12" cy="8" r="6"/><path d="M 9 12 L 12 22 L 15 12 Z"/></svg>`,
        details: "Sorvetes feitos diariamente com ingredientes frescos e naturais. De frutas tropicais a chocolates belgas."
      },
      {
        title: "Picolés Gourmet",
        description: "Refrescância no palito",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#00BCD4"><rect x="10" y="2" width="4" height="15" rx="2"/><rect x="8" y="16" width="8" height="6"/></svg>`,
        details: "Picolés de frutas naturais, chocolate belga, e criações exclusivas com pedaços de frutas."
      },
      {
        title: "Açaí na Tigela",
        description: "Energia e sabor",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#FFC107"><circle cx="12" cy="14" r="8"/><path d="M 8 6 Q 12 2 16 6"/></svg>`,
        details: "Açaí puro batido na hora, com diversos toppings: granola, frutas, paçoca, leite em pó e muito mais."
      },
      {
        title: "Milk Shakes",
        description: "Cremosos e irresistíveis",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#E91E63"><rect x="8" y="10" width="8" height="12" rx="1"/><circle cx="12" cy="6" r="3"/><rect x="11" y="20" width="2" height="2"/></svg>`,
        details: "Milk shakes super cremosos com sorvete artesanal, calda e chantilly. Mais de 15 sabores."
      }
    ],
    faqs: [
      {
        question: "Os sorvetes contêm glúten?",
        answer: "Temos opções sem glúten e sem lactose identificadas no cardápio."
      },
      {
        question: "Fazem bolos de sorvete?",
        answer: "Sim! Fazemos bolos de sorvete personalizados sob encomenda."
      },
      {
        question: "Têm delivery?",
        answer: "Sim, entregamos com embalagem térmica para manter a qualidade."
      },
      {
        question: "Qual o horário de funcionamento?",
        answer: "Segunda a quinta: 13h-22h | Sexta a domingo: 12h-23h."
      }
    ]
  },
  template5: {
    className: "barbearia-theme",
    theme: "barbearia",
    title: "Barbearia Vintage",
    subtitle: "Estilo Clássico & Moderno",
    logo: `<svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="45" y="10" width="10" height="80" rx="2" fill="#DAA520"/>
      <rect x="20" y="30" width="60" height="15" fill="#8B4513" transform="rotate(-45 50 37.5)"/>
      <rect x="20" y="55" width="60" height="15" fill="#FFFFFF" transform="rotate(-45 50 62.5)"/>
    </svg>`,
    styles: {
      backgroundColor: 'rgba(16, 15, 15, 0.85)',
      color: '#E0E0E0',
      border: '2px solid #DAA520',
      borderRadius: '10px',
      padding: '1rem',
      backdropFilter: 'blur(4px)',
    },
    services: [
      {
        title: "Corte Clássico",
        description: "Tradição e elegância",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#DAA520"><path d="M12 2L4 8l8 6 8-6-8-6zm0 12l-8-6v10l8 6 8-6V8l-8 6z"/></svg>`,
        details: "Corte tradicional com navalha, finalização a tesoura e modelagem completa."
      },
      {
        title: "Barba Completa",
        description: "Acabamento perfeito",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#DAA520"><path d="M12 2C8.13 2 5 5.13 5 9v8l4 4h6l4-4V9c0-3.87-3.13-7-7-7z"/></svg>`,
        details: "Barba feita com navalha, toalha quente, óleos aromáticos e finalização premium."
      },
      {
        title: "Tratamento Capilar",
        description: "Hidratação profunda",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#DAA520"><circle cx="12" cy="12" r="10"/></svg>`,
        details: "Tratamento com produtos profissionais, massagem relaxante e nutrição dos fios."
      },
      {
        title: "Pigmentação",
        description: "Cor e cobertura",
        icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#DAA520"><rect x="6" y="2" width="12" height="20" rx="2"/></svg>`,
        details: "Pigmentação de barba e cabelo com produtos de alta qualidade e resultado natural."
      }
    ],
    faqs: [
      {
        question: "Preciso agendar?",
        answer: "Recomendamos agendamento, mas aceitamos walk-in conforme disponibilidade."
      },
      {
        question: "Quanto tempo dura o serviço?",
        answer: "Corte: 30min | Barba: 20min | Corte + Barba: 45min"
      },
      {
        question: "Qual a forma de pagamento?",
        answer: "Aceitamos dinheiro, cartões e PIX."
      },
      {
        question: "Atendem aos domingos?",
        answer: "Sim! Funcionamos de segunda a sábado das 9h às 20h, domingos 9h às 14h."
      }
    ]
  }
};
