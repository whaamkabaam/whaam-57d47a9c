import React, { useState, useEffect, useRef, useMemo } from "react";
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
  // Split products into 3 columns - useMemo ensures lazy-loaded products get distributed
  const { firstColumn, secondColumn, thirdColumn } = useMemo(() => ({
    firstColumn: products.filter((_, i) => i % 3 === 0),
    secondColumn: products.filter((_, i) => i % 3 === 1),
    thirdColumn: products.filter((_, i) => i % 3 === 2),
  }), [products]);
  
  const ref = useRef(null);
  
  // Single state to toggle CSS animation on/off
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  
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

  // Only update state when crossing threshold, not every frame
  useEffect(() => {
    if (!enableAutoScroll) return;
    
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const shouldBeActive = value > 0.15;
      if (shouldBeActive !== isScrolledPast) {
        setIsScrolledPast(shouldBeActive);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, enableAutoScroll, isScrolledPast]);

  // Vertical scroll-based movement for columns (Framer Motion handles this)
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

  // CSS animation class based on scroll state
  const autoScrollClass = enableAutoScroll 
    ? (isScrolledPast ? '' : 'parallax-auto-scroll-paused')
    : 'parallax-auto-scroll-paused';

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
          {/* Column 1 - moves down + CSS auto-scroll down */}
          <motion.div 
            style={{ y: translateYColumn }}
            className="flex flex-col overflow-hidden"
          >
            <div className={`flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-down ${autoScrollClass}`}>
              {/* Duplicate items for seamless loop */}
              {[...firstColumn, ...firstColumn].map((product, idx) => (
                <ProductCard
                  product={product}
                  key={`col1-${product.title}-${idx}`}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Column 2 - moves up (reverse) + CSS auto-scroll up */}
          <motion.div 
            style={{ y: translateYColumnReverse }}
            className="flex flex-col overflow-hidden"
          >
            <div className={`flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-up ${autoScrollClass}`}>
              {/* Duplicate items for seamless loop */}
              {[...secondColumn, ...secondColumn].map((product, idx) => (
                <ProductCard
                  product={product}
                  key={`col2-${product.title}-${idx}`}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Column 3 - moves down + CSS auto-scroll down */}
          <motion.div 
            style={{ y: translateYColumn }}
            className="flex flex-col overflow-hidden"
          >
            <div className={`flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-down ${autoScrollClass}`}>
              {/* Duplicate items for seamless loop */}
              {[...thirdColumn, ...thirdColumn].map((product, idx) => (
                <ProductCard
                  product={product}
                  key={`col3-${product.title}-${idx}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
}: {
  product: Product;
}) => {
  return (
    <div className="w-[18rem] md:w-[22rem] lg:w-[26rem] relative shrink-0">
      {/* Glassmorphic card frame */}
      <div className="relative rounded-2xl p-2 bg-background/20 backdrop-blur-xl border border-white/10 shadow-xl">
        {/* Inner image container */}
        <div className="relative rounded-xl overflow-hidden bg-black/40">
          <img
            src={product.thumbnail}
            className="w-full h-auto pointer-events-none"
            alt={product.title}
          />
          
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent opacity-60 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
