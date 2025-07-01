
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Settings, Target, CheckCircle } from "lucide-react";

const Services = () => {
  const steps = [
    {
      icon: FileText,
      title: "Order & Provide Info",
      description: "Tell us about your current settings, games you play, and gaming goals. We'll analyze your playstyle.",
      details: ["Share your current sensitivity", "Tell us your main games", "Describe your aim struggles", "Set your performance goals"],
      color: "bg-blue-500"
    },
    {
      icon: Settings,
      title: "Personalized Setup",
      description: "Our expert creates your custom curve based on your unique gaming profile and preferences.",
      details: ["Analyze your gaming style", "Calculate optimal acceleration", "Create personalized curve", "Test initial parameters"],
      color: "bg-red-500"
    },
    {
      icon: Target,
      title: "Fine-Tuning",
      description: "We refine and perfect your curve through testing and revisions until it's absolutely perfect.",
      details: ["Test curve performance", "Gather your feedback", "Make precise adjustments", "Optimize for consistency"],
      color: "bg-yellow-500"
    },
    {
      icon: CheckCircle,
      title: "Perfect Aim Delivered",
      description: "Receive your final curve settings and start dominating your games with improved accuracy.",
      details: ["Get final curve file", "Installation instructions", "Performance tips", "Ongoing support access"],
      color: "bg-green-500"
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          How It
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Works</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our proven 4-step process delivers personalized mouse acceleration curves 
          that transform your aim from average to exceptional.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {steps.map((step, index) => (
          <Card 
            key={step.title} 
            className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg relative"
          >
            {/* Step Number */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
              {index + 1}
            </div>
            
            <CardContent className="p-8">
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="text-white" size={32} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {step.description}
              </p>
              
              <div className="space-y-2">
                {step.details.map((detail) => (
                  <div key={detail} className="flex items-start space-x-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                    <span className="text-sm text-gray-600">{detail}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Section */}
      <div className="bg-gray-900 rounded-3xl p-12 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Trusted by 500+ Gamers Worldwide</h3>
        <p className="text-gray-300 text-lg mb-8">
          Join the community of gamers who've already transformed their aim with our custom curves.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">Minutes</div>
            <div className="text-gray-400">First curve delivered</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-400 mb-2">100%</div>
            <div className="text-gray-400">Satisfaction Guarantee</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">4+ Years</div>
            <div className="text-gray-400">Expert Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
