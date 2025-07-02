
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
    { id: "services", label: "Wie es funktioniert" },
    { id: "portfolio", label: "Testimonials" },
    { id: "about", label: "Über uns" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Kontakt" },
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
    <nav className="fixed top-0 left-0 right-0 bg-whaam-dark/95 backdrop-blur-sm shadow-lg z-50 border-b-2 border-whaam-red/20">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - nur WhaamKaBaam */}
          <div 
            className="text-2xl sm:text-3xl font-bold cursor-pointer hover:scale-105 transition-transform"
            onClick={() => scrollToSection("home")}
          >
            <span className="text-whaam-red">Whaam</span>
            <span className="text-whaam-yellow">Ka</span>
            <span className="text-whaam-white">Baam</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 hover:text-whaam-red hover:scale-105 whitespace-nowrap ${
                  activeSection === item.id ? "text-whaam-red" : "text-whaam-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={scrollToProducts}
              className="bg-whaam-red hover:bg-whaam-red/80 text-whaam-white whitespace-nowrap border-0 px-6 py-2 h-10 font-bold transition-all duration-300 hover:scale-105"
            >
              Zu den Produkten
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 text-whaam-white hover:text-whaam-red transition-colors hover:scale-110 min-h-[48px] min-w-[48px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t-2 border-whaam-red/20 bg-whaam-dark/95 backdrop-blur-sm rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-4 pt-4 px-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left font-medium transition-colors hover:text-whaam-red py-3 px-4 rounded min-h-[48px] ${
                    activeSection === item.id ? "text-whaam-red bg-whaam-red/10 border border-whaam-red/20" : "text-whaam-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={scrollToProducts}
                className="bg-whaam-red hover:bg-whaam-red/80 text-whaam-white w-full border-0 h-12 font-bold"
              >
                Zu den Produkten
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
