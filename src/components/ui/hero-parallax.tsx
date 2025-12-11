import React, { useMemo, useRef, useEffect, useCallback } from "react";
import ParallaxControls from "@/components/ParallaxControls";

export interface Product {
  title: string;
  link: string;
  thumbnail: string;
  size?: "sm" | "md" | "lg";
}

// Hook for smooth animated scrolling with speed interpolation
const useParallaxAnimation = (
  isPaused: boolean,
  targetSpeed: number,
  baseSpeed: number // pixels per second at 1x speed
) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const currentSpeedRef = useRef(targetSpeed);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!columnRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Calculate delta time
      const deltaTime = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = timestamp;

      // Determine target (0 if paused, otherwise the speed multiplier)
      const target = isPaused ? 0 : targetSpeed;

      // Smoothly interpolate current speed toward target (lerp factor ~0.15 for snappy ~80ms transition)
      const lerpFactor = 0.15;
      currentSpeedRef.current += (target - currentSpeedRef.current) * lerpFactor;

      // Update position based on current speed (in pixels per second)
      const pixelsPerFrame = baseSpeed * currentSpeedRef.current * deltaTime;
      positionRef.current += pixelsPerFrame;

      // Get the scroll height for wrapping
      const scrollHeight = columnRef.current.scrollHeight / 2; // Half because content is duplicated
      if (scrollHeight > 0) {
        positionRef.current = positionRef.current % scrollHeight;
      }

      // Apply transform
      columnRef.current.style.transform = `translateY(-${positionRef.current}px)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, targetSpeed, baseSpeed]);

  return columnRef;
};

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

  // Base speeds: outer columns slower, middle column faster
  const outerBaseSpeed = 25; // pixels per second at 1x
  const middleBaseSpeed = 32; // ~28% faster

  // Create refs for each column with smooth animation
  const col1Ref = useParallaxAnimation(isPaused, speedMultiplier, outerBaseSpeed);
  const col2Ref = useParallaxAnimation(isPaused, speedMultiplier, middleBaseSpeed);
  const col3Ref = useParallaxAnimation(isPaused, speedMultiplier, outerBaseSpeed);

  return (
    <div className="py-10 overflow-hidden">
      {header}
      
      <div className="flex flex-row justify-center gap-3 md:gap-5 lg:gap-6 px-2 md:px-4 w-full max-w-7xl mx-auto overflow-hidden">
        {/* Column 1 - outer, slower */}
        <div className="parallax-column-fade flex flex-col overflow-hidden h-[75vh]">
          <div 
            ref={col1Ref}
            className="flex flex-col space-y-6 md:space-y-10 will-change-transform"
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
            ref={col2Ref}
            className="flex flex-col space-y-6 md:space-y-10 will-change-transform"
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
            ref={col3Ref}
            className="flex flex-col space-y-6 md:space-y-10 will-change-transform"
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
