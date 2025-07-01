
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowRight, Trophy, Target, Zap } from "lucide-react";

const Portfolio = () => {
  const testimonials = [
    {
      name: "Jake Mitchell",
      game: "Valorant",
      rank: "Immortal 2",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "My aim improved dramatically after getting my custom curve. The difference was noticeable immediately and I've been climbing ranks ever since! Went from Diamond to Immortal in just 2 weeks.",
      improvement: "+3 Rank Tiers",
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
      color: "from-red-500 to-pink-600"
    },
    {
      name: "Alex Rodriguez",
      game: "Apex Legends",
      rank: "Master",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "The live 1-on-1 session was incredible. Having real-time adjustments while I played made all the difference. My tracking improved instantly.",
      improvement: "Reached Master Tier",
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
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const stats = [
    { icon: Trophy, value: "500+", label: "Satisfied Gamers", color: "text-yellow-500" },
    { icon: Target, value: "98%", label: "Improved Accuracy", color: "text-green-500" },
    { icon: Zap, value: "Minutes", label: "Fast Delivery", color: "text-blue-500" },
    { icon: Star, value: "4.9/5", label: "Average Rating", color: "text-purple-500" }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Real Gamers,
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Real Results</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Don't just take our word for it. See how our custom curves have transformed 
          the aim and performance of gamers just like you.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={testimonial.name} 
            className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <CardContent className="p-8">
              {/* Quote Icon */}
              <Quote className="text-blue-500 mb-4" size={32} />
              
              {/* Review Text */}
              <p className="text-gray-700 mb-6 leading-relaxed text-lg italic">
                "{testimonial.review}"
              </p>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-current" size={20} />
                ))}
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
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.game} • {testimonial.rank}</div>
                  </div>
                </div>
                
                {/* Improvement Badge */}
                <Badge className={`bg-gradient-to-r ${testimonial.color} text-white border-0 px-3 py-1`}>
                  {testimonial.improvement}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 via-red-600 to-yellow-600 rounded-3xl p-12 text-white mb-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Proven Track Record</h3>
          <p className="text-blue-100 text-lg">
            Our results speak for themselves. Here's the impact we've made.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <stat.icon size={48} className="text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Testimonial Section */}
      <div className="bg-gray-50 rounded-3xl p-12 mb-16">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">See The Transformation</h3>
          <p className="text-gray-600 text-lg">
            Watch how our custom curves help gamers achieve their best performance.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            </div>
            <p className="text-gray-600">Video testimonials coming soon</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Button 
          size="lg" 
          className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold group"
          onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
        >
          Get Your Custom Curve Now
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Portfolio;
