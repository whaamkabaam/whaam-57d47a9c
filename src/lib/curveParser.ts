// ============================================
// .ccurve File Parser
// ============================================

export interface CurvePoint {
  x: number; // dots per millisecond (mouse speed)
  y: number; // sensitivity multiplier
}

export interface ParsedCurve {
  xAxisCurve: CurvePoint[];
  yAxisCurve: CurvePoint[];
}

/**
 * Parse .ccurve file content into structured curve data
 * 
 * Format: 6 lines of space-separated floats
 * Line 1: X coordinates for X-axis curve
 * Line 2: Y coordinates for X-axis curve
 * Line 3: Unused (zeros)
 * Line 4: X coordinates for Y-axis curve
 * Line 5: Y coordinates for Y-axis curve
 * Line 6: Unused (zeros)
 */
export function parseCcurveContent(content: string): ParsedCurve {
  const lines = content.trim().split('\n');
  
  if (lines.length < 6) {
    throw new Error('Invalid .ccurve format: expected 6 lines');
  }

  const parseFloats = (line: string): number[] => {
    return line
      .trim()
      .split(/\s+/)
      .map(parseFloat)
      .filter(n => !isNaN(n));
  };

  const xCoordsX = parseFloats(lines[0]);
  const yCoordsX = parseFloats(lines[1]);
  const xCoordsY = parseFloats(lines[3]);
  const yCoordsY = parseFloats(lines[4]);

  // Create coordinate pairs
  const xAxisCurve: CurvePoint[] = [];
  const minLenX = Math.min(xCoordsX.length, yCoordsX.length);
  
  for (let i = 0; i < minLenX; i++) {
    xAxisCurve.push({ x: xCoordsX[i], y: yCoordsX[i] });
  }

  const yAxisCurve: CurvePoint[] = [];
  const minLenY = Math.min(xCoordsY.length, yCoordsY.length);
  
  for (let i = 0; i < minLenY; i++) {
    yAxisCurve.push({ x: xCoordsY[i], y: yCoordsY[i] });
  }

  // Sort by x value and remove duplicates at the start
  const cleanCurve = (points: CurvePoint[]): CurvePoint[] => {
    const sorted = [...points].sort((a, b) => a.x - b.x);
    
    // Remove leading duplicate zeros (keep first)
    const cleaned: CurvePoint[] = [];
    let lastX = -Infinity;
    
    for (const point of sorted) {
      if (point.x > lastX || cleaned.length === 0) {
        cleaned.push(point);
        lastX = point.x;
      }
    }
    
    return cleaned;
  };

  return {
    xAxisCurve: cleanCurve(xAxisCurve),
    yAxisCurve: cleanCurve(yAxisCurve),
  };
}

/**
 * Generate reference line points for 1:1 linear response
 */
export function generateReferenceLine(maxX: number): CurvePoint[] {
  return [
    { x: 0, y: 1 },
    { x: maxX, y: 1 },
  ];
}
