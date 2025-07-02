
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Star } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProducts = () => {
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-comic-black via-gray-900 to-black text-white relative overflow-hidden pt-20">
      {/* Comic-Style Background Elements */}
      <div className="absolute inset-0">
        {/* Explosive Shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-fire-red/30 transform rotate-45 animate-bounce-in"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-boom-yellow/40 rounded-full animate-bounce-in delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-fire-red/20 transform rotate-12 animate-bounce-in delay-1000"></div>
        
        {/* Speed Lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-boom-yellow to-transparent transform -skew-y-12"></div>
          <div className="absolute top-40 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fire-red to-transparent transform skew-y-12"></div>
          <div className="absolute top-60 left-0 w-full h-1 bg-gradient-to-r from-transparent via-boom-yellow to-transparent transform -skew-y-12"></div>
        </div>

        {/* Comic Dots Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle, #FF3B3B 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Explosive Headline */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <h1 className="font-bangers text-7xl md:text-9xl leading-none mb-6 text-white">
                <span className="boom-text block">CUSTOM CURVE</span>
                <span className="pow-text block -mt-4">SETTINGS</span>
              </h1>
              
              {/* Burst Effect */}
              <div className="absolute -top-8 -right-8 w-24 h-24 border-4 border-boom-yellow bg-fire-red rounded-full flex items-center justify-center transform rotate-12 animate-pop">
                <Zap className="text-white" size={32} />
              </div>
            </div>
          </div>

          {/* Comic Speech Bubble */}
          <div className={`speech-bubble mx-auto max-w-3xl mb-12 transition-all duration-1500 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <p className="font-russo text-xl md:text-2xl text-black leading-relaxed">
              <span className="text-fire-red font-bold">TAILORED TO YOUR AIM!</span>
              <br />
              Perfect your aim with <span className="text-boom-yellow font-bold">personalized mouse acceleration curves</span> 
              that transform your gameplay from average to legendary!
            </p>
          </div>

          {/* Comic-Style CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={scrollToProducts}
              className="comic-button group text-white font-bangers text-2xl transform hover:scale-105"
            >
              GET YOUR CURVE NOW
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform inline-block" size={24} />
            </button>
            
            <button 
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="comic-button-yellow group text-black font-bangers text-2xl transform hover:scale-105"
            >
              LEARN HOW IT WORKS
              <Target className="ml-3 group-hover:rotate-12 transition-transform inline-block" size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Comic-Style Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-12 h-20 border-4 border-boom-yellow bg-fire-red/20 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-2 h-6 bg-boom-yellow rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
