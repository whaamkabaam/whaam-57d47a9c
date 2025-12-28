// ============================================
// Stats Chart Component
// Reusable chart components for dashboard analytics
// ============================================

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Skeleton } from '@/components/ui/skeleton';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export function ChartContainer({ title, children, isLoading }: ChartContainerProps) {
  return (
    <LiquidGlassCard variant="secondary" className="p-6">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
        {title}
      </h3>
      {isLoading ? (
        <div className="h-[250px] flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      ) : (
        children
      )}
    </LiquidGlassCard>
  );
}

// Custom tooltip styling
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-white/10 rounded-lg p-3 shadow-lg">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Chart color palette using design system
const CHART_COLORS = {
  primary: 'hsl(0, 100%, 65%)',      // --primary (flame red)
  secondary: 'hsl(45, 100%, 60%)',   // --secondary (gold)
  blue: 'hsl(210, 100%, 60%)',
  emerald: 'hsl(160, 60%, 45%)',
  purple: 'hsl(280, 60%, 60%)',
  orange: 'hsl(30, 100%, 50%)',
  muted: 'hsl(220, 40%, 40%)',
};

const PIE_COLORS = [
  CHART_COLORS.secondary,
  CHART_COLORS.blue,
  CHART_COLORS.emerald,
  CHART_COLORS.primary,
  CHART_COLORS.purple,
  CHART_COLORS.orange,
  CHART_COLORS.muted,
];

interface ActivityChartProps {
  data: Array<{
    date: string;
    reports: number;
    requests: number;
  }>;
}

export function ActivityLineChart({ data }: ActivityChartProps) {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.secondary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={CHART_COLORS.secondary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="date"
            stroke="hsl(0, 0%, 60%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(0, 0%, 60%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
          />
          <Area
            type="monotone"
            dataKey="reports"
            name="Problem Reports"
            stroke={CHART_COLORS.primary}
            fillOpacity={1}
            fill="url(#colorReports)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="requests"
            name="Feature Requests"
            stroke={CHART_COLORS.secondary}
            fillOpacity={1}
            fill="url(#colorRequests)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface StatusDistributionProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function StatusPieChart({ data }: StatusDistributionProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={{ stroke: 'rgba(255,255,255,0.3)' }}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {total === 0 && (
        <p className="text-center text-sm text-muted-foreground -mt-32">No data available</p>
      )}
    </div>
  );
}

export function StatusBarChart({ data }: StatusDistributionProps) {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 60, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
          <XAxis type="number" stroke="hsl(0, 0%, 60%)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="name"
            stroke="hsl(0, 0%, 60%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
