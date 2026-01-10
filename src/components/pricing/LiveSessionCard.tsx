import { Calendar, Zap, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONFIG } from '@/config';

export function LiveSessionCard() {
  const handleBook = () => {
    window.open(CONFIG.checkout.live149, '_blank');
  };

  return (
    <div className="relative p-6 rounded-2xl glass-container border-2 border-primary/50">
      <div className="glass-effect-layer" />
      
      <div className="glass-content-layer !p-0">
        {/* Badge */}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 mb-4 text-xs font-bold uppercase bg-primary/20 text-primary rounded-full">
          <Zap className="w-3 h-3" />
          Premium Experience
        </span>

        {/* Header */}
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Live 1-on-1 Session
        </h3>
        <p className="text-muted-foreground mb-4">
          Get your perfect curve dialed in with an expert in 45 minutes
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
            <User className="w-4 h-4 text-primary shrink-0" />
            Personal attention from a curve specialist
          </li>
          <li className="flex items-center gap-3 text-sm text-foreground">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            45-minute screen share session
          </li>
          <li className="flex items-center gap-3 text-sm text-foreground">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            Pick a time that works for you
          </li>
          <li className="flex items-center gap-3 text-sm text-foreground">
            <Zap className="w-4 h-4 text-primary shrink-0" />
            Walk away with your optimal curve
          </li>
        </ul>

        {/* CTA */}
        <Button
          onClick={handleBook}
          variant="whaam"
          className="w-full liquid-glow"
        >
          Book Your Session
        </Button>

        {/* Microline */}
        <p className="mt-3 text-xs text-center text-muted-foreground">
          100% satisfaction guaranteed
        </p>
      </div>
    </div>
  );
}
