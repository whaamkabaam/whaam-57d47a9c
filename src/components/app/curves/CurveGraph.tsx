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
import { curveCatmullRom } from 'd3-shape';
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
      
      // Y-axis always starts at 0 like reference design
      const actualMaxY = Math.max(...allPoints.map(p => p.y));
      
      // Add padding at top for readability
      const minY = 0;
      const maxY = Math.ceil(actualMaxY * 10) / 10 + 0.1; // Round up with small padding
      
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
          <Tooltip
            wrapperStyle={{
              transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
              willChange: 'transform',
            }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              
              const xValue = payload.find(p => p.name === 'X-Axis')?.value as number | undefined;
              const yValue = payload.find(p => p.name === 'Y-Axis')?.value as number | undefined;
              
              return (
                <div className="bg-card/95 border border-border/50 rounded-xl px-4 py-3 backdrop-blur-xl shadow-lg">
                  {yValue !== undefined && yValue !== xValue ? (
                    <>
                      <p className="text-foreground">X: {xValue?.toFixed(3)}</p>
                      <p className="text-foreground">Y: {yValue?.toFixed(3)}</p>
                    </>
                  ) : (
                    <p className="text-foreground">Sensitivity: {xValue?.toFixed(3)}</p>
                  )}
                  <p className="text-foreground">Speed: {Number(label).toFixed(1)} dpms</p>
                </div>
              );
            }}
          />
          {/* Gradient area fill under curve */}
          <Area
            type={curveCatmullRom.alpha(0.5)}
            dataKey="y"
            stroke="none"
            fill="url(#curveGradient)"
            animationDuration={800}
          />
          <Line
            type={curveCatmullRom.alpha(0.5)}
            dataKey="y"
            stroke="#FFD740"
            strokeWidth={2.5}
            name="X-Axis"
            filter="url(#curveGlow)"
            dot={{ 
              fill: 'hsl(var(--muted-foreground))', 
              r: 5,
              stroke: 'hsl(var(--background))',
              strokeWidth: 2,
            }}
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
                type={curveCatmullRom.alpha(0.5)}
                data={yAxisData}
                dataKey="y"
                stroke="none"
                fill="url(#yAxisGradient)"
              />
              <Line
                type={curveCatmullRom.alpha(0.5)}
                data={yAxisData}
                dataKey="y"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                strokeDasharray="4 2"
                name="Y-Axis"
                dot={{ 
                  fill: 'hsl(var(--muted-foreground))', 
                  r: 4,
                  stroke: 'hsl(var(--background))',
                  strokeWidth: 2,
                }}
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
