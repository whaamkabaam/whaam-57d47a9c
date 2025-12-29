// ============================================
// Empty State Component
// Reusable empty state with icon, title, description, CTA
// ============================================

import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className="rounded-full bg-muted/20 p-4 mb-4">
        <Icon className="h-8 w-8 text-muted-foreground/50" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      )}
      {action && (
        <Button variant="outline" onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Pre-configured empty states for common admin scenarios
export function NoResultsEmptyState({ 
  searchTerm, 
  onClearSearch 
}: { 
  searchTerm?: string; 
  onClearSearch?: () => void;
}) {
  return (
    <EmptyState
      title={searchTerm ? `No results for "${searchTerm}"` : 'No results found'}
      description="Try adjusting your filters or search terms"
      action={onClearSearch ? { label: 'Clear filters', onClick: onClearSearch } : undefined}
    />
  );
}

export function NoDataEmptyState({ 
  itemType = 'items',
  message,
}: { 
  itemType?: string;
  message?: string;
}) {
  return (
    <EmptyState
      title={`No ${itemType} yet`}
      description={message || `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} will appear here when they are created.`}
    />
  );
}
