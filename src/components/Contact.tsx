
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Star, Zap, ArrowRight, Users, Target, CheckCircle } from "lucide-react";

const Contact = () => {
  const scrollToProducts = () => {
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openDiscord = () => {
    window.open("https://discord.gg/lovable", "_blank");
  };

  return (
    <div className="bg-comic-black py-20 text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <h2 className="font-bangers text-6xl md:text-7xl text-white">
              READY FOR
              <span className="text-fire-red block">PERFECT AIM?</span>
            </h2>
            <div className="absolute -top-4 -right-8 w-16 h-16 bg-boom-yellow border-4 border-white rounded-full flex items-center justify-center transform rotate-12">
              <Target className="text-black" size={24} />
            </div>
          </div>
          
          <p className="font-russo text-xl text-gray-300 max-w-3xl mx-auto">
            Get your personalized mouse acceleration curve and dominate in your games. 
            Every legendary performance starts with the perfect settings.
          </p>
        </div>

        {/* Main CTAs */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {/* Products CTA */}
          <div className="comic-panel bg-white text-center">
            <div className="w-20 h-20 bg-fire-red rounded-3xl flex items-center justify-center mb-6 mx-auto">
              <Target className="text-white" size={40} />
            </div>
            <h3 className="font-bangers text-3xl text-comic-black mb-4">GET YOUR CURVE</h3>
            <p className="font-russo text-gray-700 mb-6 leading-relaxed">
              Choose your perfect package and receive your custom-tailored curve in minutes.
            </p>
            <button 
              onClick={scrollToProducts}
              className="comic-button group text-white font-bangers text-xl w-full"
            >
              ORDER CURVE NOW
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </div>

          {/* Discord CTA */}
          <div className="comic-panel bg-gradient-to-r from-fire-red to-boom-yellow text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center mb-6 mx-auto">
              <MessageCircle className="text-white" size={40} />
            </div>
            <h3 className="font-bangers text-3xl text-white mb-4">QUESTIONS? ASK ON DISCORD</h3>
            <p className="font-russo text-white opacity-90 mb-6 leading-relaxed">
              Join our community and get instant support from 1500+ gamers and experts.
            </p>
            <button 
              onClick={openDiscord}
              className="comic-button-yellow group text-black font-bangers text-xl w-full"
            >
              JOIN DISCORD SERVER
              <Zap className="ml-2" size={16} />
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-boom-yellow rounded-2xl flex items-center justify-center">
              <CheckCircle className="text-black" size={32} />
            </div>
            <h4 className="font-bangers text-2xl text-white mb-2">100% SATISFACTION GUARANTEE</h4>
            <p className="font-russo text-gray-300">Not satisfied? Full refund, no questions asked.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-fire-red rounded-2xl flex items-center justify-center">
              <Zap className="text-white" size={32} />
            </div>
            <h4 className="font-bangers text-2xl text-white mb-2">LIGHTNING FAST DELIVERY</h4>
            <p className="font-russo text-gray-300">First curve delivered in minutes, not days.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-boom-yellow rounded-2xl flex items-center justify-center">
              <Users className="text-black" size={32} />
            </div>
            <h4 className="font-bangers text-2xl text-white mb-2">PROVEN RESULTS</h4>
            <p className="font-russo text-gray-300">Trusted by 1500+ gamers worldwide.</p>
          </div>
        </div>

        {/* Final Testimonial */}
        <div className="comic-panel bg-white text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-boom-yellow fill-current" size={24} />
            ))}
          </div>
          <blockquote className="font-russo text-xl text-comic-black mb-6 italic">
            "My aim improved dramatically after getting my custom curve. 
            The difference was noticeable immediately and I've been climbing ranks ever since!"
          </blockquote>
          <div className="font-bangers text-lg text-fire-red">
            Jake Mitchell - Valorant Immortal
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
