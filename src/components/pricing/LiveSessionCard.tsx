import { Calendar, Zap, User, Clock } from 'lucide-react';
import { CONFIG } from '@/config';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/LiquidGlassEffects';

export function LiveSessionCard() {
  const handleBook = () => {
    window.open(CONFIG.checkout.live149, '_blank');
  };

  return (
    <LiquidGlassCard variant="primary" className="border border-white/10">
      {/* Badge */}
      <span className="inline-flex items-center gap-1 px-2.5 py-1 mb-4 text-xs font-bold uppercase backdrop-blur-md bg-white/10 border border-white/20 text-whaam-yellow shadow-[0_0_12px_rgba(255,215,64,0.4)] rounded-full">
        <Zap className="w-3 h-3" />
        Premium Experience
      </span>

      {/* Header */}
      <h3 className="text-2xl font-bold text-foreground mb-2">
        Live 1-on-1 Session
      </h3>
      <p className="text-muted-foreground mb-4">
        Skip the endless testing and research. Order, schedule, and get your perfect settings dialed in – in just 45 minutes.
      </p>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-foreground">$149</span>
          <span className="text-muted-foreground">one-time</span>
        </div>
      </div>

      {/* Benefits */}
      <ul className="space-y-3 mb-6">
        <li className="flex items-center gap-3 text-sm text-foreground">
          <Zap className="w-4 h-4 text-whaam-yellow shrink-0" />
          Skip hours of curve testing and feature research
        </li>
        <li className="flex items-center gap-3 text-sm text-foreground">
          <User className="w-4 h-4 text-whaam-yellow shrink-0" />
          45-minute screen share, personally with me
        </li>
        <li className="flex items-center gap-3 text-sm text-foreground">
          <Calendar className="w-4 h-4 text-whaam-yellow shrink-0" />
          Schedule after ordering – link sent via email
        </li>
        <li className="flex items-center gap-3 text-sm text-foreground">
          <Clock className="w-4 h-4 text-whaam-yellow shrink-0" />
          Walk away aiming better, same day
        </li>
      </ul>

      {/* CTA */}
      <LiquidGlassButton
        onClick={handleBook}
        variant="primary"
        className="w-full h-12 shadow-[0_0_20px_rgba(255,215,64,0.3)] border border-whaam-yellow/30 hover:border-whaam-yellow/60"
      >
        Book Your Session
      </LiquidGlassButton>

      {/* Microline */}
      <p className="mt-3 text-xs text-center text-muted-foreground">
        Don't regret waiting – raise your skill ceiling today.
      </p>
    </LiquidGlassCard>
  );
}
