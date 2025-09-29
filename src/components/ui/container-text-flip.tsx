"use client";

import React, { useState, useEffect, useId, useCallback } from "react";
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

  const cachedWidths = React.useRef<Record<string, number>>({});
  
  const updateWidthForWord = useCallback(() => {
    const currentWord = words[currentWordIndex];
    if (cachedWidths.current[currentWord]) {
      setWidth(cachedWidths.current[currentWord]);
      return;
    }
    
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth + 30; // padding
      cachedWidths.current[currentWord] = textWidth;
      setWidth(textWidth);
    }
  }, [words, currentWordIndex]);

  useEffect(() => { updateWidthForWord(); }, [updateWidthForWord]);
  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentWordIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <span
      style={{ 
        width: `${width}px`,
        willChange: 'width',
        contain: 'layout style'
      }}
      className={cn(
        "relative inline-block rounded-lg px-3 py-1 text-center font-bold",
        "bg-white/5 backdrop-blur-sm border border-white/10",
        "shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/10",
        "transition-all duration-300 ease-out transform translateZ(0)",
        className
      )}
      key={words[currentWordIndex]}
      aria-hidden     // decorative for a11y/SEO
      suppressHydrationWarning
      data-animated
    >
      <div
        className={cn("inline-block transition-opacity duration-300 ease-out", textClassName)}
        ref={textRef}
        style={{ 
          opacity: 1,
          willChange: 'opacity'
        }}
      >
        <span className="inline-block">
          {words[currentWordIndex]}
        </span>
      </div>
    </span>
  );
}