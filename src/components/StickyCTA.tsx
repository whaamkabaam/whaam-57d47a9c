import { CONFIG } from "@/config";

interface Props {
  activeSection?: string;
}

export default function StickyCTA({ activeSection }: Props) {
  const shouldShow = activeSection !== "home" && activeSection !== "products" && activeSection !== "";

  return (
    <div
      className={`fixed right-4 md:right-6 z-50 transition-all duration-500 ease-out ${
        shouldShow
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      aria-label="Quick actions"
    >
      <div className="flex items-center gap-0 rounded-full bg-[rgba(20,20,25,0.8)] backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        {/* Primary CTA */}
        <button
          onClick={() => window.open(CONFIG.checkout.live149, "_blank")}
          className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          Book 1:1 Live Session
        </button>

        {/* Separator */}
        <span className="w-px h-5 bg-white/15 shrink-0" />

        {/* Secondary CTA */}
        <button
          onClick={() =>
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-5 py-2.5 text-sm font-medium text-white/50 hover:text-white/80 transition-colors whitespace-nowrap"
        >
          See plans
        </button>
      </div>
    </div>
  );
}
