import { useState, useEffect, useRef } from 'react';

export function useCardSticky() {
  const [isFixed, setIsFixed] = useState(false);
  const [fixedTop, setFixedTop] = useState(0);
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
          // Card is becoming sticky - capture its position and fix it
          const rect = card.getBoundingClientRect();
          setFixedTop(rect.top);
          setIsFixed(true);
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0 && isFixed) {
          // User scrolled back up - return to normal flow
          setIsFixed(false);
        }
      },
      {
        threshold: 0,
        rootMargin: '-140px 0px 0px 0px' // Trigger when card would be at our desired sticky position
      }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [isFixed]);

  return {
    cardRef,
    triggerRef,
    isFixed,
    fixedTop,
    cardClasses: isFixed 
      ? 'fixed z-[3] -rotate-[0.45deg]' 
      : 'sticky top-[var(--stack-top-card3)] z-[3] -rotate-[0.45deg]'
  };
}