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

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef<HTMLDivElement | null>(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth + 30; // padding
      setWidth(textWidth);
    }
  };

  useEffect(() => { updateWidthForWord(); }, [currentWordIndex]);
  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentWordIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.span
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg px-3 py-1 text-center font-bold",
        "bg-gradient-to-r from-primary/10 to-accent/10",
        "shadow-[inset_0_-1px_hsl(var(--border)),inset_0_0_0_1px_hsl(var(--border)),_0_2px_4px_hsl(var(--muted))]",
        className
      )}
      key={words[currentWordIndex]}
      aria-hidden     // decorative for a11y/SEO
      suppressHydrationWarning
      data-animated
    >
      <motion.div
        transition={{ duration: animationDuration / 1000, ease: "easeInOut" }}
        className={cn("inline-block", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: index * 0.02 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.span>
  );
}