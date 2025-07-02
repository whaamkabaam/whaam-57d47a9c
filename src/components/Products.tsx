
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mouse, Users, Target, ArrowRight, Check, Zap } from "lucide-react";
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
      name: "3× REVISIONS",
      price: "$39",
      badge: "MOST BOUGHT",
      badgeColor: "bg-boom-yellow",
      description: "Perfect for most gamers who want personalized curve optimization",
      features: [
        "Three precision revision cycles",
        "First curve delivered in minutes",
        "Personalized for any game",
        "Data-driven optimization methodology",
        "100% Satisfaction Guarantee",
        "Personal consultation included"
      ],
      icon: Mouse,
      highlight: true
    },
    {
      id: "unlimited-revisions", 
      name: "UNLIMITED REVISIONS",
      price: "$47",
      badge: "BEST VALUE",
      badgeColor: "bg-fire-red",
      description: "For perfectionists who want unlimited fine-tuning until it's perfect",
      features: [
        "Unlimited feedback-based revisions",
        "First curve delivered in minutes",
        "Fully personalized & data-driven approach",
        "100% Satisfaction Guarantee", 
        "Personal consultation included",
        "Priority support access"
      ],
      icon: Target,
      highlight: false
    },
    {
      id: "live-session",
      name: "LIVE 1‑ON‑1 SESSION", 
      price: "$149",
      badge: "LIVE SESSION",
      badgeColor: "bg-fire-red",
      description: "Ultimate experience with real-time curve development and instant testing",
      emphasis: "Perfect Curve Guaranteed in 45 Minutes",
      features: [
        "Exclusive 45‑minute live development session",
        "Real-time adjustments during gameplay",
        "Instant curve testing and optimization",
        "Personalized coaching & tips",
        "100% Satisfaction Guarantee",
        "Fastest results with expert guidance"
      ],
      icon: Users,
      highlight: false,
      premium: true
    }
  ];

  return (
    <div className="bg-comic-black py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle, #FFD700 2px, transparent 2px)`,
        backgroundSize: '30px 30px'
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <h2 className="font-anton text-6xl md:text-7xl text-white mb-4 tracking-wider">
              CHOOSE THE PLAN
              <span className="text-fire-red block">THAT FITS YOU BEST</span>
            </h2>
            <div className="absolute -top-4 -right-8 w-16 h-16 bg-boom-yellow border-4 border-white rounded-full flex items-center justify-center transform rotate-12">
              <Zap className="text-black" size={24} />
            </div>
          </div>
          
          <p className="font-russo text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Perfect your aim with expertly crafted mouse acceleration curves. 
            Every plan includes our ironclad <span className="text-boom-yellow font-bold">100% satisfaction guarantee</span> 
            and personalized optimization.
          </p>
        </div>

        {/* Plans Grid - Made wider and aligned */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className="relative group"
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className={`${plan.badgeColor} text-black border-4 border-white px-6 py-2 font-anton text-lg shadow-[4px_4px_0px_0px_theme(colors.black)]`}>
                  {plan.badge}
                </Badge>
              </div>

              <div className={`comic-panel bg-gray-900 h-full min-h-[600px] flex flex-col hover:shadow-[12px_12px_0px_0px_theme(colors.black)] transition-all duration-300 group-hover:-translate-y-2 ${
                plan.highlight ? 'scale-105 ring-4 ring-boom-yellow' : ''
              }`}>
                {/* Header */}
                <div className="text-center pt-12 pb-6 flex-shrink-0">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                    plan.highlight ? 'bg-fire-red' : 'bg-comic-black'
                  }`}>
                    <plan.icon className="text-white" size={32} />
                  </div>
                  
                  <h3 className="font-anton text-3xl text-white mb-4 tracking-wider">
                    {plan.name}
                  </h3>
                  
                  <div className="text-6xl font-anton text-fire-red mb-4">
                    {plan.price}
                  </div>

                  {plan.emphasis && (
                    <p className="text-boom-yellow font-russo font-bold text-sm bg-comic-black px-4 py-2 rounded-full mx-4">
                      {plan.emphasis}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="px-8 flex-grow flex flex-col">
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-fire-red border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="text-white" size={14} />
                        </div>
                        <span className="text-white font-russo leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button aligned at bottom */}
                  <div className="mt-auto pb-8">
                    <button 
                      onClick={() => handleGetCurve(plan.name, plan.price, plan.id)}
                      className={`comic-button w-full font-anton text-xl py-4 transition-all duration-300 group-hover:scale-105 ${
                        plan.premium ? 'bg-fire-red' : 'bg-comic-black'
                      }`}
                    >
                      START NOW
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="comic-panel bg-gray-900 text-center">
              <div className="font-anton text-4xl text-fire-red mb-2">500+</div>
              <div className="font-russo text-white font-bold">HAPPY GAMERS</div>
            </div>
            <div className="comic-panel bg-gray-900 text-center">
              <div className="font-anton text-4xl text-boom-yellow mb-2">MINUTES</div>
              <div className="font-russo text-white font-bold">FIRST CURVE DELIVERED</div>
            </div>
            <div className="comic-panel bg-gray-900 text-center">
              <div className="font-anton text-4xl text-fire-red mb-2">100%</div>
              <div className="font-russo text-white font-bold">SATISFACTION GUARANTEE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
