import { Button } from "@/components/ui/button";
import { Star, Play, Users, Clock, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { LiquidGlassCard, LiquidGlassButton } from "./LiquidGlassEffects";
import whaamLogo from "@/assets/whaam-kabaam-logo.png";

// StatItem component for animated statistics
const StatItem = ({
  end,
  suffix,
  label
}: {
  end: number;
  suffix?: string;
  label: string;
}) => {
  const counter = useAnimatedCounter({
    end,
    suffix
  });
  return <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-4">
        <span ref={counter.ref}>{counter.value}</span>
      </div>
      <div className="glass-text text-lg">{label}</div>
    </div>;
};
export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-[100svh] flex items-start justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28">
      {/* Liquid Glass Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static Liquid Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-accent/30 to-transparent"></div>
        {/* Floating Glass Orbs removed for clarity */}
      </div>


      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-12">
            {/* Headline */}
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="liquid-headline font-extrabold leading-tight text-shadow-lg">
                <span className="text-foreground">Perfect your aim with a </span>
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">custom mouse accel curve</span>
              </h1>
              
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Get dialed settings by me personally in a Live Session – or gain access to the World's First
Custom Curve Aim AI. Accurate flicks, steadier micro-adjustments, zero guesswork.</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <LiquidGlassButton variant="primary" className="relative text-lg px-8 py-4 font-bold text-white shadow-xl" onClick={() => document.getElementById("products")?.scrollIntoView({
                behavior: "smooth"
              })}>Book 1:1 Live Session</LiquidGlassButton>
              </div>
              
              <LiquidGlassButton variant="secondary" className="text-lg px-8 py-4 font-bold" onClick={() => document.getElementById("products")?.scrollIntoView({
              behavior: "smooth"
            })}>See plans (from 7$)</LiquidGlassButton>
            </div>

            {/* Micro-proof line */}
            
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <LiquidGlassCard variant="accent" className="text-center p-6">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-4">Instant</div>
                <div className="glass-text text-lg">Delivery</div>
              </LiquidGlassCard>
              
              <LiquidGlassCard variant="primary" className="text-center p-6">
                <StatItem end={100} suffix="%" label="Satisfaction" />
              </LiquidGlassCard>
              
              <LiquidGlassCard variant="secondary" className="text-center p-6">
                <StatItem end={4} suffix="+" label="Years of Experience" />
              </LiquidGlassCard>
              
              <LiquidGlassCard variant="accent" className="text-center p-6">
                <StatItem end={1100} suffix="+" label="Players Helped" />
              </LiquidGlassCard>
            </div>
          </div>
        </div>

      </div>
    </section>;
}