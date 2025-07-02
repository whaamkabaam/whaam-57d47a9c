
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
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Bereit für Perfektes
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Zielen?</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Hol dir deine personalisierte Mausbeschleunigungskurve und starte durch in deinen Games. 
          Jede großartige Performance beginnt mit den perfekten Einstellungen.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Main CTA Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Products CTA */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Target className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Zu den Produkten</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Wähle dein perfektes Paket und erhalte deine maßgeschneiderte Curve in wenigen Minuten.
              </p>
              <Button 
                onClick={scrollToProducts}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold group"
              >
                Jetzt Curve bestellen
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </CardContent>
          </Card>

          {/* Discord CTA */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <MessageCircle className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Fragen? Direkt auf Discord stellen</h3>
              <p className="text-indigo-100 mb-6 leading-relaxed">
                Tritt unserer Community bei und erhalte sofortigen Support von 500+ Gamern und Experten.
              </p>
              <Button 
                onClick={openDiscord}
                size="lg"
                className="w-full bg-white/20 hover:bg-white/30 text-white border-0 group font-semibold"
              >
                <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={18} />
                Discord Server beitreten
                <Zap className="ml-2" size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Warum Lovable.dev?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-2xl flex items-center justify-center">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">100% Zufriedenheitsgarantie</h4>
              <p className="text-gray-600">Nicht zufrieden? Vollständige Rückerstattung, keine Fragen gestellt.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-2xl flex items-center justify-center">
                <Zap className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Blitzschnelle Lieferung</h4>
              <p className="text-gray-600">Erste Curve in Minuten geliefert, nicht in Tagen.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-2xl flex items-center justify-center">
                <Users className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Bewährte Ergebnisse</h4>
              <p className="text-gray-600">Vertraut von 500+ Gamern weltweit.</p>
            </div>
          </div>
        </div>

        {/* Discord Community Highlight */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white text-center">
          <MessageCircle className="mx-auto mb-4 text-indigo-200" size={48} />
          <h4 className="font-bold text-2xl mb-3">Tritt unserer Discord-Community bei</h4>
          <p className="text-indigo-100 mb-6 text-lg">
            Erhalte sofortigen Support, teile deine Fortschritte und vernetze dich mit 500+ Gamern, 
            die bereits ihr Aim transformiert haben.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <div className="flex items-center">
              <CheckCircle className="text-green-300 mr-2" size={16} />
              24/7 Community Support
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-green-300 mr-2" size={16} />
              Expertenhilfe verfügbar
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-green-300 mr-2" size={16} />
              500+ aktive Gamer
            </div>
          </div>
          <Button 
            onClick={openDiscord}
            className="bg-white/20 hover:bg-white/30 text-white border-0 group font-semibold"
          >
            <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={18} />
            Jetzt Discord beitreten
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </Button>
        </div>

        {/* Testimonial */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mt-16">
          <div className="flex items-center justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-500 fill-current" size={20} />
            ))}
          </div>
          <blockquote className="text-gray-700 mb-4 text-center text-lg">
            "Mein Aim hat sich dramatisch verbessert, nachdem ich meine Custom Curve erhalten habe. 
            Der Unterschied war sofort spürbar und ich klettere seitdem immer weiter in den Rängen!"
          </blockquote>
          <div className="flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" 
              alt="Kunde"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="text-center">
              <div className="font-semibold text-gray-900">Alex Chen</div>
              <div className="text-gray-600 text-sm">Valorant Spieler</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
