
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
      originalPrice: "$59",
      badge: "Most Popular",
      badgeColor: "bg-gradient-to-r from-green-500 to-green-600",
      description: "Perfect for most gamers who want personalized curve optimization",
      deliveryTime: "Minutes",
      features: [
        "Three precision revision cycles",
        "Custom curve delivered in minutes",
        "Personalized for any game",
        "Data-driven optimization methodology",
        "100% Satisfaction Guarantee",
        "Personal consultation included"
      ],
      icon: Mouse,
      highlight: true,
      popular: true
    },
    {
      id: "unlimited-revisions", 
      name: "Unlimited Revisions",
      price: "$47",
      originalPrice: "$67",
      badge: "Best Value",
      badgeColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      description: "For perfectionists who want unlimited fine-tuning until it's perfect",
      deliveryTime: "Minutes",
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
      name: "Live 1‑on‑1 Session", 
      price: "$149",
      originalPrice: "$199",
      badge: "Live Session",
      badgeColor: "bg-gradient-to-r from-purple-500 to-purple-600",
      description: "Ultimate experience with real-time curve development and instant testing",
      deliveryTime: "45 Minutes Live",
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

  const benefits = [
    { icon: Shield, title: "100% Satisfaction Guarantee", desc: "Not happy? Full refund, no questions asked" },
    { icon: Zap, title: "Lightning Fast Delivery", desc: "Get your first curve in minutes, not days" },
    { icon: Trophy, title: "Proven Results", desc: "Trusted by 500+ gamers worldwide" }
  ];

  return (
    <div className="container mx-auto px-6 relative">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Header Section */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Star className="mr-2" size={16} />
          Custom Curve Settings Tailored to Your Aim
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Choose Your
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Perfect Plan</span>
        </h2>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Perfect your aim with expert-crafted mouse acceleration curves. 
          Every plan includes our ironclad satisfaction guarantee and personalized optimization.
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 mb-12">
          <div className="flex items-center">
            <Check className="text-green-500 mr-2" size={16} />
            500+ Satisfied Gamers
          </div>
          <div className="flex items-center">
            <Check className="text-green-500 mr-2" size={16} />
            Instant Delivery
          </div>
          <div className="flex items-center">
            <Check className="text-green-500 mr-2" size={16} />
            100% Money-Back Guarantee
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
        {plans.map((plan, index) => (
          <Card 
            key={plan.id}
            className={`group relative transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border-0 shadow-lg overflow-hidden ${
              plan.highlight ? 'ring-2 ring-blue-500 ring-opacity-50 scale-105' : ''
            } ${hoveredPlan === plan.id ? 'shadow-2xl' : ''} ${
              selectedPlan === plan.id ? 'ring-2 ring-green-500' : ''
            }`}
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <Badge className={`${plan.badgeColor} text-white px-6 py-2 font-bold shadow-lg border-0`}>
                {plan.badge}
              </Badge>
            </div>

            {/* Popular Plan Glow Effect */}
            {plan.popular && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
            )}

            <CardHeader className="text-center pt-12 pb-6">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                plan.highlight ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-gray-700 to-gray-800'
              }`}>
                <plan.icon className="text-white" size={36} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {plan.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 px-4">
                {plan.description}
              </p>
              
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-5xl font-black text-gray-900">
                  {plan.price}
                </span>
                {plan.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {plan.originalPrice}
                  </span>
                )}
              </div>

              <div className="text-sm text-gray-500 mb-2">
                Delivery: {plan.deliveryTime}
              </div>

              {plan.emphasis && (
                <p className="text-blue-600 font-semibold text-sm bg-blue-50 px-3 py-1 rounded-full">
                  {plan.emphasis}
                </p>
              )}
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                    <span className="text-gray-700 leading-relaxed text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleGetCurve(plan.name, plan.price, plan.id)}
                size="lg"
                className={`w-full font-bold text-lg py-4 transition-all duration-300 group-hover:scale-105 ${
                  plan.highlight 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg' 
                    : plan.premium
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg'
                }`}
              >
                Start Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>

              {/* Savings Badge */}
              {plan.originalPrice && (
                <div className="text-center mt-3">
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Save ${parseInt(plan.originalPrice.substring(1)) - parseInt(plan.price.substring(1))}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12 mb-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Lovable.dev?
        </h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <benefit.icon className="text-blue-500 group-hover:scale-110 transition-transform" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 mb-20 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Compare Plans
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-6 px-6 font-bold text-gray-800">Plan</th>
                <th className="text-center py-6 px-6 font-bold text-gray-800">Price</th>
                <th className="text-center py-6 px-6 font-bold text-gray-800">Revisions</th>
                <th className="text-center py-6 px-6 font-bold text-gray-800">Live Session</th>
                <th className="text-center py-6 px-6 font-bold text-gray-800">Delivery</th>
                <th className="text-center py-6 px-6 font-bold text-gray-800">Guarantee</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, index) => (
                <tr key={plan.id} className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${plan.highlight ? 'bg-blue-50/50' : ''}`}>
                  <td className="py-6 px-6">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900">{plan.name}</span>
                      {plan.popular && (
                        <Badge className="ml-3 bg-green-500 text-white text-xs border-0">Most Popular</Badge>
                      )}
                    </div>
                  </td>
                  <td className="text-center py-6 px-6">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-xl text-blue-600">{plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{plan.originalPrice}</span>
                      )}
                    </div>
                  </td>
                  <td className="text-center py-6 px-6 font-medium">
                    {plan.id === 'live-session' ? 'Unlimited' : plan.id === '3x-revisions' ? '3' : 'Unlimited'}
                  </td>
                  <td className="text-center py-6 px-6">
                    {plan.id === 'live-session' ? (
                      <div className="flex items-center justify-center">
                        <Check className="text-green-500 mr-1" size={18} />
                        <span className="text-sm font-medium">45-min Live</span>
                      </div>
                    ) : '–'}
                  </td>
                  <td className="text-center py-6 px-6 text-sm font-medium">{plan.deliveryTime}</td>
                  <td className="text-center py-6 px-6">
                    <Check className="text-green-500 mx-auto" size={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-full shadow-2xl p-4 border border-gray-200">
          <Button 
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-8 py-3 font-bold transition-all duration-300 group shadow-lg"
          >
            <Star className="mr-2 group-hover:rotate-12 transition-transform" size={18} />
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
