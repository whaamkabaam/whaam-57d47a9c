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
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[320vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
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
        className="mt-32"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 md:space-x-20 mb-12 md:mb-20">
          {firstRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-12 md:mb-20 space-x-12 md:space-x-20">
          {secondRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`${product.title}-${idx}`}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-12 md:space-x-20">
          {thirdRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
            />
          ))}
        </motion.div>
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
        x: translate,
      }}
      whileHover={{
        y: -20,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      key={product.title}
      className="group/product w-[28rem] md:w-[34rem] max-h-[40rem] relative shrink-0"
    >
      <a
        href={product.link}
        className="block"
      >
        {/* Glassmorphic card frame */}
        <div className="relative rounded-2xl p-2 bg-background/20 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300 group-hover/product:border-white/20 group-hover/product:shadow-2xl group-hover/product:shadow-primary/10">
          {/* Inner image container */}
          <div className="relative rounded-xl overflow-hidden bg-black/40">
            <img
              src={product.thumbnail}
              className="w-full h-auto transition-transform duration-500 group-hover/product:scale-105"
              alt={product.title}
            />
            
            {/* Bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover/product:opacity-80 transition-opacity duration-300" />
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover/product:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          </div>
        </div>
      </a>
    </motion.div>
  );
};
