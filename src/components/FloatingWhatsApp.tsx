import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const whatsappNumber = '5511999999999';
  const message = encodeURIComponent('Olá! Vim pelo site DevStores e gostaria de mais informações.');

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 lg:bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5C] transition-all hover:scale-110 shadow-lg flex items-center justify-center group"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 rounded-lg bg-card text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale conosco!
      </span>
    </button>
  );
};
