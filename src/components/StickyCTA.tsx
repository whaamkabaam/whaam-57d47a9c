import { LiquidGlassButton, LiquidGlassCard } from "./LiquidGlassEffects";
import { CONFIG } from "@/config";
interface Props {
  activeSection?: string;
}
export default function StickyCTA({
  activeSection
}: Props) {
  const rightIsPlans = activeSection !== "products";
  const shouldShow = activeSection !== "home" && activeSection !== "";
  
  return <div 
    className={`fixed right-4 md:right-6 z-50 transition-all duration-500 ease-out ${
      shouldShow 
        ? "opacity-100 translate-y-0 pointer-events-auto" 
        : "opacity-0 translate-y-8 pointer-events-none"
    }`} 
    style={{
      bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)"
    }} 
    aria-label="Quick actions"
  >
    <LiquidGlassCard variant="secondary" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-2.5 sm:p-3">
      <LiquidGlassButton variant="primary" className="px-4 py-2 font-bold" onClick={() => window.open(CONFIG.checkout.live149, "_blank")}>Book 1:1 Live Session</LiquidGlassButton>
      <LiquidGlassButton variant="secondary" className="px-4 py-2 font-bold" onClick={() => rightIsPlans ? document.getElementById("products")?.scrollIntoView({
      behavior: "smooth"
    }) : window.open(CONFIG.discord.invite, "_blank")}>
        {rightIsPlans ? "See plans (from $3.99/day)" : "Join Discord"}
      </LiquidGlassButton>
    </LiquidGlassCard>
  </div>;
}