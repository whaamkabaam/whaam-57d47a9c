"use client";

import React, { useState, useEffect, useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

// Pre-calculate max width to prevent dynamic layout shifts
const calculateMaxWidth = (words: string[]): number => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 150; // fallback
  
  ctx.font = '700 16px system-ui, -apple-system, sans-serif'; // approximate bold font
  const maxWidth = Math.max(...words.map(word => ctx.measureText(word).width));
  return maxWidth + 30; // padding
};

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [maxWidth, setMaxWidth] = useState(150);
  
  // Calculate max width once on mount to prevent layout shifts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const width = calculateMaxWidth(words);
      setMaxWidth(width);
    }
  }, [words]);

  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentWordIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.span
      style={{ width: `${maxWidth}px` }}
      className={cn(
        "relative inline-block rounded-lg px-3 py-1 text-center font-bold",
        "bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30",
        "shadow-[0_8px_32px_rgba(239,68,68,0.2)] hover:from-red-500/30 hover:to-orange-500/30",
        "transition-all duration-300 will-change-transform",
        className
      )}
      layoutId={`text-flip-${id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      aria-hidden
      suppressHydrationWarning
    >
      <motion.div
        className={cn(
          "inline-block text-red-400 font-bold",
          textClassName
        )}
        key={words[currentWordIndex]}
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
        transition={{ 
          duration: animationDuration / 1000,
          ease: "easeOut"
        }}
      >
        {words[currentWordIndex]}
      </motion.div>
    </motion.span>
  );
}