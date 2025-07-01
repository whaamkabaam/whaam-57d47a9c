
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "TechFlow Startup",
      category: "Branding & Web Design",
      description: "Complete brand identity and website redesign for a fintech startup, resulting in 300% increase in user engagement.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tags: ["Branding", "UI/UX", "Development"],
      results: "+300% Engagement",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Luxe Fashion Brand",
      category: "E-commerce & Campaigns",
      description: "Premium e-commerce platform with integrated marketing campaigns, driving $2M+ in first-year revenue.",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
      tags: ["E-commerce", "Campaigns", "Strategy"],
      results: "$2M+ Revenue",
      color: "from-red-500 to-pink-600"
    },
    {
      title: "GreenTech Solutions",
      category: "Digital Transformation",
      description: "End-to-end digital transformation including brand refresh, web platform, and marketing automation.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      tags: ["Transformation", "Automation", "Analytics"],
      results: "500% ROI",
      color: "from-green-500 to-teal-600"
    }
  ];

  const stats = [
    { value: "150%", label: "Average ROI Increase" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24hrs", label: "Average Response Time" },
    { value: "200+", label: "Projects Completed" }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Work That Makes
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Waves</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Every project tells a story of transformation. Here are some of our favorite success stories.
        </p>
      </div>

      {/* Featured Projects */}
      <div className="grid lg:grid-cols-3 gap-8 mb-20">
        {projects.map((project, index) => (
          <Card 
            key={project.title} 
            className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="relative overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center`}>
                <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  View Case Study <ExternalLink size={16} className="ml-2" />
                </Button>
              </div>
              <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">
                {project.results}
              </Badge>
            </div>
            
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  {project.category}
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 via-red-600 to-yellow-600 rounded-3xl p-12 text-white mb-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Results That Speak Volumes</h3>
          <p className="text-blue-100 text-lg">
            Numbers don't lie. Here's the impact we've created for our clients.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Button 
          size="lg" 
          className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold group"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          Start Your Success Story
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Portfolio;
