
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Star } from "lucide-react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const StatItem = ({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) => {
  const counter = useAnimatedCounter({ end, suffix, duration: 1200 });
  
  return (
    <div className="text-center">
      <div ref={counter.ref} className="text-4xl md:text-5xl font-bold text-primary mb-4">
        {counter.value}
      </div>
      <div className="text-muted-foreground text-lg">{label}</div>
    </div>
  );
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProducts = () => {
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-20 pb-24">
      {/* Liquid Glass Background Elements */}
      <div className="absolute inset-0">
        {/* Primary Liquid Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full blur-3xl animate-float liquid-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-secondary/25 to-primary/15 rounded-full blur-2xl animate-float liquid-glow-secondary" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-bl from-accent/30 to-secondary/20 rounded-full blur-xl animate-float liquid-glow-accent" style={{ animationDelay: '4s' }}></div>
        
        {/* Flowing Liquid Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-liquid-flow"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-accent/30 to-transparent animate-liquid-flow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        {/* Glass Hero Container */}
        <div className="glass-primary rounded-3xl p-12 md:p-16 text-center max-w-6xl mx-auto border border-white/10 shadow-2xl backdrop-blur-glass">
          {/* Main Headline */}
          <div className={`transition-all duration-1000 mb-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse-glow">
                Custom Mouse Acceleration Curves
              </span>
              <br />
              <span className="text-3xl md:text-5xl text-foreground/90">
                for Pin-Point FPS Aim
              </span>
            </h1>
          </div>

          {/* Floating Brand Name */}
          <div className={`text-2xl md:text-3xl font-bold mb-8 transition-all duration-1500 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <span className="text-foreground/80 hover:text-primary transition-colors duration-500 animate-float">WhaamKaBaam</span>
          </div>

          {/* Glass Subtitle */}
          <div className={`transition-all duration-1000 delay-500 mb-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="glass-secondary rounded-2xl p-6 mx-auto max-w-4xl border border-white/5">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Personalized for your DPI, games & arm-speed. Set up in 3 min – join <span className="text-secondary font-bold animate-pulse-glow">750+</span> aimers winning more duels.
              </p>
            </div>
          </div>

          {/* Liquid Glass Trust Bar */}
          <div className={`flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="glass-accent rounded-full px-6 py-3 flex items-center space-x-2 border border-white/10 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center text-secondary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-current animate-pulse-glow" size={18} style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium">4.9/5 Rating</span>
            </div>
            <div className="glass-accent rounded-full px-6 py-3 text-sm text-muted-foreground border border-white/10 hover:scale-105 transition-transform duration-300">
              Discord: <span className="text-foreground font-bold">51k</span> members
            </div>
            <div className="glass-accent rounded-full px-6 py-3 text-sm text-muted-foreground border border-white/10 hover:scale-105 transition-transform duration-300">
              TikTok: <span className="text-foreground font-bold">75k</span> followers
            </div>
            <div className="glass-accent rounded-full px-6 py-3 text-sm text-muted-foreground border border-white/10 hover:scale-105 transition-transform duration-300">
              Trusted by <span className="text-foreground font-bold">Valorant, Apex & CS2</span> players
            </div>
          </div>

          {/* Liquid Glass CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 mb-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-3xl blur-lg opacity-60 group-hover:opacity-100 animate-pulse-glow transition-opacity duration-300"></div>
              <Button 
                onClick={scrollToProducts}
                size="lg" 
                className="relative glass-primary border border-white/20 px-10 py-6 text-xl font-bold group h-16 min-w-[240px] bg-gradient-to-r from-primary/80 to-accent/60 hover:from-primary hover:to-accent transition-all duration-500 hover:scale-105 rounded-3xl backdrop-blur-glass"
                aria-label="Download mouse acceleration curve settings"
              >
                Get My Curve
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={24} />
              </Button>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              <Button 
                size="lg"
                className="relative glass-secondary border border-white/10 px-10 py-6 text-xl h-16 min-w-[240px] font-bold hover:scale-105 transition-all duration-500 rounded-3xl backdrop-blur-glass hover:bg-glass-accent"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Watch 2-min Demo
              </Button>
            </div>
          </div>

          {/* Liquid Glass Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="glass-secondary rounded-2xl p-8 border border-white/10 hover:scale-105 transition-all duration-500 hover:glass-accent">
              <StatItem end={500} suffix="+" label="Satisfied Gamers" />
            </div>
            <div className="glass-secondary rounded-2xl p-8 border border-white/10 hover:scale-105 transition-all duration-500 hover:glass-accent" style={{ animationDelay: '0.2s' }}>
              <StatItem end={4} suffix="+" label="Years Experience" />
            </div>
            <div className="glass-secondary rounded-2xl p-8 border border-white/10 hover:scale-105 transition-all duration-500 hover:glass-accent" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-pulse-glow">Minutes</div>
                <div className="text-muted-foreground text-lg">Fast Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liquid Glass Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="glass-accent w-8 h-12 border border-white/20 rounded-full flex justify-center backdrop-blur-glass hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
          <div className="w-2 h-4 bg-gradient-to-b from-primary to-secondary rounded-full mt-3 animate-pulse-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
