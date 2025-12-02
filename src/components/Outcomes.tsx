import { Target, MoveRight, Crosshair, Focus } from "lucide-react";
import { LiquidGlassCard } from "./LiquidGlassEffects";

const items = [
  { icon: Target, title: "Faster flicks", desc: "Snap to target without overshoot" },
  { icon: Focus, title: "Steadier micro-adjusts", desc: "Track heads without jitter" },
  { icon: MoveRight, title: "Consistency", desc: "Same feel across games" },
  { icon: Crosshair, title: "Confidence", desc: "Settings that just feel right" },
];

export default function Outcomes() {
  return (
    <section aria-labelledby="outcomes-heading" className="pt-16 pb-4">
      <div className="container mx-auto px-6">
        <h2 id="outcomes-heading" className="sr-only">Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <LiquidGlassCard key={i} variant="secondary" className="p-6">
              <div className="flex items-start gap-4">
                <div className="glass-accent rounded-xl w-12 h-12 flex items-center justify-center shrink-0">
                  <it.icon className="text-primary" size={22} />
                </div>
                <div>
                  <div className="glass-text-contrast font-semibold mb-1">{it.title}</div>
                  <p className="text-sm text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
