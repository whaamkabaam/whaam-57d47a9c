
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Award, Users, Zap, Target, Trophy, GamepadIcon, Play, TrendingUp } from "lucide-react";

const About = () => {
  const expertStats = [
    { icon: Trophy, value: "1900 RR", label: "Peak Valorant Rank", color: "text-yellow-500" },
    { icon: Users, value: "75K+", label: "TikTok Followers", color: "text-pink-500" },
    { icon: Target, value: "500+", label: "Gamers Helped", color: "text-green-500" },
    { icon: Star, value: "4+ Years", label: "Curve Development", color: "text-blue-500" }
  ];

  const games = [
    { name: "Valorant", experience: "4+ Years", rank: "Radiant (1900 RR)", color: "from-red-500 to-red-600" },
    { name: "CS2", experience: "6+ Years", rank: "Global Elite", color: "from-orange-500 to-orange-600" },
    { name: "Apex Legends", experience: "3+ Years", rank: "Master", color: "from-purple-500 to-purple-600" },
    { name: "Overwatch 2", experience: "5+ Years", rank: "Grandmaster", color: "from-blue-500 to-blue-600" }
  ];

  const achievements = [
    "Radiant in Valorant with 1900+ RR consistently",
    "75,000+ TikTok followers in gaming community",
    "4+ years of competitive FPS experience",
    "Expert in Raw Accel and mouse optimization",
    "Helped 500+ gamers improve their aim significantly",
    "Data-driven approach with proven results"
  ];

  return (
    <div className="container mx-auto px-6">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10"></div>
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Award className="mr-2" size={16} />
          Meet Your Expert
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Meet Your
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Curve Expert</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Mit über 4 Jahren Erfahrung und 1900 RR in Valorant bringe ich sowohl 
          technische Expertise als auch echte Wettkampferfahrung zu jeder Custom Curve.
        </p>
      </div>

      {/* Main Expert Section with Video and Content */}
      <div className="relative mb-20">
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-0 items-center min-h-[600px]">
            
            {/* Video Section */}
            <div className="relative p-8 lg:p-12">
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-video shadow-2xl">
                {/* Video Placeholder - In real implementation, this would be a video */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                      <Play className="text-white ml-1" size={32} />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Curve Expert Introduction</h4>
                    <p className="text-blue-100">Lerne deinen Aim-Experten kennen</p>
                  </div>
                </div>
                
                {/* Professional overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <div className="font-bold">Alex Chen</div>
                        <div className="text-sm text-blue-200">Curve Development Expert</div>
                      </div>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                        1900 RR Radiant
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Play Button Overlay */}
              <Button 
                size="lg" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-2 border-white border-opacity-50 backdrop-blur-sm rounded-full w-16 h-16 p-0"
              >
                <Play className="ml-1" size={24} />
              </Button>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 text-white">
              <div className="max-w-lg">
                <h3 className="text-3xl font-bold mb-6">
                  Der Experte hinter deinem perfekten Aim
                </h3>
                
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                  <p className="text-lg leading-relaxed mb-4">
                    "Ich helfe dir dabei, dein Aim auf ein völlig neues Level zu bringen. 
                    Mit über 4 Jahren Erfahrung in der Curve-Entwicklung und als Radiant-Spieler 
                    weiß ich genau, was funktioniert."
                  </p>
                  <p className="text-blue-200">
                    Meine datengetriebene Herangehensweise kombiniert Wettkampf-Insights 
                    mit präziser mathematischer Optimierung für Curves, die wirklich transformieren.
                  </p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {expertStats.slice(0, 4).map((stat, index) => (
                    <div key={index} className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                      <stat.icon className={`${stat.color} mx-auto mb-2`} size={24} />
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-3xl p-12 shadow-lg mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Credentials & Erfolge
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="text-white" size={14} />
                  </div>
                  <span className="text-gray-700 leading-relaxed">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {expertStats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <stat.icon className={stat.color} size={28} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Gaming Background */}
      <div className="bg-gray-900 rounded-3xl p-12 text-white mb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Competitive Gaming Background</h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Echte Wettkampferfahrung in mehreren FPS-Titeln sorgt dafür, dass deine Curve 
            für tatsächliche Gameplay-Szenarien optimiert ist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game, index) => (
            <div key={game.name} className="text-center">
              <div className={`bg-gradient-to-br ${game.color} rounded-2xl p-6 mb-4 hover:scale-105 transition-transform`}>
                <GamepadIcon className="text-white mx-auto mb-4" size={48} />
                <h4 className="text-xl font-bold text-white mb-2">{game.name}</h4>
                <div className="text-white font-semibold">{game.rank}</div>
              </div>
              <div className="text-gray-400 text-sm">{game.experience}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Mission */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Meine Mission</h3>
          <blockquote className="text-2xl text-gray-700 leading-relaxed mb-8 italic">
            "Jeder Gamer verdient es, sein wahres Potenzial zu erleben. Durch personalisierte 
            Mausbeschleunigungskurven helfe ich Wettkampfspielern dabei, ihre Aim-Barrieren 
            zu durchbrechen und die Konsistenz zu erreichen, die sie sich schon immer gewünscht haben."
          </blockquote>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600 mb-8">
            <div className="flex items-center">
              <TrendingUp className="text-green-500 mr-2" size={16} />
              500+ transformierte Gamer
            </div>
            <div className="flex items-center">
              <Trophy className="text-yellow-500 mr-2" size={16} />
              1900 RR Radiant Peak
            </div>
            <div className="flex items-center">
              <Users className="text-blue-500 mr-2" size={16} />
              75K+ Community
            </div>
          </div>
          
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 border-0 text-lg">
            Transforming Aim, One Curve at a Time
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default About;
