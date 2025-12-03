import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

interface MarqueeRowProps {
  images: { url: string; title: string }[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function MarqueeRow({ 
  images, 
  direction = "left", 
  speed = 30,
  className 
}: MarqueeRowProps) {
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];
  
  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicatedImages.map((image, idx) => (
          <MarqueeCard key={`${image.url}-${idx}`} image={image} />
        ))}
      </motion.div>
    </div>
  );
}

function MarqueeCard({ image }: { image: { url: string; title: string } }) {
  return (
    <motion.div
      className="relative shrink-0 rounded-xl overflow-hidden cursor-pointer group"
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl ring-2 ring-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.3)]" />
      <img
        src={image.url}
        alt={image.title}
        className="h-48 md:h-56 lg:h-64 w-auto object-cover rounded-xl transition-all duration-300 group-hover:brightness-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {image.title && (
        <span className="absolute bottom-2 left-2 text-xs text-white/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 px-2 py-1 rounded">
          {image.title}
        </span>
      )}
    </motion.div>
  );
}

interface InfiniteMarqueeProps {
  images: { url: string; title: string }[];
  header?: React.ReactNode;
}

export function InfiniteMarquee({ images, header }: InfiniteMarqueeProps) {
  // Split images into 4 rows
  const rowSize = Math.ceil(images.length / 4);
  const row1 = images.slice(0, rowSize);
  const row2 = images.slice(rowSize, rowSize * 2);
  const row3 = images.slice(rowSize * 2, rowSize * 3);
  const row4 = images.slice(rowSize * 3);

  return (
    <div className="relative w-full py-20 md:py-32 overflow-hidden bg-background">
      {/* Header */}
      {header}
      
      {/* Marquee Rows */}
      <div className="relative space-y-4 md:space-y-6">
        {/* Gradient masks for edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />
        
        <MarqueeRow images={row1} direction="left" speed={35} />
        <MarqueeRow images={row2} direction="right" speed={40} />
        <MarqueeRow images={row3} direction="left" speed={32} />
        <MarqueeRow images={row4} direction="right" speed={38} />
      </div>
    </div>
  );
}
