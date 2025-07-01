
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Code, Palette, Target, CheckCircle } from "lucide-react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Products from "@/components/Products";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-blue-500">Lovable</span>
              <span className="text-red-500">.</span>
              <span className="text-yellow-500">dev</span>
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Custom Curve Settings Tailored to Your Aim. Perfect your gaming performance with personalized mouse acceleration curves.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>3× Revisions</li>
                <li>Unlimited Revisions</li>
                <li>Live 1-on-1 Sessions</li>
                <li>Custom Curve Optimization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Games Supported</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Valorant</li>
                <li>CS2</li>
                <li>Apex Legends</li>
                <li>All FPS Games</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>hello@lovable.dev</li>
                <li>Discord: @lovable_dev</li>
                <li>Follow us on social media</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2024 Lovable.dev. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
