/**
 * Layered Confetti Utility
 * Creates a depth effect with confetti behind and in front of modals
 */

import confetti from 'canvas-confetti';

interface LayeredConfettiOptions {
  foregroundRatio?: number; // 0-1, default 0.15 (15% in front)
  colors?: string[];
  origin?: { x?: number; y?: number };
}

export function fireLayeredConfetti(options: LayeredConfettiOptions = {}) {
  const {
    foregroundRatio = 0.15,
    colors = ['#FFD740', '#FF6B35', '#FFEB99', '#ffffff'],
    origin = { y: 0.35 },
  } = options;

  const totalParticles = 80;
  const foregroundParticles = Math.round(totalParticles * foregroundRatio);
  const backgroundParticles = totalParticles - foregroundParticles;

  // Shared confetti settings - high ticks + gravity so they fall off screen
  const confettiSettings = {
    spread: 70,
    origin,
    colors,
    gravity: 1.2,       // Faster fall
    ticks: 500,         // Longer lifespan (fall off screen, don't fade)
    scalar: 1.1,
    decay: 0.94,        // Slight slowdown feels natural
  };

  // ============ BACKGROUND LAYER (z-index: 1, BEHIND modal) ============
  const backgroundCanvas = document.createElement('canvas');
  backgroundCanvas.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  `;
  document.body.appendChild(backgroundCanvas);

  const backgroundConfetti = confetti.create(backgroundCanvas, {
    resize: true,
    useWorker: true,
  });

  backgroundConfetti({
    ...confettiSettings,
    particleCount: backgroundParticles,
  });

  // ============ FOREGROUND LAYER (z-index: 9999, IN FRONT of modal) ============
  const foregroundCanvas = document.createElement('canvas');
  foregroundCanvas.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(foregroundCanvas);

  const foregroundConfetti = confetti.create(foregroundCanvas, {
    resize: true,
    useWorker: true,
  });

  foregroundConfetti({
    ...confettiSettings,
    particleCount: foregroundParticles,
  });

  // Clean up both canvases after animation completes
  setTimeout(() => {
    backgroundCanvas.remove();
    foregroundCanvas.remove();
  }, 6000); // Extended cleanup time for longer fall
}
