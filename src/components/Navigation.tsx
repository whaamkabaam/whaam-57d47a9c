import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidGlassCard, LiquidGlassButton } from "./LiquidGlassEffects";
// Using direct URL for the logo
const whaamLogo = "/lovable-uploads/25252925-5ec6-4d83-aa0a-70a6e27f7b9e.png";

interface NavigationProps {
  activeSection?: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
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
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <LiquidGlassCard 
          variant="primary"
          className="mx-6 mt-2 p-3"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src={whaamLogo} 
                alt="WHAAM KABAAM Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold glass-text-contrast">whaamkabaam</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  className={`glass-text-contrast hover:text-primary transition-colors duration-300 font-medium ${
                    activeSection === item.href ? 'text-primary' : ''
                  }`}
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.label}
                </button>
              ))}
            
            <LiquidGlassButton 
              variant="primary"
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
                  className={`glass-text-contrast hover:text-primary transition-colors duration-300 text-lg font-medium text-left ${
                    activeSection === item.href ? 'text-primary' : ''
                  }`}
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