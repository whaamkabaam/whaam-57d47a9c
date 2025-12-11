import React, { useMemo } from "react";
import ParallaxControls from "@/components/ParallaxControls";

export interface Product {
  title: string;
  link: string;
  thumbnail: string;
  size?: "sm" | "md" | "lg";
}

export const HeroParallax = ({
  products,
  header,
  isPaused = false,
  speedMultiplier = 1,
  onPauseToggle,
  onSpeedChange,
}: {
  products: Product[];
  header?: React.ReactNode;
  isPaused?: boolean;
  speedMultiplier?: number;
  onPauseToggle?: () => void;
  onSpeedChange?: (speed: number) => void;
}) => {
  // Split products into 3 columns
  const { firstColumn, secondColumn, thirdColumn } = useMemo(() => ({
    firstColumn: products.filter((_, i) => i % 3 === 0),
    secondColumn: products.filter((_, i) => i % 3 === 1),
    thirdColumn: products.filter((_, i) => i % 3 === 2),
  }), [products]);

  return (
    <div className="py-10 overflow-hidden">
      {header}
      
      <div className="flex flex-row justify-center gap-3 md:gap-5 lg:gap-6 px-2 md:px-4 w-full max-w-7xl mx-auto overflow-hidden">
        {/* Column 1 - outer, slower */}
        <div className="parallax-column-fade flex flex-col overflow-hidden h-[75vh]">
          <div 
            className="flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-down"
            style={{ 
              animationDuration: `${315 / speedMultiplier}s`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {[...firstColumn, ...firstColumn].map((product, idx) => (
              <ProductCard
                product={product}
                key={`col1-${product.title}-${idx}`}
              />
            ))}
          </div>
        </div>
        
        {/* Column 2 - middle, faster */}
        <div className="parallax-column-fade flex flex-col overflow-hidden h-[75vh]">
          <div 
            className="flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-down-fast"
            style={{ 
              animationDuration: `${252 / speedMultiplier}s`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {[...secondColumn, ...secondColumn].map((product, idx) => (
              <ProductCard
                product={product}
                key={`col2-${product.title}-${idx}`}
              />
            ))}
          </div>
        </div>
        
        {/* Column 3 - outer, slower */}
        <div className="parallax-column-fade flex flex-col overflow-hidden h-[75vh]">
          <div 
            className="flex flex-col space-y-6 md:space-y-10 parallax-auto-scroll-down"
            style={{ 
              animationDuration: `${315 / speedMultiplier}s`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {[...thirdColumn, ...thirdColumn].map((product, idx) => (
              <ProductCard
                product={product}
                key={`col3-${product.title}-${idx}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Controls underneath columns */}
      {onPauseToggle && onSpeedChange && (
        <div className="sticky bottom-6 z-30 mt-6">
          <ParallaxControls
            isPaused={isPaused}
            speed={speedMultiplier}
            onPauseToggle={onPauseToggle}
            onSpeedChange={onSpeedChange}
          />
        </div>
      )}
    </div>
  );
};

export const ProductCard = ({
  product,
}: {
  product: Product;
}) => {
  return (
    <div className="w-[30vw] md:w-[30vw] lg:w-[28vw] xl:w-[26vw] 2xl:w-[24vw] max-w-[32rem] relative shrink-0">
      <div className="relative rounded-2xl p-2 bg-background/20 backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="relative rounded-xl overflow-hidden bg-black/40">
          <img
            src={product.thumbnail}
            className="w-full h-auto pointer-events-none"
            alt={product.title}
          />
        </div>
      </div>
    </div>
  );
};
