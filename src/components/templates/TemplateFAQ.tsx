import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface TemplateFAQProps {
  faqs: FAQ[];
  theme: string;
}

export const TemplateFAQ = ({ faqs, theme }: TemplateFAQProps) => {
  return (
    <div className="faq-section mb-6">
      <h2 className="text-center text-xl font-bold mb-4">Perguntas Frequentes</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className={`${theme}-faq-item`}>
            <AccordionTrigger className="text-left text-sm">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm opacity-90">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
