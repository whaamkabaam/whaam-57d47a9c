import { motion } from "framer-motion";
import { LiquidGlassCard, LiquidGlassButton } from "./LiquidGlassEffects";
import { ArrowRight } from "lucide-react";
const steps = [{
  number: 1,
  title: "Tell us how you aim.",
  description: "Answer a super short form: your game, sens, DPI, role and what currently feels off with your aim."
}, {
  number: 2,
  title: "Get your Custom Curve built for you.",
  description: "We turn that data into a Custom Curve tuned to your mechanics – built to stop overflicks, underflicks and shaky micro-adjustments."
}, {
  number: 3,
  title: "Enjoy your upgraded aim.",
  description: "Drop your personal graphs into Custom Curve and queue. Your mouse finally matches your intention: smoother micro-adjusts, cleaner flicks, more confidence in every duel."
}];
export const ThreeSteps = () => {
  return <section id="three-steps" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-warm mb-4">
            Become the best aimer you've ever been:<br />
            in 3 simple steps
          </h2>
          <p className="glass-text text-lg max-w-2xl mx-auto">
            No guesswork. No copy-pasting random pro settings.<br />
            Just a curve built for <em className="italic">you</em>.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => <motion.div key={step.number} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.15
        }}>
              <LiquidGlassCard variant="secondary" className="h-full p-8 flex flex-col">
                {/* Step Number */}
                <div className="glass-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-gradient-warm">{step.number}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold glass-text-contrast mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="glass-text flex-grow">
                  {step.description}
                </p>

              </LiquidGlassCard>
            </motion.div>)}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="glass-text text-lg mb-6">
            Ready? Step 1 takes under 2 minutes.
          </p>
          
          {/* Rotating gradient edge glow wrapper */}
          <div className="relative inline-flex items-center justify-center p-[2px] rounded-2xl overflow-hidden">
            {/* Animated conic gradient */}
            <div className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,hsl(var(--primary)),hsl(var(--accent)),hsl(var(--primary)))]" />
            
            <LiquidGlassButton 
              variant="primary" 
              className="relative inline-flex items-center whitespace-nowrap"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Your Custom Curve
              <ArrowRight className="ml-2" size={18} />
            </LiquidGlassButton>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default ThreeSteps;