
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowRight, Trophy, Target, Zap, TrendingUp, Play } from "lucide-react";

const Portfolio = () => {
  const testimonials = [
    {
      name: "Jake Mitchell",
      game: "Valorant",
      rank: "Immortal 2",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "My aim improved dramatically after getting my custom curve. The difference was noticeable immediately and I've been climbing ranks ever since!",
      improvement: "+3 Rank Tiers",
      beforeAfter: "Von Diamond 2 zu Immortal 2 in 2 Wochen",
      accuracyBoost: "+35% Treffergenauigkeit",
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Sarah Chen",
      game: "CS2",
      rank: "Global Elite",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c3e4?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "The personalized curve completely transformed my flick shots. I can't believe how much more consistent my aim became. Best investment I've made for my gaming setup.",
      improvement: "40% Better Accuracy",
      beforeAfter: "Von Supreme zu Global Elite",
      accuracyBoost: "+42% Flick-Präzision",
      color: "from-red-500 to-pink-600"
    },
    {
      name: "Alex Rodriguez",
      game: "Apex Legends",
      rank: "Master",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "The live 1-on-1 session was incredible. Having real-time adjustments while I played made all the difference. My tracking improved instantly.",
      improvement: "Master Tier Reached",
      beforeAfter: "Von Diamond 4 zu Master",
      accuracyBoost: "+28% Tracking-Genauigkeit",
      color: "from-green-500 to-teal-600"
    },
    {
      name: "Ryan Park",
      game: "Valorant",
      rank: "Radiant",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "Finally hit Radiant after using my custom curve! The precision and consistency I gained is unreal. Every shot feels more controlled now.",
      improvement: "Hit Radiant",
      beforeAfter: "Von Immortal 3 zu Radiant",
      accuracyBoost: "+31% Konsistenz",
      color: "from-yellow-500 to-orange-600"
    },
    {
      name: "Marcus Weber",
      game: "CS2",
      rank: "Faceit Level 10",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "Incredible service! The curve was perfectly calibrated for my playstyle. My headshot percentage went through the roof and I'm hitting shots I never thought possible.",
      improvement: "+4 Faceit Levels",
      beforeAfter: "Von Level 6 zu Level 10",
      accuracyBoost: "+45% Headshot Rate",
      color: "from-purple-500 to-blue-600"
    },
    {
      name: "Emma Thompson",
      game: "Overwatch 2",
      rank: "Grandmaster",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "As a Tracer main, precision is everything. The custom curve made my tracking so much smoother. I finally broke into Grandmaster after months of being stuck in Masters.",
      improvement: "Grandmaster Reached",
      beforeAfter: "Von Master zu Grandmaster",
      accuracyBoost: "+38% Tracking Accuracy",
      color: "from-pink-500 to-red-600"
    }
  ];

  const stats = [
    { icon: Trophy, value: "500+", label: "Satisfied Gamers", color: "text-yellow-500" },
    { icon: Target, value: "35%", label: "Avg. Accuracy Boost", color: "text-green-500" },
    { icon: Zap, value: "Minutes", label: "Fast Delivery", color: "text-blue-500" },
    { icon: Star, value: "4.9/5", label: "Average Rating", color: "text-purple-500" }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-whaam-red/10 text-whaam-red px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-whaam-red/20">
          <Trophy className="mr-2" size={16} />
          Real Results
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-whaam-white mb-4">
          Real Gamers,
          <span className="bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent"> Real Results</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Schau dir an, wie unsere Custom Curves das Aim und die Performance von 
          Gamern wie dir transformiert haben - mit messbaren Ergebnissen.
        </p>
      </div>

      {/* Before & After Demo Section */}
      <div className="bg-whaam-black rounded-3xl p-12 mb-20 text-whaam-white border-2 border-whaam-red/20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Before & After Demonstration</h3>
          <p className="text-muted-foreground text-lg">
            Sieh dir an, wie dramatisch sich das Aim mit einer Custom Curve verbessert.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Before Video */}
          <div className="relative">
            <div className="bg-red-500 bg-opacity-20 rounded-2xl p-1">
              <div className="bg-black rounded-xl aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="text-white mx-auto mb-4" size={48} />
                    <h4 className="text-xl font-bold mb-2">BEFORE</h4>
                    <p className="text-red-200">Inconsistent aim, overflicking</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-red-500 px-3 py-1 rounded-full text-sm font-bold">
                  60% Accuracy
                </div>
              </div>
            </div>
          </div>
          
          {/* After Video */}
          <div className="relative">
            <div className="bg-green-500 bg-opacity-20 rounded-2xl p-1">
              <div className="bg-black rounded-xl aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="text-white mx-auto mb-4" size={48} />
                    <h4 className="text-xl font-bold mb-2">AFTER</h4>
                    <p className="text-green-200">Precise, consistent aim</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-green-500 px-3 py-1 rounded-full text-sm font-bold">
                  85% Accuracy
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="text-center mt-8">
          <Badge className="bg-whaam-yellow text-whaam-black px-6 py-2 border-0 text-lg">
            +25% Average Accuracy Improvement
          </Badge>
        </div>
      </div>

      {/* Enhanced Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-fade-in">
        {testimonials.map((testimonial, index) => (
            <Card 
            key={testimonial.name} 
            className="group overflow-hidden border-2 border-whaam-red/20 shadow-lg hover:shadow-2xl hover:shadow-whaam-red/30 transition-all duration-700 hover:-translate-y-4 hover:scale-105 hover:rotate-1 bg-whaam-black hover:border-whaam-yellow animate-scale-in"
          >
            <CardContent className="p-8">
              {/* Quote Icon */}
              <Quote className="text-whaam-red mb-4" size={32} />
              
              {/* Review Text */}
              <p className="text-whaam-white mb-6 leading-relaxed text-lg italic">
                "{testimonial.review}"
              </p>
              
              {/* Results Section */}
              <div className="bg-whaam-white/10 rounded-xl p-4 mb-6 border border-whaam-red/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <TrendingUp className="text-whaam-yellow mx-auto mb-1" size={20} />
                    <div className="text-sm font-semibold text-whaam-white">{testimonial.beforeAfter}</div>
                  </div>
                  <div>
                    <Target className="text-whaam-red mx-auto mb-1" size={20} />
                    <div className="text-sm font-semibold text-whaam-white">{testimonial.accuracyBoost}</div>
                  </div>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-whaam-yellow fill-current" size={20} />
                ))}
                <span className="ml-2 text-muted-foreground text-sm">(Verifizierter Kunde)</span>
              </div>
              
              <div className="flex items-center justify-between">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-whaam-white">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.game} • {testimonial.rank}</div>
                  </div>
                </div>
                
                {/* Improvement Badge */}
                <Badge className="bg-whaam-red text-whaam-white border-0 px-3 py-1">
                  {testimonial.improvement}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Stats Section */}
      <div className="bg-whaam-black rounded-3xl p-12 text-whaam-white mb-16 border-2 border-whaam-red/20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Proven Track Record</h3>
          <p className="text-muted-foreground text-lg">
            Unsere Ergebnisse sprechen für sich. Hier ist der Impact, den wir erzielt haben.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <stat.icon size={48} className="text-whaam-red" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-whaam-white">
                {stat.value}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Success Metrics */}
        <div className="mt-12 pt-8 border-t border-whaam-red/20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold mb-1 text-whaam-yellow">2.3 Ränge</div>
              <div className="text-muted-foreground text-sm">Durchschnittlicher Rank-Anstieg</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1 text-whaam-yellow">14 Tage</div>
              <div className="text-muted-foreground text-sm">Durchschnitt bis zu Verbesserungen</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1 text-whaam-yellow">98%</div>
              <div className="text-muted-foreground text-sm">Würden uns weiterempfehlen</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Button 
          size="lg" 
          variant="whaam"
          className="px-8 py-4 text-lg font-semibold group"
          onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
        >
          Get Your Custom Curve Now
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
        </Button>
        <p className="text-muted-foreground mt-4">Schließe dich über 500 zufriedenen Gamern an</p>
      </div>
    </div>
  );
};

export default Portfolio;
