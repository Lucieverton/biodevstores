import { useState } from "react";
import { ServiceCarousel } from "./ServiceCarousel";
import { TemplateHeader } from "./TemplateHeader";
import { TemplateFAQ } from "./TemplateFAQ";
import { SocialButtons } from "./SocialButtons";
import { templateData } from "./templateData";

interface TemplateContentProps {
  templateId: string;
}

export const TemplateContent = ({ templateId }: TemplateContentProps) => {
  const template = templateData[templateId];
  
  if (!template) return null;

  return (
    <div 
      className={`template-container ${template.className}`}
      style={template.styles}
    >
      <TemplateHeader 
        logo={template.logo}
        title={template.title}
        subtitle={template.subtitle}
        theme={template.theme}
      />
      
      <ServiceCarousel 
        services={template.services}
        theme={template.theme}
      />
      
      <div className="px-4">
        <TemplateFAQ 
          faqs={template.faqs}
          theme={template.theme}
        />
      </div>
      
      <SocialButtons 
        theme={template.theme}
      />
    </div>
  );
};
