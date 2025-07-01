
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Send, CheckCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
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
      description: "We'll get back to you within 24 hours. Get ready for something amazing!",
    });
    
    setFormData({
      name: "",
      email: "",
      company: "",
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
      details: "hello@whaamkabaam.com",
      description: "Drop us a line anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Let's talk about your project"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "San Francisco, CA",
      description: "Coffee meetings welcome"
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Ready to Make an
          <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"> Impact?</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Let's turn your vision into a digital experience that drives real results. 
          Every great project starts with a conversation.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Start Your Project</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your full name"
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
                  Company
                </label>
                <Input
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="Your company name"
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
                      <SelectItem value="branding">Branding & Identity</SelectItem>
                      <SelectItem value="web">Web Design & Development</SelectItem>
                      <SelectItem value="campaigns">Creative Campaigns</SelectItem>
                      <SelectItem value="consulting">Consulting & Strategy</SelectItem>
                      <SelectItem value="multiple">Multiple Services</SelectItem>
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
                      <SelectItem value="5k-15k">$5K - $15K</SelectItem>
                      <SelectItem value="15k-50k">$15K - $50K</SelectItem>
                      <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                      <SelectItem value="100k+">$100K+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell us about your project, goals, and timeline..."
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
                    Send Message
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
              <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                  <div className="text-blue-600 font-medium mb-1">{info.details}</div>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Response Promise */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <CheckCircle className="text-green-300 mr-3" size={24} />
              <h4 className="font-bold text-lg">Our Promise</h4>
            </div>
            <ul className="space-y-2 text-blue-100">
              <li>✓ Response within 24 hours</li>
              <li>✓ Free initial consultation</li>
              <li>✓ Detailed project proposal</li>
              <li>✓ Transparent pricing</li>
            </ul>
          </div>

          {/* Testimonial */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-500 fill-current" size={20} />
              ))}
            </div>
            <blockquote className="text-gray-700 mb-4">
              "WhaamKaBaam transformed our brand completely. The results exceeded our expectations, 
              and the team's creativity is unmatched. Highly recommended!"
            </blockquote>
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" 
                alt="Client"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold text-gray-900">Marcus Johnson</div>
                <div className="text-gray-600 text-sm">CEO, TechFlow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
