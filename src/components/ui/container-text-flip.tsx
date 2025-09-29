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
    <span
      style={{ width: `${width}px` }}
      className={cn(
        "relative inline-block rounded-lg px-3 py-1 text-center font-bold transition-all duration-300",
        "bg-white/5 backdrop-blur-sm border border-white/10",
        "shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/10",
        className
      )}
      aria-hidden
      suppressHydrationWarning
    >
      <div
        className={cn("inline-block transition-opacity duration-300", textClassName)}
        ref={textRef}
        key={words[currentWordIndex]}
      >
        {words[currentWordIndex]}
      </div>
    </span>
  );
}