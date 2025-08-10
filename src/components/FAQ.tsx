
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { LiquidGlassCard } from "@/components/LiquidGlassEffects";
import { HelpCircle, Target, Zap, Shield } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      id: "what-is-curve",
      question: "What exactly is a Custom Mouse Curve?",
      answer: "A Custom Mouse Curve is a personalized mouse acceleration setting that's specifically tailored to your playstyle, hardware, and preferred games. It optimizes the relationship between your physical mouse movement and cursor movement in-game for maximum precision and consistency."
    },
    {
      id: "how-fast",
      question: "How fast will I receive my curve?",
      answer: "The first version of your Custom Curve is delivered within minutes of ordering! After a brief analysis of your information, we create your initial curve immediately. Revisions and fine-tuning based on your feedback usually happen within a few hours."
    },
    {
      id: "which-games",
      question: "Which games does the curve work for?",
      answer: "Our Custom Curves work for all FPS games! They're especially optimized for Valorant, CS2, Apex Legends, and Overwatch 2. The curve is specifically adapted for your main games but also works excellently in other shooters."
    },
    {
      id: "guarantee",
      question: "What happens if I'm not satisfied?",
      answer: "Satisfaction guarantee — unlimited tweaks or a refund.",
    },
    {
      id: "installation",
      question: "Is installation difficult?",
      answer: "Absolutely not! You'll receive detailed step-by-step instructions plus the ready configuration file. Installation takes just a few minutes and requires no technical knowledge. If you have questions, our support is always available."
    },
    {
      id: "difference",
      question: "What's the difference between the plans?",
      answer: "The main difference is in the number of revisions: 3× Revisions offers three adjustment rounds, Unlimited Revisions as many as needed, and the Live Session includes a personal 45-minute consultation with real-time adjustments while you play."
    },
    {
      id: "hardware",
      question: "Does it work with my mouse?",
      answer: "Yes! Our Custom Curves work with virtually any gaming mouse. Whether Logitech, Razer, SteelSeries, Finalmouse, or another brand - we adapt the curve to your specific hardware for optimal results."
    },
    {
      id: "results",
      question: "What improvements can I expect?",
      answer: "Most of our customers report 20-40% improved accuracy, more consistent aim, and less overshooting. Many achieve higher ranks in their favorite games within 1-2 weeks of implementation."
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-whaam-red/10 text-whaam-red px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-whaam-red/20">
          <HelpCircle className="mr-2" size={16} />
          Frequently Asked Questions
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-whaam-white mb-4">
          Everything you
          <span className="block bg-gradient-to-r from-whaam-red via-whaam-yellow to-whaam-red bg-clip-text text-transparent mt-4"> need to know</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Here you'll find answers to the most important questions about our Custom Curves 
          and our service.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <LiquidGlassCard variant="primary" className="border-2 border-whaam-red/20 shadow-lg animate-fade-in hover:shadow-2xl hover:shadow-whaam-red/20 transition-all duration-500 hover:scale-[1.02]">
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-whaam-red/20 group">
                  <AccordionTrigger className="text-left hover:text-whaam-red transition-all duration-300 text-lg font-semibold py-6 text-whaam-white group-hover:translate-x-2 group-hover:scale-105">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base group-hover:text-whaam-white/90 transition-colors duration-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </LiquidGlassCard>
      </div>

      {/* Quick Help Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        <LiquidGlassCard 
          variant="secondary"
          className="text-center border-2 border-whaam-red/20 shadow-lg hover:shadow-xl transition-all duration-500 group hover:border-whaam-red hover:scale-105 hover:-translate-y-2 animate-fade-in">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-whaam-red rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-xl">
              <Target className="text-whaam-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-whaam-white mb-3">Instant Delivery</h3>
            <p className="text-muted-foreground">First curve in minutes, not days. Start right away!</p>
          </CardContent>
        </LiquidGlassCard>

        <LiquidGlassCard 
          variant="secondary"
          className="text-center border-2 border-whaam-red/20 shadow-lg hover:shadow-xl transition-all duration-500 group hover:border-whaam-red hover:scale-105 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-whaam-yellow rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-xl">
              <Zap className="text-whaam-black group-hover:scale-110 transition-transform duration-300" size={32} />
            </div>
            <h3 className="text-xl font-bold text-whaam-white mb-3 group-hover:text-whaam-yellow transition-colors duration-300">Easy Installation</h3>
            <p className="text-muted-foreground group-hover:text-whaam-white/90 transition-colors duration-300">Step-by-step guide for effortless setup.</p>
          </CardContent>
        </LiquidGlassCard>

        <LiquidGlassCard 
          variant="secondary"
          className="text-center border-2 border-whaam-red/20 shadow-lg hover:shadow-xl transition-all duration-500 group hover:border-whaam-red hover:scale-105 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-whaam-red rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-xl">
              <Shield className="text-whaam-white group-hover:scale-110 transition-transform duration-300" size={32} />
            </div>
            <h3 className="text-xl font-bold text-whaam-white mb-3 group-hover:text-whaam-yellow transition-colors duration-300">100% Guarantee</h3>
            <p className="text-muted-foreground group-hover:text-whaam-white/90 transition-colors duration-300">Satisfaction guarantee — unlimited tweaks or a refund.</p>
          </CardContent>
        </LiquidGlassCard>
      </div>
    </div>
  );
};

export default FAQ;
