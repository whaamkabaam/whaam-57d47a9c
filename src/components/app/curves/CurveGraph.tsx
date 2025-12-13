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
  const { curveData, yAxisData, hasDifferentCurves, maxX, maxY } = useMemo(() => {
    try {
      const parsed = parseCcurveContent(curveContent);
      const xCurve = parsed.xAxisCurve;
      const yCurve = parsed.yAxisCurve;
      
      const different = !curvesAreEqual(xCurve, yCurve);
      const allPoints = different ? [...xCurve, ...yCurve] : xCurve;
      
      const maxX = Math.max(...allPoints.map(p => p.x), 80);
      const maxY = Math.max(...allPoints.map(p => p.y), 2);
      
      return { 
        curveData: xCurve, 
        yAxisData: different ? yCurve : null,
        hasDifferentCurves: different,
        maxX, 
        maxY 
      };
    } catch {
      return { curveData: [], yAxisData: null, hasDifferentCurves: false, maxX: 80, maxY: 2 };
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
        <LineChart
          data={curveData}
          margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))" 
            opacity={0.3}
          />
          <XAxis
            dataKey="x"
            type="number"
            domain={[0, Math.ceil(maxX / 10) * 10]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            label={{
              value: 'Mouse Speed (dpm)',
              position: 'bottom',
              offset: 0,
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 10,
            }}
          />
          <YAxis
            domain={[0, Math.ceil(maxY * 10) / 10]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            label={{
              value: 'Sensitivity',
              angle: -90,
              position: 'insideLeft',
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 10,
            }}
          />
          {/* Reference line for 1:1 response */}
          <ReferenceLine
            y={1}
            stroke="hsl(var(--muted-foreground))"
            strokeDasharray="5 5"
            opacity={0.5}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            itemStyle={{ color: '#FFD740' }}
            formatter={(value: number) => [value.toFixed(3), 'Sensitivity']}
            labelFormatter={(value: number) => `Speed: ${value.toFixed(1)} dpm`}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#FFD740"
            strokeWidth={2}
            name="X-Axis"
            dot={showControls ? { 
              fill: '#FFD740', 
              r: 3,
              stroke: 'hsl(var(--background))',
              strokeWidth: 1,
            } : false}
            activeDot={{ 
              r: 5, 
              fill: '#FFD740',
              stroke: 'hsl(var(--background))',
              strokeWidth: 2,
            }}
          />
          {yAxisData && (
            <Line
              type="monotone"
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
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
