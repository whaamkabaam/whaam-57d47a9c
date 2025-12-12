import { useState } from "react";
import { Check, X, ArrowRight, Shield, Zap, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LiquidGlassCard, LiquidGlassButton } from "./LiquidGlassEffects";

const Products = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetCurve = (planName: string, price: string, planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: `${planName} Selected!`,
      description: `Ready to perfect your aim with ${planName} for ${price}? Let's get started!`,
    });
  };

  const plans = [
    {
      id: "self-serve-39",
      name: "Self-Serve",
      price: "$39",
      badge: "DIY",
      description: "For players who like to tinker and figure things out on their own.",
      deliveryTime: "First curve in minutes • Dialed in over 1–3 days",
      features: [
        { text: "Custom Curve delivered in minutes", included: true },
        { text: "Works with any FPS game", included: true },
        { text: "3 guided revisions via Discord", included: true },
        { text: "One-time payment", included: true },
        { text: "No live 1-on-1 session", included: false },
        { text: "No unlimited revisions", included: false },
      ],
      cta: "Get My Curve — $39",
      micro: "One-time payment • No subscription",
      highlight: false
    },
    {
      id: "self-serve-pro-47",
      name: "Self-Serve Pro",
      price: "$47",
      badge: "Most Popular",
      description: "For players who want room to tweak until it feels perfect.",
      deliveryTime: "First curve in minutes • Unlimited tweaks over 1–3 days",
      features: [
        { text: "Custom Curve delivered in minutes", included: true },
        { text: "Works with any FPS game", included: true },
        { text: "Unlimited revisions (24–48h async)", included: true, highlight: true },
        { text: "Satisfaction guarantee", included: true, highlight: true },
        { text: "One-time payment", included: true },
        { text: "No live 1-on-1 session", included: false },
      ],
      cta: "Get Unlimited — $47",
      micro: "One-time payment • Satisfaction guaranteed",
      highlight: true,
      popular: true
    },
    {
      id: "live-149",
      name: "Live 1-on-1 Session",
      price: "$149",
      badge: "Done in 45 min",
      description: "For players who want it done right, right now—no back-and-forth.",
      deliveryTime: "Perfectly tuned curve in ~45 minutes (live)",
      features: [
        { text: "Live screen-share session with me", included: true },
        { text: "Curve tuned together in real time", included: true },
        { text: "Works with any FPS game", included: true },
        { text: "Unlimited revisions included", included: true },
        { text: "Satisfaction guarantee", included: true },
        { text: "One-time payment", included: true },
      ],
      cta: "Book Live 45-min — $149",
      micro: "Limited slots • Secure checkout",
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
            Every plan gives you a Custom Curve built for your game, your sens and your mechanics. 
            The only difference is how fast you want results and how much support you want from me.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Popular card glow effect */}
              {plan.popular && (
                <div className="absolute -inset-[2px] bg-gradient-to-b from-primary via-secondary to-accent rounded-[20px] opacity-60 blur-sm" />
              )}
              
              <LiquidGlassCard
                variant={plan.highlight ? "primary" : plan.premium ? "accent" : "secondary"}
                className={`relative text-left flex flex-col transition-all duration-300 ${
                  plan.popular 
                    ? 'ring-1 ring-primary/30' 
                    : 'hover:ring-1 hover:ring-white/10'
                } ${selectedPlan === plan.id ? 'ring-2 ring-primary/50' : ''}`}
              >
                {/* Card Header */}
                <div className="p-6 pb-4 border-b border-white/5">
                  {/* Badge inline with name */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                        : plan.premium
                          ? 'bg-accent/20 text-accent'
                          : 'bg-white/10 text-white/70'
                    }`}>
                      {plan.badge}
                    </span>
                    {plan.popular && (
                      <span className="text-xs text-secondary font-medium">Best value</span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold glass-text-contrast mb-1">
                    {plan.name}
                  </h3>
                  
                  <p className="glass-text text-sm leading-relaxed opacity-70">
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="p-6 pb-4">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-black glass-text-contrast tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm glass-text opacity-60">one-time</span>
                  </div>

                  <div className="text-sm text-secondary/80 font-medium">
                    {plan.deliveryTime}
                  </div>
                </div>

                {/* Features */}
                <div className="px-6 pb-4 flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check 
                            className={`flex-shrink-0 mt-0.5 ${
                              feature.highlight ? 'text-primary' : 'text-secondary/70'
                            }`} 
                            size={18} 
                            strokeWidth={2.5}
                          />
                        ) : (
                          <X 
                            className="text-white/20 flex-shrink-0 mt-0.5" 
                            size={18} 
                            strokeWidth={2}
                          />
                        )}
                        <span className={`text-sm leading-relaxed ${
                          feature.included 
                            ? feature.highlight 
                              ? 'glass-text-contrast font-semibold' 
                              : 'glass-text'
                            : 'text-white/30 line-through'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="p-6 pt-4">
                  {plan.popular ? (
                    <div className="relative">
                      {/* Glow backdrop for popular plan */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 rounded-xl blur-md opacity-70" />
                      <LiquidGlassButton 
                        variant="primary"
                        className="relative w-full font-bold text-base py-3.5 flex items-center justify-center gap-2"
                        onClick={() => handleGetCurve(plan.name, plan.price, plan.id)}
                      >
                        {plan.cta}
                        <ArrowRight size={18} />
                      </LiquidGlassButton>
                    </div>
                  ) : (
                    <LiquidGlassButton 
                      variant={plan.premium ? "accent" : "secondary"}
                      className="w-full font-bold text-base py-3.5 flex items-center justify-center gap-2"
                      onClick={() => handleGetCurve(plan.name, plan.price, plan.id)}
                    >
                      {plan.cta}
                      <ArrowRight size={18} />
                    </LiquidGlassButton>
                  )}

                  {/* Microline */}
                  {plan.micro && (
                    <p className="text-center mt-3 text-xs text-white/40">
                      {plan.micro}
                    </p>
                  )}
                </div>
              </LiquidGlassCard>
            </div>
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
