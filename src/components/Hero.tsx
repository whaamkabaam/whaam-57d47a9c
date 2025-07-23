
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
    <div className="min-h-screen bg-whaam-dark text-white relative overflow-hidden pt-20 pb-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-whaam-red/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-whaam-yellow/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-whaam-red/15 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <div className={`transition-all duration-1000 mb-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent">
                Custom Mouse Acceleration Curves
              </span>
              <br />
              for Pin-Point FPS Aim
            </h1>
          </div>

          {/* Simplified Brand Name */}
          <div className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1500 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <span className="text-whaam-white">WhaamKaBaam</span>
          </div>

          {/* Subtitle */}
          <div className={`transition-all duration-1000 delay-500 mb-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Personalized for your DPI, games & arm-speed. Set up in 3 min – join <span className="text-whaam-yellow font-semibold">750+</span> aimers winning more duels.
            </p>
          </div>

          {/* Enhanced Trust Bar */}
          <div className={`flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center text-whaam-yellow">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-current" size={16} />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">4.9/5 Rating</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Discord: <span className="text-whaam-white font-semibold">51k</span> members
            </div>
            <div className="text-sm text-muted-foreground">
              TikTok: <span className="text-whaam-white font-semibold">75k</span> followers
            </div>
            <div className="text-sm text-muted-foreground">
              Trusted by <span className="text-whaam-white font-semibold">Valorant, Apex & CS2</span> players
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 mb-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button 
              onClick={scrollToProducts}
              variant="whaam"
              size="lg" 
              className="px-8 py-4 text-lg font-semibold group h-14 min-w-[200px]"
              aria-label="Download mouse acceleration curve settings"
            >
              Get My Curve
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button 
              variant="whaam-outline"
              size="lg"
              className="px-8 py-4 text-lg h-14 min-w-[200px] font-semibold"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              Watch 2-min Demo
            </Button>
          </div>

          {/* Key Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <StatItem end={500} suffix="+" label="Satisfied Gamers" />
            <StatItem end={4} suffix="+" label="Years Experience" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-4">Minutes</div>
              <div className="text-muted-foreground text-lg">Fast Delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-whaam-yellow/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-whaam-yellow/60 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
