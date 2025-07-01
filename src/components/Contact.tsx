
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, Users, Send, CheckCircle, Star, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    game: "",
    service: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent! 🚀",
      description: "We'll get back to you within 24 hours. Get ready for perfect aim!",
    });
    
    setFormData({
      name: "",
      email: "",
      game: "",
      service: "",
      budget: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@lovable.dev",
      description: "Drop us a line anytime",
      highlight: false
    },
    {
      icon: MessageCircle,
      title: "Join Our Discord",
      details: "@lovable_dev",
      description: "Get instant support & connect with our community",
      highlight: true,
      cta: "Join Discord Server"
    },
    {
      icon: Users,
      title: "Community Support",
      details: "Active 24/7",
      description: "Get help from our community of 500+ gamers"
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Ready to Perfect
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Your Aim?</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get your personalized mouse acceleration curve and start dominating your games. 
          Every great performance starts with the perfect settings.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Your Custom Curve</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your gamer name"
                    required
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Game
                </label>
                <Input
                  value={formData.game}
                  onChange={(e) => handleChange("game", e.target.value)}
                  placeholder="e.g., Valorant, CS2, Apex Legends"
                  className="border-gray-300"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Needed
                  </label>
                  <Select onValueChange={(value) => handleChange("service", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3x-revisions">3× Revisions ($39)</SelectItem>
                      <SelectItem value="unlimited">Unlimited Revisions ($47)</SelectItem>
                      <SelectItem value="live-session">Live 1-on-1 Session ($149)</SelectItem>
                      <SelectItem value="consultation">Free Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <Select onValueChange={(value) => handleChange("budget", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="39">$39 - 3× Revisions</SelectItem>
                      <SelectItem value="47">$47 - Unlimited Revisions</SelectItem>
                      <SelectItem value="149">$149 - Live Session</SelectItem>
                      <SelectItem value="custom">Custom Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell us about your current settings, games you play, and what you want to improve..."
                  rows={5}
                  required
                  className="border-gray-300"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold group"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Get Started Now
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info & CTA */}
        <div className="space-y-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className={`flex items-start space-x-4 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  info.highlight 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white transform hover:scale-105' 
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  info.highlight ? 'bg-white/20' : 'bg-blue-500'
                }`}>
                  <info.icon className={info.highlight ? 'text-white' : 'text-white'} size={24} />
                </div>
                <div className="flex-grow">
                  <h4 className={`font-semibold mb-1 ${info.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {info.title}
                  </h4>
                  <div className={`font-medium mb-1 ${info.highlight ? 'text-blue-100' : 'text-blue-600'}`}>
                    {info.details}
                  </div>
                  <p className={`text-sm ${info.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                    {info.description}
                  </p>
                  {info.cta && (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="mt-3 bg-white/20 hover:bg-white/30 text-white border-0"
                    >
                      <MessageCircle className="mr-2" size={16} />
                      {info.cta}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Response Promise */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <CheckCircle className="text-green-300 mr-3" size={24} />
              <h4 className="font-bold text-lg">Our Promise</h4>
            </div>
            <ul className="space-y-2 text-green-100">
              <li>✓ Response within 24 hours</li>
              <li>✓ First curve delivered in minutes</li>
              <li>✓ 100% Satisfaction Guarantee</li>
              <li>✓ Personal consultation included</li>
            </ul>
          </div>

          {/* Enhanced Discord CTA */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center">
              <MessageCircle className="mx-auto mb-4 text-indigo-200" size={48} />
              <h4 className="font-bold text-xl mb-3">Join Our Discord Community</h4>
              <p className="text-indigo-100 mb-6">
                Get instant support, share your progress, and connect with 500+ gamers 
                who've already transformed their aim.
              </p>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-0 group">
                <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" size={18} />
                Join Discord Now
                <Zap className="ml-2" size={16} />
              </Button>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-500 fill-current" size={20} />
              ))}
            </div>
            <blockquote className="text-gray-700 mb-4">
              "My aim improved dramatically after getting my custom curve. The difference was 
              noticeable immediately and I've been climbing ranks ever since!"
            </blockquote>
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" 
                alt="Client"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold text-gray-900">Alex Chen</div>
                <div className="text-gray-600 text-sm">Valorant Player</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
