import { useState } from "react";
import { Rabbit, Play, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface ParallaxControlsProps {
  isPaused: boolean;
  speed: number;
  onPauseToggle: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function ParallaxControls({
  isPaused,
  speed,
  onPauseToggle,
  onSpeedChange,
}: ParallaxControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div
        className={cn(
          "liquid-glass flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ease-out",
          isExpanded ? "w-[280px] md:w-[320px]" : "w-auto"
        )}
      >
        {/* Rabbit Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "p-2 rounded-xl transition-all duration-200",
            "hover:bg-white/10 active:scale-95",
            isExpanded && "bg-white/10"
          )}
          aria-label="Toggle speed controls"
        >
          <Rabbit className="w-5 h-5 text-foreground" />
        </button>

        {/* Speed Slider - Expandable */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            isExpanded ? "w-full opacity-100" : "w-0 opacity-0"
          )}
        >
          <div className="flex items-center gap-2 min-w-[140px] md:min-w-[180px]">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Slow</span>
            <Slider
              value={[speed]}
              onValueChange={(value) => onSpeedChange(value[0])}
              min={0.3}
              max={3}
              step={0.1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">Fast</span>
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={onPauseToggle}
          className={cn(
            "p-2 rounded-xl transition-all duration-200",
            "hover:bg-white/10 active:scale-95",
            isPaused && "bg-primary/20"
          )}
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? (
            <Play className="w-5 h-5 text-foreground" />
          ) : (
            <Pause className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
