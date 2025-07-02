
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
    <nav className="fixed top-0 left-0 right-0 bg-whaam-dark/95 backdrop-blur-sm shadow-lg z-50 border-b border-whaam-red/20">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold cursor-pointer" onClick={() => scrollToSection("home")}>
            <span className="text-whaam-red">Whaam</span>
            <span className="text-whaam-yellow">Ka</span>
            <span className="text-whaam-white">Baam</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-whaam-red whitespace-nowrap ${
                  activeSection === item.id ? "text-whaam-red" : "text-whaam-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={scrollToProducts}
              className="bg-whaam-red hover:bg-whaam-red/80 text-white whitespace-nowrap border-0"
            >
              Zu den Produkten
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-whaam-white hover:text-whaam-red transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-whaam-red/20 bg-whaam-dark/95 backdrop-blur-sm rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-4 pt-4 px-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left font-medium transition-colors hover:text-whaam-red py-2 px-3 rounded ${
                    activeSection === item.id ? "text-whaam-red bg-whaam-red/10" : "text-whaam-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={scrollToProducts}
                className="bg-whaam-red hover:bg-whaam-red/80 text-white w-full border-0"
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
