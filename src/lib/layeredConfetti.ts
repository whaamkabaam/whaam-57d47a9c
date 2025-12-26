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

  // Background confetti (default canvas, behind modal at z-index ~100)
  confetti({
    particleCount: backgroundParticles,
    spread: 70,
    origin,
    colors,
    gravity: 0.8,
    ticks: 200,
    scalar: 1.1,
  });

  // Foreground confetti - create custom canvas above modal (z-index 9999)
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
    particleCount: foregroundParticles,
    spread: 70,
    origin,
    colors,
    gravity: 0.8,
    ticks: 200,
    scalar: 1.1,
  });

  // Clean up foreground canvas after animation completes
  setTimeout(() => {
    foregroundCanvas.remove();
  }, 4000);
}
