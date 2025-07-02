
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Target, Zap, Shield, Star, Quote } from "lucide-react";

const FAQ = () => {
  const testimonials = [
    {
      text: "Now I finally feel in control again.",
      author: "Jake M.",
      game: "Valorant",
      rank: "Diamond → Immortal"
    },
    {
      text: "From diamond to radiant in 3 weeks.",
      author: "Sarah K.",
      game: "Valorant", 
      rank: "Diamond → Radiant"
    },
    {
      text: "My flicks are so much more consistent now!",
      author: "Alex R.",
      game: "CS2",
      rank: "Supreme → Global"
    }
  ];

  const faqs = [
    {
      id: "what-is-curve",
      question: "What exactly is a Custom Mouse Curve?",
      answer: "A Custom Mouse Curve is a personalized mouse acceleration setting that's specifically tailored to your playstyle, hardware, and favorite games. It optimizes the relationship between your physical mouse movement and cursor movement in-game for maximum precision and consistency."
    },
    {
      id: "how-fast",
      question: "How fast will I receive my curve?",
      answer: "The first version of your Custom Curve is delivered within minutes after ordering! After a quick analysis of your information, we create your initial curve immediately. Revisions and fine-tuning then happen based on your feedback, usually within hours."
    },
    {
      id: "which-games",
      question: "Which games does the curve work for?",
      answer: "Our Custom Curves work for all FPS games! They're especially optimized for Valorant, CS2, Apex Legends, and Overwatch 2. The curve is specifically adapted for your main games but also works excellently in other shooters."
    },
    {
      id: "guarantee",
      question: "What if I'm not satisfied?",
      answer: "We offer a 100% satisfaction guarantee! If you're not completely satisfied with your Custom Curve, you get a full refund - no questions asked. Your satisfaction is our top priority."
    }
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <h2 className="font-bangers text-6xl md:text-7xl text-comic-black">
              FAQ &
              <span className="text-fire-red"> TESTIMONIALS</span>
            </h2>
            <div className="absolute -top-4 -right-8 w-16 h-16 bg-boom-yellow border-4 border-black rounded-full flex items-center justify-center transform rotate-12">
              <HelpCircle className="text-black" size={24} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* FAQ Section */}
          <div>
            <h3 className="font-bangers text-4xl text-comic-black mb-8">FREQUENTLY ASKED</h3>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="comic-panel bg-white">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={faq.id} className="border-none">
                      <AccordionTrigger className="font-russo text-left font-bold text-lg hover:text-fire-red transition-colors py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="font-russo text-gray-700 leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div>
            <h3 className="font-bangers text-4xl text-comic-black mb-8">WHAT GAMERS SAY</h3>
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="comic-panel bg-white relative">
                  <Quote className="text-fire-red mb-4" size={32} />
                  <blockquote className="font-russo text-xl text-comic-black mb-4 italic leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bangers text-lg text-fire-red">{testimonial.author}</div>
                      <div className="font-russo text-sm text-gray-600">{testimonial.game}</div>
                    </div>
                    <div className="bg-boom-yellow text-black px-4 py-2 rounded-full font-bangers text-sm border-2 border-black">
                      {testimonial.rank}
                    </div>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-boom-yellow fill-current" size={16} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Discord CTA */}
            <div className="comic-panel bg-comic-black text-white text-center mt-8">
              <h4 className="font-bangers text-2xl mb-4">JOIN OUR DISCORD</h4>
              <p className="font-russo text-gray-300 mb-6">
                Get instant support and connect with 1500+ gamers who transformed their aim!
              </p>
              <button className="comic-button-yellow font-bangers text-black text-xl">
                JOIN DISCORD NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
