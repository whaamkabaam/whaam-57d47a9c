
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Award, Users, Zap, Target, Trophy, GamepadIcon, Play, TrendingUp } from "lucide-react";

const About = () => {
  const expertStats = [
    { icon: Trophy, value: "1900 RR", label: "Peak Valorant Rank", color: "text-yellow-500" },
    { icon: Users, value: "75K+", label: "Followers", color: "text-pink-500" },
    { icon: Target, value: "1500+", label: "Gamers Helped", color: "text-green-500" },
    { icon: Star, value: "4+ Years", label: "Research Experience", color: "text-blue-500" }
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <h2 className="font-bangers text-6xl md:text-7xl text-comic-black">
              MEET YOUR
              <span className="text-fire-red block">CURVE EXPERT</span>
            </h2>
            <div className="absolute -top-4 -right-8 w-16 h-16 bg-boom-yellow border-4 border-black rounded-full flex items-center justify-center transform rotate-12">
              <Award className="text-black" size={24} />
            </div>
          </div>
        </div>

        {/* Main Expert Section */}
        <div className="relative mb-20">
          <div className="comic-panel bg-comic-black text-white max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Image/Video Section */}
              <div className="relative">
                <div className="relative bg-gray-800 rounded-2xl overflow-hidden aspect-video shadow-2xl border-4 border-boom-yellow">
                  {/* Placeholder for expert image/video */}
                  <div className="absolute inset-0 bg-gradient-to-br from-fire-red to-boom-yellow flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                        <Play className="text-white ml-1" size={32} />
                      </div>
                      <h4 className="font-bangers text-2xl mb-2">CURVE EXPERT</h4>
                      <p className="font-russo">Watch how I create curves</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="max-w-lg">
                <div className="speech-bubble bg-white text-black mb-8">
                  <p className="font-russo text-lg leading-relaxed mb-4">
                    <span className="text-fire-red font-bold">"With over 4 years of deep-dive research</span> 
                    into mouse acceleration, <span className="text-boom-yellow font-bold">1900 RR in Valorant</span> 
                    and <span className="text-fire-red font-bold">75,000 followers</span>, I've helped 
                    <span className="text-boom-yellow font-bold"> 1500+ gamers hit their peak.</span>
                  </p>
                  <p className="font-russo text-lg text-fire-red font-bold">
                    I'll help you hit yours too."
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {expertStats.map((stat, index) => (
                    <div key={index} className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                      <stat.icon className={`${stat.color} mx-auto mb-2`} size={24} />
                      <div className="font-bangers text-2xl">{stat.value}</div>
                      <div className="font-russo text-sm text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <button className="comic-button-yellow group text-black font-bangers text-xl">
                  SEE MY WORK
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gaming Background */}
        <div className="bg-gradient-to-r from-fire-red to-boom-yellow rounded-3xl p-12 text-white text-center">
          <h3 className="font-bangers text-4xl mb-8">PROVEN TRACK RECORD</h3>
          
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bangers text-5xl mb-2">1900</div>
              <div className="font-russo">RR Peak Valorant</div>
            </div>
            <div>
              <div className="font-bangers text-5xl mb-2">75K+</div>
              <div className="font-russo">Followers</div>
            </div>
            <div>
              <div className="font-bangers text-5xl mb-2">1500+</div>
              <div className="font-russo">Gamers Helped</div>
            </div>
            <div>
              <div className="font-bangers text-5xl mb-2">4+</div>
              <div className="font-russo">Years Research</div>
            </div>
          </div>

          <Badge className="bg-white text-fire-red px-8 py-3 border-0 font-bangers text-xl">
            TRANSFORMING AIM, ONE CURVE AT A TIME
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default About;
