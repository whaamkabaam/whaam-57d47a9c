
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
import InteractiveBackground from "@/components/InteractiveBackground";

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
    <>
      <div className="min-h-screen bg-background relative">
        <InteractiveBackground />
      <Navigation activeSection={activeSection} />
      
      <section id="home">
        <Hero />
      </section>

      <section id="services" className="py-24 bg-whaam-dark">
        <Services />
      </section>

      <section id="portfolio" className="py-24 bg-whaam-black">
        <Portfolio />
      </section>

      <section id="products" className="py-24 bg-whaam-dark">
        <Products />
      </section>

      <section id="about" className="py-24 bg-whaam-black">
        <About />
      </section>

      <section id="faq" className="py-24 bg-whaam-dark">
        <FAQ />
      </section>

      <section id="contact" className="py-24 bg-whaam-black">
        <Contact />
      </section>

      {/* Footer */}
      <footer className="bg-whaam-black text-white py-16 border-t-2 border-whaam-red/20">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent">WhaamKaBaam</span>
            </h3>
            <p className="text-whaam-white/60 max-w-md mx-auto text-lg">
              Custom Curve Settings Tailored to Your Aim. Perfect your gaming performance with personalized mouse acceleration curves.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="font-semibold mb-4 text-orange-500 text-xl">Services</h4>
              <ul className="space-y-3 text-whaam-white/60">
                <li><a href="#products" className="hover:text-whaam-yellow transition-all duration-300 hover:scale-105">3× Revisions</a></li>
                <li><a href="#products" className="hover:text-whaam-yellow transition-all duration-300 hover:scale-105">Unlimited Revisions</a></li>
                <li><a href="#products" className="hover:text-whaam-yellow transition-all duration-300 hover:scale-105">Live 1-on-1 Sessions</a></li>
                <li><a href="#products" className="hover:text-whaam-yellow transition-all duration-300 hover:scale-105">Custom Curve Optimization</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-whaam-yellow text-xl">Games Supported</h4>
              <ul className="space-y-3 text-whaam-white/60">
                <li><a href="https://playvalorant.com" target="_blank" rel="noopener noreferrer" className="hover:text-whaam-yellow transition-all duration-300 hover:scale-105">Valorant</a></li>
                <li><a href="https://counter-strike.net" target="_blank" rel="noopener noreferrer" className="hover:text-whaam-yellow transition-all duration-300 hover:scale-105">CS2</a></li>
                <li><a href="https://apexlegends.com" target="_blank" rel="noopener noreferrer" className="hover:text-whaam-yellow transition-all duration-300 hover:scale-105">Apex Legends</a></li>
                <li><a href="#" className="hover:text-whaam-yellow transition-all duration-300 hover:scale-105">All FPS Games</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-orange-500 text-xl">Connect</h4>
              <ul className="space-y-3 text-whaam-white/60">
                <li><a href="mailto:hello@whaamkabaam.com" className="hover:text-whaam-yellow transition-all duration-300 hover:scale-105">hello@whaamkabaam.com</a></li>
                <li><a href="https://discord.gg/whaamkabaam" target="_blank" rel="noopener noreferrer" className="hover:text-whaam-yellow transition-all duration-300 hover:scale-105">Discord: @whaam_kabaam</a></li>
                <li><a href="https://twitter.com/whaamkabaam" target="_blank" rel="noopener noreferrer" className="hover:text-whaam-yellow transition-all duration-300 hover:scale-105">Follow us on social media</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-whaam-red/20 pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-whaam-white/60">
              <Link to="/terms" className="hover:text-whaam-red transition-colors font-medium">
                Terms of Service
              </Link>
              <span className="hidden sm:inline text-whaam-yellow text-xl">•</span>
              <Link to="/privacy" className="hover:text-whaam-red transition-colors font-medium">
                Privacy Policy
              </Link>
            </div>
            <p className="text-whaam-white/60">
              © {new Date().getFullYear()} <span className="bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent">WhaamKaBaam</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <CookieConsent />
      </div>
    </>
  );
};

export default Index;
