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
    <div className="flex justify-center w-full mb-4">
      <div
        className={cn(
          "liquid-glass flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isExpanded ? "w-[260px] md:w-[300px]" : "w-auto"
        )}
      >
        {/* Rabbit Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "p-1.5 rounded-full transition-all duration-200",
            "hover:bg-white/10 active:scale-90",
            isExpanded && "bg-white/10 rotate-12"
          )}
          aria-label="Toggle speed controls"
        >
          <Rabbit className={cn(
            "w-4 h-4 text-foreground transition-transform duration-300",
            isExpanded && "scale-110"
          )} />
        </button>

        {/* Speed Slider - Expandable with grid for symmetric animation */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isExpanded ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5 px-1 min-w-[160px] md:min-w-[200px]">
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">Slow</span>
              <Slider
                value={[speed]}
                onValueChange={(value) => onSpeedChange(value[0])}
                min={0.3}
                max={3}
                step={0.1}
                className="flex-1"
              />
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">Fast</span>
            </div>
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={onPauseToggle}
          className={cn(
            "p-1.5 rounded-full transition-all duration-200",
            "hover:bg-white/10 active:scale-90",
            isPaused && "bg-primary/20"
          )}
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? (
            <Play className="w-4 h-4 text-foreground" />
          ) : (
            <Pause className="w-4 h-4 text-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
