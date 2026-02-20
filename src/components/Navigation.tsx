import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LiquidGlassCard, LiquidGlassButton } from "./LiquidGlassEffects";
import { useAuth } from "@/contexts/AuthContext";

const whaamLogo = "/lovable-uploads/25252925-5ec6-4d83-aa0a-70a6e27f7b9e.png";

interface NavigationProps {
  activeSection?: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' ? window.scrollY > 50 : false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Suppress transitions on mount — snap to correct state instantly
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ transform: 'translateZ(0)' }}>
        <LiquidGlassCard 
          variant="primary"
          glassVariant="nav"
          className={`mt-2 p-2 px-4 rounded-2xl w-full ${
            mounted ? 'transition-[max-width] duration-500 ease-out' : ''
          } ${
            scrolled ? (isAuthenticated ? 'max-w-[500px] mx-auto' : 'max-w-[620px] mx-auto') : 'max-w-[1400px] mx-auto'
          }`}
          style={{ willChange: 'max-width' }}
        >
          <div className={`flex items-center ${scrolled ? 'gap-4' : 'gap-8'}`}>
            {/* Logo */}
            <div className="flex items-center space-x-2 shrink-0">
              <img 
                src={whaamLogo} 
                alt="WHAAM KABAAM Logo" 
                className="w-16 h-16 object-contain transition-all duration-500 ease-out"
              />
              <span className={`text-xl font-bold glass-text-contrast whitespace-nowrap ${
                mounted ? 'transition-all duration-500 ease-out' : ''
              } ${
                scrolled ? 'opacity-0 max-w-0 overflow-hidden scale-95 blur-[2px] -translate-x-1' : 'opacity-100 max-w-[200px] scale-100 blur-0 translate-x-0'
              }`}>whaamkabaam</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-5 ml-auto">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  className={`glass-text-contrast hover:text-primary transition-all duration-300 font-medium text-[15px] ${
                    activeSection === item.href ? 'text-primary' : ''
                  }`}
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.label}
                </button>
              ))}
            
              <div className="flex items-center gap-4">
                {isLoading ? (
                  <div className="h-[36px] w-[140px]" />
                ) : isAuthenticated ? (
                  <LiquidGlassButton 
                    variant="primary"
                    className="px-5 py-1.5 font-bold text-[15px]"
                    onClick={() => navigate("/studio")}
                  >
                    Studio
                  </LiquidGlassButton>
                ) : (
                  <>
                    <button
                      className="glass-text-contrast hover:text-primary transition-colors duration-300 font-medium text-[15px]"
                      onClick={() => navigate("/auth")}
                    >
                      Sign In
                    </button>
                    <LiquidGlassButton 
                      variant="primary"
                      className="px-5 py-1.5 font-bold text-[15px]"
                      onClick={() => scrollToSection("products")}
                    >
                      See Plans
                    </LiquidGlassButton>
                  </>
                )}
              </div>
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
              
              <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                {isAuthenticated ? (
                  <LiquidGlassButton 
                    variant="primary"
                    className="w-full mt-4 py-2.5 font-bold text-sm"
                    onClick={() => {
                      navigate("/studio");
                      setIsMenuOpen(false);
                    }}
                  >
                    Studio
                  </LiquidGlassButton>
                ) : (
                  <>
                    <LiquidGlassButton 
                      variant="primary"
                      className="w-full mt-4 py-2.5 font-bold text-sm"
                      onClick={() => {
                        scrollToSection("products");
                        setIsMenuOpen(false);
                      }}
                    >
                      See Plans
                    </LiquidGlassButton>
                    <button
                      className="w-full mt-3 py-2 glass-text-contrast hover:text-primary transition-colors duration-300 font-medium text-sm text-center"
                      onClick={() => {
                        navigate("/auth");
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>
          </LiquidGlassCard>
        )}
      </LiquidGlassCard>
    </nav>
    </>
  );
}