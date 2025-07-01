
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Code, Palette, Target, CheckCircle } from "lucide-react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "portfolio", "about", "contact"];
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

      <section id="about" className="py-20">
        <About />
      </section>

      <section id="contact" className="py-20 bg-white">
        <Contact />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-blue-500">Whaam</span>
              <span className="text-red-500">Ka</span>
              <span className="text-yellow-500">Baam</span>
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Digital Creativity That Hits Differently. Creating impactful experiences that drive results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Branding & Identity</li>
                <li>Web Design & Development</li>
                <li>Creative Campaigns</li>
                <li>Strategy & Consulting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Industries</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Startups</li>
                <li>Technology</li>
                <li>Fashion & Lifestyle</li>
                <li>E-commerce</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>hello@whaamkabaam.com</li>
                <li>+1 (555) 123-4567</li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2024 WhaamKaBaam. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
