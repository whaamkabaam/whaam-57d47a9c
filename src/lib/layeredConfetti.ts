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
    foregroundRatio = 0.45,
    colors = ['#FFD740', '#FF6B35', '#FFEB99', '#ffffff'],
    origin = { x: 0.5, y: 0.38 },
    behindModalZIndex = 1050,
    inFrontOfModalZIndex = 1200,
  } = options;

  const totalParticles = 140;
  const foregroundParticles = Math.round(totalParticles * foregroundRatio);
  const backgroundParticles = totalParticles - foregroundParticles;

  // Base physics tuned so confetti falls off-screen before fading
  const baseSettings = {
    spread: 45,
    origin,
    colors,
    gravity: 1.8,
    startVelocity: 45,
    ticks: 3500,
    scalar: 1.15,
    decay: 0.96,
    drift: 0,
  };

  // Use rAF to batch canvas creation for better performance
  requestAnimationFrame(() => {
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
      ...baseSettings,
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

    // Foreground gets bigger, faster particles for visibility
    foregroundConfetti({
      ...baseSettings,
      particleCount: foregroundParticles,
      scalar: 1.4,
      startVelocity: 55,
      spread: 35,
    });

    // Clean up canvases after animation completes
    setTimeout(() => {
      backgroundCanvas.remove();
      foregroundCanvas.remove();
    }, 10000);
  });
}
