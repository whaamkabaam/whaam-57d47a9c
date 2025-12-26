/**
 * Layered Confetti Utility
 * Creates a true 3D depth effect with confetti behind AND in front of modals
 * 
 * Z-index stack (standardized):
 *   1000 - Modal overlay/backdrop
 *   1050 - Background confetti (behind card)
 *   1100 - Modal content card
 *   1200 - Foreground confetti (in front of card)
 */

import confetti from 'canvas-confetti';

interface LayeredConfettiOptions {
  foregroundRatio?: number; // 0-1, default 0.15 (15% in front)
  colors?: string[];
  origin?: { x?: number; y?: number };
  behindModalZIndex?: number;
  inFrontOfModalZIndex?: number;
}

export function fireLayeredConfetti(options: LayeredConfettiOptions = {}) {
  const {
    foregroundRatio = 0.15,
    colors = ['#FFD740', '#FF6B35', '#FFEB99', '#ffffff'],
    origin = { y: 0.4 },
    behindModalZIndex = 1050,
    inFrontOfModalZIndex = 1200,
  } = options;

  const totalParticles = 100;
  const foregroundParticles = Math.round(totalParticles * foregroundRatio);
  const backgroundParticles = totalParticles - foregroundParticles;

  // Physics tuned so confetti falls off-screen before fading
  const confettiSettings = {
    spread: 80,
    origin,
    colors,
    gravity: 2.2,         // Fast fall - exits viewport quickly
    startVelocity: 45,    // Strong initial burst
    ticks: 1200,          // Long lifespan - won't fade mid-air
    scalar: 1.15,
    decay: 0.97,          // Slight slowdown, natural feel
    drift: 0,             // No horizontal drift
  };

  // ============ BACKGROUND LAYER (behind modal card) ============
  const backgroundCanvas = document.createElement('canvas');
  backgroundCanvas.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: ${behindModalZIndex};
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

  // ============ FOREGROUND LAYER (in front of modal card) ============
  const foregroundCanvas = document.createElement('canvas');
  foregroundCanvas.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: ${inFrontOfModalZIndex};
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

  // Clean up canvases after animation completes (particles exit viewport)
  setTimeout(() => {
    backgroundCanvas.remove();
    foregroundCanvas.remove();
  }, 8000);
}
