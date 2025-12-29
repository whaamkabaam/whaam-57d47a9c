// ============================================
// Date Range Filter Component
// Reusable date picker with quick presets
// ============================================

import { useState } from 'react';
import { format, subDays, startOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';

export interface DateRangeValue {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangeFilterProps {
  value: DateRangeValue;
  onChange: (range: DateRangeValue) => void;
  className?: string;
}

const presets = [
  { label: 'Today', getValue: () => ({ from: new Date(), to: new Date() }) },
  { label: 'Last 7 days', getValue: () => ({ from: subDays(new Date(), 7), to: new Date() }) },
  { label: 'Last 30 days', getValue: () => ({ from: subDays(new Date(), 30), to: new Date() }) },
  { label: 'This week', getValue: () => ({ from: startOfWeek(new Date()), to: endOfWeek(new Date()) }) },
  { label: 'This month', getValue: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
];

export function DateRangeFilter({ value, onChange, className }: DateRangeFilterProps) {
  const [open, setOpen] = useState(false);

  const hasValue = value.from || value.to;

  const handleSelect = (range: DateRange | undefined) => {
    onChange({
      from: range?.from,
      to: range?.to,
    });
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange({ from: undefined, to: undefined });
  };

  const handlePreset = (preset: typeof presets[0]) => {
    onChange(preset.getValue());
    setOpen(false);
  };

  const formatDateRange = () => {
    if (!value.from) return 'Select dates';
    if (!value.to) return format(value.from, 'MMM d, yyyy');
    if (format(value.from, 'yyyy-MM-dd') === format(value.to, 'yyyy-MM-dd')) {
      return format(value.from, 'MMM d, yyyy');
    }
    return `${format(value.from, 'MMM d')} - ${format(value.to, 'MMM d, yyyy')}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-start text-left font-normal gap-2',
            !hasValue && 'text-muted-foreground',
            hasValue && 'border-secondary/50',
            className
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          <span className="truncate">{formatDateRange()}</span>
          {hasValue && (
            <X
              className="h-3.5 w-3.5 ml-auto opacity-50 hover:opacity-100 transition-opacity"
              onClick={handleClear}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 bg-popover/95 backdrop-blur-xl border-border/50" 
        align="start"
        sideOffset={8}
      >
        <div className="flex">
          {/* Presets */}
          <div className="flex flex-col gap-1 p-3 border-r border-border/50">
            <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Quick select</p>
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant="ghost"
                size="sm"
                className="justify-start text-sm h-8 hover:bg-secondary/20 hover:text-secondary"
                onClick={() => handlePreset(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
          
          {/* Calendar */}
          <div className="p-3">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={value.from}
              selected={{ from: value.from, to: value.to }}
              onSelect={handleSelect}
              numberOfMonths={1}
              className="pointer-events-auto"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
