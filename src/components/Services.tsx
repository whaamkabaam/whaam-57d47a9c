
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Settings, Target, CheckCircle } from "lucide-react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const TrustStatItem = ({ 
  end, 
  suffix = "", 
  value, 
  label, 
  color,
  delay 
}: { 
  end?: number; 
  suffix?: string; 
  value?: string;
  label: string; 
  color: string;
  delay: string;
}) => {
  const counter = end ? useAnimatedCounter({ end, suffix }) : null;
  
  return (
    <div className="group hover:scale-105 transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: delay }}>
      <div className={`text-4xl font-bold ${color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
        {counter ? <span ref={counter.ref}>{counter.value}</span> : value}
      </div>
      <div className="text-muted-foreground group-hover:text-whaam-white/80 transition-colors duration-300">{label}</div>
    </div>
  );
};

const Services = () => {
  const steps = [
    {
      icon: FileText,
      title: "Order & Provide Info",
      description: "Tell us about your current settings, games, and gaming goals. We analyze your playstyle.",
      details: ["Share your current sensitivity", "Tell us your main games", "Describe your aim problems", "Set your performance goals"],
      color: "bg-whaam-red"
    },
    {
      icon: Settings,
      title: "Personalized Setup",
      description: "Our expert creates your custom curve based on your unique gaming profile and preferences.",
      details: ["Analyze your gaming style", "Calculate optimal acceleration", "Create personalized curve", "Test initial parameters"],
      color: "bg-whaam-yellow"
    },
    {
      icon: Target,
      title: "Fine-tuning",
      description: "We refine and perfect your curve through testing and revisions until it's absolutely perfect.",
      details: ["Test curve performance", "Gather your feedback", "Make precise adjustments", "Optimize for consistency"],
      color: "bg-whaam-red"
    },
    {
      icon: CheckCircle,
      title: "Perfect Aim Delivered",
      description: "Receive your final curve settings and dominate your games with improved accuracy.",
      details: ["Receive final curve file", "Installation instructions", "Performance tips", "Access to ongoing support"],
      color: "bg-whaam-yellow"
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 bg-whaam-dark">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold text-whaam-white mb-8">
          How it <span className="bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent">works</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our proven 4-step process delivers personalized mouse acceleration curves 
          that transform your aim from average to extraordinary.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {steps.map((step, index) => (
          <Card 
            key={step.title} 
            className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-2 border-whaam-red/20 shadow-lg relative bg-whaam-black/80 backdrop-blur-sm hover:border-whaam-red animate-fade-in hover:scale-105 hover:rotate-1`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Step Number */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-whaam-red text-whaam-white rounded-full flex items-center justify-center font-bold text-sm z-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              {index + 1}
            </div>
            
            <CardContent className="p-8">
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-lg`}>
                <step.icon className="text-whaam-black group-hover:scale-110 transition-transform duration-300" size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-whaam-white mb-4 group-hover:text-whaam-yellow transition-all duration-300 group-hover:scale-105">
                {step.title}
              </h3>
              
               <p className="text-muted-foreground mb-6 leading-relaxed">
                 {step.description}
               </p>
               
               <div className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <div 
                      key={detail} 
                      className="flex items-start space-x-2 group-hover:translate-x-1 transition-transform duration-300"
                      style={{ transitionDelay: `${detailIndex * 50}ms` }}
                    >
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:text-whaam-yellow transition-all duration-300" size={14} />
                      <span className="text-sm text-muted-foreground group-hover:text-whaam-white/90 transition-colors duration-300">{detail}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Section */}
      <div className="bg-whaam-black rounded-3xl p-12 text-white text-center border-2 border-whaam-red/20">
        <h3 className="text-3xl font-bold mb-8 text-whaam-white">
          Trusted by <span className="text-whaam-red">500+</span> gamers <span className="text-whaam-yellow">worldwide</span>
        </h3>
        <p className="text-muted-foreground text-lg mb-12">
          Join the community of gamers who have already transformed their aim with our custom curves.
        </p>
        
        <div className="grid sm:grid-cols-3 gap-8">
          <TrustStatItem 
            value="Minutes" 
            label="First curve delivered" 
            color="text-primary"
            delay="0ms"
          />
          <TrustStatItem 
            end={100} 
            suffix="%" 
            label="Satisfaction guarantee" 
            color="text-accent"
            delay="100ms"
          />
          <TrustStatItem 
            end={4} 
            suffix="+ Years" 
            label="Expert experience" 
            color="text-primary"
            delay="200ms"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
