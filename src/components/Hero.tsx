import { Button } from "@/components/ui/button";
import { Star, Play, Users, Clock, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { LiquidDistortionFilters, LiquidGlassCard, LiquidGlassButton } from "./LiquidGlassEffects";

// StatItem component for animated statistics
const StatItem = ({ end, suffix, label }: { end: number; suffix?: string; label: string }) => {
  const counter = useAnimatedCounter({ end, suffix });
  
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-4">
        <span ref={counter.ref}>{counter.value}</span>
      </div>
      <div className="glass-text text-lg">{label}</div>
    </div>
  );
};

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Add Liquid Glass SVG Filters */}
      <LiquidDistortionFilters />
      
      {/* Liquid Glass Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static Liquid Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-accent/30 to-transparent"></div>
        
        {/* Floating Glass Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 glass-primary rounded-full liquid-glow" style={{ filter: 'url(#liquid-distortion-subtle)' }}></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 glass-secondary rounded-full liquid-glow-secondary" style={{ filter: 'url(#liquid-distortion-subtle)' }}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 glass-accent rounded-full liquid-glow-accent" style={{ filter: 'url(#liquid-distortion-subtle)' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-12">
            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight glass-text-contrast">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Custom Mouse Acceleration Curves
              </span>
              </h1>
              
              <div className="space-y-4">
                <p className="text-xl md:text-2xl glass-text leading-relaxed">
                  For <span className="text-primary font-bold">Pin-Point FPS Aim</span>
                </p>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Personalized for your DPI, games & arm-speed. Set up in 3 min – join <span className="text-secondary font-bold">750+</span> aimers winning more duels.
                </p>
              </div>
            </div>

            {/* Trust Bar */}
            <LiquidGlassCard variant="secondary" interactive={true} distortion="subtle" className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current text-secondary" size={18} />
                    ))}
                  </div>
                  <span className="glass-text-contrast font-medium">4.9/5 from 750+ aimers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="text-accent" size={20} />
                  <span className="glass-text-contrast font-medium">12K Discord</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-primary" size={20} />
                  <span className="glass-text-contrast font-medium">2.1M TikTok</span>
                </div>
              </div>
            </LiquidGlassCard>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <LiquidGlassButton 
                  variant="primary"
                  interactive={true}
                  className="relative text-lg px-8 py-4 font-bold text-white shadow-xl"
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get My Curve →
                </LiquidGlassButton>
              </div>
              
              <LiquidGlassButton 
                variant="secondary"
                interactive={true}
                className="text-lg px-8 py-4 font-bold"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="mr-2" size={20} />
                See Demo
              </LiquidGlassButton>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <LiquidGlassCard variant="accent" interactive={true} distortion="medium" className="text-center p-6">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-4">Minutes</div>
                <div className="text-muted-foreground text-lg">Fast Delivery</div>
              </LiquidGlassCard>
              
              <LiquidGlassCard variant="primary" interactive={true} distortion="medium" className="text-center p-6">
                <StatItem end={100} suffix="%" label="Satisfaction" />
              </LiquidGlassCard>
              
              <LiquidGlassCard variant="secondary" interactive={true} distortion="medium" className="text-center p-6">
                <StatItem end={4} suffix="+" label="Years Expert" />
              </LiquidGlassCard>
              
              <LiquidGlassCard variant="accent" interactive={true} distortion="medium" className="text-center p-6">
                <StatItem end={750} suffix="+" label="Happy Aimers" />
              </LiquidGlassCard>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3">
          <LiquidGlassCard 
            variant="accent" 
            interactive={true}
            className="w-8 h-12 border border-white/20 rounded-full flex justify-center cursor-pointer"
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          >
            <div className="w-2 h-4 bg-gradient-to-b from-primary to-secondary rounded-full mt-3"></div>
          </LiquidGlassCard>
        </div>
      </div>
    </section>
  );
}