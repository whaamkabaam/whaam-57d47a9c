import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check, X, Zap, Users, Target, ArrowRight, Shield, Trophy, Mouse } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LiquidGlassCard, LiquidGlassButton } from "./LiquidGlassEffects";

const Products = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetCurve = (planName: string, price: string, planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: `${planName} Selected! 🎯`,
      description: `Ready to perfect your aim with ${planName} for ${price}? Let's get started!`,
    });
  };

  const plans = [
    {
      id: "self-serve-39",
      name: "Self-Serve",
      price: "$39",
      badge: "DIY",
      badgeColor: "bg-secondary text-primary font-bold",
      description: "For players who like to tinker and figure things out themselves.",
      deliveryTime: "Get your curve in 1–3 days",
      features: [
        { text: "Custom Curve delivered in minutes", included: true },
        { text: "Works with any FPS game", included: true },
        { text: "3 guided revisions via Discord", included: true },
        { text: "One-time payment", included: true },
        { text: "No live 1-on-1 session", included: false },
        { text: "No unlimited revisions", included: false },
      ],
      cta: "Get My Curve – $39",
      micro: "One-time payment • No subscription",
      icon: Mouse,
      highlight: false
    },
    {
      id: "self-serve-pro-47",
      name: "Self-Serve Pro",
      price: "$47",
      badge: "Most Popular",
      badgeColor: "bg-gradient-to-r from-primary to-secondary text-white font-bold",
      description: "For players who want room to dial it in until it's perfect.",
      deliveryTime: "Get your curve in 1–3 days + unlimited tweaks",
      features: [
        { text: "Custom Curve delivered in minutes", included: true },
        { text: "Works with any FPS game", included: true },
        { text: "Unlimited revisions (24–48h async)", included: true, highlight: true },
        { text: "Satisfaction guarantee", included: true },
        { text: "One-time payment", included: true },
        { text: "No live 1-on-1 session", included: false },
      ],
      cta: "Get Unlimited – $47",
      micro: "One-time payment • Satisfaction guaranteed",
      icon: Target,
      highlight: true,
      popular: true
    },
    {
      id: "live-149",
      name: "Live 1-on-1 Session",
      price: "$149",
      badge: "Done in 45 min",
      badgeColor: "bg-accent text-white font-bold",
      description: "For players who want it done right, right now—no back-and-forth.",
      deliveryTime: "Walk away with your perfect curve today",
      emphasis: "⚡ Perfect curve in ~45 minutes",
      features: [
        { text: "Live screen-share session with me", included: true },
        { text: "Perfect curve tuned in ~45 minutes", included: true },
        { text: "Works with any FPS game", included: true },
        { text: "Unlimited revisions included", included: true },
        { text: "Satisfaction guarantee", included: true },
        { text: "One-time payment", included: true },
      ],
      cta: "Book Live Session – $149",
      micro: "Limited slots • One-time payment",
      icon: Users,
      highlight: false,
      premium: true
    }
  ];

  const benefits = [
    { icon: Shield, title: "100% Satisfaction Guarantee", desc: "Unlimited tweaks until you're happy—or your money back." },
    { icon: Zap, title: "First Curve in Minutes", desc: "Your personalized curve delivered fast, not days." },
    { icon: Trophy, title: "750+ Players Helped", desc: "Join a growing community of aimers who leveled up." }
  ];

  return (
    <section id="products" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold glass-text-contrast mb-6 leading-tight">
            Pick your plan,
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mt-2">
              lock in your aim.
            </span>
          </h2>
          
          <p className="text-lg md:text-xl glass-text max-w-3xl mx-auto">
            Every plan gets you a Custom Curve built for your game, your sens, your mechanics. 
            The only difference? How fast you want it and how much hand-holding you need.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16 pt-8">
          {plans.map((plan) => (
            <LiquidGlassCard
              key={plan.id}
              variant={plan.highlight ? "primary" : plan.premium ? "accent" : "secondary"}
              className={`group text-center min-h-[560px] flex flex-col transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02] ${
                plan.highlight ? 'ring-2 ring-secondary/50 scale-[1.02]' : ''
              } ${hoveredPlan === plan.id ? 'scale-[1.02]' : ''} ${
                selectedPlan === plan.id ? 'ring-2 ring-primary/50' : ''
              }`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                <Badge className={`${plan.badgeColor} px-5 py-1.5 text-sm shadow-xl border-0 hover:scale-110 transition-all duration-300 whitespace-nowrap`}>
                  {plan.badge}
                </Badge>
              </div>

              {/* Popular Plan Glow Effect */}
              {plan.popular && (
                <div className="absolute inset-0 bg-primary/5 pointer-events-none rounded-[inherit]"></div>
              )}

              <div className="text-center pt-14 pb-4 flex-shrink-0 px-6">
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                  plan.highlight ? 'glass-primary liquid-glow' : plan.premium ? 'glass-accent liquid-glow-accent' : 'glass-secondary liquid-glow-secondary'
                }`}>
                  <plan.icon className="text-primary" size={28} />
                </div>
                
                <h3 className="text-xl font-bold glass-text-contrast mb-2">
                  {plan.name}
                </h3>
                
                <p className="glass-text text-sm mb-4 px-2 leading-relaxed min-h-[40px]">
                  {plan.description}
                </p>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-4xl font-black glass-text-contrast">
                    {plan.price}
                  </span>
                </div>

                <div className="text-secondary font-medium text-sm mb-2">
                  {plan.deliveryTime}
                </div>

                {plan.emphasis && (
                  <LiquidGlassCard variant="accent" className="text-accent font-semibold text-sm px-3 py-1.5 mx-auto inline-flex items-center gap-1">
                    {plan.emphasis}
                  </LiquidGlassCard>
                )}
              </div>

              <div className="px-6 flex-grow flex flex-col">
                <ul className="space-y-3 mb-6 flex-grow text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2.5">
                      {feature.included ? (
                        <Check className={`flex-shrink-0 mt-0.5 ${feature.highlight ? 'text-primary' : 'text-secondary'}`} size={16} />
                      ) : (
                        <X className="text-muted-foreground/50 flex-shrink-0 mt-0.5" size={16} />
                      )}
                      <span className={`text-sm leading-relaxed ${
                        feature.included 
                          ? feature.highlight 
                            ? 'glass-text-contrast font-medium' 
                            : 'glass-text'
                          : 'text-muted-foreground/60'
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div className="mt-auto pb-6">
                  <LiquidGlassButton 
                    variant={plan.highlight ? "primary" : plan.premium ? "accent" : "primary"}
                    className="w-full font-bold text-base py-3"
                    onClick={() => handleGetCurve(plan.name, plan.price, plan.id)}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </LiquidGlassButton>

                  {/* Microline */}
                  {plan.micro && (
                    <div className="text-center mt-3 text-xs text-muted-foreground">
                      {plan.micro}
                    </div>
                  )}
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* Benefits Section */}
        <LiquidGlassCard variant="primary" className="p-8 md:p-10">
          <h3 className="text-2xl md:text-3xl font-bold text-center glass-text-contrast mb-10">
            Why choose <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">WHAAMKABAAM</span>?
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-3 glass-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110 liquid-glow-accent">
                  <benefit.icon className="text-primary" size={24} />
                </div>
                <h4 className="text-lg font-semibold glass-text-contrast mb-1.5">{benefit.title}</h4>
                <p className="glass-text text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </LiquidGlassCard>
      </div>
    </section>
  );
};

export default Products;