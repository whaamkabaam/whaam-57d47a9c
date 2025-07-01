
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, Zap, Target, Trophy, GamepadIcon } from "lucide-react";

const About = () => {
  const expertStats = [
    { icon: Trophy, value: "4+ Years", label: "Curve Development Experience" },
    { icon: Target, value: "Radiant", label: "Peak Valorant Rank" },
    { icon: Users, value: "500+", label: "Gamers Helped" },
    { icon: Star, value: "4.9/5", label: "Client Satisfaction" }
  ];

  const games = [
    { name: "Valorant", experience: "4+ Years", rank: "Radiant" },
    { name: "CS2", experience: "6+ Years", rank: "Global Elite" },
    { name: "Apex Legends", experience: "3+ Years", rank: "Master" },
    { name: "Overwatch 2", experience: "5+ Years", rank: "Grandmaster" }
  ];

  const credentials = [
    "4+ years of competitive FPS experience",
    "Reached Radiant in Valorant consistently",
    "Expert in Raw Accel and mouse optimization",
    "Helped 500+ gamers improve their aim",
    "Active in gaming communities with 10K+ followers",
    "Data-driven approach to curve development"
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Meet Your
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Curve Expert</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Behind every perfect curve is years of competitive experience and 
          a passion for helping gamers reach their full potential.
        </p>
      </div>

      {/* Expert Profile */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <Card className="border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-blue-500 via-purple-600 to-red-500 relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                  alt="Curve Expert"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">Alex Chen</h4>
                        <p className="text-sm text-gray-600">Curve Development Expert</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                        Radiant
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              The Expert Behind Your Perfect Aim
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              With over 4 years of competitive FPS experience and a peak Radiant rank in Valorant, 
              I've dedicated my career to understanding the science behind perfect aim. Having helped 
              500+ gamers transform their performance, I bring both technical expertise and real 
              competitive experience to every custom curve.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              My data-driven approach combines competitive insights with precise mathematical 
              optimization to create curves that don't just work—they transform your entire gaming experience.
            </p>
          </div>

          {/* Credentials */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <Award className="text-blue-500 mr-2" size={24} />
              Credentials & Experience
            </h4>
            <div className="grid gap-3">
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Star className="text-yellow-500 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-gray-700 text-sm">{credential}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expert Stats */}
      <div className="grid md:grid-cols-4 gap-8 mb-20">
        {expertStats.map((stat, index) => (
          <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow group">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <stat.icon className="text-white" size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gaming Background */}
      <div className="bg-gray-900 rounded-3xl p-12 text-white mb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Competitive Gaming Background</h3>
          <p className="text-gray-300 text-lg">
            Real competitive experience across multiple FPS titles ensures your curve 
            is optimized for actual gameplay scenarios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game, index) => (
            <div key={game.name} className="text-center bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <GamepadIcon className="text-blue-400 mx-auto mb-4" size={48} />
              <h4 className="text-xl font-bold mb-2">{game.name}</h4>
              <div className="text-blue-400 font-semibold mb-1">{game.rank}</div>
              <div className="text-gray-400 text-sm">{game.experience}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">My Mission</h3>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          "Every gamer deserves to experience their true potential. Through personalized 
          mouse acceleration curves, I help competitive players break through their aim 
          barriers and achieve the consistency they've always wanted. Your success is my success."
        </p>
        <div className="mt-8">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 border-0">
            Transforming Aim, One Curve at a Time
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default About;
