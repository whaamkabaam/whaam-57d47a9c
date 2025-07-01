
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
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold cursor-pointer" onClick={() => scrollToSection("home")}>
            <span className="text-blue-500">Lovable</span>
            <span className="text-red-500">.</span>
            <span className="text-yellow-500">dev</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-blue-500 whitespace-nowrap ${
                  activeSection === item.id ? "text-blue-500" : "text-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={scrollToProducts}
              className="bg-blue-500 hover:bg-blue-600 text-white whitespace-nowrap"
            >
              Zu den Produkten
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t bg-white/95 backdrop-blur-sm rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-4 pt-4 px-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left font-medium transition-colors hover:text-blue-500 py-2 px-3 rounded ${
                    activeSection === item.id ? "text-blue-500 bg-blue-50" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button 
                onClick={scrollToProducts}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full"
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
