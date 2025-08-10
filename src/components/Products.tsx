import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mouse, Clock, Star, Check, Zap, Users, Target, ArrowRight, Shield, Trophy } from "lucide-react";
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
      name: "Self-Serve (3 Revisions)",
      price: "$39",
      badge: "Entry",
      badgeColor: "bg-secondary text-primary font-bold",
      description: "First curve in minutes • Any game • Personalized • Data-driven",
      deliveryTime: "Time to results: 1–3 days (DIY)",
      features: [
        "First curve in minutes",
        "Any game • Personalized • Data-driven",
        "3 guided revisions (via Discord)",
        "One-time payment",
        "No live 1-on-1 session",
        "No 45-min perfection promise"
      ],
      cta: "Start Self-Serve — $39",
      micro: "One-time payment • Secure checkout",
      icon: Mouse,
      highlight: false
    },
    {
      id: "self-serve-pro-47",
      name: "Most Popular — Self-Serve Pro (Unlimited)",
      price: "$47",
      badge: "Most Popular",
      badgeColor: "bg-gradient-to-r from-primary to-secondary text-white font-bold",
      description: "First curve in minutes • Any game • Personalized • Data-driven",
      deliveryTime: "Time to results: 1–3 days w/ feedback",
      features: [
        "First curve in minutes",
        "Any game • Personalized • Data-driven",
        "Unlimited revisions (async, 24–48h)",
        "Satisfaction guarantee",
        "One-time payment",
        "No live 1-on-1 session",
        "No 45-min perfection promise"
      ],
      cta: "Unlock Unlimited — $47",
      micro: "One-time payment • Secure checkout",
      icon: Target,
      highlight: true,
      popular: true
    },
    {
      id: "live-149",
      name: "Live 1-on-1 (Perfect in ~45 Minutes)",
      price: "$149",
      badge: "Fastest Results",
      badgeColor: "bg-accent text-white font-bold",
      description: "Personal live 1-on-1 session • Unlimited revisions included",
      deliveryTime: "Time to results: ~45 minutes (live)",
      emphasis: "Perfect curve in ~45 minutes",
      features: [
        "First curve in minutes",
        "Any game • Personalized • Data-driven",
        "Unlimited revisions included",
        "Satisfaction guarantee",
        "Personal live 1-on-1 session",
        "One-time payment"
      ],
      cta: "Book Live 45-min — $149",
      micro: "Limited slots today • Secure checkout",
      icon: Users,
      highlight: false,
      premium: true
    }
  ];

  const benefits = [
    { icon: Shield, title: "100% Satisfaction Guarantee", desc: "Satisfaction guarantee — unlimited tweaks or a refund." },
    { icon: Zap, title: "Lightning Fast Delivery", desc: "First curve delivered in minutes, not days" },
    { icon: Trophy, title: "Proven Results", desc: "Trusted by 1,100+ players worldwide" }
  ];

  return (
    <section id="products" className="py-24 relative overflow-hidden">
      {/* Background Glass Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 glass-primary rounded-full liquid-glow" style={{ filter: 'url(#liquid-distortion-subtle)' }}></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 glass-secondary rounded-full liquid-glow-secondary" style={{ filter: 'url(#liquid-distortion-subtle)' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <LiquidGlassCard variant="secondary" className="inline-flex items-center px-6 py-3 mb-8">
            <Star className="mr-2 text-primary" size={16} />
            <span className="glass-text-contrast font-semibold">Custom Curve Settings for Your Aim</span>
          </LiquidGlassCard>
          
          <h2 className="text-5xl md:text-6xl font-bold glass-text-contrast mb-8 leading-tight">
            Choose your
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mt-4">
              perfect plan
            </span>
          </h2>
          
          <p className="text-xl glass-text max-w-3xl mx-auto mb-12">
            Perfect your aim with professionally crafted mouse acceleration curves. 
            Every plan includes our iron-clad 100% satisfaction guarantee and personalized optimization.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm glass-text mb-16">
            <div className="flex items-center">
              <Check className="text-secondary mr-2" size={16} />
              1,100+ players helped
            </div>
            <div className="flex items-center">
              <Check className="text-secondary mr-2" size={16} />
              First curve in minutes
            </div>
            <div className="flex items-center">
              <Check className="text-secondary mr-2" size={16} />
              100% satisfaction guarantee
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20 pt-12">
          {plans.map((plan, index) => (
            <LiquidGlassCard
              key={plan.id}
              variant={plan.highlight ? "primary" : plan.premium ? "accent" : "secondary"}
              className={`group text-center min-h-[580px] flex flex-col transition-all duration-700 hover:-translate-y-6 hover:scale-105 ${
                plan.highlight ? 'ring-2 ring-secondary/50 scale-105' : ''
              } ${hoveredPlan === plan.id ? 'scale-105' : ''} ${
                selectedPlan === plan.id ? 'ring-2 ring-primary/50' : ''
              }`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                <Badge className={`${plan.badgeColor} px-6 py-2 text-sm shadow-xl border-0 hover:scale-110 transition-all duration-300 whitespace-nowrap`}>
                  {plan.badge}
                </Badge>
              </div>

              {/* Popular Plan Glow Effect */}
              {plan.popular && (
                <div className="absolute inset-0 bg-primary/5 pointer-events-none rounded-[inherit]"></div>
              )}

              <div className="text-center pt-16 pb-6 flex-shrink-0 px-8">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 group-hover:shadow-2xl ${
                  plan.highlight ? 'glass-primary liquid-glow' : plan.premium ? 'glass-accent liquid-glow-accent' : 'glass-secondary liquid-glow-secondary'
                }`}>
                  <plan.icon className="text-primary" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold glass-text-contrast mb-4">
                  {plan.name}
                </h3>
                
                <p className="glass-text mb-6 px-4 leading-relaxed">
                  {plan.description}
                </p>
                
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-5xl font-black glass-text-contrast">
                    {plan.price}
                  </span>
                </div>

                <div className="text-secondary font-semibold mb-2">
                  {plan.deliveryTime}
                </div>

                {plan.emphasis && (
                  <LiquidGlassCard variant="secondary" className="text-secondary font-semibold text-sm px-4 py-2 mx-auto">
                    {plan.emphasis}
                  </LiquidGlassCard>
                )}
              </div>

              <div className="px-8 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="text-secondary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={16} />
                      <span className="glass-text leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div className="mt-auto pb-8">
                  <LiquidGlassButton 
                    variant={plan.highlight ? "primary" : plan.premium ? "accent" : "primary"}
                    className="w-full font-bold text-lg py-4"
                    onClick={() => handleGetCurve(plan.name, plan.price, plan.id)}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </LiquidGlassButton>

                  {/* Microline */}
                  {plan.micro && (
                    <div className="text-center mt-4 text-sm text-muted-foreground">
                      {plan.micro}
                    </div>
                  )}
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* Benefits Section */}
        <LiquidGlassCard variant="primary" className="p-12 mb-20">
          <h3 className="text-3xl font-bold text-center glass-text-contrast mb-12">
            Why choose <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">WHAAMKABAAM</span>?
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 glass-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110 liquid-glow-accent">
                  <benefit.icon className="text-primary" size={28} />
                </div>
                <h4 className="text-xl font-semibold glass-text-contrast mb-2">{benefit.title}</h4>
                <p className="glass-text">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </LiquidGlassCard>

        {/* Sticky CTA */}
        <div className="fixed bottom-6 right-6 z-50">
          <LiquidGlassCard variant="primary" className="p-4 rounded-full shadow-2xl">
            <LiquidGlassButton 
              variant="primary"
              className="rounded-full px-8 py-3 font-bold"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Star className="mr-2 group-hover:rotate-12 transition-transform" size={16} />
              Start Now
            </LiquidGlassButton>
          </LiquidGlassCard>
        </div>
      </div>
    </section>
  );
};

export default Products;