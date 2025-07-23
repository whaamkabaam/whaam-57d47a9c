
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
  const counter = end ? useAnimatedCounter({ end, suffix, duration: 1200 }) : null;
  
  return (
    <div className="group hover:scale-110 transition-all duration-500 hover:-translate-y-2 animate-float" style={{ animationDelay: delay }}>
      <div className="glass-accent rounded-2xl p-6 border border-white/10 backdrop-blur-glass hover:border-white/20 hover:liquid-glow">
        <div className={`text-5xl font-bold ${color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
          {counter ? <span ref={counter.ref}>{counter.value}</span> : value}
        </div>
        <div className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-500 font-medium">{label}</div>
      </div>
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
    <div className="container mx-auto px-4 sm:px-6 py-24 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tr from-secondary/15 to-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Glass Header Section */}
      <div className="text-center mb-20 relative z-10">
        <div className="glass-primary rounded-3xl p-12 border border-white/10 backdrop-blur-glass mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            How it <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">works</span>
          </h2>
          <div className="glass-secondary rounded-2xl p-6 border border-white/5">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Our proven 4-step process delivers personalized mouse acceleration curves 
              that transform your aim from average to extraordinary.
            </p>
          </div>
        </div>
      </div>

      {/* Liquid Glass Process Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 relative z-10">
        {steps.map((step, index) => (
          <div
            key={step.title} 
            className="group relative"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Glow Background */}
            <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <Card className="relative glass-primary border border-white/10 backdrop-blur-glass hover:border-white/20 transition-all duration-500 hover:-translate-y-6 hover:scale-105 hover:rotate-2 rounded-3xl overflow-hidden">
              {/* Floating Step Number */}
              <div className="absolute -top-6 -left-6 w-12 h-12 glass-accent border border-white/20 rounded-2xl flex items-center justify-center font-bold text-lg z-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-float backdrop-blur-glass">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{index + 1}</span>
              </div>
              
              <CardContent className="p-8 relative">
                {/* Liquid Glass Icon Container */}
                <div className="relative mb-8">
                  <div className={`w-20 h-20 glass-secondary rounded-3xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 border border-white/10 backdrop-blur-glass animate-float`} style={{ animationDelay: `${index * 0.5}s` }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-accent/60 rounded-2xl flex items-center justify-center group-hover:liquid-glow">
                      <step.icon className="text-white group-hover:scale-110 transition-transform duration-500" size={28} />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-all duration-300 group-hover:scale-105">
                  {step.title}
                </h3>
                
                <div className="glass-secondary rounded-2xl p-4 mb-6 border border-white/5 backdrop-blur-glass">
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-500">
                    {step.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                   {step.details.map((detail, detailIndex) => (
                     <div 
                       key={detail} 
                       className="flex items-start space-x-3 group-hover:translate-x-2 transition-transform duration-500 glass-accent rounded-xl p-3 border border-white/5 backdrop-blur-glass hover:border-white/10"
                       style={{ transitionDelay: `${detailIndex * 100}ms` }}
                     >
                       <CheckCircle className="text-secondary flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:text-primary transition-all duration-300" size={16} />
                       <span className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-500 font-medium">{detail}</span>
                     </div>
                   ))}
               </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Liquid Glass Trust Section */}
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-3xl blur-2xl"></div>
        
        <div className="relative glass-primary rounded-3xl p-16 text-center border border-white/10 backdrop-blur-glass liquid-glow">
          <div className="glass-secondary rounded-2xl p-8 mb-12 border border-white/5 backdrop-blur-glass">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">500+</span> gamers <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">worldwide</span>
            </h3>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
              Join the community of gamers who have already transformed their aim with our custom curves.
            </p>
          </div>
          
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
              color="text-secondary"
              delay="200ms"
            />
            <TrustStatItem 
              end={4} 
              suffix="+ Years" 
              label="Expert experience" 
              color="text-accent"
              delay="400ms"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
