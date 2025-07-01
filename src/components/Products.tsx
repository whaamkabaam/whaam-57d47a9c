
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mouse, Clock, Star, Check, Zap, Users, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStartNow = (planName: string, price: string) => {
    toast({
      title: `${planName} Selected! 🚀`,
      description: `Ready to get your perfect curve for ${price}? Let's make it happen!`,
    });
  };

  const plans = [
    {
      id: "3x-revisions",
      name: "3× Revisions Plan",
      price: "$39",
      badge: "Most Bought",
      badgeColor: "bg-green-500",
      tooltip: "Perfect Curve within Minutes",
      features: [
        "Three revision cycles to fine-tune your Custom Curve settings",
        "First curve delivered in minutes",
        "Personalized for any game",
        "Data-driven optimization",
        "100% Satisfaction Guarantee",
        "Personal live 1‑on‑1 session with Whaam"
      ],
      icon: Mouse,
      highlight: true
    },
    {
      id: "unlimited-revisions", 
      name: "Unlimited Revisions Plan",
      price: "$47",
      badge: "Unlimited Revisions",
      badgeColor: "bg-blue-500",
      features: [
        "Unlimited feedback-based revisions",
        "First curve in minutes",
        "Fully personalized & data-driven",
        "100% Satisfaction Guarantee", 
        "Personal live session with Whaam"
      ],
      icon: Target,
      highlight: false
    },
    {
      id: "live-session",
      name: "Live 1‑on‑1 Session Plan", 
      price: "$149",
      badge: "Live Session",
      badgeColor: "bg-purple-500",
      emphasis: "Perfect Curve within 45 Minutes",
      features: [
        "Exclusive 45‑minute live session",
        "Real-time adjustments during session",
        "First curve delivered in-session",
        "Personalized & data-driven",
        "100% Satisfaction Guarantee",
        "Ideal for fastest results"
      ],
      icon: Users,
      highlight: false
    }
  ];

  return (
    <div className="container mx-auto px-6 relative">
      {/* Background Accent */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Choose Your
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Perfect Plan</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get your custom curve settings optimized by our experts. 
          Every plan includes our 100% satisfaction guarantee.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
        {plans.map((plan, index) => (
          <Card 
            key={plan.id}
            className={`group relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-0 shadow-lg ${
              plan.highlight ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
            } ${hoveredPlan === plan.id ? 'scale-105' : ''}`}
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className={`${plan.badgeColor} text-white px-4 py-2 font-semibold shadow-lg`}>
                {plan.badge}
              </Badge>
            </div>

            <CardHeader className="text-center pt-8 pb-4">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                plan.highlight ? 'bg-blue-500' : 'bg-gray-700'
              }`}>
                <plan.icon className="text-white" size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              
              <div className="text-5xl font-black text-gray-900 mb-2">
                {plan.price}
              </div>

              {plan.emphasis && (
                <p className="text-blue-600 font-semibold text-sm">
                  {plan.emphasis}
                </p>
              )}

              {plan.tooltip && hoveredPlan === plan.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-20">
                  {plan.tooltip}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleStartNow(plan.name, plan.price)}
                size="lg"
                className={`w-full font-semibold text-lg py-4 transition-all duration-300 group-hover:scale-105 ${
                  plan.highlight 
                    ? 'bg-blue-500 hover:bg-yellow-500 text-white' 
                    : 'bg-gray-800 hover:bg-blue-500 text-white'
                }`}
              >
                Start Now
                <Zap className="ml-2" size={20} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Plan Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Plan</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Price</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Revisions</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Live Session</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Guarantee</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <span className="font-semibold">3× Revisions</span>
                    <Badge className="ml-2 bg-green-500 text-white text-xs">Most Bought</Badge>
                  </div>
                </td>
                <td className="text-center py-4 px-6 font-bold text-blue-600">$39</td>
                <td className="text-center py-4 px-6">3</td>
                <td className="text-center py-4 px-6">–</td>
                <td className="text-center py-4 px-6">
                  <Check className="text-green-500 mx-auto" size={20} />
                </td>
                <td className="text-center py-4 px-6 text-sm">Minutes (via Discord)</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold">Unlimited Revisions</td>
                <td className="text-center py-4 px-6 font-bold text-blue-600">$47</td>
                <td className="text-center py-4 px-6">Unlimited</td>
                <td className="text-center py-4 px-6">–</td>
                <td className="text-center py-4 px-6">
                  <Check className="text-green-500 mx-auto" size={20} />
                </td>
                <td className="text-center py-4 px-6 text-sm">Minutes (via Discord)</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <span className="font-semibold">Live 1‑on‑1 Session</span>
                    <Badge className="ml-2 bg-purple-500 text-white text-xs">Live Session</Badge>
                  </div>
                </td>
                <td className="text-center py-4 px-6 font-bold text-blue-600">$149</td>
                <td className="text-center py-4 px-6">Unlimited</td>
                <td className="text-center py-4 px-6">
                  <div className="flex items-center justify-center">
                    <Check className="text-green-500 mr-1" size={16} />
                    <span className="text-sm">45-min Live</span>
                  </div>
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="text-green-500 mx-auto" size={20} />
                </td>
                <td className="text-center py-4 px-6 text-sm">45 Minutes Live Call</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-full shadow-2xl p-4 border border-gray-200">
          <Button 
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-blue-500 hover:bg-yellow-500 text-white rounded-full px-6 py-2 font-semibold transition-all duration-300 group"
          >
            <Star className="mr-2 group-hover:rotate-12 transition-transform" size={18} />
            Choose Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
