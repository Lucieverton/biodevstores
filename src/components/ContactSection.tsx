import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Instagram } from "lucide-react";

export const ContactSection = () => {
  const whatsappNumber = "558299801009";
  const email = "contato@devstores.com.br";
  const instagram = "devstores";

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=Olá! Gostaria de saber mais sobre os planos.`, "_blank");
  };

  const handleEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleInstagram = () => {
    window.open(`https://instagram.com/${instagram}`, "_blank");
  };

  return (
    <section id="contato" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-card to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              Pronto para Transformar sua Presença Digital?
            </h2>
            <p className="text-xl text-muted-foreground">
              Entre em contato e vamos criar algo incrível juntos!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Button
              onClick={handleWhatsApp}
              size="lg"
              className="h-32 flex-col gap-3 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-glow"
            >
              <MessageCircle className="h-8 w-8" />
              <div className="text-center">
                <div className="font-bold">WhatsApp</div>
                <div className="text-xs opacity-80">Resposta rápida</div>
              </div>
            </Button>

            <Button
              onClick={handleEmail}
              size="lg"
              className="h-32 flex-col gap-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-glow"
            >
              <Mail className="h-8 w-8" />
              <div className="text-center">
                <div className="font-bold">E-mail</div>
                <div className="text-xs opacity-80">Envie sua proposta</div>
              </div>
            </Button>

            <Button
              onClick={handleInstagram}
              size="lg"
              className="h-32 flex-col gap-3 bg-gradient-to-br from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 hover:shadow-glow"
            >
              <Instagram className="h-8 w-8" />
              <div className="text-center">
                <div className="font-bold">Instagram</div>
                <div className="text-xs opacity-80">@{instagram}</div>
              </div>
            </Button>
          </div>

          <div className="mt-12 text-center p-8 bg-card rounded-2xl border border-border">
            <p className="text-muted-foreground mb-4">
              Horário de atendimento: Segunda a Sexta, 9h às 18h
            </p>
            <p className="text-sm text-muted-foreground">
              Respondemos todas as mensagens em até 2 horas durante o horário comercial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
