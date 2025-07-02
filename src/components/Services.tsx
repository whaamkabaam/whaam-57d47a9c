
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Settings, Target, CheckCircle, Zap } from "lucide-react";

const Services = () => {
  const steps = [
    {
      icon: FileText,
      title: "ORDER & PROVIDE INFO",
      description: "Short form or book a call - tell us about your gaming goals!",
      details: ["Share current sensitivity", "Name your favorite games", "Describe aim problems", "Set performance goals"],
      number: "1",
      bgColor: "bg-fire-red"
    },
    {
      icon: Settings,
      title: "RECEIVE YOUR CURVE",
      description: "Get your personalized curve delivered in minutes via Discord!",
      details: ["Gaming style analysis", "Optimal acceleration calculated", "Personalized curve created", "Initial parameters tested"],
      number: "2",
      bgColor: "bg-boom-yellow"
    },
    {
      icon: Target,
      title: "ADJUST TO PERFECTION",
      description: "3× Revisions, Unlimited or Live Call - your choice!",
      details: ["Test curve performance", "Gather your feedback", "Make precise adjustments", "Optimize for consistency"],
      number: "3",
      bgColor: "bg-fire-red"
    }
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <h2 className="font-bangers text-6xl md:text-7xl text-comic-black">
              HOW IT
              <span className="text-fire-red"> WORKS</span>
            </h2>
            <div className="absolute -top-4 -right-8 w-16 h-16 bg-boom-yellow border-4 border-black rounded-full flex items-center justify-center transform rotate-12">
              <Zap className="text-black" size={24} />
            </div>
          </div>
          
          <div className="speech-bubble max-w-3xl mx-auto">
            <p className="font-russo text-xl text-black leading-relaxed">
              Our <span className="text-fire-red font-bold">EXPLOSIVE</span> 3-step process 
              transforms your aim from <span className="text-gray-600">average</span> to 
              <span className="text-boom-yellow font-bold"> LEGENDARY!</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Comic Number Badge */}
              <div className={`absolute -top-4 -left-4 w-12 h-12 ${step.bgColor} border-4 border-black rounded-full flex items-center justify-center font-bangers text-2xl text-white z-10 shadow-[4px_4px_0px_0px_theme(colors.black)]`}>
                {step.number}
              </div>
              
              <div className="comic-panel h-full hover:shadow-[12px_12px_0px_0px_theme(colors.black)] transition-all duration-300 group-hover:-translate-y-2">
                <div className={`w-16 h-16 ${step.bgColor} border-4 border-black rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                  <step.icon className="text-white" size={28} />
                </div>
                
                <h3 className="font-bangers text-3xl text-comic-black mb-4 group-hover:text-fire-red transition-colors">
                  {step.title}
                </h3>
                
                <p className="font-russo text-base text-gray-700 mb-6 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-fire-red rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600 font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="bg-comic-black rounded-3xl p-12 text-white text-center">
          <h3 className="font-bangers text-5xl text-white mb-6">
            TRUSTED BY <span className="text-fire-red">1500+</span> GAMERS!
          </h3>
          
          <p className="font-russo text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the community of gamers who already transformed their aim with our 
            <span className="text-boom-yellow font-bold"> CUSTOM CURVES!</span>
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="comic-panel bg-white">
              <div className="font-bangers text-5xl text-fire-red mb-2">MINUTES</div>
              <div className="font-russo text-base text-black font-bold">FIRST CURVE DELIVERED</div>
            </div>
            <div className="comic-panel bg-white">
              <div className="font-bangers text-5xl text-boom-yellow mb-2">100%</div>
              <div className="font-russo text-base text-black font-bold">SATISFACTION GUARANTEE</div>
            </div>
            <div className="comic-panel bg-white">
              <div className="font-bangers text-5xl text-fire-red mb-2">4+ YEARS</div>
              <div className="font-russo text-base text-black font-bold">EXPERT EXPERIENCE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
