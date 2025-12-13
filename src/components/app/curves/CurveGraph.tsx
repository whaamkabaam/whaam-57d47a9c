import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';
import { parseCcurveContent, curvesAreEqual, CurvePoint } from '@/lib/curveParser';

interface CurveGraphProps {
  curveContent: string;
  className?: string;
  height?: number;
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
      
      const different = !curvesAreEqual(xCurve, yCurve);
      const allPoints = different ? [...xCurve, ...yCurve] : xCurve;
      
      const maxX = Math.max(...allPoints.map(p => p.x), 80);
      
      // Calculate dynamic Y-axis range based on actual data
      const actualMinY = Math.min(...allPoints.map(p => p.y));
      const actualMaxY = Math.max(...allPoints.map(p => p.y));
      
      // Add padding for readability (10% or at least 0.05)
      const range = actualMaxY - actualMinY;
      const padding = Math.max(range * 0.1, 0.05);
      
      const minY = Math.max(0, actualMinY - padding);
      const maxY = actualMaxY + padding;
      
      return { 
        curveData: xCurve, 
        yAxisData: different ? yCurve : null,
        hasDifferentCurves: different,
        maxX,
        minY,
        maxY 
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
    <div className={`${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={curveData}
          margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
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
            opacity={0.15}
            vertical={false}
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
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card) / 0.95)',
              border: '1px solid hsl(var(--border) / 0.5)',
              borderRadius: '12px',
              padding: '10px 14px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px hsl(var(--background) / 0.5)',
            }}
            labelStyle={{ 
              color: 'hsl(var(--foreground))',
              fontWeight: 600,
              marginBottom: '4px',
            }}
            itemStyle={{ color: '#FFD740' }}
            formatter={(value: number) => [value.toFixed(3), 'Sensitivity']}
            labelFormatter={(value: number) => `Speed: ${value.toFixed(1)} dpm`}
          />
          {/* Gradient area fill under curve */}
          <Area
            type="natural"
            dataKey="y"
            stroke="none"
            fill="url(#curveGradient)"
            animationDuration={800}
          />
          <Line
            type="natural"
            dataKey="y"
            stroke="#FFD740"
            strokeWidth={2.5}
            name="X-Axis"
            filter="url(#curveGlow)"
            dot={showControls ? { 
              fill: '#FFD740', 
              r: 4,
              stroke: 'hsl(var(--background))',
              strokeWidth: 2,
            } : false}
            activeDot={{ 
              r: 6, 
              fill: '#FFD740',
              stroke: 'hsl(var(--background))',
              strokeWidth: 2,
              filter: 'url(#curveGlow)',
            }}
          />
          {yAxisData && (
            <>
              <Area
                type="natural"
                data={yAxisData}
                dataKey="y"
                stroke="none"
                fill="url(#yAxisGradient)"
              />
              <Line
                type="natural"
                data={yAxisData}
                dataKey="y"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                strokeDasharray="4 2"
                name="Y-Axis"
                dot={showControls ? { 
                  fill: 'hsl(var(--accent))', 
                  r: 3,
                  stroke: 'hsl(var(--background))',
                  strokeWidth: 1,
                } : false}
                activeDot={{ 
                  r: 5, 
                  fill: 'hsl(var(--accent))',
                  stroke: 'hsl(var(--background))',
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
