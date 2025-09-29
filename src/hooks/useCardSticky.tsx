import { useState, useEffect, useRef } from 'react';

export function useCardSticky() {
  const [isFixed, setIsFixed] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const trigger = triggerRef.current;
    
    if (!card || !trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        if (entry.isIntersecting && !isFixed) {
          // Card reaches sticky position - fix it in place
          setIsFixed(true);
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0 && isFixed) {
          // User scrolled back up - return to normal flow
          setIsFixed(false);
        }
      },
      {
        threshold: 0,
        rootMargin: '-140px 0px 0px 0px' // Trigger when card would be 140px from top
      }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [isFixed]);

  return {
    cardRef,
    triggerRef,
    isFixed,
    cardClasses: isFixed 
      ? 'fixed z-[3] -rotate-[0.45deg]' 
      : 'sticky top-[var(--stack-top-card3)] z-[3] -rotate-[0.45deg]',
    cardStyles: isFixed 
      ? { top: '140px' } 
      : {}
  };
}