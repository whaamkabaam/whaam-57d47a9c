// ============================================
// Users Toolbar Component
// ============================================

import { useState, useEffect } from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, RefreshCw, FlaskConical } from 'lucide-react';

interface UsersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  includeTestUsers: boolean;
  onIncludeTestUsersChange: (value: boolean) => void;
  totalUsers: number;
  isLoading?: boolean;
  onRefresh: () => void;
}

export function UsersToolbar({
  search,
  onSearchChange,
  includeTestUsers,
  onIncludeTestUsersChange,
  totalUsers,
  isLoading,
  onRefresh,
}: UsersToolbarProps) {
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  // Sync external search changes
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  return (
    <LiquidGlassCard variant="secondary" className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by email or name..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9 bg-background/50 border-border/50"
          />
        </div>

        {/* Include Test Users Toggle */}
        <div className="flex items-center gap-2">
          <Switch
            id="include-test-users"
            checked={includeTestUsers}
            onCheckedChange={onIncludeTestUsersChange}
          />
          <Label
            htmlFor="include-test-users"
            className="text-sm text-muted-foreground cursor-pointer flex items-center gap-1.5"
          >
            <FlaskConical className="h-3.5 w-3.5" />
            Include test users
          </Label>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Results Count */}
        <span className="text-sm text-muted-foreground">
          {isLoading ? 'Loading...' : `${totalUsers.toLocaleString()} users`}
        </span>

        {/* Refresh Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          disabled={isLoading}
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </LiquidGlassCard>
  );
}
