// Configuração centralizada de contato
export const WHATSAPP_NUMBER = "5582999801009";
export const WHATSAPP_BASE_URL = "https://wa.me/";

export const getWhatsAppUrl = (message: string) => {
  return `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const formatPhoneForDisplay = (phone: string) => {
  // Remove non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Format as (XX) XXXXX-XXXX
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return phone;
};

export const validateWhatsApp = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
};
