import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LiquidGlassCard } from "@/components/LiquidGlassEffects";

const steps = [
  {
    number: "1",
    title: "Download Custom Curve.",
    description: "The basis for your Aim Improvement is Mouse Acceleration, specifically Custom Curve.",
    footnote: 'Pro Version is optional, but recommended (10$ w/ code "whaam").'
  },
  {
    number: "2",
    title: "Get your Custom Curve Graph tailored.",
    description: "Get the best possible Custom Curve Graph, which is uniquely based on your personal abilities and playstyle."
  },
  {
    number: "3",
    title: "Enjoy Confidence.",
    description: "As Aiming feels very natural for you now, enjoy your new found ability to easily micro adjust, while still being able to quickly flick on your enemies like a Pro!"
  }
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)", y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3 } 
      }}
      className="relative group"
    >
      <LiquidGlassCard className="text-center flex flex-col h-full relative overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_0_40px_rgba(255,107,53,0.15)]">
        {/* Hover glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--warm-start))/0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <div className="flex flex-col items-center flex-1 relative z-10">
          {/* Animated step number */}
          <motion.span 
            className="text-7xl md:text-8xl font-black text-gradient-warm mb-4 relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.2 + 0.3,
              type: "spring",
              stiffness: 200
            }}
          >
            {/* Pulse glow behind number */}
            <motion.span 
              className="absolute inset-0 text-7xl md:text-8xl font-black text-gradient-warm blur-lg opacity-50"
              animate={isInView ? { 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1]
              } : {}}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: index * 0.3
              }}
            >
              {step.number}
            </motion.span>
            {step.number}
          </motion.span>
          
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
    </motion.div>
  );
};

const ConnectingPath = () => {
  const pathRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ["start center", "end center"]
  });
  
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

  return (
    <div ref={pathRef} className="absolute inset-0 hidden md:block pointer-events-none">
      <svg
        className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--warm-start))" />
            <stop offset="50%" stopColor="hsl(var(--warm-mid))" />
            <stop offset="100%" stopColor="hsl(var(--warm-end))" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background path (dimmed) */}
        <path
          d="M 100 50 Q 300 50 400 50 Q 500 50 600 50 Q 700 50 800 50 Q 900 50 1100 50"
          fill="none"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="2"
          strokeDasharray="8 8"
          opacity="0.2"
        />
        
        {/* Animated path */}
        <motion.path
          d="M 100 50 Q 300 50 400 50 Q 500 50 600 50 Q 700 50 800 50 Q 900 50 1100 50"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          filter="url(#glow)"
          style={{ pathLength }}
          strokeLinecap="round"
        />
        
        {/* Glowing nodes at each step */}
        {[100, 600, 1100].map((cx, i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={50}
            r="8"
            fill="url(#pathGradient)"
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            style={{ opacity: glowOpacity }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.3 
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const MobileTimeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={timelineRef} className="absolute left-4 top-0 bottom-0 md:hidden">
      {/* Background line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-muted-foreground/20 -translate-x-1/2" />
      
      {/* Animated progress line */}
      <motion.div 
        className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-[hsl(var(--warm-start))] via-[hsl(var(--warm-mid))] to-[hsl(var(--warm-end))] -translate-x-1/2 shadow-[0_0_10px_hsl(var(--warm-mid))]"
        style={{ height: lineHeight }}
      />
      
      {/* Step nodes */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[hsl(var(--warm-start))] to-[hsl(var(--warm-end))] shadow-[0_0_15px_hsl(var(--warm-mid))]"
          style={{ top: `${i * 40 + 10}%` }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
};

const ThreeSteps = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <div ref={containerRef} className="container mx-auto px-4 md:px-6">
      {/* Heading with reveal animation */}
      <motion.h2 
        className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="text-gradient-warm">
          Become the best Aimer you can be in 3 easy steps:
        </span>
      </motion.h2>
      
      {/* Desktop: Grid with connecting path */}
      <div className="relative max-w-6xl mx-auto">
        <ConnectingPath />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative pl-12 md:pl-0">
          {/* Mobile timeline */}
          <MobileTimeline />
          
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeSteps;
