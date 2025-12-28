// ============================================
// Problem Reports Table Skeleton Component
// Loading state for the problem reports table
// ============================================

import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface ProblemReportsTableSkeletonProps {
  rows?: number;
}

export function ProblemReportsTableSkeleton({ rows = 6 }: ProblemReportsTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          {/* Category */}
          <TableCell>
            <Skeleton className="h-5 w-16 rounded-full" />
          </TableCell>

          {/* Description */}
          <TableCell>
            <Skeleton className="h-4 w-40" />
          </TableCell>

          {/* Screenshots */}
          <TableCell>
            <Skeleton className="h-5 w-10 rounded-full" />
          </TableCell>

          {/* Status */}
          <TableCell>
            <Skeleton className="h-8 w-[130px] rounded-md" />
          </TableCell>

          {/* Priority */}
          <TableCell>
            <Skeleton className="h-8 w-[110px] rounded-md" />
          </TableCell>

          {/* User */}
          <TableCell>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </TableCell>

          {/* Page URL */}
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          {/* Created */}
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>

          {/* Actions */}
          <TableCell>
            <Skeleton className="h-8 w-8 rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
