import { useEffect, useState } from "react";
import { LiquidGlassButton, LiquidGlassCard } from "./LiquidGlassEffects";
import { CONFIG } from "@/config";

interface Props { activeSection?: string }

export default function StickyCTA({ activeSection }: Props) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rightIsPlans = activeSection !== "products";

  return (
    <>
      {/* Reserved space to prevent CLS */}
      <div className="hidden md:block h-16" aria-hidden />
      <div className="block md:hidden h-16" aria-hidden />

      {/* Desktop Top Bar */}
      {showTop && (
        <div className="hidden md:flex fixed top-0 left-0 right-0 h-16 z-50">
          <LiquidGlassCard variant="secondary" className="container mx-auto px-6 w-full flex items-center justify-between">
            <LiquidGlassButton
              variant="primary"
              className="px-6 py-2 font-bold"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book 45-min 1-on-1
            </LiquidGlassButton>
            <LiquidGlassButton
              variant="secondary"
              className="px-6 py-2 font-bold"
              onClick={() => rightIsPlans
                ? document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                : window.open(CONFIG.discord.invite, "_blank")}
            >
              {rightIsPlans ? "See plans (from $39)" : "Join Discord"}
            </LiquidGlassButton>
          </LiquidGlassCard>
        </div>
      )}

      {/* Mobile Bottom Bar (always visible) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 z-50">
        <LiquidGlassCard variant="secondary" className="h-full flex items-center justify-between px-4">
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
