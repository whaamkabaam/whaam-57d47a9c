import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

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

// 3D Tilt Card Component
function TiltCard({ 
  step, 
  cursorPosition, 
  isActive,
  cardRef
}: { 
  step: typeof steps[0];
  cursorPosition: { x: number; y: number };
  isActive: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
}) {
  const [cardCenter, setCardCenter] = useState({ x: 0, y: 0 });
  
  // Calculate card center for proximity detection
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

  // Calculate tilt based on cursor position relative to card center
  const dx = cursorPosition.x - cardCenter.x;
  const dy = cursorPosition.y - cardCenter.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxDistance = 400;
  const proximity = Math.max(0, 1 - distance / maxDistance);

  // Tilt angles (max 8 degrees)
  const tiltX = isActive ? (dy / maxDistance) * -8 : 0;
  const tiltY = isActive ? (dx / maxDistance) * 8 : 0;

  // Spring physics for smooth transitions
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(tiltX, springConfig);
  const rotateY = useSpring(tiltY, springConfig);
  const glowIntensity = useSpring(isActive ? proximity : 0, springConfig);

  // Dynamic glow based on proximity
  const boxShadow = useTransform(
    glowIntensity,
    [0, 1],
    [
      "0 4px 20px rgba(255, 107, 53, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.05)",
      "0 8px 40px rgba(255, 107, 53, 0.25), 0 0 60px rgba(255, 107, 53, 0.15), 0 0 0 1px rgba(255, 107, 53, 0.3)"
    ]
  );

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        className="relative p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-background/40 border border-white/10 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          boxShadow,
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
      >
        {/* Glass refraction effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
        
        {/* Step number with glow */}
        <motion.div 
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-5"
          style={{
            background: `radial-gradient(circle at center, rgba(255, 107, 53, ${0.15 + proximity * 0.25}), transparent 70%)`,
          }}
        >
          <motion.span 
            className="text-2xl md:text-3xl font-bold"
            style={{
              color: `hsl(18, ${90 + proximity * 10}%, ${60 + proximity * 15}%)`,
              textShadow: `0 0 ${20 + proximity * 30}px rgba(255, 107, 53, ${0.4 + proximity * 0.4})`
            }}
          >
            {step.number}
          </motion.span>
          
          {/* Pulsing ring when active */}
          {isActive && proximity > 0.3 && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-primary/40"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
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
      </motion.div>
    </motion.div>
  );
}

// Flowing particles along the path
function PathParticles({ pathLength }: { pathLength: number }) {
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 1.5,
      duration: 6 + Math.random() * 2,
      size: 3 + Math.random() * 3
    })), []
  );

  return (
    <g>
      {particles.map((particle) => (
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
            offsetPath: `path("M 60 100 Q 250 50, 400 100 T 740 100")`,
          }}
        />
      ))}
    </g>
  );
}

// Glowing connecting path
function JourneyPath({ cursorX, containerWidth }: { cursorX: number; containerWidth: number }) {
  const progress = Math.min(1, Math.max(0, cursorX / containerWidth));
  const glowIntensity = useSpring(0.4 + progress * 0.4, { stiffness: 100, damping: 20 });

  return (
    <svg
      className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 pointer-events-none hidden md:block"
      viewBox="0 0 800 200"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Path gradient */}
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(18, 100%, 60%)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="hsl(25, 100%, 65%)" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(35, 100%, 55%)" stopOpacity="0.8" />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Particle gradient */}
        <radialGradient id="particleGradient">
          <stop offset="0%" stopColor="hsl(25, 100%, 70%)" />
          <stop offset="100%" stopColor="hsl(18, 100%, 60%)" stopOpacity="0" />
        </radialGradient>

        {/* Particle glow */}
        <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background path (dim) */}
      <path
        d="M 60 100 Q 250 50, 400 100 T 740 100"
        fill="none"
        stroke="rgba(255, 107, 53, 0.1)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Main glowing path */}
      <motion.path
        d="M 60 100 Q 250 50, 400 100 T 740 100"
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#pathGlow)"
        style={{
          opacity: glowIntensity
        }}
      />

      {/* Breathing pulse overlay */}
      <motion.path
        d="M 60 100 Q 250 50, 400 100 T 740 100"
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          strokeWidth: [4, 8, 4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ filter: "blur(4px)" }}
      />

      {/* Flowing particles */}
      <PathParticles pathLength={800} />

      {/* Node points at each step */}
      {[60, 400, 740].map((x, i) => (
        <g key={i}>
          {/* Outer glow ring */}
          <motion.circle
            cx={x}
            cy={100}
            r={12}
            fill="none"
            stroke="hsl(18, 100%, 60%)"
            strokeWidth="2"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Core dot */}
          <circle
            cx={x}
            cy={100}
            r={6}
            fill="hsl(25, 100%, 65%)"
            filter="url(#pathGlow)"
          />
        </g>
      ))}
    </svg>
  );
}

// Mobile vertical journey
function MobileJourney() {
  return (
    <div className="md:hidden absolute left-8 top-0 bottom-0 w-px">
      {/* Vertical line */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />
      
      {/* Glowing overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "blur(3px)" }}
      />

      {/* Flowing particle */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ boxShadow: "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))" }}
      />
    </div>
  );
}

export default function ThreeSteps() {
  const containerRef = useRef<HTMLElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { position, isInside } = useCursorPosition(containerRef);

  // Card refs for proximity detection
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
          <span className="text-gradient-warm">3 Easy Steps</span>
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
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
