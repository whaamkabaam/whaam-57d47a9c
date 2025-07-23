import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidDistortionFilters, LiquidGlassCard, LiquidGlassButton } from "./LiquidGlassEffects";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "How", href: "services" },
    { label: "Pricing", href: "products" },
    { label: "About", href: "about" },
    { label: "Contact", href: "contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <>
      <LiquidDistortionFilters />
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <LiquidGlassCard 
          variant="primary"
          className="mx-6 mt-4 p-4"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 glass-accent rounded-xl flex items-center justify-center liquid-glow">
                <span className="text-primary font-bold text-xl">W</span>
              </div>
              <span className="text-2xl font-bold glass-text-contrast">WhaamKaBaam</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  className="glass-text-contrast hover:text-primary transition-colors duration-300 font-medium"
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.label}
                </button>
              ))}
            
            <LiquidGlassButton 
              variant="primary"
              interactive={true}
              className="px-6 py-2 font-bold"
              onClick={() => scrollToSection("products")}
            >
              Get Started
            </LiquidGlassButton>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden glass-button p-2 rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <LiquidGlassCard 
            variant="secondary"
            className="md:hidden mt-4 p-6"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  className="glass-text-contrast hover:text-primary transition-colors duration-300 text-lg font-medium text-left"
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
              
              <LiquidGlassButton 
                variant="primary"
                interactive={true}
                className="w-full mt-4 py-3 font-bold"
                onClick={() => {
                  scrollToSection("products");
                  setIsMenuOpen(false);
                }}
              >
                Get Started
              </LiquidGlassButton>
            </div>
          </LiquidGlassCard>
        )}
      </LiquidGlassCard>
    </nav>
    </>
  );
}