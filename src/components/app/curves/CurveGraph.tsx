import { useMemo, useState, useCallback } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';
import { curveMonotoneX } from 'd3-shape';
import { parseCcurveContent, curvesAreEqual } from '@/lib/curveParser';

interface CurveGraphProps {
  curveContent: string;
  className?: string;
  height?: number;
  showControls?: boolean;
}

interface HoveredPoint {
  x: number;
  y: number;
  cx: number;
  cy: number;
  axis: 'x' | 'y';
}

export function CurveGraph({ 
  curveContent, 
  className = '', 
  height = 200,
  showControls = true,
}: CurveGraphProps) {
  const [hoveredPoint, setHoveredPoint] = useState<HoveredPoint | null>(null);

  const { curveData, yAxisData, hasDifferentCurves, maxX, minY, maxY } = useMemo(() => {
    try {
      const parsed = parseCcurveContent(curveContent);
      const xCurve = parsed.xAxisCurve;
      const yCurve = parsed.yAxisCurve;

      const different = !curvesAreEqual(parsed.xAxisCurve, parsed.yAxisCurve);
      const allPoints = different ? [...xCurve, ...yCurve] : xCurve;

      const maxX = Math.max(...allPoints.map((p) => p.x), 80);

      const allY = allPoints.map((p) => p.y);
      const actualMinY = Math.min(...allY);
      const actualMaxY = Math.max(...allY);
      const padding = Math.max((actualMaxY - actualMinY) * 0.1, 0.05);
      const minY = Math.max(0, actualMinY - padding);
      const maxY = actualMaxY + padding;

      return {
        curveData: xCurve,
        yAxisData: different ? yCurve : null,
        hasDifferentCurves: different,
        maxX,
        minY,
        maxY,
      };
    } catch {
      return { curveData: [], yAxisData: null, hasDifferentCurves: false, maxX: 80, minY: 0, maxY: 2 };
    }
  }, [curveContent]);

  // Custom dot component for X-axis curve
  const CustomDotX = useCallback((props: any) => {
    const { cx, cy, payload } = props;
    const isHovered = hoveredPoint?.x === payload.x && hoveredPoint?.axis === 'x';
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isHovered ? 6 : 4}
        fill={isHovered ? '#FFD740' : 'rgba(180, 180, 180, 0.9)'}
        stroke={isHovered ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.3)'}
        strokeWidth={isHovered ? 2 : 1.5}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHoveredPoint({ x: payload.x, y: payload.y, cx, cy, axis: 'x' })}
        onMouseLeave={() => setHoveredPoint(null)}
      />
    );
  }, [hoveredPoint]);

  // Custom dot component for Y-axis curve
  const CustomDotY = useCallback((props: any) => {
    const { cx, cy, payload } = props;
    const isHovered = hoveredPoint?.x === payload.x && hoveredPoint?.axis === 'y';
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isHovered ? 5 : 3.5}
        fill={isHovered ? 'hsl(var(--accent))' : 'rgba(180, 180, 180, 0.9)'}
        stroke={isHovered ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.3)'}
        strokeWidth={isHovered ? 2 : 1}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHoveredPoint({ x: payload.x, y: payload.y, cx, cy, axis: 'y' })}
        onMouseLeave={() => setHoveredPoint(null)}
      />
    );
  }, [hoveredPoint]);

  if (curveData.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center bg-background/50 rounded-lg ${className}`}
        style={{ height }}
      >
        <span className="text-muted-foreground text-sm">No curve data</span>
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={curveData}
          margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
        >
          <defs>
            {/* Gradient for area fill under curve */}
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFD740" stopOpacity={0.4} />
              <stop offset="50%" stopColor="#FFD740" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#FFD740" stopOpacity={0} />
            </linearGradient>
            {/* Glow filter for the curve line */}
            <filter id="curveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Y-axis curve gradient */}
            <linearGradient id="yAxisGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))" 
            opacity={0.3}
            vertical={true}
          />
          <XAxis
            dataKey="x"
            type="number"
            domain={[0, Math.ceil(maxX / 10) * 10]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            axisLine={{ stroke: 'hsl(var(--border))', strokeOpacity: 0.5 }}
            tickLine={{ stroke: 'hsl(var(--border))', strokeOpacity: 0.5 }}
            label={{
              value: 'Mouse Speed (dpm)',
              position: 'bottom',
              offset: 0,
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 10,
            }}
          />
          <YAxis
            domain={[minY, maxY]}
            tickFormatter={(value) => value.toFixed(2)}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            axisLine={{ stroke: 'hsl(var(--border))', strokeOpacity: 0.5 }}
            tickLine={{ stroke: 'hsl(var(--border))', strokeOpacity: 0.5 }}
            label={{
              value: 'Sensitivity',
              angle: -90,
              position: 'insideLeft',
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 10,
            }}
          />
          {/* Reference line for 1:1 response - only show if visible */}
          {minY <= 1 && maxY >= 1 && (
            <ReferenceLine
              y={1}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="5 5"
              opacity={0.3}
              label={{
                value: '1:1',
                position: 'right',
                fill: 'hsl(var(--muted-foreground))',
                fontSize: 9,
                opacity: 0.6,
              }}
            />
          )}
          {/* Gradient area fill under curve */}
          <Area
            type={curveMonotoneX}
            dataKey="y"
            stroke="none"
            fill="url(#curveGradient)"
            animationDuration={800}
          />
          {/* Smooth curve with custom hover dots */}
          <Line
            type={curveMonotoneX}
            dataKey="y"
            stroke="#FFD740"
            strokeWidth={2.5}
            name="X-Axis"
            filter="url(#curveGlow)"
            dot={<CustomDotX />}
            activeDot={false}
          />
          {yAxisData && (
            <>
              <Area
                type={curveMonotoneX}
                data={yAxisData}
                dataKey="y"
                stroke="none"
                fill="url(#yAxisGradient)"
              />
              <Line
                type={curveMonotoneX}
                data={yAxisData}
                dataKey="y"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                strokeDasharray="4 2"
                name="Y-Axis"
                dot={<CustomDotY />}
                activeDot={false}
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
      
      {/* Custom tooltip - only shows when hovering a specific point */}
      {hoveredPoint && (
        <div 
          className="absolute pointer-events-none bg-card/95 border border-border/50 rounded-xl px-4 py-3 backdrop-blur-xl shadow-lg z-10"
          style={{
            left: hoveredPoint.cx + 15,
            top: hoveredPoint.cy - 20,
            transform: 'translateY(-50%)',
          }}
        >
          {hasDifferentCurves ? (
            <>
              <p className="text-foreground text-sm">
                {hoveredPoint.axis === 'x' ? 'X' : 'Y'}: {hoveredPoint.y.toFixed(3)}
              </p>
            </>
          ) : (
            <p className="text-foreground text-sm">Sensitivity: {hoveredPoint.y.toFixed(3)}</p>
          )}
          <p className="text-muted-foreground text-xs">Speed: {hoveredPoint.x.toFixed(1)} dpms</p>
        </div>
      )}
    </div>
  );
}