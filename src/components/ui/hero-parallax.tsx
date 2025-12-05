import React, { useEffect, useState, useRef, useCallback } from "react";
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
  autoScroll = false,
}: {
  products: Product[];
  header?: React.ReactNode;
  autoScroll?: boolean;
}) => {
  // Split products into 3 columns
  const firstColumn = products.filter((_, i) => i % 3 === 0);
  const secondColumn = products.filter((_, i) => i % 3 === 1);
  const thirdColumn = products.filter((_, i) => i % 3 === 2);
  
  const ref = useRef(null);
  
  // Auto-scroll offsets for each column
  const [autoOffset1, setAutoOffset1] = useState(0);
  const [autoOffset2, setAutoOffset2] = useState(0);
  const [autoOffset3, setAutoOffset3] = useState(0);
  
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

  // Auto-scroll animation with progressive speed
  useEffect(() => {
    if (!autoScroll) return;
    
    let animationId: number;
    let lastTime = 0;
    
    const animate = (time: number) => {
      if (lastTime) {
        const delta = time - lastTime;
        
        // Get current scroll progress (0-1)
        const progress = scrollYProgress.get();
        
        // Progressive speed: starts slow, gets faster as you scroll down
        // Base: 0.015, Max: 0.06 (4x faster at bottom)
        const baseSpeed = 0.015;
        const maxSpeed = 0.06;
        const speed = baseSpeed + (progress * (maxSpeed - baseSpeed));
        
        // Update offsets - different speeds per column for organic feel
        setAutoOffset1(prev => prev + speed * delta);
        setAutoOffset2(prev => prev - speed * delta * 0.7); // Slower, opposite
        setAutoOffset3(prev => prev + speed * delta * 1.3); // Faster
      }
      lastTime = time;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [autoScroll, scrollYProgress]);

  // Duplicate products for seamless loop effect
  const duplicatedFirst = autoScroll ? [...firstColumn, ...firstColumn] : firstColumn;
  const duplicatedSecond = autoScroll ? [...secondColumn, ...secondColumn] : secondColumn;
  const duplicatedThird = autoScroll ? [...thirdColumn, ...thirdColumn] : thirdColumn;

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
          {/* Column 1 - moves down + auto-scroll */}
          <motion.div 
            className="flex flex-col space-y-6 md:space-y-10"
            style={{ y: autoScroll ? autoOffset1 : undefined }}
          >
            {duplicatedFirst.map((product, idx) => (
              <ProductCard
                product={product}
                translate={translateYColumn}
                key={`col1-${product.title}-${idx}`}
              />
            ))}
          </motion.div>
          
          {/* Column 2 - moves up (reverse) + auto-scroll opposite */}
          <motion.div 
            className="flex flex-col space-y-6 md:space-y-10"
            style={{ y: autoScroll ? autoOffset2 : undefined }}
          >
            {duplicatedSecond.map((product, idx) => (
              <ProductCard
                product={product}
                translate={translateYColumnReverse}
                key={`col2-${product.title}-${idx}`}
              />
            ))}
          </motion.div>
          
          {/* Column 3 - moves down + auto-scroll fastest */}
          <motion.div 
            className="flex flex-col space-y-6 md:space-y-10"
            style={{ y: autoScroll ? autoOffset3 : undefined }}
          >
            {duplicatedThird.map((product, idx) => (
              <ProductCard
                product={product}
                translate={translateYColumn}
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
}: {
  product: Product;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        y: translate,
      }}
      className="w-[18rem] md:w-[22rem] lg:w-[26rem] relative shrink-0"
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
  );
};
