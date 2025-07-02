
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
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-whaam-white mb-4">
          Ready for Perfect
          <span className="block bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent mt-4"> Aim?</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get your personalized mouse acceleration curve and start dominating your games. 
          Every great performance starts with perfect settings.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Main CTA Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Products CTA */}
          <Card className="border-2 border-whaam-red/20 shadow-xl hover:shadow-2xl transition-all duration-500 group bg-whaam-black hover:border-whaam-red animate-fade-in hover:scale-105 hover:-translate-y-3 hover:rotate-1">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-whaam-red rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-2xl">
                <Target className="text-whaam-white group-hover:scale-110 transition-transform duration-300" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-whaam-white mb-4">View Products</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Choose your perfect package and get your custom curve in minutes.
              </p>
              <Button 
                onClick={scrollToProducts}
                size="lg"
                variant="whaam"
                className="w-full font-semibold group"
              >
                Order Curve Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </CardContent>
          </Card>

          {/* Discord CTA */}
          <Card className="border-2 border-whaam-red/20 shadow-xl hover:shadow-2xl transition-all duration-500 group bg-whaam-red text-whaam-white hover:border-whaam-yellow animate-fade-in hover:scale-105 hover:-translate-y-3 hover:rotate-1" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-whaam-white/20 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-2xl">
                <MessageCircle className="text-whaam-white group-hover:scale-110 transition-transform duration-300" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Questions? Ask directly on Discord</h3>
              <p className="text-whaam-white/80 mb-6 leading-relaxed">
                Join our community and get instant support from 500+ gamers and experts.
              </p>
              <Button 
                onClick={openDiscord}
                size="lg"
                className="w-full bg-whaam-white/20 hover:bg-whaam-white/30 text-whaam-white border-0 group font-semibold"
              >
                <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={18} />
                Join Discord Server
                <Zap className="ml-2" size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="bg-whaam-black rounded-3xl p-8 mb-16 border-2 border-whaam-red/20 animate-fade-in hover:shadow-2xl hover:shadow-whaam-red/20 transition-all duration-500" style={{ animationDelay: '200ms' }}>
          <h3 className="text-3xl font-bold text-center text-whaam-white mb-8">
            Why <span className="bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent">WhaamKaBaam</span>?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center group hover:scale-105 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-whaam-yellow rounded-2xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-xl">
                <CheckCircle className="text-whaam-black group-hover:scale-110 transition-transform duration-300" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-whaam-white mb-2 group-hover:text-whaam-yellow transition-colors duration-300">100% Satisfaction Guarantee</h4>
              <p className="text-muted-foreground group-hover:text-whaam-white/90 transition-colors duration-300">Not satisfied? Full refund, no questions asked.</p>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-300 hover:-translate-y-2" style={{ animationDelay: '50ms' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-whaam-red rounded-2xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-xl">
                <Zap className="text-whaam-white group-hover:scale-110 transition-transform duration-300" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-whaam-white mb-2 group-hover:text-whaam-yellow transition-colors duration-300">Lightning Fast Delivery</h4>
              <p className="text-muted-foreground group-hover:text-whaam-white/90 transition-colors duration-300">First curve delivered in minutes, not days.</p>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-300 hover:-translate-y-2" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-whaam-yellow rounded-2xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-xl">
                <Users className="text-whaam-black group-hover:scale-110 transition-transform duration-300" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-whaam-white mb-2 group-hover:text-whaam-yellow transition-colors duration-300">Proven Results</h4>
              <p className="text-muted-foreground group-hover:text-whaam-white/90 transition-colors duration-300">Trusted by 500+ gamers worldwide.</p>
            </div>
          </div>
        </div>

        {/* Discord Community Highlight */}
        <div className="bg-whaam-red rounded-3xl p-8 text-whaam-white text-center border-2 border-whaam-red/20 animate-fade-in hover:shadow-2xl hover:shadow-whaam-red/30 transition-all duration-500 hover:scale-[1.02]" style={{ animationDelay: '300ms' }}>
          <MessageCircle className="mx-auto mb-4 text-whaam-white/80" size={48} />
          <h4 className="font-bold text-2xl mb-3">Join our Discord Community</h4>
          <p className="text-whaam-white/80 mb-6 text-lg">
            Get instant support, share your progress and connect with 500+ gamers 
            who have already transformed their aim.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <div className="flex items-center">
              <CheckCircle className="text-whaam-yellow mr-2" size={16} />
              24/7 Community Support
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-whaam-yellow mr-2" size={16} />
              Expert help available
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-whaam-yellow mr-2" size={16} />
              500+ active gamers
            </div>
          </div>
          <Button 
            onClick={openDiscord}
            className="bg-whaam-white/20 hover:bg-whaam-white/30 text-whaam-white border-0 group font-semibold"
          >
            <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={18} />
            Join Discord Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </Button>
        </div>

        {/* Testimonial */}
        <div className="bg-whaam-black rounded-3xl p-8 shadow-lg mt-16 border-2 border-whaam-red/20">
          <div className="flex items-center justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-whaam-yellow fill-current" size={20} />
            ))}
          </div>
          <blockquote className="text-whaam-white mb-4 text-center text-lg">
            "My aim improved dramatically after getting my custom curve. 
            The difference was immediately noticeable and I've been climbing ranks ever since!"
          </blockquote>
          <div className="flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" 
              alt="Customer"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="text-center">
              <div className="font-semibold text-whaam-white">Alex Chen</div>
              <div className="text-muted-foreground text-sm">Valorant Player</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
