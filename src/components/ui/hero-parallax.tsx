import React from "react";
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
}: {
  products: Product[];
  header?: React.ReactNode;
}) => {
  // Split products into 3 columns
  const firstColumn = products.filter((_, i) => i % 3 === 0);
  const secondColumn = products.filter((_, i) => i % 3 === 1);
  const thirdColumn = products.filter((_, i) => i % 3 === 2);
  
  const ref = React.useRef(null);
  
  // Dynamic viewport-based values
  const [windowHeight, setWindowHeight] = React.useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  React.useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cards start higher up, animate down - reaches final position with less scrolling
  const translateYStart = windowHeight * -0.15;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Vertical scroll-based movement for columns
  const translateYColumn = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, windowHeight * 0.4]),
    springConfig
  );
  const translateYColumnReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, windowHeight * -0.4]),
    springConfig
  );
  
  // Keep the same 3D tilt animation
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [12, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [8, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [translateYStart, 0]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[200vh] py-20 overflow-x-clip overflow-y-visible antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
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
        className="mt-4 flex justify-center [transform-origin:center_center]"
      >
        {/* 3 vertical columns side by side */}
        <div className="flex flex-row justify-center gap-6 md:gap-10">
          {/* Column 1 - moves down */}
          <motion.div 
            className="flex flex-col space-y-6 md:space-y-10 cursor-grab active:cursor-grabbing"
            drag="y"
            dragConstraints={{ top: -500, bottom: 500 }}
            dragElastic={0.05}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          >
            {firstColumn.map((product, idx) => (
              <ProductCard
                product={product}
                translate={translateYColumn}
                key={`${product.title}-${idx}`}
              />
            ))}
          </motion.div>
          
          {/* Column 2 - moves up (reverse) */}
          <motion.div 
            className="flex flex-col space-y-6 md:space-y-10 cursor-grab active:cursor-grabbing"
            drag="y"
            dragConstraints={{ top: -500, bottom: 500 }}
            dragElastic={0.05}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          >
            {secondColumn.map((product, idx) => (
              <ProductCard
                product={product}
                translate={translateYColumnReverse}
                key={`${product.title}-${idx}`}
              />
            ))}
          </motion.div>
          
          {/* Column 3 - moves down */}
          <motion.div 
            className="flex flex-col space-y-6 md:space-y-10 cursor-grab active:cursor-grabbing"
            drag="y"
            dragConstraints={{ top: -500, bottom: 500 }}
            dragElastic={0.05}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          >
            {thirdColumn.map((product, idx) => (
              <ProductCard
                product={product}
                translate={translateYColumn}
                key={`${product.title}-${idx}`}
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
      whileHover={{
        y: -20,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      key={product.title}
      className="group/product w-[18rem] md:w-[22rem] lg:w-[26rem] relative shrink-0"
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
  );
};
