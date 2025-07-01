
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Code, Target, Users } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: "Branding & Identity",
      description: "Complete brand strategy, logo design, and visual identity systems that capture your essence.",
      features: ["Brand Strategy & Positioning", "Logo & Visual Identity", "Brand Guidelines", "Naming & Storytelling"],
      color: "bg-blue-500"
    },
    {
      icon: Code,
      title: "Web Design & Development",
      description: "Custom websites that combine stunning design with flawless functionality.",
      features: ["Custom UI/UX Design", "Responsive Development", "CMS Integration", "E-commerce Solutions"],
      color: "bg-red-500"
    },
    {
      icon: Target,
      title: "Creative Campaigns",
      description: "Strategic digital campaigns that drive engagement and deliver measurable results.",
      features: ["Digital Campaign Strategy", "Content Creation", "Social Media Marketing", "Digital Advertising"],
      color: "bg-yellow-500"
    },
    {
      icon: Users,
      title: "Consulting & Strategy",
      description: "Expert guidance to transform your digital presence and accelerate growth.",
      features: ["Market Analysis", "Digital Transformation", "Brand Audits", "Workshops & Training"],
      color: "bg-green-500"
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Services That Make an
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Impact</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          From brand strategy to digital execution, we deliver comprehensive solutions 
          that transform your vision into powerful results.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Card 
            key={service.title} 
            className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
          >
            <CardContent className="p-8">
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="text-white" size={32} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-2">
                {service.features.map((feature) => (
                  <Badge 
                    key={feature} 
                    variant="secondary" 
                    className="text-xs bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Process Section */}
      <div className="mt-20 bg-gray-900 rounded-3xl p-12 text-white">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Our Process</h3>
          <p className="text-gray-300 text-lg">
            A proven methodology that delivers exceptional results every time.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Discovery", desc: "Understanding your vision, goals, and target audience" },
            { step: "02", title: "Strategy", desc: "Crafting a comprehensive plan tailored to your needs" },
            { step: "03", title: "Creation", desc: "Bringing ideas to life with stunning design and development" },
            { step: "04", title: "Launch", desc: "Deploying your project and measuring its impact" }
          ].map((phase, index) => (
            <div key={phase.step} className="text-center group">
              <div className="text-6xl font-black text-blue-500/20 group-hover:text-blue-500/40 transition-colors mb-4">
                {phase.step}
              </div>
              <h4 className="text-xl font-bold mb-3">{phase.title}</h4>
              <p className="text-gray-400">{phase.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
