import { useMemo } from 'react';
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
}

export function CurveGraph({ 
  curveContent, 
  className = '', 
  height = 200,
  showControls = true,
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
    <div className={`${className} relative overflow-visible`}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={curveData}
          margin={{ top: 40, right: 30, left: 10, bottom: 25 }}
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
            domain={[0, maxY]}
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
          {/* Tooltip with smooth CSS transform transition */}
          <Tooltip
            cursor={false}
            isAnimationActive={false}
            allowEscapeViewBox={{ x: false, y: true }}
            wrapperStyle={{
              transition: 'transform 100ms ease-out, opacity 100ms ease-out',
              pointerEvents: 'none',
              zIndex: 10,
            }}
            content={({ active, payload, coordinate }) => {
              if (!active || !payload?.length || !coordinate) return null;
              const point = payload[0].payload;
              return (
                <div 
                  className="bg-card/95 border border-border/50 rounded-xl px-4 py-3 backdrop-blur-xl shadow-lg"
                  style={{
                    transform: 'translate(-50%, -120%)',
                  }}
                >
                  <p className="text-foreground text-sm">Sensitivity: {point.y.toFixed(3)}</p>
                  <p className="text-muted-foreground text-xs">Speed: {point.x.toFixed(1)} dpms</p>
                </div>
              );
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
            filter="url(#curveGlow)"
            isAnimationActive={false}
            dot={{
              r: 5.5,
              fill: '#A0A0A0',
              stroke: 'rgba(0,0,0,0.5)',
              strokeWidth: 2,
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
              />
              <Line
                type="monotone"
                data={yAxisData}
                dataKey="y"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                strokeDasharray="4 2"
                name="Y-Axis"
                dot={{
                  r: 5,
                  fill: '#A0A0A0',
                  stroke: 'rgba(0,0,0,0.5)',
                  strokeWidth: 2,
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