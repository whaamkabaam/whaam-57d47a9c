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
  return <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Become the Best Aimer you can be – in any Game, through Custom Curve
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Get dialed settings by me personally in a Live Session – or gain access to the Word's First Custom Curve Aim AI. Faster flicks, steadier micro-aim, zero guesswork.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LiquidGlassButton 
              variant="primary" 
              className="text-lg px-8 py-4 font-bold" 
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book 1:1 Live Session
            </LiquidGlassButton>
            
            <LiquidGlassButton 
              variant="secondary" 
              className="text-lg px-8 py-4 font-bold" 
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              See plans (from 7$)
            </LiquidGlassButton>
          </div>

          {/* Stats Strip */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">2 Min</div>
              <div className="text-sm text-muted-foreground">Fast Delivery</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                <span ref={useAnimatedCounter({ end: 100, suffix: "%" }).ref}>
                  {useAnimatedCounter({ end: 100, suffix: "%" }).value}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                <span ref={useAnimatedCounter({ end: 4, suffix: "+" }).ref}>
                  {useAnimatedCounter({ end: 4, suffix: "+" }).value}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                <span ref={useAnimatedCounter({ end: 1100, suffix: "+" }).ref}>
                  {useAnimatedCounter({ end: 1100, suffix: "+" }).value}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Players Helped</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}