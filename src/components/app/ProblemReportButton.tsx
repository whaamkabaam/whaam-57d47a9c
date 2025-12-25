// ============================================
// Problem Report Floating Button
// ============================================

import { useState } from 'react';
import { Bug } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ProblemReportModal } from './ProblemReportModal';

export function ProblemReportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full 
              bg-background/80 backdrop-blur-md border border-border/50
              shadow-lg hover:shadow-xl hover:bg-background/90
              flex items-center justify-center
              transition-all duration-200 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Report a problem"
          >
            <Bug className="h-5 w-5 text-muted-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={8}>
          Report a problem
        </TooltipContent>
      </Tooltip>

      <ProblemReportModal open={open} onOpenChange={setOpen} />
    </>
  );
}
