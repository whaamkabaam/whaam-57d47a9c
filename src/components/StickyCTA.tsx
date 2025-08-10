
import { LiquidGlassButton, LiquidGlassCard } from "./LiquidGlassEffects";
import { CONFIG } from "@/config";

interface Props { activeSection?: string }

export default function StickyCTA({ activeSection }: Props) {
  // No scroll tracking; compact, always-visible CTA
  // (keeps layout predictable across screen sizes)


  const rightIsPlans = activeSection !== "products";

  return (
    <>

      {/* Floating bottom-right CTA (desktop & mobile) */}
      <div className="fixed right-4 md:right-6 z-50" style={{ bottom: 'max(env(safe-area-inset-bottom, 0px), 1rem)' }}>
        <LiquidGlassCard variant="secondary" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-2.5 sm:p-3 animate-fade-in">
          <LiquidGlassButton
            variant="primary"
            className="px-4 py-2 font-bold"
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          >
            Book 45-min 1-on-1
          </LiquidGlassButton>
          <LiquidGlassButton
            variant="secondary"
            className="px-4 py-2 font-bold"
            onClick={() => rightIsPlans
              ? document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
              : window.open(CONFIG.discord.invite, "_blank")}
          >
            {rightIsPlans ? "See plans (from $39)" : "Join Discord"}
          </LiquidGlassButton>
        </LiquidGlassCard>
      </div>
    </>
  );
}
