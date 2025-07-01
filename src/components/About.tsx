
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, Zap } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Alex Chen",
      role: "Creative Director",
      bio: "10+ years crafting visual identities for Fortune 500 companies and ambitious startups.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      expertise: ["Brand Strategy", "Visual Design", "Creative Direction"]
    },
    {
      name: "Sarah Martinez",
      role: "Lead Developer",
      bio: "Full-stack developer passionate about creating seamless digital experiences.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c3e4?auto=format&fit=crop&w=400&q=80",
      expertise: ["React", "Node.js", "UI/UX Development"]
    },
    {
      name: "Jordan Kim",
      role: "Strategy Consultant",
      bio: "Data-driven strategist with a track record of delivering 200%+ ROI improvements.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      expertise: ["Digital Strategy", "Analytics", "Growth Hacking"]
    }
  ];

  const values = [
    {
      icon: Zap,
      title: "Innovation First",
      description: "We stay ahead of trends to deliver cutting-edge solutions that set you apart."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Your vision combined with our expertise creates extraordinary results."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We're obsessed with quality and won't settle for anything less than exceptional."
    },
    {
      icon: Star,
      title: "Impact",
      description: "Every project should create measurable, meaningful change for your business."
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          The Team Behind the
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Magic</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're a passionate team of creatives, strategists, and technologists 
          united by one mission: making your brand unforgettable.
        </p>
      </div>

      {/* Story Section */}
      <div className="bg-white rounded-3xl p-12 shadow-lg mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Founded in 2019, WhaamKaBaam emerged from a simple belief: great design should create impact, 
            not just aesthetics. We've grown from a small creative studio to a full-service digital agency, 
            but our core mission remains unchanged—helping ambitious brands make a lasting impression in 
            an increasingly noisy digital world.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">2019</div>
              <div className="text-gray-600">Founded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">200+</div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">50+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet the Dream Team</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={member.name} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <div className="text-blue-600 font-semibold mb-4">{member.role}</div>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-900 rounded-3xl p-12 text-white">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Our Core Values</h3>
          <p className="text-gray-300 text-lg">
            The principles that guide everything we do and every decision we make.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={value.title} className="text-center group">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <value.icon className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">{value.title}</h4>
              <p className="text-gray-400 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
