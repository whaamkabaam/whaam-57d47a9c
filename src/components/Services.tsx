import { FileText, Settings, Target, CheckCircle, Clock, Shield, Users, Star } from "lucide-react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { LiquidGlassCard, LiquidGlassButton } from "./LiquidGlassEffects";

interface TrustStatItemProps {
  end: number;
  suffix?: string;
  value?: string;
  label: string;
  color: string;
  delay?: number;
}

const TrustStatItem = ({ end, suffix = "", value, label, color, delay = 0 }: TrustStatItemProps) => {
  const counter = end > 0 ? useAnimatedCounter({ 
    end, 
    suffix, 
    duration: 2000,
    start: 0 
  }) : null;

  return (
    <LiquidGlassCard 
      variant="accent" 
      className="group p-6 hover:border-white/20 transition-all duration-300"
    >
      <div className={`text-5xl font-bold ${color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
        {counter ? <span ref={counter.ref}>{counter.value}</span> : value}
      </div>
      <div className="glass-text-contrast text-lg font-medium">{label}</div>
    </LiquidGlassCard>
  );
};

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Glass Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 right-20 w-40 h-40 glass-primary rounded-full liquid-glow" style={{ filter: 'url(#liquid-distortion-subtle)' }}></div>
        <div className="absolute bottom-20 left-32 w-28 h-28 glass-secondary rounded-full liquid-glow-secondary" style={{ filter: 'url(#liquid-distortion-subtle)' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 glass-text-contrast">
            How it <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">works</span>
          </h2>
          <p className="text-xl glass-text max-w-3xl mx-auto">
            Get your personalized mouse acceleration curve in 4 simple steps. Our expert-crafted system delivers professional-grade precision in minutes.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: FileText,
              title: "Order & Provide Info",
              description: "Tell us your DPI, games, and preferences",
              details: [
                "Your current DPI settings",
                "Primary games you play", 
                "Arm vs wrist aiming style",
                "Current sensitivity preferences"
              ]
            },
            {
              icon: Settings,
              title: "Personalized Setup", 
              description: "We craft your custom acceleration curve",
              details: [
                "Mathematical curve optimization",
                "Game-specific adjustments",
                "Hardware compatibility check",
                "Performance fine-tuning"
              ]
            },
            {
              icon: Target,
              title: "Fine-tuning",
              description: "Test and perfect your new setup",
              details: [
                "Initial testing period",
                "Feedback incorporation",
                "Minor adjustments",
                "Validation & approval"
              ]
            },
            {
              icon: CheckCircle,
              title: "Perfect Aim Delivered",
              description: "Enjoy your enhanced gaming performance",
              details: [
                "Installation guide included",
                "24/7 support access",
                "Future update eligibility", 
                "Community access"
              ]
            }
          ].map((step, index) => (
            <LiquidGlassCard 
              key={index}
              variant={index % 3 === 0 ? "primary" : index % 3 === 1 ? "secondary" : "accent"}
              className="group p-8 text-center hover:scale-105 transition-all duration-500"
            >
              <div className="mb-6">
                <div className="glass-primary w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 liquid-glow">
                  <step.icon className="text-primary group-hover:text-accent transition-colors duration-500" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-all duration-300 group-hover:scale-105">
                  {step.title}
                </h3>
                
                <p className="glass-text text-lg mb-6 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              <div className="space-y-3">
                {step.details.map((detail, detailIndex) => (
                  <div 
                    key={detailIndex}
                    className="flex items-start space-x-3 text-left group-hover:translate-x-1 transition-transform duration-300"
                    style={{ transitionDelay: `${detailIndex * 50}ms` }}
                     >
                        <CheckCircle className="text-secondary flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:text-primary transition-all duration-300" size={16} />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-500 font-medium">{detail}</span>
                      </div>
                ))}
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* Trust Statistics */}
        <LiquidGlassCard 
          variant="primary"
          className="text-center p-12"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-6 glass-text-contrast">
            Trusted by <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">500+</span> gamers <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">worldwide</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <TrustStatItem 
              end={15} 
              suffix="min" 
              label="Average Delivery" 
              color="text-primary"
            />
            <TrustStatItem 
              end={100} 
              suffix="%" 
              label="Satisfaction Rate" 
              color="text-secondary"
            />
            <TrustStatItem 
              end={750} 
              suffix="+" 
              label="Happy Customers" 
              color="text-accent"
            />
          </div>
        </LiquidGlassCard>
      </div>
    </section>
  );
}