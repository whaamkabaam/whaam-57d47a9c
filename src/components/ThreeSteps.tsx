import { LiquidGlassCard } from "@/components/LiquidGlassEffects";

const steps = [
  {
    number: "1",
    title: "Download Custom Curve.",
    description: "The basis for your Aim Improvement, the Custom Curve Software and my Recommended Settings for it.",
    footnote: 'Pro Version is optional, but recommended (10$ w/ code "whaam").'
  },
  {
    number: "2",
    title: "Join my Discord.",
    description: "A community of 51.000+ fellow players who are also improving their Aim using Custom Curves."
  },
  {
    number: "3",
    title: "Pick one of my Services.",
    description: "Depending on what you need, pick one of my services to get your own fully customized Curve Settings."
  }
];

const ThreeSteps = () => {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-12">
        <span className="text-gradient-warm">
          Become the best Aimer you can be in 3 easy steps:
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <LiquidGlassCard key={index} className="text-center flex flex-col h-full">
            <div className="flex flex-col items-center flex-1">
              <span className="text-7xl md:text-8xl font-black text-gradient-warm mb-4">
                {step.number}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed flex-1">
                {step.description}
              </p>
              {step.footnote && (
                <p className="text-sm text-muted-foreground/70 mt-4 italic">
                  {step.footnote}
                </p>
              )}
            </div>
          </LiquidGlassCard>
        ))}
      </div>
    </div>
  );
};

export default ThreeSteps;
