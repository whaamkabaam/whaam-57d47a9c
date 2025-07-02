
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Code, Palette, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Products from "@/components/Products";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "portfolio", "products", "about", "faq", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeSection={activeSection} />
      
      <section id="home">
        <Hero />
      </section>

      <section id="services" className="py-20">
        <Services />
      </section>

      <section id="portfolio" className="py-20 bg-white">
        <Portfolio />
      </section>

      <section id="products" className="py-20">
        <Products />
      </section>

      <section id="about" className="py-20 bg-white">
        <About />
      </section>

      <section id="faq" className="py-20 bg-gray-50">
        <FAQ />
      </section>

      <section id="contact" className="py-20 bg-white">
        <Contact />
      </section>

      {/* Comic-Style Footer */}
      <footer className="bg-comic-black text-white py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle, #FF3B3B 1px, transparent 1px)`,
          backgroundSize: '25px 25px'
        }}></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <h3 className="font-bangers text-4xl mb-4">
              <span className="text-fire-red">WHAAAM</span>
              <span className="text-boom-yellow">KA</span>
              <span className="text-white">BAAM</span>
            </h3>
            <p className="font-russo text-gray-300 max-w-md mx-auto">
              Custom Curve Settings für dein perfektes Aim. 
              <span className="text-boom-yellow font-bold"> EXPLOSIVE PERFORMANCE</span> garantiert!
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bangers text-xl mb-3 text-fire-red">SERVICES</h4>
              <ul className="space-y-2 text-gray-300 font-russo">
                <li>3× Revisions</li>
                <li>Unlimited Revisions</li>
                <li>Live 1-on-1 Sessions</li>
                <li>Custom Curve Optimization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bangers text-xl mb-3 text-boom-yellow">GAMES</h4>
              <ul className="space-y-2 text-gray-300 font-russo">
                <li>Valorant</li>
                <li>CS2</li>
                <li>Apex Legends</li>
                <li>Alle FPS Games</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bangers text-xl mb-3 text-fire-red">KONTAKT</h4>
              <ul className="space-y-2 text-gray-300 font-russo">
                <li>hello@lovable.dev</li>
                <li>Discord: @lovable_dev</li>
                <li>Community Support 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 space-y-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-400 font-russo">
              <Link to="/imprint" className="hover:text-boom-yellow transition-colors">
                Impressum
              </Link>
              <span className="hidden sm:inline text-fire-red">•</span>
              <Link to="/privacy" className="hover:text-boom-yellow transition-colors">
                Datenschutzerklärung
              </Link>
            </div>
            <p className="text-gray-400 font-russo">
              © 2024 WhaamKaBaam.com - <span className="text-fire-red">BOOM!</span> All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </div>
  );
};

export default Index;
