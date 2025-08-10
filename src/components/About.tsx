
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Award, Users, Zap, Target, Trophy, GamepadIcon, Play, TrendingUp } from "lucide-react";

const About = () => {
  const expertStats = [
    { icon: Trophy, value: "1900 RR", label: "Peak Valorant Rank", color: "text-whaam-yellow" },
    { icon: Users, value: "75K+", label: "TikTok Followers", color: "text-whaam-red" },
    { icon: Target, value: "1100+", label: "Players Helped", color: "text-whaam-yellow" },
    { icon: Star, value: "4+ Years", label: "Curve Development", color: "text-whaam-red" }
  ];

  const games = [
    { name: "Valorant", experience: "4+ Years", rank: "Radiant (1900 RR)", color: "bg-whaam-red" },
    { name: "CS2", experience: "6+ Years", rank: "Global Elite", color: "bg-whaam-yellow" },
    { name: "Apex Legends", experience: "3+ Years", rank: "Master", color: "bg-whaam-red" },
    { name: "Overwatch 2", experience: "5+ Years", rank: "Grandmaster", color: "bg-whaam-yellow" }
  ];

  const achievements = [
    "Radiant in Valorant with 1900+ RR consistently",
    "75,000+ TikTok followers in gaming community",
    "4+ years of competitive FPS experience",
    "Expert in Raw Accel and mouse optimization",
    "Helped 1,100+ players improve their aim significantly",
    "Data-driven approach with proven results"
  ];

  return (
    <div className="container mx-auto px-6">
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-whaam-red/10 text-whaam-red px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-whaam-red/20">
          <Award className="mr-2" size={16} />
          Meet Your Expert
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-whaam-white mb-4">
          Meet Your
          <span className="block bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent mt-4"> Curve Expert</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          With over 4 years of experience and 1900 RR in Valorant, I bring both 
          technical expertise and real competitive experience to every custom curve.
        </p>
      </div>

      {/* Main Expert Section with Video and Content */}
      <div className="relative mb-20">
        <div className="bg-whaam-black rounded-3xl overflow-hidden shadow-2xl border-2 border-whaam-red/20">
          <div className="grid lg:grid-cols-2 gap-0 items-center min-h-[600px]">
            
            {/* Video Section */}
            <div className="relative p-8 lg:p-12">
              <div className="relative bg-whaam-dark rounded-2xl overflow-hidden aspect-video shadow-2xl">
                {/* Video Placeholder - In real implementation, this would be a video */}
                <div className="absolute inset-0 bg-gradient-to-br from-whaam-red/80 to-whaam-yellow/60 flex items-center justify-center">
                  <div className="text-center text-whaam-white">
                    <div className="w-20 h-20 bg-whaam-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                      <Play className="text-whaam-white ml-1" size={32} />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Curve Expert Introduction</h4>
                    <p className="text-whaam-white/80">Meet your aim expert</p>
                  </div>
                </div>
                
                {/* Professional overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-whaam-black/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between text-whaam-white">
                      <div>
                        <div className="font-bold">Alex Chen</div>
                        <div className="text-sm text-whaam-white/80">Curve Development Expert</div>
                      </div>
                      <Badge className="bg-whaam-yellow text-whaam-black border-0">
                        1900 RR Radiant
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Play Button Overlay */}
              <Button 
                size="lg" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-whaam-white/20 hover:bg-whaam-white/30 text-whaam-white border-2 border-whaam-white/50 backdrop-blur-sm rounded-full w-16 h-16 p-0"
              >
                <Play className="ml-1" size={24} />
              </Button>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 text-whaam-white">
              <div className="max-w-lg">
                <h3 className="text-3xl font-bold mb-6">
                  The expert behind your perfect aim
                </h3>
                
                <div className="bg-whaam-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-whaam-red/20">
                  <p className="text-lg leading-relaxed mb-4">
                    "I help you take your aim to a completely new level. 
                    With over 4 years of experience in curve development and as a Radiant player, 
                    I know exactly what works."
                  </p>
                  <p className="text-muted-foreground">
                    My data-driven approach combines competitive insights 
                    with precise mathematical optimization for curves that truly transform.
                  </p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {expertStats.slice(0, 4).map((stat, index) => (
                    <div key={index} className="text-center bg-whaam-white/10 backdrop-blur-sm rounded-xl p-4 border border-whaam-red/20">
                      <stat.icon className={`${stat.color} mx-auto mb-2`} size={24} />
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-whaam-black rounded-3xl p-12 shadow-lg mb-20 border-2 border-whaam-red/20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-whaam-white mb-8">
              Credentials & Achievements
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-whaam-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="text-whaam-black" size={14} />
                  </div>
                  <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {expertStats.map((stat, index) => (
              <Card key={index} className="text-center border-2 border-whaam-red/20 shadow-lg hover:shadow-xl transition-shadow group bg-whaam-black hover:border-whaam-red">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-whaam-red/20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <stat.icon className={stat.color} size={28} />
                  </div>
                  <div className="text-2xl font-bold text-whaam-white mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Gaming Background */}
      <div className="bg-whaam-black rounded-3xl p-12 text-whaam-white mb-20 border-2 border-whaam-red/20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Competitive Gaming Background</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real competitive experience across multiple FPS titles ensures your curve 
            is optimized for actual gameplay scenarios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game, index) => (
            <div key={game.name} className="text-center">
              <div className={`${game.color} rounded-2xl p-6 mb-4 hover:scale-105 transition-transform border border-whaam-red/20`}>
                <GamepadIcon className={`mx-auto mb-4 ${game.color === 'bg-whaam-red' ? 'text-whaam-white' : 'text-whaam-black'}`} size={48} />
                <h4 className={`text-xl font-bold mb-2 ${game.color === 'bg-whaam-red' ? 'text-whaam-white' : 'text-whaam-black'}`}>{game.name}</h4>
                <div className={`font-semibold ${game.color === 'bg-whaam-red' ? 'text-whaam-white' : 'text-whaam-black'}`}>{game.rank}</div>
              </div>
              <div className="text-muted-foreground text-sm">{game.experience}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Mission */}
      <div className="text-center bg-whaam-black rounded-3xl p-12 border-2 border-whaam-red/20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-whaam-white mb-6">My Mission</h3>
          <blockquote className="text-2xl text-whaam-white leading-relaxed mb-8 italic">
            "Every gamer deserves to experience their true potential. Through personalized 
            mouse acceleration curves, I help competitive players break through their aim barriers 
            and achieve the consistency they've always dreamed of."
          </blockquote>
          
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mb-8">
            <div className="flex items-center">
              <TrendingUp className="text-whaam-yellow mr-2" size={16} />
              1,100+ players helped
            </div>
            <div className="flex items-center">
              <Trophy className="text-whaam-yellow mr-2" size={16} />
              1900 RR Radiant Peak
            </div>
            <div className="flex items-center">
              <Users className="text-whaam-red mr-2" size={16} />
              75K+ Community
            </div>
          </div>
          
          <Badge className="bg-whaam-red text-whaam-white px-8 py-3 border-0 text-lg">
            Transforming Aim, One Curve at a Time
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default About;
