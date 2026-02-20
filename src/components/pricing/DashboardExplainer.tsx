import { Sparkles, SlidersHorizontal, History } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import dashboardPreview from '@/assets/dashboard-preview.png';

const callouts = [
  { icon: Sparkles, label: 'AI curve generation' },
  { icon: SlidersHorizontal, label: 'Feedback sliders' },
  { icon: History, label: 'Version history' },
];

export const DashboardExplainer = () => (
  <div className="max-w-4xl mx-auto my-16">
    {/* Header */}
    <div className="text-center mb-8">
      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">
        What you get inside
      </p>
      <h3 className="text-2xl md:text-3xl font-bold glass-text-contrast mb-2">
        Your AI-powered curve studio
      </h3>
      <p className="text-sm text-muted-foreground">
        Play games, rate how it felt, and your curve improves automatically.
      </p>
    </div>

    {/* Screenshot */}
    <LiquidGlassCard className="p-2 md:p-3 border-white/[0.08] shadow-2xl shadow-black/30">
      <img
        src={dashboardPreview}
        alt="Dashboard preview showing AI curve generation, feedback sliders, and version history"
        className="w-full rounded-lg"
        loading="lazy"
      />
    </LiquidGlassCard>

    {/* Feature callouts */}
    <div className="flex items-center justify-center gap-6 md:gap-10 mt-6">
      {callouts.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-1.5 text-white/40">
          <Icon className="w-3.5 h-3.5" />
          <span className="text-xs">{label}</span>
        </div>
      ))}
    </div>
  </div>
);
