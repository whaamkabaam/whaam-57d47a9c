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
      title: `${planName} Ausgewählt! 🎯`,
      description: `Bereit, dein Aim mit ${planName} für ${price} zu perfektionieren? Lass uns starten!`,
    });
  };

  const plans = [
    {
      id: "3x-revisions",
      name: "3× Revisions",
      price: "$39",
      originalPrice: "$59",
      badge: "Most Bought",
      badgeColor: "bg-gradient-to-r from-green-500 to-green-600",
      description: "Perfect for most gamers who want personalized curve optimization",
      deliveryTime: "First curve delivered in minutes",
      features: [
        "Three precision revision cycles",
        "First curve delivered in minutes",
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
      deliveryTime: "First curve delivered in minutes",
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
      deliveryTime: "Personal live 1-on-1 session",
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
    { icon: Shield, title: "100% Zufriedenheitsgarantie", desc: "Nicht zufrieden? Vollständige Rückerstattung, keine Fragen gestellt" },
    { icon: Zap, title: "Blitzschnelle Lieferung", desc: "Erste Curve in Minuten geliefert, nicht in Tagen" },
    { icon: Trophy, title: "Bewährte Ergebnisse", desc: "Vertraut von 500+ Gamern weltweit" }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 relative">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-yellow-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Enhanced Header Section */}
      <div className="text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center bg-blue-50 text-blue-600 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold mb-4 sm:mb-6">
          <Star className="mr-2" size={16} />
          Custom Curve Einstellungen für dein Aim
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Wähle deinen
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> perfekten Plan</span>
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
          Perfektioniere dein Aim mit fachmännisch erstellten Mausbeschleunigungskurven. 
          Jeder Plan beinhaltet unsere eisenharte 100% Zufriedenheitsgarantie und personalisierte Optimierung.
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-gray-500 mb-8 sm:mb-12">
          <div className="flex items-center">
            <Check className="text-green-500 mr-2" size={16} />
            500+ zufriedene Gamer
          </div>
          <div className="flex items-center">
            <Check className="text-green-500 mr-2" size={16} />
            Erste Curve in Minuten
          </div>
          <div className="flex items-center">
            <Check className="text-green-500 mr-2" size={16} />
            100% Zufriedenheitsgarantie
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-16 sm:mb-20">
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
              <Badge className={`${plan.badgeColor} text-white px-4 sm:px-6 py-2 font-bold shadow-lg border-0 text-xs sm:text-sm`}>
                {plan.badge}
              </Badge>
            </div>

            {/* Popular Plan Glow Effect */}
            {plan.popular && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
            )}

            <CardHeader className="text-center pt-10 sm:pt-12 pb-4 sm:pb-6">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-3xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                plan.highlight ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-gray-700 to-gray-800'
              }`}>
                <plan.icon className="text-white" size={28} />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {plan.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 px-2 sm:px-4">
                {plan.description}
              </p>
              
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                <span className="text-4xl sm:text-5xl font-black text-gray-900">
                  {plan.price}
                </span>
                {plan.originalPrice && (
                  <span className="text-lg sm:text-xl text-gray-400 line-through">
                    {plan.originalPrice}
                  </span>
                )}
              </div>

              <div className="text-sm text-blue-600 font-semibold mb-2">
                {plan.deliveryTime}
              </div>

              {plan.emphasis && (
                <p className="text-blue-600 font-semibold text-sm bg-blue-50 px-3 py-1 rounded-full">
                  {plan.emphasis}
                </p>
              )}
            </CardHeader>

            <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={16} />
                    <span className="text-gray-700 leading-relaxed text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleGetCurve(plan.name, plan.price, plan.id)}
                size="lg"
                className={`w-full font-bold text-base sm:text-lg py-3 sm:py-4 transition-all duration-300 group-hover:scale-105 ${
                  plan.highlight 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg' 
                    : plan.premium
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg'
                }`}
              >
                Jetzt starten
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>

              {/* Savings Badge */}
              {plan.originalPrice && (
                <div className="text-center mt-3">
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Spare ${parseInt(plan.originalPrice.substring(1)) - parseInt(plan.price.substring(1))}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 mb-16 sm:mb-20">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Warum Lovable.dev wählen?
        </h3>
        
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <benefit.icon className="text-blue-500 group-hover:scale-110 transition-transform" size={28} />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-sm sm:text-base text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <div className="bg-white rounded-full shadow-2xl p-3 sm:p-4 border border-gray-200">
          <Button 
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-6 sm:px-8 py-2 sm:py-3 font-bold transition-all duration-300 group shadow-lg text-sm sm:text-base"
          >
            <Star className="mr-2 group-hover:rotate-12 transition-transform" size={16} />
            Jetzt starten
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
