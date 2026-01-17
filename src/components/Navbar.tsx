import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo 3D */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 perspective-1000">
              <div className="w-full h-full relative preserve-3d animate-spin-slow">
                <div className="absolute inset-0 bg-gradient-neon rounded-lg opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-primary text-2xl font-bold font-tech">DS</span>
                </div>
              </div>
            </div>
            <span className="text-2xl font-bold text-gradient font-tech hidden sm:block">
              DevStores
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("templates")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Vitrine
            </button>
            <button
              onClick={() => scrollToSection("planos")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Planos
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Dúvidas
            </button>
            <button
              onClick={() => scrollToSection("expert")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Expert
            </button>
            <Button
              onClick={() => scrollToSection("contato")}
              className="bg-gradient-neon hover:shadow-glow transition-all glow-cyan"
            >
              Começar Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Fullscreen */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[120px] bg-background/98 backdrop-blur-xl z-40">
            <div className="flex flex-col items-center justify-center h-full gap-8 -mt-20">
              {[
                { label: "Vitrine", section: "templates" },
                { label: "Planos", section: "planos" },
                { label: "Dúvidas", section: "faq" },
                { label: "Expert", section: "expert" },
              ].map((item, index) => (
                <button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contato")}
                size="lg"
                className="bg-gradient-neon hover:shadow-glow transition-all mt-4 animate-fade-in delay-400"
              >
                Começar Agora
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
