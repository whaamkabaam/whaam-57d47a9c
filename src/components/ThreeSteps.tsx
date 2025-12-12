import { motion } from "framer-motion";
import { LiquidGlassCard } from "./LiquidGlassEffects";
import { Button } from "./ui/button";

const steps = [
  {
    number: 1,
    title: "Tell us how you aim.",
    description: "Quick form: your game, sens, DPI, role and how your aim feels right now."
  },
  {
    number: 2,
    title: "Get your Custom Curve built for you.",
    description: "We take your data, run it through our system and design a Custom Curve that fixes your pain points (overflicks, underflicks, shaky micro-adjustments)."
  },
  {
    number: 3,
    title: "Enjoy your upgraded aim.",
    description: "You get your personal Custom Curve graphs, plug them into Custom Curve, and just play. Your mouse finally tracks your intention: smoother micro-adjusts, cleaner flicks, more confidence in every duel."
  }
];

export const ThreeSteps = () => {
  return (
    <section id="three-steps" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-warm mb-4">
            Become the best aimer you've ever been – in 3 simple steps
          </h2>
          <p className="glass-text text-lg max-w-2xl mx-auto">
            No guesswork. No copy-pasting random pro settings. Just a curve built for <em className="italic">you</em>.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
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
            </motion.div>
          ))}
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
          <Button variant="whaam" size="lg">
            Get My Custom Curve
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeSteps;
