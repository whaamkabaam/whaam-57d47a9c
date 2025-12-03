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
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [8, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.3, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [200, 600]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {header}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative z-10"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 md:space-x-20 mb-12 md:mb-20 pl-4 md:pl-8">
          {firstRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
              index={idx}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-12 md:mb-20 space-x-12 md:space-x-20 pl-4 md:pl-8">
          {secondRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`${product.title}-${idx}`}
              index={idx + 5}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 md:space-x-20 pl-4 md:pl-8">
          {thirdRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
              index={idx + 10}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Size variants for visual interest
const sizeClasses = {
  lg: "h-[22rem] w-[26rem] md:h-[28rem] md:w-[32rem]",
  md: "h-[20rem] w-[24rem] md:h-96 md:w-[28rem]",
  sm: "h-[18rem] w-[22rem] md:h-80 md:w-[26rem]",
};

// Pattern for varied sizes across rows
const sizePattern: ("lg" | "md" | "sm")[] = [
  "lg", "md", "sm", "md", "lg",
  "md", "lg", "md", "sm", "md",
  "sm", "md", "lg", "md", "sm",
];

export const ProductCard = ({
  product,
  translate,
  index = 0,
}: {
  product: Product;
  translate: MotionValue<number>;
  index?: number;
}) => {
  const size = product.size || sizePattern[index % sizePattern.length];
  
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      key={product.title}
      className={`group/product ${sizeClasses[size]} relative shrink-0`}
    >
      <a
        href={product.link}
        className="block h-full w-full"
      >
        {/* Glassmorphic card frame */}
        <div className="relative h-full w-full rounded-2xl p-2 bg-background/20 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300 group-hover/product:border-white/20 group-hover/product:shadow-2xl group-hover/product:shadow-primary/10">
          {/* Inner image container */}
          <div className="relative h-full w-full rounded-xl overflow-hidden">
            <img
              src={product.thumbnail}
              className="object-cover h-full w-full transition-transform duration-500 group-hover/product:scale-105"
              alt={product.title}
            />
            
            {/* Bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover/product:opacity-80 transition-opacity duration-300" />
            
            {/* Game tag badge */}
            {product.title && (
              <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-medium bg-background/40 backdrop-blur-md border border-white/10 text-foreground/90 opacity-0 group-hover/product:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover/product:translate-y-0">
                {product.title}
              </span>
            )}
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover/product:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          </div>
        </div>
      </a>
    </motion.div>
  );
};
