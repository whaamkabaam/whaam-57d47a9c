
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
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
    <div className="bg-comic-black py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <h2 className="font-anton text-6xl md:text-7xl text-white tracking-wider">
              FREQUENTLY
              <span className="text-fire-red block">ASKED QUESTIONS</span>
            </h2>
            <div className="absolute -top-4 -right-8 w-16 h-16 bg-boom-yellow border-4 border-white rounded-full flex items-center justify-center transform rotate-12">
              <HelpCircle className="text-black" size={24} />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.id} className="comic-panel bg-gray-900">
                <Accordion type="single" collapsible>
                  <AccordionItem value={faq.id} className="border-none">
                    <AccordionTrigger className="font-russo text-left font-bold text-lg text-white hover:text-fire-red transition-colors py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-russo text-gray-300 leading-relaxed pb-6 text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>

          {/* Discord CTA */}
          <div className="comic-panel bg-fire-red text-center mt-12">
            <h4 className="font-anton text-3xl mb-4 text-white tracking-wide">JOIN OUR DISCORD</h4>
            <p className="font-russo text-white mb-6 text-lg">
              Get instant support and connect with 1500+ gamers who transformed their aim!
            </p>
            <button className="comic-button-yellow font-anton text-black text-xl tracking-wide">
              JOIN DISCORD NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
