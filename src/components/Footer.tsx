export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              DevStores
            </h3>
            <p className="text-sm text-muted-foreground">
              Transformando bios em mini-sites profissionais que convertem.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#templates" className="hover:text-primary transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#planos" className="hover:text-primary transition-colors">
                  Planos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contato@devstores.com.br</li>
              <li>WhatsApp: (82) 9 9980-1009</li>
              <li>@devstores</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 DevStores. Todos os direitos reservados.</p>
          <p className="mt-2">
            Desenvolvido com 💙 para profissionais que querem se destacar online.
          </p>
        </div>
      </div>
    </footer>
  );
};
