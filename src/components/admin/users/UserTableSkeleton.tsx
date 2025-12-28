// ============================================
// User Table Skeleton Component
// ============================================

import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface UserTableSkeletonProps {
  rows?: number;
}

export function UserTableSkeleton({ rows = 5 }: UserTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          {/* User Info */}
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
          </TableCell>

          {/* Activity Counts */}
          <TableCell>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          </TableCell>

          {/* Test User Toggle */}
          <TableCell>
            <Skeleton className="h-5 w-10 rounded-full" />
          </TableCell>

          {/* Joined Date */}
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
