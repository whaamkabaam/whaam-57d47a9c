
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Settings, Target, CheckCircle, Zap } from "lucide-react";

const Services = () => {
  const steps = [
    {
      icon: FileText,
      title: "INFOS SAMMELN",
      description: "Erzähle uns von deinen Gaming-Zielen und aktuellen Einstellungen!",
      details: ["Aktuelle Sensitivität teilen", "Lieblingsspiele nennen", "Aim-Probleme beschreiben", "Performance-Ziele setzen"],
      number: "1",
      bgColor: "bg-fire-red"
    },
    {
      icon: Settings,
      title: "CURVE ERSTELLEN",
      description: "Unser Experte zaubert deine perfekte Custom Curve!",
      details: ["Gaming-Stil analysieren", "Optimale Beschleunigung berechnen", "Personalisierte Curve erstellen", "Anfangsparameter testen"],
      number: "2",
      bgColor: "bg-boom-yellow"
    },
    {
      icon: Target,
      title: "FEINTUNING",
      description: "Wir polieren deine Curve bis zur Perfektion!",
      details: ["Curve-Performance testen", "Dein Feedback sammeln", "Präzise Anpassungen machen", "Für Konsistenz optimieren"],
      number: "3",
      bgColor: "bg-fire-red"
    },
    {
      icon: CheckCircle,
      title: "BEREIT ZUM DOMINIEREN",
      description: "Erhalte deine finale Curve und starte durch!",
      details: ["Finale Curve-Datei erhalten", "Installationsanleitung", "Performance-Tipps", "Fortlaufender Support"],
      number: "4",
      bgColor: "bg-boom-yellow"
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 bg-gray-50">
      <div className="text-center mb-12 sm:mb-16">
        <div className="relative inline-block mb-8">
          <h2 className="font-bangers text-5xl sm:text-6xl md:text-7xl text-comic-black">
            WIE ES
            <span className="text-fire-red"> FUNKTIONIERT</span>
          </h2>
          <div className="absolute -top-4 -right-8 w-16 h-16 bg-boom-yellow border-4 border-black rounded-full flex items-center justify-center transform rotate-12">
            <Zap className="text-black" size={24} />
          </div>
        </div>
        
        <div className="speech-bubble max-w-3xl mx-auto">
          <p className="font-russo text-lg sm:text-xl text-black leading-relaxed">
            Unser <span className="text-fire-red font-bold">EXPLOSIVER</span> 4-Schritte-Prozess 
            verwandelt dein Aim von <span className="text-gray-600">durchschnittlich</span> zu 
            <span className="text-boom-yellow font-bold"> LEGENDÄR!</span>
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
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
              
              <h3 className="font-bangers text-2xl sm:text-3xl text-comic-black mb-4 group-hover:text-fire-red transition-colors">
                {step.title}
              </h3>
              
              <p className="font-russo text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
                {step.description}
              </p>
              
              <div className="space-y-3">
                {step.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-fire-red rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Section with Comic Style */}
      <div className="relative bg-comic-black rounded-3xl p-8 sm:p-12 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle, #FFD700 2px, transparent 2px)`,
          backgroundSize: '30px 30px'
        }}></div>
        
        <div className="relative z-10 text-center">
          <div className="relative inline-block mb-6">
            <h3 className="font-bangers text-4xl sm:text-5xl text-white">
              VERTRAUT VON <span className="text-fire-red">500+</span> GAMERN!
            </h3>
            <div className="absolute -top-2 -right-4 w-8 h-8 bg-boom-yellow border-2 border-white rounded-full animate-bounce"></div>
          </div>
          
          <p className="font-russo text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Tritt der Community von Gamern bei, die bereits ihr Aim mit unseren 
            <span className="text-boom-yellow font-bold"> CUSTOM CURVES</span> transformiert haben!
          </p>
          
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="comic-panel bg-white">
              <div className="font-bangers text-4xl sm:text-5xl text-fire-red mb-2">MINUTEN</div>
              <div className="font-russo text-sm sm:text-base text-black font-bold">ERSTE CURVE GELIEFERT</div>
            </div>
            <div className="comic-panel bg-white">
              <div className="font-bangers text-4xl sm:text-5xl text-boom-yellow mb-2">100%</div>
              <div className="font-russo text-sm sm:text-base text-black font-bold">ZUFRIEDENHEITSGARANTIE</div>
            </div>
            <div className="comic-panel bg-white">
              <div className="font-bangers text-4xl sm:text-5xl text-fire-red mb-2">4+ JAHRE</div>
              <div className="font-russo text-sm sm:text-base text-black font-bold">EXPERTEN-ERFAHRUNG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
