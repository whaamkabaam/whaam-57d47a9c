
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
    <div className="min-h-screen bg-whaam-dark">
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
              <span className="text-whaam-red">Whaam</span>
              <span className="text-whaam-yellow">Ka</span>
              <span className="text-whaam-white">Baam</span>
            </h3>
            <p className="text-whaam-white/60 max-w-md mx-auto text-lg">
              Custom Curve Settings Tailored to Your Aim. Perfect your gaming performance with personalized mouse acceleration curves.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="font-semibold mb-4 text-whaam-red text-xl">Services</h4>
              <ul className="space-y-3 text-whaam-white/60">
                <li>3× Revisions</li>
                <li>Unlimited Revisions</li>
                <li>Live 1-on-1 Sessions</li>
                <li>Custom Curve Optimization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-whaam-yellow text-xl">Games Supported</h4>
              <ul className="space-y-3 text-whaam-white/60">
                <li>Valorant</li>
                <li>CS2</li>
                <li>Apex Legends</li>
                <li>All FPS Games</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-whaam-red text-xl">Connect</h4>
              <ul className="space-y-3 text-whaam-white/60">
                <li>hello@whaamkabaam.com</li>
                <li>Discord: @whaam_kabaam</li>
                <li>Follow us on social media</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-whaam-red/20 pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-whaam-white/60">
              <Link to="/imprint" className="hover:text-whaam-red transition-colors font-medium">
                Impressum
              </Link>
              <span className="hidden sm:inline text-whaam-yellow text-xl">•</span>
              <Link to="/privacy" className="hover:text-whaam-red transition-colors font-medium">
                Datenschutzerklärung
              </Link>
            </div>
            <p className="text-whaam-white/60">
              © 2024 WhaamKaBaam. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </div>
  );
};

export default Index;
