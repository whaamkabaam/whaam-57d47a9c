import { motion } from "framer-motion";
import { LiquidGlassCard } from "./LiquidGlassEffects";

const steps = [
  {
    number: 1,
    title: "Download Custom Curve.",
    description: "The basis for your Aim Improvement is Mouse Acceleration, specifically Custom Curve.",
    footnote: 'Pro Version is optional, but recommended (10$ w/ code "whaam").'
  },
  {
    number: 2,
    title: "Get your Custom Curve Graph tailored.",
    description: "Get the best possible Custom Curve Graph, which is uniquely based on your personal abilities and playstyle."
  },
  {
    number: 3,
    title: "Enjoy Confidence.",
    description: "As Aiming feels very natural for you now, enjoy your new found ability to easily micro adjust, while still being able to quickly flick on your enemies like a Pro!"
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
            Become the best Aimer you can be in 3 easy steps
          </h2>
          <p className="glass-text text-lg max-w-2xl mx-auto">
            A simple, proven process to transform your aim
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

                {/* Footnote */}
                {step.footnote && (
                  <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-white/10">
                    {step.footnote}
                  </p>
                )}
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeSteps;
