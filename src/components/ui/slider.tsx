import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      variant: {
        default: "",
        glass: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderVariants({ variant }), className)}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative w-full grow rounded-full",
        variant === "glass"
          ? "h-6 bg-transparent cursor-pointer" // Tall hit area for easier clicking
          : "h-2 bg-secondary overflow-hidden"
      )}
    >
      {/* Visual track line - thin but clickable area is large */}
      {variant === "glass" && (
        <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 bg-white/20 rounded-full" />
      )}
      <SliderPrimitive.Range
        className={cn(
          "absolute",
          variant === "glass"
            ? "h-[3px] top-1/2 -translate-y-1/2 bg-gradient-to-r from-white/30 to-white/60"
            : "h-full bg-primary"
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block rounded-full focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variant === "glass"
          ? "h-4 w-4 bg-white border-2 border-white/60 shadow-[0_0_10px_rgba(255,255,255,0.5)] cursor-grab active:cursor-grabbing hover:scale-125 hover:shadow-[0_0_16px_rgba(255,255,255,0.7)] transition-all duration-200"
          : "h-5 w-5 border-2 border-primary bg-background ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
