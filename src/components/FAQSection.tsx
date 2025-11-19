import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quanto tempo leva para o site ficar pronto?",
    answer:
      "Para o plano Bio Link, a entrega é em até 24 horas. Para sites completos, o prazo é de 3 a 5 dias úteis, dependendo da complexidade e do fornecimento de conteúdo.",
  },
  {
    question: "Posso fazer alterações depois?",
    answer:
      "Sim! Todos os planos incluem período de suporte com revisões. Após esse período, você pode contratar manutenções avulsas ou um plano de manutenção mensal.",
  },
  {
    question: "O site será responsivo (mobile/desktop)?",
    answer:
      "Absolutamente! Todos os nossos sites são desenvolvidos com design responsivo, garantindo perfeita visualização em smartphones, tablets e desktops.",
  },
  {
    question: "Preciso ter domínio próprio?",
    answer:
      "Para o plano Bio Link, oferecemos hospedagem gratuita em subdomínio. Para sites completos, recomendamos domínio próprio (podemos ajudar na aquisição).",
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer:
      "Aceitamos PIX, cartão de crédito (em até 12x) e transferência bancária. Para projetos acima de R$ 500, oferecemos parcelamento em boleto.",
  },
  {
    question: "Vocês fazem integração com redes sociais?",
    answer:
      "Sim! Integramos Instagram, Facebook, WhatsApp, YouTube e outras redes sociais relevantes para o seu negócio, facilitando a conexão com seus clientes.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-lg border border-border px-6"
            >
              <AccordionTrigger className="text-left hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
