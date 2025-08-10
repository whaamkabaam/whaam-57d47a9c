import { useEffect, useState } from "react";
import { LiquidGlassButton, LiquidGlassCard } from "./LiquidGlassEffects";
import { CONFIG } from "@/config";

interface Props { activeSection?: string }

export default function StickyCTA({ activeSection }: Props) {
  const [showTop, setShowTop] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rightIsPlans = activeSection !== "products";

  return (
    <>

      {/* Floating bottom-right CTA (desktop & mobile) */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        {expanded ? (
          <LiquidGlassCard variant="secondary" className="flex items-center gap-3 p-3 animate-fade-in">
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
            <button
              aria-label="Close quick actions"
              className="ml-1 px-2 py-1 rounded-md text-sm text-muted-foreground hover:text-foreground transition"
              onClick={() => setExpanded(false)}
            >
              ×
            </button>
          </LiquidGlassCard>
        ) : (
          <LiquidGlassButton
            aria-expanded={expanded}
            variant="primary"
            className="px-5 py-3 font-bold"
            onClick={() => setExpanded(true)}
          >
            Get started
          </LiquidGlassButton>
        )}
      </div>
    </>
  );
}
