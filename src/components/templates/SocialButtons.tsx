import { Instagram, MessageCircle, Facebook } from "lucide-react";

interface SocialButtonsProps {
  theme: string;
}

export const SocialButtons = ({ theme }: SocialButtonsProps) => {
  return (
    <div className="social-buttons px-4 mb-6">
      <h2 className="text-center text-xl font-bold mb-4">Conecte-se Conosco</h2>
      
      <div className="flex justify-center gap-4">
        <a
          href="#"
          className={`social-btn ${theme}-social group relative overflow-hidden rounded-full p-4 transition-all duration-300 hover:scale-110`}
          aria-label="Instagram"
        >
          <Instagram className="h-6 w-6 relative z-10" />
          <div className="bloom-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </a>
        
        <a
          href="#"
          className={`social-btn ${theme}-social group relative overflow-hidden rounded-full p-4 transition-all duration-300 hover:scale-110`}
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-6 w-6 relative z-10" />
          <div className="bloom-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </a>
        
        <a
          href="#"
          className={`social-btn ${theme}-social group relative overflow-hidden rounded-full p-4 transition-all duration-300 hover:scale-110`}
          aria-label="Facebook"
        >
          <Facebook className="h-6 w-6 relative z-10" />
          <div className="bloom-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </a>
      </div>
    </div>
  );
};
