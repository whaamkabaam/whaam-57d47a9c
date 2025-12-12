import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const steps = [{
  number: 1,
  title: "Download Custom Curve.",
  description: "The basis for your Aim Improvement is Mouse Acceleration, specifically Custom Curve.",
  footnote: 'Pro Version is optional, but recommended (10$ w/ code "whaam").'
}, {
  number: 2,
  title: "Get your Custom Curve Graph tailored.",
  description: "Get the best possible Custom Curve Graph, which is uniquely based on your personal abilities and playstyle."
}, {
  number: 3,
  title: "Enjoy Confidence.",
  description: "As Aiming feels very natural for you now, enjoy your new found ability to easily micro adjust, while still being able to quickly flick on your enemies like a Pro!"
}];

// Hook for tracking cursor position relative to container
function useCursorPosition(containerRef: React.RefObject<HTMLElement>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      });
    };
    
    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => setIsInside(false);
    
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);
  
  return { position, isInside };
}

// 3D Tilt Card Component with AGGRESSIVE effects
function TiltCard({
  step,
  cursorPosition,
  isActive,
  cardRef,
  index
}: {
  step: typeof steps[0];
  cursorPosition: { x: number; y: number };
  isActive: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
  index: number;
}) {
  const [cardCenter, setCardCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCenter = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const parentRect = cardRef.current.offsetParent?.getBoundingClientRect();
        if (parentRect) {
          setCardCenter({
            x: rect.left - parentRect.left + rect.width / 2,
            y: rect.top - parentRect.top + rect.height / 2
          });
        }
      }
    };
    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, [cardRef]);

  // Calculate distance and proximity - EXTENDED RANGE
  const dx = cursorPosition.x - cardCenter.x;
  const dy = cursorPosition.y - cardCenter.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxDistance = 600; // Extended range for always-active effect
  const proximity = Math.max(0, 1 - distance / maxDistance);

  // AGGRESSIVE tilt angles - 25° max (was 8°)
  const tiltX = isActive ? (dy / maxDistance) * -25 : 0;
  const tiltY = isActive ? (dx / maxDistance) * 25 : 0;

  // CURSOR MAGNETISM - cards pull toward cursor (max 30px)
  const magnetStrength = 0.12;
  const magnetX = isActive ? dx * proximity * magnetStrength : 0;
  const magnetY = isActive ? dy * proximity * magnetStrength : 0;

  // SCALE on proximity - up to 8% larger
  const scaleValue = isActive ? 1 + proximity * 0.08 : 1;

  // Spring physics - slightly faster response
  const springConfig = { stiffness: 200, damping: 25, mass: 0.4 };
  const rotateX = useSpring(tiltX, springConfig);
  const rotateY = useSpring(tiltY, springConfig);
  const translateX = useSpring(magnetX, springConfig);
  const translateY = useSpring(magnetY, springConfig);
  const scale = useSpring(scaleValue, springConfig);
  const glowIntensity = useSpring(isActive ? proximity : 0, springConfig);

  // DRAMATIC glow based on proximity
  const boxShadow = useTransform(
    glowIntensity,
    [0, 0.5, 1],
    [
      "0 8px 32px rgba(255, 107, 53, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      "0 15px 50px rgba(255, 107, 53, 0.35), 0 0 40px rgba(255, 107, 53, 0.2), 0 0 0 1px rgba(255, 107, 53, 0.4)",
      "0 20px 80px rgba(255, 107, 53, 0.5), 0 0 80px rgba(255, 107, 53, 0.35), 0 0 120px rgba(255, 107, 53, 0.2), 0 0 0 2px rgba(255, 107, 53, 0.6)"
    ]
  );

  // Ambient floating animation (always active)
  const floatDuration = 4 + index * 0.5;
  const floatDelay = index * 0.3;

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      // AMBIENT FLOATING - constant subtle movement
      animate={{
        y: [0, -6, 0, 4, 0],
        rotateZ: [-0.5, 0.5, -0.3, 0.3, -0.5]
      }}
      transition={{
        duration: floatDuration,
        delay: floatDelay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="relative p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-background/50 border border-white/15 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          scale,
          boxShadow,
          transformStyle: "preserve-3d",
          willChange: "transform",
          translateZ: 50 // Depth pop
        }}
      >
        {/* Animated glass refraction effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255,255,255,0.1) 0%, 
              transparent 40%, 
              transparent 60%, 
              rgba(255,255,255,0.05) 100%)`
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Step number with AGGRESSIVE glow */}
        <motion.div
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mb-5"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(255, 107, 53, ${0.2 + proximity * 0.4}), 
              transparent 70%)`
          }}
        >
          <motion.span
            className="text-3xl md:text-4xl font-bold"
            style={{
              color: `hsl(18, ${90 + proximity * 10}%, ${55 + proximity * 20}%)`,
              textShadow: `
                0 0 ${25 + proximity * 40}px rgba(255, 107, 53, ${0.5 + proximity * 0.5}),
                0 0 ${50 + proximity * 60}px rgba(255, 107, 53, ${0.3 + proximity * 0.3})
              `
            }}
          >
            {step.number}
          </motion.span>

          {/* ALWAYS VISIBLE pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-primary/50"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.4, 0, 0.4]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3
            }}
          />
          
          {/* Second pulsing ring (offset timing) */}
          <motion.div
            className="absolute inset-0 rounded-xl border border-primary/30"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3 + 1
            }}
          />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 tracking-tight">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {step.description}
        </p>

        {/* Footnote for step 1 */}
        {step.footnote && (
          <p className="mt-4 text-xs md:text-sm text-muted-foreground/70 italic border-t border-white/5 pt-4">
            {step.footnote}
          </p>
        )}

        {/* Corner accent glow */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(255, 107, 53, ${0.1 + proximity * 0.2}) 0%, transparent 70%)`
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// Flowing particles along the path - MORE & BIGGER
function PathParticles({ pathLength }: { pathLength: number }) {
  const particles = useMemo(() => 
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      delay: i * 0.9,
      duration: 4 + Math.random() * 2,
      size: 5 + Math.random() * 7 // 5-12px (was 3-6px)
    })), 
  []);

  return (
    <g>
      {particles.map(particle => (
        <motion.circle
          key={particle.id}
          r={particle.size}
          fill="url(#particleGradient)"
          filter="url(#particleGlow)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            offsetPath: `path("M 60 100 Q 250 50, 400 100 T 740 100")`
          }}
        />
      ))}
    </g>
  );
}

// Glowing connecting path - THICK & BRIGHT
function JourneyPath({
  cursorX,
  containerWidth
}: {
  cursorX: number;
  containerWidth: number;
}) {
  const progress = Math.min(1, Math.max(0, cursorX / containerWidth));
  const glowIntensity = useSpring(0.6 + progress * 0.4, {
    stiffness: 100,
    damping: 20
  });

  return (
    <svg
      className="absolute top-1/2 left-0 w-full h-40 -translate-y-1/2 pointer-events-none hidden md:block"
      viewBox="0 0 800 200"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Path gradient - brighter */}
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(18, 100%, 60%)" stopOpacity="1" />
          <stop offset="50%" stopColor="hsl(25, 100%, 70%)" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(35, 100%, 60%)" stopOpacity="1" />
        </linearGradient>

        {/* AGGRESSIVE glow filter */}
        <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Particle gradient - brighter core */}
        <radialGradient id="particleGradient">
          <stop offset="0%" stopColor="hsl(25, 100%, 85%)" />
          <stop offset="50%" stopColor="hsl(25, 100%, 65%)" />
          <stop offset="100%" stopColor="hsl(18, 100%, 50%)" stopOpacity="0" />
        </radialGradient>

        {/* Particle glow - bigger blur */}
        <filter id="particleGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Node glow */}
        <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background path (dim base) */}
      <path
        d="M 60 100 Q 250 50, 400 100 T 740 100"
        fill="none"
        stroke="rgba(255, 107, 53, 0.15)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Main glowing path - THICK */}
      <motion.path
        d="M 60 100 Q 250 50, 400 100 T 740 100"
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        filter="url(#pathGlow)"
        style={{ opacity: glowIntensity }}
      />

      {/* AGGRESSIVE breathing pulse overlay */}
      <motion.path
        d="M 60 100 Q 250 50, 400 100 T 740 100"
        fill="none"
        stroke="url(#pathGradient)"
        strokeLinecap="round"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          strokeWidth: [8, 18, 8]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ filter: "blur(8px)" }}
      />

      {/* Flowing particles */}
      <PathParticles pathLength={800} />

      {/* Node points at each step - BIGGER */}
      {[60, 400, 740].map((x, i) => (
        <g key={i}>
          {/* Outer glow ring - bigger */}
          <motion.circle
            cx={x}
            cy={100}
            r={18}
            fill="none"
            stroke="hsl(18, 100%, 60%)"
            strokeWidth="3"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              delay: i * 0.25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Second ring */}
          <motion.circle
            cx={x}
            cy={100}
            r={25}
            fill="none"
            stroke="hsl(25, 100%, 65%)"
            strokeWidth="2"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.25 + 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Core dot - bigger with glow */}
          <circle
            cx={x}
            cy={100}
            r={10}
            fill="hsl(25, 100%, 70%)"
            filter="url(#nodeGlow)"
          />
          {/* Inner bright core */}
          <circle
            cx={x}
            cy={100}
            r={5}
            fill="hsl(35, 100%, 85%)"
          />
        </g>
      ))}
    </svg>
  );
}

// Mobile vertical journey - ENHANCED
function MobileJourney() {
  return (
    <div className="md:hidden absolute left-8 top-0 bottom-0 w-1">
      {/* Vertical line - thicker */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/60 to-primary/30 rounded-full" />

      {/* Glowing overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary rounded-full"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ filter: "blur(6px)" }}
      />

      {/* Multiple flowing particles */}
      {[0, 1.5, 3].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"
          animate={{ y: ["-10%", "110%"] }}
          transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            boxShadow: "0 0 15px hsl(var(--primary)), 0 0 30px hsl(var(--primary)), 0 0 45px hsl(var(--primary) / 0.5)"
          }}
        />
      ))}
    </div>
  );
}

export default function ThreeSteps() {
  const containerRef = useRef<HTMLElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { position, isInside } = useCursorPosition(containerRef);

  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 px-4 overflow-hidden"
    >
      {/* Section heading */}
      <motion.div
        className="text-center mb-16 md:mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-gradient-warm">
            Become the best Aimer you can be in 3 easy Steps:
          </span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          Your journey to confident, natural aiming
        </p>
      </motion.div>

      {/* Desktop: Horizontal layout with connecting path */}
      <div className="relative max-w-6xl mx-auto">
        {/* Connecting path (desktop only) */}
        <JourneyPath cursorX={position.x} containerWidth={containerWidth} />

        {/* Mobile vertical line */}
        <MobileJourney />

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative z-10 pl-16 md:pl-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <TiltCard
                step={step}
                cursorPosition={position}
                isActive={isInside}
                cardRef={cardRefs[index]}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
