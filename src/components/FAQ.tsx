
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Target, Zap, Shield } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      id: "what-is-curve",
      question: "Was genau ist eine Custom Mouse Curve?",
      answer: "Eine Custom Mouse Curve ist eine personalisierte Mausbeschleunigungseinstellung, die speziell auf deinen Spielstil, deine Hardware und deine bevorzugten Spiele angepasst wird. Sie optimiert die Beziehung zwischen deiner physischen Mausbewegung und der Cursor-Bewegung im Spiel für maximale Präzision und Konsistenz."
    },
    {
      id: "how-fast",
      question: "Wie schnell erhalte ich meine Curve?",
      answer: "Die erste Version deiner Custom Curve wird innerhalb von Minuten nach der Bestellung geliefert! Nach einer kurzen Analyse deiner Angaben erstellen wir deine initiale Curve sofort. Revisionen und Feinabstimmungen erfolgen dann basierend auf deinem Feedback meist innerhalb weniger Stunden."
    },
    {
      id: "which-games",
      question: "Für welche Spiele funktioniert die Curve?",
      answer: "Unsere Custom Curves funktionieren für alle FPS-Spiele! Besonders optimiert sind sie für Valorant, CS2, Apex Legends und Overwatch 2. Die Curve wird speziell für deine Hauptspiele angepasst, funktioniert aber auch hervorragend in anderen Shootern."
    },
    {
      id: "guarantee",
      question: "Was passiert, wenn ich nicht zufrieden bin?",
      answer: "Wir bieten eine 100% Zufriedenheitsgarantie! Wenn du mit deiner Custom Curve nicht vollständig zufrieden bist, erhältst du eine vollständige Rückerstattung - keine Fragen gestellt. Deine Zufriedenheit ist unser oberstes Ziel."
    },
    {
      id: "installation",
      question: "Ist die Installation schwierig?",
      answer: "Absolut nicht! Du erhältst eine detaillierte Schritt-für-Schritt-Anleitung plus die fertige Konfigurationsdatei. Die Installation dauert nur wenige Minuten und erfordert keine technischen Vorkenntnisse. Bei Fragen steht unser Support jederzeit zur Verfügung."
    },
    {
      id: "difference",
      question: "Was ist der Unterschied zwischen den Plänen?",
      answer: "Der Hauptunterschied liegt in der Anzahl der Revisionen: 3× Revisions bietet drei Anpassungsrunden, Unlimited Revisions so viele wie nötig, und die Live Session beinhaltet eine persönliche 45-minütige Beratung mit Echzeit-Anpassungen während du spielst."
    },
    {
      id: "hardware",
      question: "Funktioniert es mit meiner Maus?",
      answer: "Ja! Unsere Custom Curves funktionieren mit praktisch jeder Gaming-Maus. Egal ob Logitech, Razer, SteelSeries, Finalmouse oder eine andere Marke - wir passen die Curve an deine spezifische Hardware an für optimale Ergebnisse."
    },
    {
      id: "results",
      question: "Welche Verbesserungen kann ich erwarten?",
      answer: "Die meisten unserer Kunden berichten von 20-40% verbesserter Treffergenauigkeit, konsistenterem Aim und weniger Überzielen. Viele erreichen höhere Ränge in ihren Lieblingsspielen innerhalb von 1-2 Wochen nach der Implementierung."
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <HelpCircle className="mr-2" size={16} />
          Häufig gestellte Fragen
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Alles was du
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> wissen musst</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Hier findest du Antworten auf die wichtigsten Fragen zu unseren Custom Curves 
          und unserem Service.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-gray-200">
                  <AccordionTrigger className="text-left hover:text-blue-600 transition-colors text-lg font-semibold py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-6 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Quick Help Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow group">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
              <Target className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Sofortige Lieferung</h3>
            <p className="text-gray-600">Erste Curve in Minuten, nicht in Tagen. Starte sofort durch!</p>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow group">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
              <Zap className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Einfache Installation</h3>
            <p className="text-gray-600">Schritt-für-Schritt Anleitung für mühelose Einrichtung.</p>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow group">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
              <Shield className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">100% Garantie</h3>
            <p className="text-gray-600">Nicht zufrieden? Vollständige Rückerstattung ohne Wenn und Aber.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
