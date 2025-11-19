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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 perspective-1000">
              <div className="w-full h-full relative preserve-3d animate-spin-slow">
                <div className="absolute inset-0 bg-gradient-neon rounded-lg opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center text-primary text-2xl font-bold">
                  DS
                </div>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              DevStores
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("templates")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Templates
            </button>
            <button
              onClick={() => scrollToSection("planos")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Planos
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-foreground hover:text-primary transition-colors"
            >
              FAQ
            </button>
            <Button
              onClick={() => scrollToSection("contato")}
              className="bg-gradient-neon hover:shadow-glow transition-all"
            >
              Começar Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <button
              onClick={() => scrollToSection("templates")}
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Templates
            </button>
            <button
              onClick={() => scrollToSection("planos")}
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Planos
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              FAQ
            </button>
            <Button
              onClick={() => scrollToSection("contato")}
              className="w-full bg-gradient-neon hover:shadow-glow transition-all"
            >
              Começar Agora
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
