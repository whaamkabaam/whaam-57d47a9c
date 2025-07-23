
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "How it Works" },
    { id: "portfolio", label: "Testimonials" },
    { id: "about", label: "About Us" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const scrollToProducts = () => {
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 glass-primary backdrop-blur-glass shadow-2xl z-50 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Liquid Glass Logo */}
          <div 
            className="text-2xl sm:text-3xl font-bold cursor-pointer hover:scale-110 transition-all duration-500 hover:drop-shadow-lg animate-float"
            onClick={() => scrollToSection("home")}
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-500">WhaamKaBaam</span>
          </div>

          {/* Liquid Glass Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`glass-accent rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 hover:scale-110 whitespace-nowrap border border-white/10 hover:border-white/20 backdrop-blur-glass ${
                  activeSection === item.id 
                    ? "text-primary bg-primary/10 border-primary/30 liquid-glow" 
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </button>
            ))}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Button 
                onClick={scrollToProducts}
                className="relative glass-primary border border-white/20 whitespace-nowrap px-6 py-2 h-10 font-bold transition-all duration-500 hover:scale-110 rounded-2xl backdrop-blur-glass bg-gradient-to-r from-primary/60 to-accent/40 hover:from-primary/80 hover:to-accent/60"
              >
                Products
              </Button>
            </div>
          </div>

          {/* Liquid Glass Mobile Menu Button */}
          <button
            className="md:hidden glass-accent rounded-2xl p-3 text-foreground hover:text-primary transition-all duration-500 hover:scale-110 min-h-[48px] min-w-[48px] flex items-center justify-center border border-white/10 backdrop-blur-glass hover:border-primary/30 hover:liquid-glow"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Liquid Glass Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 glass-secondary backdrop-blur-glass rounded-2xl shadow-2xl border border-white/5">
            <div className="flex flex-col space-y-3 pt-4 px-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left font-medium transition-all duration-500 py-4 px-6 rounded-2xl min-h-[48px] border border-white/5 backdrop-blur-glass hover:scale-105 ${
                    activeSection === item.id 
                      ? "text-primary glass-accent border-primary/30 liquid-glow" 
                      : "text-foreground glass-secondary hover:text-primary hover:border-primary/20"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </button>
              ))}
              <div className="relative group pt-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Button 
                  onClick={scrollToProducts}
                  className="relative w-full h-14 font-bold glass-primary border border-white/20 rounded-2xl backdrop-blur-glass bg-gradient-to-r from-primary/60 to-accent/40 hover:from-primary/80 hover:to-accent/60 hover:scale-105 transition-all duration-500"
                >
                  Products
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
