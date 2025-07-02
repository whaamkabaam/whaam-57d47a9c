import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Users, Zap } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex_FPS",
      game: "VALORANT",
      rank: "Immortal 2",
      text: "Went from Diamond to Immortal in 2 weeks! The custom curve feels like magic - my flicks are so much more consistent now.",
      rating: 5,
      improvement: "+3 Ranks"
    },
    {
      name: "ProAimer_TTV",
      game: "CS2",
      rank: "Global Elite",
      text: "Best investment I've made for my gaming setup. The curve is perfectly tailored to my playstyle and the delivery was instant!",
      rating: 5,
      improvement: "40% Better Accuracy"
    },
    {
      name: "SharpShooter",
      game: "Apex Legends",
      rank: "Master",
      text: "I was skeptical at first, but after trying the curve for a week, I can't imagine playing without it. Game changer!",
      rating: 5,
      improvement: "Master Rank"
    },
    {
      name: "AimGod_2024",
      game: "VALORANT",
      rank: "Radiant",
      text: "The live session was incredible! Real-time adjustments while I played made all the difference. Reached Radiant soon after.",
      rating: 5,
      improvement: "Radiant Achieved"
    },
    {
      name: "FlickMaster",
      game: "Overwatch 2",
      rank: "Grandmaster",
      text: "Finally consistent aim! No more overflicking or underflicking. The curve adaptation period was surprisingly quick.",
      rating: 5,
      improvement: "Consistent Flicks"
    },
    {
      name: "HeadshotKing",
      game: "CS2",
      rank: "Supreme",
      text: "My headshot percentage increased by 25% within the first week. The support team was also amazing - answered all my questions.",
      rating: 5,
      improvement: "+25% Headshots"
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-whaam-yellow/10 text-whaam-yellow px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-whaam-yellow/20">
          <MessageSquare className="mr-2" size={16} />
          Was unsere Kunden sagen
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-whaam-white mb-4">
          Echte Erfolgs-
          <span className="block bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent mt-4">
            geschichten
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Über 500 Gamer haben bereits ihr Aim mit unseren Custom Curves perfektioniert. 
          Hier sind ihre Erfahrungen.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={index}
            className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-whaam-red/20 shadow-lg bg-whaam-black/80 backdrop-blur-sm hover:border-whaam-yellow"
          >
            <CardContent className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-bold text-whaam-white text-lg">{testimonial.name}</h4>
                  <p className="text-whaam-yellow text-sm font-semibold">{testimonial.game} • {testimonial.rank}</p>
                </div>
                <Badge className="bg-whaam-red/20 text-whaam-red border border-whaam-red/30 text-xs font-bold">
                  {testimonial.improvement}
                </Badge>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-whaam-yellow fill-current" size={16} />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-whaam-white/80 leading-relaxed mb-6 text-sm">
                "{testimonial.text}"
              </blockquote>

              {/* Discord Style Footer */}
              <div className="flex items-center text-xs text-whaam-white/50">
                <MessageSquare size={12} className="mr-2" />
                Verifizierter Kunde
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Section */}
      <div className="bg-whaam-black rounded-3xl p-12 text-center border-2 border-whaam-red/20">
        <h3 className="text-3xl font-bold mb-8 text-whaam-white">
          Tritt der <span className="text-whaam-red">500+</span> starken <span className="text-whaam-yellow">Community</span> bei
        </h3>
        
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <div className="w-16 h-16 bg-whaam-red rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Users className="text-whaam-white" size={28} />
            </div>
            <div className="text-2xl font-bold text-whaam-white mb-2">500+</div>
            <div className="text-muted-foreground">Zufriedene Gamer</div>
          </div>
          <div>
            <div className="w-16 h-16 bg-whaam-yellow rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Star className="text-whaam-black" size={28} />
            </div>
            <div className="text-2xl font-bold text-whaam-white mb-2">4.9/5</div>
            <div className="text-muted-foreground">Durchschnittsbewertung</div>
          </div>
          <div>
            <div className="w-16 h-16 bg-whaam-red rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Zap className="text-whaam-white" size={28} />
            </div>
            <div className="text-2xl font-bold text-whaam-white mb-2">30min</div>
            <div className="text-muted-foreground">Durchschnittliche Verbesserung</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;