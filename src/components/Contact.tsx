
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
          Bereit für Perfektes
          <span className="block bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent mt-4"> Zielen?</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Hol dir deine personalisierte Mausbeschleunigungskurve und starte durch in deinen Games. 
          Jede großartige Performance beginnt mit den perfekten Einstellungen.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Main CTA Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Products CTA */}
          <Card className="border-2 border-whaam-red/20 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-whaam-black hover:border-whaam-red">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-whaam-red rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Target className="text-whaam-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-whaam-white mb-4">Zu den Produkten</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Wähle dein perfektes Paket und erhalte deine maßgeschneiderte Curve in wenigen Minuten.
              </p>
              <Button 
                onClick={scrollToProducts}
                size="lg"
                variant="whaam"
                className="w-full font-semibold group"
              >
                Jetzt Curve bestellen
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </CardContent>
          </Card>

          {/* Discord CTA */}
          <Card className="border-2 border-whaam-red/20 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-whaam-red text-whaam-white hover:border-whaam-yellow">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-whaam-white/20 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <MessageCircle className="text-whaam-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Fragen? Direkt auf Discord stellen</h3>
              <p className="text-whaam-white/80 mb-6 leading-relaxed">
                Tritt unserer Community bei und erhalte sofortigen Support von 500+ Gamern und Experten.
              </p>
              <Button 
                onClick={openDiscord}
                size="lg"
                className="w-full bg-whaam-white/20 hover:bg-whaam-white/30 text-whaam-white border-0 group font-semibold"
              >
                <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={18} />
                Discord Server beitreten
                <Zap className="ml-2" size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="bg-whaam-black rounded-3xl p-8 mb-16 border-2 border-whaam-red/20">
          <h3 className="text-3xl font-bold text-center text-whaam-white mb-8">
            Warum <span className="text-whaam-red">Whaam</span><span className="text-whaam-yellow">Ka</span><span className="text-whaam-white">Baam</span>?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-whaam-yellow rounded-2xl flex items-center justify-center">
                <CheckCircle className="text-whaam-black" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-whaam-white mb-2">100% Zufriedenheitsgarantie</h4>
              <p className="text-muted-foreground">Nicht zufrieden? Vollständige Rückerstattung, keine Fragen gestellt.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-whaam-red rounded-2xl flex items-center justify-center">
                <Zap className="text-whaam-white" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-whaam-white mb-2">Blitzschnelle Lieferung</h4>
              <p className="text-muted-foreground">Erste Curve in Minuten geliefert, nicht in Tagen.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-whaam-yellow rounded-2xl flex items-center justify-center">
                <Users className="text-whaam-black" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-whaam-white mb-2">Bewährte Ergebnisse</h4>
              <p className="text-muted-foreground">Vertraut von 500+ Gamern weltweit.</p>
            </div>
          </div>
        </div>

        {/* Discord Community Highlight */}
        <div className="bg-whaam-red rounded-3xl p-8 text-whaam-white text-center border-2 border-whaam-red/20">
          <MessageCircle className="mx-auto mb-4 text-whaam-white/80" size={48} />
          <h4 className="font-bold text-2xl mb-3">Tritt unserer Discord-Community bei</h4>
          <p className="text-whaam-white/80 mb-6 text-lg">
            Erhalte sofortigen Support, teile deine Fortschritte und vernetze dich mit 500+ Gamern, 
            die bereits ihr Aim transformiert haben.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <div className="flex items-center">
              <CheckCircle className="text-whaam-yellow mr-2" size={16} />
              24/7 Community Support
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-whaam-yellow mr-2" size={16} />
              Expertenhilfe verfügbar
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-whaam-yellow mr-2" size={16} />
              500+ aktive Gamer
            </div>
          </div>
          <Button 
            onClick={openDiscord}
            className="bg-whaam-white/20 hover:bg-whaam-white/30 text-whaam-white border-0 group font-semibold"
          >
            <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={18} />
            Jetzt Discord beitreten
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
              <div className="font-semibold text-whaam-white">Alex Chen</div>
              <div className="text-muted-foreground text-sm">Valorant Spieler</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
