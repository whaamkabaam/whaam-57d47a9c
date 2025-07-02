
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mouse, Clock, Star, Check, Zap, Users, Target, ArrowRight, Shield, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      id: "3x-revisions",
      name: "3× Revisions",
      price: "$39",
      originalPrice: "$69",
      badge: "Standard",
      badgeColor: "bg-whaam-yellow text-whaam-black font-bold",
      description: "Perfect for most gamers who want personalized curve optimization",
      deliveryTime: "First curve delivered in minutes",
      features: [
        "Three precision revision cycles",
        "First curve delivered in minutes"
      ],
      icon: Mouse,
      highlight: false
    },
    {
      id: "unlimited-revisions", 
      name: "Unlimited Revisions",
      price: "$47",
      originalPrice: "$79",
      badge: "Most Bought",
      badgeColor: "bg-gradient-to-r from-whaam-red to-whaam-yellow text-whaam-white font-bold",
      description: "For perfectionists who want unlimited fine-tuning until it's perfect",
      deliveryTime: "First curve delivered in minutes",
      features: [
        "Unlimited feedback-based revisions",
        "First curve delivered in minutes"
      ],
      icon: Target,
      highlight: true,
      popular: true
    },
    {
      id: "live-session",
      name: "Live 1‑on‑1 Session", 
      price: "$149",
      originalPrice: "$249",
      badge: "Premium",
      badgeColor: "bg-whaam-red text-whaam-white font-bold",
      description: "Ultimate experience with real-time curve development and instant testing",
      deliveryTime: "Personal live 1-on-1 session",
      emphasis: "Perfect curve guaranteed in 45 minutes",
      features: [
        "Exclusive 45‑minute live session"
      ],
      icon: Users,
      highlight: false,
      premium: true
    }
  ];

  const benefits = [
    { icon: Shield, title: "100% Satisfaction Guarantee", desc: "Not satisfied? Full refund, no questions asked" },
    { icon: Zap, title: "Lightning Fast Delivery", desc: "First curve delivered in minutes, not days" },
    { icon: Trophy, title: "Proven Results", desc: "Trusted by 500+ gamers worldwide" }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 relative py-24">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-whaam-red/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-whaam-yellow/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center bg-whaam-red/10 text-whaam-red px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-whaam-red/20">
          <Star className="mr-2" size={16} />
          Custom Curve Settings for Your Aim
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-whaam-white mb-8 leading-tight">
          Choose your
          <span className="block bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent mt-4">
            perfect plan
          </span>
        </h2>
        
        <p className="text-xl text-whaam-white/80 max-w-3xl mx-auto mb-12">
          Perfect your aim with professionally crafted mouse acceleration curves. 
          Every plan includes our iron-clad 100% satisfaction guarantee and personalized optimization.
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-whaam-white/60 mb-16">
          <div className="flex items-center">
            <Check className="text-whaam-yellow mr-2" size={16} />
            500+ satisfied gamers
          </div>
          <div className="flex items-center">
            <Check className="text-whaam-yellow mr-2" size={16} />
            First curve in minutes
          </div>
          <div className="flex items-center">
            <Check className="text-whaam-yellow mr-2" size={16} />
            100% satisfaction guarantee
          </div>
        </div>
      </div>

      {/* Plans Grid - Fixed heights and proper badge spacing */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20 pt-12">
        {plans.map((plan, index) => (
          <Card 
            key={plan.id}
            className={`group relative transition-all duration-700 hover:-translate-y-6 hover:shadow-2xl hover:shadow-whaam-red/40 hover:shadow-[0_0_20px_theme(colors.whaam-red)] border-2 shadow-lg overflow-visible bg-whaam-black min-h-[580px] flex flex-col animate-fade-in hover:scale-[1.02] ${
              plan.highlight ? 'border-whaam-red scale-105 shadow-whaam-red/30 ring-2 ring-whaam-yellow/50' : 'border-whaam-red/20'
            } ${hoveredPlan === plan.id ? 'shadow-2xl border-whaam-red scale-105' : ''} ${
              selectedPlan === plan.id ? 'border-whaam-yellow shadow-whaam-yellow/30' : ''
            }`}
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            {/* Badge - Properly positioned above card */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
            <Badge className={`${plan.badgeColor} px-6 py-2 text-sm font-bold shadow-xl border-0 hover:scale-110 transition-all duration-300 whitespace-nowrap`}>
              {plan.badge}
            </Badge>
            </div>

            {/* Popular Plan Glow Effect */}
            {plan.popular && (
              <div className="absolute inset-0 bg-whaam-red/5 pointer-events-none"></div>
            )}

            <CardHeader className="text-center pt-16 pb-6 flex-shrink-0">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 group-hover:shadow-2xl ${
                plan.highlight ? 'bg-whaam-red group-hover:bg-whaam-yellow' : plan.premium ? 'bg-gradient-to-br from-whaam-red to-whaam-yellow' : 'bg-whaam-yellow group-hover:bg-whaam-red'
              }`}>
                <plan.icon className="text-whaam-black" size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-whaam-white mb-4">
                {plan.name}
              </h3>
              
              <p className="text-whaam-white/70 mb-6 px-4 leading-relaxed">
                {plan.description}
              </p>
              
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-5xl font-black text-whaam-white">
                  {plan.price}
                </span>
                {plan.originalPrice && (
                  <span className="text-xl text-whaam-white/40 line-through">
                    {plan.originalPrice}
                  </span>
                )}
              </div>

              <div className="text-whaam-yellow font-semibold mb-2">
                {plan.deliveryTime}
              </div>

              {plan.emphasis && (
                <p className="text-whaam-yellow font-semibold text-sm bg-whaam-yellow/10 px-4 py-2 rounded-full border border-whaam-yellow/20">
                  {plan.emphasis}
                </p>
              )}
            </CardHeader>

            <CardContent className="px-8 flex-grow flex flex-col">
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="text-whaam-yellow flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={16} />
                    <span className="text-whaam-white/80 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Fixed button positioning */}
              <div className="mt-auto pb-8">
                <Button 
                  onClick={() => handleGetCurve(plan.name, plan.price, plan.id)}
                  size="lg"
                  className={`w-full font-bold text-lg py-4 h-12 transition-all duration-300 group-hover:scale-105 border-0 ${
                    plan.highlight 
                      ? 'bg-whaam-red hover:bg-whaam-red/80 text-whaam-white shadow-lg' 
                      : plan.premium
                      ? 'bg-whaam-yellow hover:bg-whaam-yellow/80 text-whaam-black shadow-lg'
                      : 'bg-whaam-red hover:bg-whaam-red/80 text-whaam-white shadow-lg'
                  }`}
                 >
                   Start Now
                   <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                 </Button>

                {/* Savings Badge */}
                {plan.originalPrice && (
                  <div className="text-center mt-4">
                    <span className="inline-block bg-whaam-yellow/20 text-whaam-yellow text-sm font-semibold px-4 py-2 rounded-full border border-whaam-yellow/30">
                      Save ${parseInt(plan.originalPrice.substring(1)) - parseInt(plan.price.substring(1))}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-whaam-black rounded-3xl p-12 mb-20 border border-whaam-red/20">
        <h3 className="text-3xl font-bold text-center text-whaam-white mb-12">
          Why choose <span className="bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent">WhaamKaBaam</span>?
        </h3>
        
        <div className="grid sm:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-whaam-red rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                <benefit.icon className="text-whaam-white" size={28} />
              </div>
              <h4 className="text-xl font-semibold text-whaam-white mb-2">{benefit.title}</h4>
              <p className="text-whaam-white/70">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-whaam-black rounded-full shadow-2xl p-4 border border-whaam-red/20">
          <Button 
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-whaam-red hover:bg-whaam-red/80 text-whaam-white rounded-full px-8 py-3 font-bold transition-all duration-300 group shadow-lg border-0"
          >
            <Star className="mr-2 group-hover:rotate-12 transition-transform" size={16} />
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
