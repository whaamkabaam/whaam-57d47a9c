
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Settings, Target, CheckCircle } from "lucide-react";

const Services = () => {
  const steps = [
    {
      icon: FileText,
      title: "Bestellung & Info bereitstellen",
      description: "Erzähle uns von deinen aktuellen Einstellungen, Spielen und Gaming-Zielen. Wir analysieren deinen Spielstil.",
      details: ["Teile deine aktuelle Sensitivität", "Nenne uns deine Hauptspiele", "Beschreibe deine Aim-Probleme", "Setze deine Performance-Ziele"],
      color: "bg-whaam-red"
    },
    {
      icon: Settings,
      title: "Personalisierte Einrichtung",
      description: "Unser Experte erstellt deine Custom Curve basierend auf deinem einzigartigen Gaming-Profil und Präferenzen.",
      details: ["Analysiere deinen Gaming-Stil", "Berechne optimale Beschleunigung", "Erstelle personalisierte Curve", "Teste Anfangsparameter"],
      color: "bg-whaam-yellow"
    },
    {
      icon: Target,
      title: "Feinabstimmung",
      description: "Wir verfeinern und perfektionieren deine Curve durch Tests und Revisionen, bis sie absolut perfekt ist.",
      details: ["Teste Curve-Performance", "Sammle dein Feedback", "Mache präzise Anpassungen", "Optimiere für Konsistenz"],
      color: "bg-whaam-red"
    },
    {
      icon: CheckCircle,
      title: "Perfektes Aim geliefert",
      description: "Erhalte deine finalen Curve-Einstellungen und starte durch in deinen Games mit verbesserter Genauigkeit.",
      details: ["Erhalte finale Curve-Datei", "Installationsanleitung", "Performance-Tipps", "Zugang zu fortlaufendem Support"],
      color: "bg-whaam-yellow"
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 bg-whaam-dark">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-whaam-white mb-4">
          Wie es
          <span className="bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent"> funktioniert</span>
        </h2>
        <p className="text-lg sm:text-xl text-whaam-white/80 max-w-2xl mx-auto">
          Unser bewährter 4-Schritte-Prozess liefert personalisierte Mausbeschleunigungskurven, 
          die dein Aim von durchschnittlich zu außergewöhnlich transformieren.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {steps.map((step, index) => (
          <Card 
            key={step.title} 
            className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-whaam-red/20 shadow-lg relative bg-whaam-dark/80 backdrop-blur-sm"
          >
            {/* Step Number */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-whaam-red text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
              {index + 1}
            </div>
            
            <CardContent className="p-6 sm:p-8">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 ${step.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="text-whaam-black" size={24} />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-whaam-white mb-3 sm:mb-4 group-hover:text-whaam-red transition-colors">
                {step.title}
              </h3>
              
              <p className="text-sm sm:text-base text-whaam-white/70 mb-4 sm:mb-6 leading-relaxed">
                {step.description}
              </p>
              
              <div className="space-y-2">
                {step.details.map((detail) => (
                  <div key={detail} className="flex items-start space-x-2">
                    <CheckCircle className="text-whaam-yellow flex-shrink-0 mt-0.5" size={14} />
                    <span className="text-xs sm:text-sm text-whaam-white/60">{detail}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Section */}
      <div className="bg-whaam-black rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white text-center border border-whaam-red/20">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-whaam-white">Vertraut von 500+ Gamern weltweit</h3>
        <p className="text-whaam-white/70 text-base sm:text-lg mb-6 sm:mb-8">
          Tritt der Community von Gamern bei, die bereits ihr Aim mit unseren Custom Curves transformiert haben.
        </p>
        
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-whaam-red mb-2">Minuten</div>
            <div className="text-sm sm:text-base text-whaam-white/60">Erste Curve geliefert</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-whaam-yellow mb-2">100%</div>
            <div className="text-sm sm:text-base text-whaam-white/60">Zufriedenheitsgarantie</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-whaam-red mb-2">4+ Jahre</div>
            <div className="text-sm sm:text-base text-whaam-white/60">Experten-Erfahrung</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
