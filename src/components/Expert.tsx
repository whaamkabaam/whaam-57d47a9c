import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Target, TrendingUp } from "lucide-react";

const Expert = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-whaam-red/10 text-whaam-red px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-whaam-red/20">
          <Trophy className="mr-2" size={16} />
          Meet Your Expert
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-whaam-white mb-4">
          Your Curve
          <span className="block bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent mt-4">
            Specialist
          </span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <Card className="border-2 border-whaam-red/20 shadow-lg bg-whaam-black/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Expert Image/Video */}
              <div className="relative bg-gradient-to-br from-whaam-red/20 to-whaam-yellow/20 p-8 lg:p-12 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="w-48 h-48 bg-whaam-red rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-xl">
                    <Target className="text-whaam-white" size={80} />
                  </div>
                  <h3 className="text-2xl font-bold text-whaam-white mb-2">Gaming Expert</h3>
                  <p className="text-whaam-yellow font-semibold text-lg">1900 RR VALORANT</p>
                </div>
              </div>

              {/* Expert Info */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-whaam-white mb-6">
                      4+ Years of Excellence
                    </h3>
                    <p className="text-whaam-white/80 text-lg leading-relaxed mb-8">
                      With over 4 years of experience, 75,000 TikTok followers and 1900 RR in VALORANT, 
                      I've helped over 1,500 players transform their aim and reach new heights in competitive gaming.
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center bg-whaam-red/10 rounded-2xl p-6 border border-whaam-red/20">
                      <div className="w-12 h-12 bg-whaam-red rounded-xl flex items-center justify-center mb-3 mx-auto">
                        <Users className="text-whaam-white" size={24} />
                      </div>
                      <div className="text-2xl font-bold text-whaam-white mb-1">1,500+</div>
                      <div className="text-whaam-white/60 text-sm">Players Helped</div>
                    </div>

                    <div className="text-center bg-whaam-yellow/10 rounded-2xl p-6 border border-whaam-yellow/20">
                      <div className="w-12 h-12 bg-whaam-yellow rounded-xl flex items-center justify-center mb-3 mx-auto">
                        <TrendingUp className="text-whaam-black" size={24} />
                      </div>
                      <div className="text-2xl font-bold text-whaam-white mb-1">75K</div>
                      <div className="text-whaam-white/60 text-sm">TikTok Followers</div>
                    </div>
                  </div>

                  {/* Social Proof Badges */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <Badge className="bg-whaam-red text-whaam-white px-4 py-2 text-sm font-semibold">
                      VALORANT Immortal
                    </Badge>
                    <Badge className="bg-whaam-yellow text-whaam-black px-4 py-2 text-sm font-semibold">
                      4+ Years Experience
                    </Badge>
                    <Badge className="bg-whaam-red/20 text-whaam-red border border-whaam-red/30 px-4 py-2 text-sm font-semibold">
                      Gaming Creator
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Expert;