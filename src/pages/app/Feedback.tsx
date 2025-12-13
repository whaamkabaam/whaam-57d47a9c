// ============================================
// Feedback Page - Placeholder
// ============================================

import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { MessageSquare } from 'lucide-react';

export default function Feedback() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">Feedback</h1>
      </div>

      <LiquidGlassCard variant="secondary" className="p-6">
        <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>
        <p className="text-muted-foreground">
          Share your experience with your custom curve. Your feedback helps us refine and improve your aim settings.
        </p>
      </LiquidGlassCard>
    </div>
  );
}
