import { useMemo, useState, memo } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
  Tooltip,
} from 'recharts';
import { parseCcurveContent, curvesAreEqual } from '@/lib/curveParser';

interface CurveGraphProps {
  curveContent: string;
  className?: string;
  height?: number | string;
  showControls?: boolean;
  /** Enable SVG glow effect on curve (default: false for performance) */
  enableGlow?: boolean;
}

function CurveGraphInner({ 
  curveContent, 
  className = '', 
  height = 200,
  showControls = true,
  enableGlow = false,
}: CurveGraphProps) {
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

  // Lightweight CSS tooltip state (replaces react-spring for performance)
  const [tooltipState, setTooltipState] = useState<{
    x: number;
    y: number;
    visible: boolean;
    sensitivity: number;
    speed: number;
  }>({ x: 0, y: 0, visible: false, sensitivity: 0, speed: 0 });

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
    <div className={`${className} relative overflow-visible h-full w-full`}>
      {/* CSS-animated tooltip (no react-spring overhead) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate3d(${tooltipState.x + 25}px, ${tooltipState.y}px, 0) scale(${tooltipState.visible ? 1 : 0.95})`,
          opacity: tooltipState.visible ? 1 : 0,
          pointerEvents: 'none',
          zIndex: 50,
          transition: 'transform 120ms ease-out, opacity 120ms ease-out',
          willChange: 'transform, opacity',
        }}
      >
        <div 
          style={{
            background: 'rgba(24, 24, 27, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
          }}
        >
          <p className="text-foreground text-sm">Sensitivity: {tooltipState.sensitivity.toFixed(3)}</p>
          <p className="text-muted-foreground text-xs">Speed: {tooltipState.speed.toFixed(1)} dpms</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={curveData}
          margin={{ top: 20, right: 50, left: 20, bottom: 25 }}
          onMouseMove={(e: any) => {
            if (e?.chartX !== undefined && e?.chartY !== undefined && e.activePayload?.[0]?.payload) {
              const point = e.activePayload[0].payload;
              const rawY = e.chartY - 80;
              const clampedY = Math.max(10, rawY);
              
              setTooltipState({
                x: e.chartX,
                y: clampedY,
                visible: true,
                sensitivity: point.y,
                speed: point.x,
              });
            }
          }}
          onMouseLeave={() => {
            setTooltipState(prev => ({ ...prev, visible: false }));
          }}
        >
          <defs>
            {/* Gradient for area fill under curve */}
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFD740" stopOpacity={0.15} />
              <stop offset="50%" stopColor="#FFD740" stopOpacity={0.05} />
              <stop offset="100%" stopColor="#FFD740" stopOpacity={0} />
            </linearGradient>
            {/* Glow filter for the curve line - kept for enableGlow prop */}
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
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))', strokeOpacity: 0.5 }}
            tickLine={{ stroke: 'hsl(var(--border))', strokeOpacity: 0.5 }}
            label={{
              value: 'Mouse Speed (dpms)',
              position: 'bottom',
              offset: 0,
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 12,
            }}
          />
          <YAxis
            domain={[0, maxY]}
            tickFormatter={(value) => value.toFixed(2)}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))', strokeOpacity: 0.5 }}
            tickLine={{ stroke: 'hsl(var(--border))', strokeOpacity: 0.5 }}
            label={{
              value: 'Sensitivity',
              angle: -90,
              position: 'insideLeft',
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 12,
            }}
          />
          {/* Native Recharts tooltip hidden - we use custom animated one */}
          <Tooltip content={() => null} />
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
            type="monotone"
            dataKey="y"
            stroke="none"
            fill="url(#curveGradient)"
            isAnimationActive={false}
          />
          {/* Smooth curve with native hover detection */}
          <Line
            type="monotone"
            dataKey="y"
            stroke="#FFD740"
            strokeWidth={2.5}
            name="X-Axis"
            filter={enableGlow ? "url(#curveGlow)" : undefined}
            isAnimationActive={false}
            dot={(props: any) => {
              const { cx, cy, index } = props;
              const isFirstPoint = index === 0;
              const isLastPoint = index === curveData.length - 1;
              
              // Only render first and last dots for performance
              if (!isFirstPoint && !isLastPoint) {
                return null;
              }
              
              // First point: simple anchor dot
              if (isFirstPoint) {
                return (
                  <circle
                    key={`dot-first`}
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill="#A0A0A0"
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth={2}
                  />
                );
              }
              
              // Last point: arrow indicator
              if (curveData.length < 2) {
                return (
                  <circle
                    key={`dot-last`}
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill="#FFD740"
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth={2}
                  />
                );
              }
              
              // Calculate arrow direction from second-to-last → last point
              const lastPoint = curveData[curveData.length - 1];
              const prevPoint = curveData[curveData.length - 2];
              
              // Convert data deltas to approximate pixel deltas for correct visual angle
              const xDataRange = Math.ceil(maxX / 10) * 10;
              const yDataRange = maxY - 0;
              const pixelWidth = 500;
              const pixelHeight = 250;
              
              const pixelDx = (lastPoint.x - prevPoint.x) * (pixelWidth / xDataRange);
              const pixelDy = -(lastPoint.y - prevPoint.y) * (pixelHeight / yDataRange); // Invert Y for SVG
              
              const angleRad = Math.atan2(pixelDy, pixelDx);
              const angleDeg = angleRad * (180 / Math.PI);
              
              return (
                <g key={`arrow-last`} transform={`translate(${cx}, ${cy}) rotate(${angleDeg})`}>
                  {/* Filled triangular arrowhead */}
                  <polygon
                    points="-4,-5 8,0 -4,5"
                    fill="#FFD740"
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth={1}
                    strokeLinejoin="round"
                  />
                </g>
              );
            }}
            activeDot={{
              r: 6,
              fill: '#FFD740',
              stroke: 'rgba(0,0,0,0.4)',
              strokeWidth: 2,
            }}
          />
          {yAxisData && (
            <>
              <Area
                type="monotone"
                data={yAxisData}
                dataKey="y"
                stroke="none"
                fill="url(#yAxisGradient)"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                data={yAxisData}
                dataKey="y"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                strokeDasharray="4 2"
                name="Y-Axis"
                isAnimationActive={false}
                dot={(props: any) => {
                  const { cx, cy, index } = props;
                  const isFirstPoint = index === 0;
                  const isLastPoint = yAxisData && index === yAxisData.length - 1;
                  
                  // Only render first and last dots for performance
                  if (!isFirstPoint && !isLastPoint) {
                    return null;
                  }
                  
                  // First point: simple anchor dot
                  if (isFirstPoint) {
                    return (
                      <circle
                        key={`ydot-first`}
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill="#A0A0A0"
                        stroke="rgba(0,0,0,0.5)"
                        strokeWidth={2}
                      />
                    );
                  }
                  
                  if (!yAxisData || yAxisData.length < 2) {
                    return (
                      <circle
                        key={`ydot-last`}
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill="hsl(var(--accent))"
                        stroke="rgba(0,0,0,0.5)"
                        strokeWidth={2}
                      />
                    );
                  }
                  
                  const lastPoint = yAxisData[yAxisData.length - 1];
                  const prevPoint = yAxisData[yAxisData.length - 2];
                  
                  // Convert data deltas to approximate pixel deltas
                  const xDataRange = Math.ceil(maxX / 10) * 10;
                  const yDataRange = maxY - 0;
                  const pixelWidth = 500;
                  const pixelHeight = 250;
                  
                  const pixelDx = (lastPoint.x - prevPoint.x) * (pixelWidth / xDataRange);
                  const pixelDy = -(lastPoint.y - prevPoint.y) * (pixelHeight / yDataRange);
                  
                  const angleRad = Math.atan2(pixelDy, pixelDx);
                  const angleDeg = angleRad * (180 / Math.PI);
                  
                  return (
                    <g key={`yarrow-last`} transform={`translate(${cx}, ${cy}) rotate(${angleDeg})`}>
                      {/* Filled triangular arrowhead */}
                      <polygon
                        points="-4,-5 8,0 -4,5"
                        fill="hsl(var(--accent))"
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth={1}
                        strokeLinejoin="round"
                      />
                    </g>
                  );
                }}
                activeDot={{
                  r: 5,
                  fill: 'hsl(var(--accent))',
                  stroke: 'rgba(0,0,0,0.4)',
                  strokeWidth: 2,
                }}
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders when parent updates
export const CurveGraph = memo(CurveGraphInner, (prevProps, nextProps) => {
  return (
    prevProps.curveContent === nextProps.curveContent &&
    prevProps.height === nextProps.height &&
    prevProps.enableGlow === nextProps.enableGlow &&
    prevProps.className === nextProps.className
  );
});
