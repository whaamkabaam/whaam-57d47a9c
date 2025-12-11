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
      <div className="liquid-glass flex items-center gap-1 px-2 py-1.5 rounded-full">
        {/* Rabbit Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "p-1.5 rounded-full transition-all duration-300",
            "hover:bg-white/10 active:scale-90",
            isExpanded && "bg-white/10"
          )}
          aria-label="Toggle speed controls"
        >
          <Rabbit className={cn(
            "w-4 h-4 text-foreground transition-transform duration-300",
            isExpanded && "rotate-12 scale-110"
          )} />
        </button>

        {/* Speed Slider - Expandable with grid for symmetric animation */}
        <div
          className={cn(
            "grid transition-[grid-template-columns,opacity] duration-300 ease-out",
            isExpanded ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 px-2 w-[140px] md:w-[180px]">
              <Slider
                value={[speed]}
                onValueChange={(value) => onSpeedChange(value[0])}
                min={0.3}
                max={4.5}
                step={0.1}
                variant="glass"
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={onPauseToggle}
          className={cn(
            "p-1.5 rounded-full transition-all duration-300",
            "hover:bg-white/10 active:scale-90",
            isPaused && "bg-white/10"
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
