interface TemplateHeaderProps {
  logo: string;
  title: string;
  subtitle: string;
  theme: string;
}

export const TemplateHeader = ({ logo, title, subtitle, theme }: TemplateHeaderProps) => {
  return (
    <header className="template-header text-center pb-4 mb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
      <div className="logo-container mb-3 flex justify-center">
        <div 
          className={`logo-img ${theme}-logo`}
          dangerouslySetInnerHTML={{ __html: logo }}
        />
      </div>
      <h1 className="template-title text-2xl font-bold mb-1 animate-pulse-glow">
        {title}
      </h1>
      <p className="template-subtitle text-sm opacity-90">
        {subtitle}
      </p>
    </header>
  );
};
