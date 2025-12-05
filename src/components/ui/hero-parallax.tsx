import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

export interface Product {
  title: string;
  link: string;
  thumbnail: string;
  size?: "sm" | "md" | "lg";
}

export const HeroParallax = ({
  products,
  header,
  enableAutoScroll = false,
}: {
  products: Product[];
  header?: React.ReactNode;
  enableAutoScroll?: boolean;
}) => {
  // Split products into 3 columns
  const firstColumn = products.filter((_, i) => i % 3 === 0);
  const secondColumn = products.filter((_, i) => i % 3 === 1);
  const thirdColumn = products.filter((_, i) => i % 3 === 2);
  
  const ref = useRef(null);
  
  // Auto-scroll state
  const [autoScrollOffset, setAutoScrollOffset] = useState(0);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(false);
  const lastScrollProgress = useRef(0);
  const animationRef = useRef<number | null>(null);
  
  // Dynamic viewport-based values
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cards start higher up, animate down - reaches final position with less scrolling
  const translateYStart = windowHeight * -0.08;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Track when 3D tilt animation is complete (scrollYProgress > 0.15)
  useEffect(() => {
    if (!enableAutoScroll) return;
    
    const unsubscribe = scrollYProgress.on("change", (value) => {
      lastScrollProgress.current = value;
      // Activate auto-scroll after 3D tilt completes
      setIsAutoScrollActive(value > 0.15);
    });
    return () => unsubscribe();
  }, [scrollYProgress, enableAutoScroll]);

  // Time-based auto-scroll with progressive speed
  useEffect(() => {
    if (!enableAutoScroll || !isAutoScrollActive) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }
    
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Speed increases with scroll depth (0.3 to 1.5 pixels per frame)
      const scrollDepth = lastScrollProgress.current;
      const baseSpeed = 0.3;
      const maxSpeed = 1.5;
      // Exponential speed increase for more noticeable acceleration
      const normalizedDepth = Math.min(1, (scrollDepth - 0.15) / 0.85);
      const speed = baseSpeed + (normalizedDepth * normalizedDepth * (maxSpeed - baseSpeed));
      
      setAutoScrollOffset(prev => prev + speed * (deltaTime / 16));
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enableAutoScroll, isAutoScrollActive]);

  // Vertical scroll-based movement for columns
  const translateYColumn = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, windowHeight * 0.25]),
    springConfig
  );
  const translateYColumnReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, windowHeight * -0.25]),
    springConfig
  );
  
  // Keep the same 3D tilt animation
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [10, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0.6, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [translateYStart, 0]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[150vh] py-20 overflow-hidden antialiased relative z-0 flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Header with z-index to stay above 3D cards */}
      <div className="relative z-50 pointer-events-none">
        <div className="pointer-events-auto">
          {header}
        </div>
      </div>
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="-mt-8 md:-mt-16 flex justify-center [transform-origin:center_center]"
      >
        {/* 3 vertical columns side by side */}
        <div className="flex flex-row justify-center gap-6 md:gap-10">
          {/* Column 1 - moves down + auto-scroll down */}
          <motion.div className="flex flex-col space-y-6 md:space-y-10">
            {firstColumn.map((product, idx) => (
              <ProductCard
                product={product}
                translate={translateYColumn}
                autoScrollOffset={autoScrollOffset}
                direction="down"
                key={`col1-${product.title}-${idx}`}
              />
            ))}
          </motion.div>
          
          {/* Column 2 - moves up (reverse) + auto-scroll up */}
          <motion.div className="flex flex-col space-y-6 md:space-y-10">
            {secondColumn.map((product, idx) => (
              <ProductCard
                product={product}
                translate={translateYColumnReverse}
                autoScrollOffset={autoScrollOffset}
                direction="up"
                key={`col2-${product.title}-${idx}`}
              />
            ))}
          </motion.div>
          
          {/* Column 3 - moves down + auto-scroll down */}
          <motion.div className="flex flex-col space-y-6 md:space-y-10">
            {thirdColumn.map((product, idx) => (
              <ProductCard
                product={product}
                translate={translateYColumn}
                autoScrollOffset={autoScrollOffset}
                direction="down"
                key={`col3-${product.title}-${idx}`}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  autoScrollOffset = 0,
  direction = "down",
}: {
  product: Product;
  translate: MotionValue<number>;
  autoScrollOffset?: number;
  direction?: "up" | "down";
}) => {
  // Calculate combined Y offset: scroll-based + auto-scroll
  const autoOffset = direction === "down" ? autoScrollOffset : -autoScrollOffset;
  
  return (
    <motion.div
      style={{
        y: translate,
      }}
      className="w-[18rem] md:w-[22rem] lg:w-[26rem] relative shrink-0"
    >
      {/* Auto-scroll offset wrapper */}
      <motion.div
        animate={{ y: autoOffset }}
        transition={{ type: "tween", duration: 0.1, ease: "linear" }}
      >
        <motion.div
          whileHover={{
            y: -20,
            scale: 1.02,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group/product"
        >
          {/* Glassmorphic card frame */}
          <div className="relative rounded-2xl p-2 bg-background/20 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300 group-hover/product:border-white/20 group-hover/product:shadow-2xl group-hover/product:shadow-primary/10">
            {/* Inner image container */}
            <div className="relative rounded-xl overflow-hidden bg-black/40">
              <img
                src={product.thumbnail}
                className="w-full h-auto transition-transform duration-500 group-hover/product:scale-105 pointer-events-none"
                alt={product.title}
              />
              
              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover/product:opacity-80 transition-opacity duration-300 pointer-events-none" />
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover/product:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
